import { useState } from "react";

import { trackLinkClick } from "@/data/analytics";
import {
  INVESTMENT_OPTIONS,
  SUBMIT_LEAD_URL,
  leadHeaders,
  type LeadPayload,
} from "@/data/lead.config";

const formatPhone = (raw: string) => {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

type Status = "idle" | "sending" | "success" | "error";
type Errors = Partial<Record<"name" | "phone" | "job" | "invest", string>>;

/** Formulário que envia para o mesmo backend ("submit-lead") do site da franquia. */
export function LeadForm({ trackingId, source }: { trackingId: string; source: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [job, setJob] = useState("");
  const [invest, setInvest] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const validate = (): Errors => {
    const e: Errors = {};
    if (name.trim().length < 2) e.name = "Informe seu nome completo";
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) e.phone = "Telefone inválido";
    if (job.trim().length < 2) e.job = "Informe sua profissão";
    if (!invest) e.invest = "Selecione uma opção";
    return e;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const payload: LeadPayload = {
      full_name: name.trim(),
      phone: `+55${phone.replace(/\D/g, "")}`,
      job_title: job.trim(),
      valor_disponivel: invest as LeadPayload["valor_disponivel"],
      source,
    };

    setStatus("sending");
    try {
      const res = await fetch(SUBMIT_LEAD_URL, {
        method: "POST",
        headers: leadHeaders,
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) throw new Error("Falha no envio");
      trackLinkClick(trackingId, "Lead enviado");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="lead-success" role="status">
        <strong>Recebemos seus dados.</strong>
        <span>Nossa equipe entra em contato com você pelo WhatsApp em breve.</span>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={onSubmit} noValidate>
      <div className="lead-field">
        <label htmlFor="lead-name">Nome completo</label>
        <input
          id="lead-name"
          className="lead-input"
          autoComplete="name"
          value={name}
          maxLength={200}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <span className="lead-error">{errors.name}</span>}
      </div>

      <div className="lead-field">
        <label htmlFor="lead-phone">Telefone (WhatsApp)</label>
        <input
          id="lead-phone"
          className="lead-input"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="(95) 99999-9999"
          value={phone}
          onChange={(e) => setPhone(formatPhone(e.target.value))}
        />
        {errors.phone && <span className="lead-error">{errors.phone}</span>}
      </div>

      <div className="lead-field">
        <label htmlFor="lead-job">Profissão</label>
        <input
          id="lead-job"
          className="lead-input"
          autoComplete="organization-title"
          value={job}
          maxLength={200}
          onChange={(e) => setJob(e.target.value)}
        />
        {errors.job && <span className="lead-error">{errors.job}</span>}
      </div>

      <div className="lead-field">
        <label htmlFor="lead-invest">Valor disponível para investimento</label>
        <select
          id="lead-invest"
          className="lead-input"
          value={invest}
          onChange={(e) => setInvest(e.target.value)}
        >
          <option value="" disabled>Selecione</option>
          {INVESTMENT_OPTIONS.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        {errors.invest && <span className="lead-error">{errors.invest}</span>}
      </div>

      {status === "error" && (
        <p className="lead-error" role="alert">
          Não foi possível enviar agora. Tente novamente em instantes.
        </p>
      )}

      <button type="submit" className="lead-btn" disabled={status === "sending"}>
        {status === "sending" ? "Enviando..." : "Quero saber mais"}
      </button>
    </form>
  );
}
