import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HERO_WORDS = ["café", "brinquedoteca", "coworking", "carinho", "conforto", "experiência"];

/* ── Partículas ─────────────────────────────────────────────── */
export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const ORANGE = "225, 124, 76"; // hsl(28 70% 55%) em RGB

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const pts = Array.from({ length: 32 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ORANGE}, 0.18)`;
        ctx.fill();
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 70) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(${ORANGE}, ${0.08 * (1 - dist / 70)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particles-canvas"
      aria-hidden="true"
    />
  );
}

/* ── Hero word ──────────────────────────────────────────────── */
export function HeroWord() {
  const words = useMemo(() => HERO_WORDS, []);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => setIndex((i) => (i + 1) % words.length), 2200);
    return () => clearTimeout(id);
  }, [index, words]);

  return (
    <div className="hero-word-row">
      <span className="hero-static">Aqui tem</span>
      <span className="hero-word-slot" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            className="hero-word"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -32 }}
            transition={{ type: "spring", stiffness: 60, damping: 14 }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
      <div className="hero-dots">
        {words.map((_, i) => (
          <span key={i} className={`hero-dot${i === index ? " hero-dot-active" : ""}`} />
        ))}
      </div>
    </div>
  );
}
