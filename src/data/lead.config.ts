// ─────────────────────────────────────────────────────────────────────────────
// lead.config.ts
// Envio de leads para o MESMO backend do site da franquia
// (lavanderialavoura.com.br → função "submit-lead"). A chave abaixo é a chave
// pública "anon" do Supabase, a mesma que o site já expõe no navegador.
// ─────────────────────────────────────────────────────────────────────────────

const SUPABASE_URL = "https://wxsvazhtowstnhkdlqcn.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4c3Zhemh0b3dzdG5oa2RscWNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5ODAwNjcsImV4cCI6MjA5MjU1NjA2N30.PF0LXlMnyWdVgxnsMR3t47oheCwli2y1qiKreEA6vXc";

export const SUBMIT_LEAD_URL = `${SUPABASE_URL}/functions/v1/submit-lead`;

export const leadHeaders = {
  "Content-Type": "application/json",
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
};

// Os valores precisam ser idênticos aos do formulário do site (validados no servidor).
export const INVESTMENT_OPTIONS = [
  "Tenho R$165 Mil",
  "Tenho R$73 Mil e consigo parcelar o restante",
  "Não tenho R$165 Mil",
] as const;

export type LeadPayload = {
  full_name: string;
  phone: string;
  job_title: string;
  valor_disponivel: (typeof INVESTMENT_OPTIONS)[number];
};
