import { useEffect, useRef } from "react";
import { useReducedMotion, useInViewPlayback, useDeviceTier } from "../../hooks/useCintent";
const CINTENT = { heroVisual: "cintent-hero-visual" };

/*
  CINTENT Cognitive Visual — SVG + Canvas hybrid, 12s deterministic loop.
  Phases: 0-2 Ask · 2-4 Intent/Context · 4-7 Engine · 7-9.5 Decision · 9.5-12 Action/Learning.
  Dark-theme adaptation of the supplied Emergent visual, decorative, aria-hidden.
*/

const LOOP_MS = 12000;

const CAPABILITIES = [
  { label: "Intent", full: "Intent Understanding" },
  { label: "Context", full: "Contextual Reasoning" },
  { label: "Memory", full: "Cognitive Memory" },
  { label: "Constraints", full: "Constraint Evaluation" },
  { label: "Governance", full: "Governance" },
  { label: "Decision", full: "Decision Intelligence" },
];

const INPUT_ICONS = [
  { key: "text", y: 60, label: "Text" },
  { key: "voice", y: 130, label: "Voice" },
  { key: "doc", y: 200, label: "Document" },
  { key: "data", y: 270, label: "Data" },
  { key: "sensor", y: 340, label: "Sensor" },
  { key: "vision", y: 410, label: "Vision" },
  { key: "workflow", y: 480, label: "Workflow" },
];

const SECTORS = [
  { key: "workflow", label: "Workflow" },
  { key: "healthcare", label: "Healthcare" },
  { key: "finance", label: "Finance" },
  { key: "autonomy", label: "Autonomy" },
  { key: "robotics", label: "Robotics" },
  { key: "infra", label: "Infra" },
];

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}
function seg(t, a, b) {
  if (t <= a) return 0;
  if (t >= b) return 1;
  return easeInOut((t - a) / (b - a));
}
function pulse(t, a, b) {
  const s = seg(t, a, (a + b) / 2);
  const e = 1 - seg(t, (a + b) / 2, b);
  return Math.min(s, e);
}

export default function CintentCognitiveVisual() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const t0Ref = useRef(0);
  const phaseRefs = useRef({}); // element refs by key
  const reduced = useReducedMotion();
  const inView = useInViewPlayback(wrapRef, 0.2);
  const tier = useDeviceTier();

  useEffect(() => {
    if (reduced) return;
    if (!inView) return;

    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, tier === "low" ? 1 : 2);
      canvas.width = Math.max(1, Math.floor(r.width * dpr));
      canvas.height = Math.max(1, Math.floor(r.height * dpr));
      canvas.style.width = `${r.width}px`;
      canvas.style.height = `${r.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // particles cruising along the input tracks
    const particleCount = tier === "low" ? 26 : tier === "mid" ? 44 : 68;
    const particles = Array.from({ length: particleCount }, () => ({
      lane: Math.floor(Math.random() * INPUT_ICONS.length),
      offset: Math.random(),
      speed: 0.25 + Math.random() * 0.6,
      size: 0.8 + Math.random() * 1.3,
    }));

    t0Ref.current = performance.now();
    const tick = (now) => {
      const t = ((now - t0Ref.current) % LOOP_MS) / LOOP_MS; // 0..1
      // SVG driven updates
      const el = phaseRefs.current;

      // Phase 1 — inputs enter (0-2s => 0..0.1667)
      const p1 = seg(t, 0, 0.1667);
      const p2 = seg(t, 0.1667, 0.3333);
      const p3 = seg(t, 0.3333, 0.5833);
      const engineHold = seg(t, 0.5833, 0.7917);
      const p4 = seg(t, 0.5833, 0.7917);
      const p5 = seg(t, 0.7917, 1);
      const outro = pulse(t, 0.92, 1); // seamless join

      // input tracks visible during 0-0.35
      const inputsVisible = Math.max(0, Math.min(1, p1 * 1.2 - Math.max(0, seg(t, 0.35, 0.5))));
      if (el.inputs) el.inputs.setAttribute("opacity", inputsVisible.toFixed(3));

      // semantic mesh visible 0.15 - 0.55
      if (el.mesh) {
        const meshOp = Math.min(seg(t, 0.13, 0.28), 1 - seg(t, 0.5, 0.6));
        el.mesh.setAttribute("opacity", Math.max(0, meshOp).toFixed(3));
      }

      // engine visible 0.3 - 0.85
      if (el.engine) {
        const eOp = Math.min(seg(t, 0.28, 0.42), 1 - seg(t, 0.83, 0.92));
        el.engine.setAttribute("opacity", Math.max(0, eOp).toFixed(3));
      }

      // decision card visible 0.58 - 0.9
      if (el.decision) {
        const dOp = Math.min(seg(t, 0.58, 0.7), 1 - seg(t, 0.86, 0.93));
        el.decision.setAttribute("opacity", Math.max(0, dOp).toFixed(3));
        const scale = 0.94 + seg(t, 0.58, 0.72) * 0.06;
        el.decision.setAttribute("transform", `translate(430 300) scale(${scale.toFixed(3)})`);
      }

      // action rays 0.78 - 0.98
      if (el.action) {
        const aOp = Math.min(seg(t, 0.78, 0.88), 1 - seg(t, 0.95, 1));
        el.action.setAttribute("opacity", Math.max(0, aOp).toFixed(3));
      }

      // feedback loop return line 0.9 - 1
      if (el.feedback) {
        const fOp = seg(t, 0.9, 1);
        el.feedback.setAttribute("opacity", fOp.toFixed(3));
      }

      // phase indicator ticks
      if (el.phaseTicks) {
        const phaseIdx = t < 0.1667 ? 0 : t < 0.3333 ? 1 : t < 0.5833 ? 2 : t < 0.7917 ? 3 : 4;
        for (let i = 0; i < 5; i++) {
          const dot = el.phaseTicks.children[i];
          if (!dot) continue;
          dot.setAttribute("fill", i === phaseIdx ? "#35b8ff" : "#6d82a5");
          dot.setAttribute("r", i === phaseIdx ? "3.4" : "2.4");
        }
      }

      // — Canvas: input flow particles + subtle dust
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      const showParticles = t < 0.4;
      if (showParticles) {
        const laneScale = h / 540; // svg viewBox height reference
        for (const p of particles) {
          p.offset += p.speed * 0.006;
          if (p.offset > 1) p.offset -= 1;
          const laneY = (INPUT_ICONS[p.lane].y - 40) * laneScale;
          const startX = w * 0.02;
          const endX = w * 0.42;
          const x = startX + (endX - startX) * p.offset;
          const alpha =
            0.35 * (1 - Math.abs(0.5 - p.offset) * 1.4) * (1 - Math.max(0, (t - 0.3) / 0.1));
          if (alpha <= 0.02) continue;
          ctx.beginPath();
          ctx.fillStyle = `rgba(67, 56, 202, ${alpha.toFixed(3)})`;
          ctx.arc(x, laneY, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // action rays — canvas outward streaks 0.78-0.95
      if (t > 0.78 && t < 0.98) {
        const kk = seg(t, 0.78, 0.95);
        const cx = w * 0.56;
        const cy = h * 0.5;
        for (let i = 0; i < SECTORS.length; i++) {
          const ang = (Math.PI * 2 * i) / SECTORS.length - Math.PI / 2;
          const len = w * 0.28 * kk;
          const tx = cx + Math.cos(ang) * len;
          const ty = cy + Math.sin(ang) * len;
          const grad = ctx.createLinearGradient(cx, cy, tx, ty);
          grad.addColorStop(0, `rgba(37, 99, 235, ${0.55 * (1 - kk)})`);
          grad.addColorStop(1, "rgba(37, 99, 235, 0)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(tx, ty);
          ctx.stroke();
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [reduced, inView, tier]);

  return (
    <div
      ref={wrapRef}
      data-testid={CINTENT.heroVisual}
      aria-hidden="true"
      className="cv-container relative w-full h-full"
    >
      {/* soft backdrop */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 65% 40%, #132a55 0%, #0b1833 45%, #060917 80%)",
          }}
        />
        <div className="absolute inset-0 grid-backdrop opacity-70" />
      </div>

      {/* Canvas layer (particles + rays) */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* SVG layer — semantic structure */}
      <svg
        viewBox="0 0 900 600"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="core-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#132a55" stopOpacity="1" />
            <stop offset="55%" stopColor="#21456f" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#060917" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6e83a5" stopOpacity="0" />
            <stop offset="50%" stopColor="#35b8ff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#43e0f5" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ray-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2bb8ff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#2bb8ff" stopOpacity="0" />
          </linearGradient>
          <filter id="soft-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {/* Phase indicator ticks */}
        <g ref={(el) => (phaseRefs.current.phaseTicks = el)} transform="translate(60 560)">
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={i} cx={i * 16} cy="0" r="2.4" fill="#6d82a5" />
          ))}
        </g>
        <text
          x="60"
          y="540"
          fontFamily="var(--font-mono), monospace"
          fontSize="10"
          fill="#7489ac"
          letterSpacing="2"
        >
          COGNITIVE LOOP · 12s
        </text>

        {/* ── Phase 1: inputs ── */}
        <g ref={(el) => (phaseRefs.current.inputs = el)} opacity={reduced ? "1" : "0"}>
          {INPUT_ICONS.map((it, i) => (
            <g key={it.key} transform={`translate(60 ${it.y})`}>
              <rect
                x="0"
                y="-16"
                width="128"
                height="32"
                rx="10"
                fill="#101a36"
                stroke="#294466"
                strokeWidth="1"
              />
              <circle cx="18" cy="0" r="5" fill={i % 2 ? "#35b8ff" : "#43e0f5"} opacity="0.85" />
              <text
                x="34"
                y="4"
                fontFamily="var(--font-mono), monospace"
                fontSize="10"
                fill="#b4c6e5"
                letterSpacing="1.6"
              >
                {it.label.toUpperCase()}
              </text>
              {/* track line to center */}
              <path
                d={`M 128 0 C 220 0 260 ${300 - it.y} 380 ${300 - it.y}`}
                stroke="url(#line-grad)"
                strokeWidth="1"
                fill="none"
                opacity="0.5"
                strokeDasharray="3 5"
                className="cv-dash"
              />
            </g>
          ))}
        </g>

        {/* ── Phase 2: semantic mesh (intent + context) ── */}
        <g ref={(el) => (phaseRefs.current.mesh = el)} opacity={reduced ? "1" : "0"}>
          {[
            [340, 200, "intent"],
            [430, 170, "context"],
            [520, 210, "objective"],
            [360, 300, "history"],
            [500, 320, "environment"],
            [440, 380, "user"],
          ].map(([x, y, label], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="4" fill="#35b8ff" opacity="0.85" />
              <circle
                cx={x}
                cy={y}
                r="12"
                fill="none"
                stroke="#5b7fc5"
                strokeWidth="1"
                opacity="0.6"
              />
              <text
                x={x + 12}
                y={y - 8}
                fontFamily="var(--font-mono), monospace"
                fontSize="9"
                fill="#91a7cb"
                letterSpacing="1.4"
              >
                {label.toUpperCase()}
              </text>
            </g>
          ))}
          {/* connecting lines */}
          {[
            [340, 200, 430, 170],
            [430, 170, 520, 210],
            [340, 200, 360, 300],
            [520, 210, 500, 320],
            [360, 300, 440, 380],
            [500, 320, 440, 380],
            [430, 170, 440, 300],
          ].map(([x1, y1, x2, y2], i) => (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#35b8ff"
              strokeOpacity="0.35"
              strokeWidth="0.9"
            />
          ))}
        </g>

        {/* ── Phase 3: CINTENT cognitive engine ── */}
        <g
          ref={(el) => (phaseRefs.current.engine = el)}
          opacity={reduced ? "1" : "0"}
          transform="translate(430 300)"
        >
          {/* soft aura */}
          <circle r="150" fill="url(#core-grad)" />
          {/* orbit rings */}
          <g className="cv-orbit-slow">
            <circle r="120" fill="none" stroke="#5b7fc5" strokeWidth="1" strokeDasharray="2 6" />
          </g>
          <g className="cv-orbit-mid">
            <circle r="86" fill="none" stroke="#7a68e8" strokeWidth="1" strokeDasharray="1 5" />
          </g>

          {/* central CINTENT wordmark */}
          <g className="cv-breathe">
            <circle r="52" fill="#101a36" stroke="#3b5d91" strokeWidth="1.2" />
            <circle
              r="52"
              fill="none"
              stroke="#35b8ff"
              strokeOpacity="0.5"
              strokeWidth="1"
              filter="url(#soft-glow)"
            />
            <text
              textAnchor="middle"
              y="-2"
              fontFamily="var(--font-display), sans-serif"
              fontWeight="800"
              fontSize="18"
              letterSpacing="2"
              fill="#f2f6ff"
            >
              CINTENT
            </text>
            <text
              textAnchor="middle"
              y="14"
              fontFamily="var(--font-mono), monospace"
              fontSize="8"
              letterSpacing="3"
              fill="#35b8ff"
            >
              COGNITIVE CORE
            </text>
          </g>

          {/* six capabilities orbit */}
          {CAPABILITIES.map((cap, i) => {
            const ang = (Math.PI * 2 * i) / CAPABILITIES.length - Math.PI / 2;
            const r = 118;
            const x = Math.cos(ang) * r;
            const y = Math.sin(ang) * r;
            return (
              <g key={cap.label} transform={`translate(${x} ${y})`}>
                <circle r="5" fill="#35b8ff" />
                <circle r="14" fill="none" stroke="#5b7fc5" strokeWidth="1" className="cv-pulse" />
                <rect
                  x={-42}
                  y={y > 0 ? 12 : -30}
                  width="84"
                  height="18"
                  rx="9"
                  fill="#101a36"
                  stroke="#3b5d91"
                />
                <text
                  textAnchor="middle"
                  y={y > 0 ? 24 : -18}
                  fontFamily="var(--font-mono), monospace"
                  fontSize="9"
                  letterSpacing="1.6"
                  fill="#8edbff"
                >
                  {cap.label.toUpperCase()}
                </text>
              </g>
            );
          })}

          {/* candidate paths — one highlighted, two dashed/blocked */}
          <g>
            <path
              d="M 0 0 Q 100 -30 170 -70"
              stroke="#2bb8ff"
              strokeWidth="1.8"
              fill="none"
              opacity="0.9"
            />
            <path
              d="M 0 0 Q 90 40 165 90"
              stroke="#6e83a5"
              strokeWidth="1"
              strokeDasharray="3 4"
              fill="none"
              opacity="0.55"
            />
            <path
              d="M 0 0 Q -80 60 -160 90"
              stroke="#6e83a5"
              strokeWidth="1"
              strokeDasharray="3 4"
              fill="none"
              opacity="0.55"
            />
            {/* policy barrier */}
            <line x1="-160" y1="82" x2="-120" y2="98" stroke="#F43F5E" strokeWidth="1.4" />
            <line x1="-160" y1="98" x2="-120" y2="82" stroke="#F43F5E" strokeWidth="1.4" />
            <line x1="150" y1="82" x2="180" y2="98" stroke="#F43F5E" strokeWidth="1.4" />
            <line x1="150" y1="98" x2="180" y2="82" stroke="#F43F5E" strokeWidth="1.4" />
          </g>
        </g>

        {/* ── Phase 4: Structured decision card ── */}
        <g
          ref={(el) => (phaseRefs.current.decision = el)}
          opacity={reduced ? "1" : "0"}
          transform="translate(430 300) scale(1)"
        >
          <g transform="translate(150 -90)">
            <rect
              x="0"
              y="0"
              width="220"
              height="150"
              rx="14"
              fill="#101a36"
              stroke="#5b7fc5"
              strokeWidth="1.2"
            />
            <rect
              x="0"
              y="0"
              width="220"
              height="150"
              rx="14"
              fill="none"
              stroke="#35b8ff"
              strokeOpacity="0.15"
              filter="url(#soft-glow)"
            />
            <text
              x="14"
              y="22"
              fontFamily="var(--font-mono), monospace"
              fontSize="8"
              fill="#35b8ff"
              letterSpacing="2"
            >
              STRUCTURED DECISION
            </text>
            <text
              x="14"
              y="44"
              fontFamily="var(--font-display), sans-serif"
              fontSize="13"
              fontWeight="700"
              fill="#f2f6ff"
            >
              Approve · Path A
            </text>

            {/* metric bars */}
            <g transform="translate(14 60)">
              <text
                fontFamily="var(--font-mono), monospace"
                fontSize="7"
                fill="#7489ac"
                letterSpacing="1.2"
              >
                CONFIDENCE
              </text>
              <rect x="0" y="6" width="120" height="4" rx="2" fill="#132a55" />
              <rect x="0" y="6" width="102" height="4" rx="2" fill="#35b8ff" />
              <text
                x="128"
                y="12"
                fontFamily="var(--font-mono), monospace"
                fontSize="8"
                fill="#f2f6ff"
              >
                0.87
              </text>
            </g>
            <g transform="translate(14 80)">
              <text
                fontFamily="var(--font-mono), monospace"
                fontSize="7"
                fill="#7489ac"
                letterSpacing="1.2"
              >
                RISK
              </text>
              <rect x="0" y="6" width="120" height="4" rx="2" fill="#132a55" />
              <rect x="0" y="6" width="28" height="4" rx="2" fill="#49d7c5" />
              <text
                x="128"
                y="12"
                fontFamily="var(--font-mono), monospace"
                fontSize="8"
                fill="#f2f6ff"
              >
                LOW
              </text>
            </g>
            <g transform="translate(14 100)">
              <text
                fontFamily="var(--font-mono), monospace"
                fontSize="7"
                fill="#7489ac"
                letterSpacing="1.2"
              >
                CONSTRAINTS
              </text>
              <circle cx="4" cy="14" r="3" fill="#49d7c5" />
              <circle cx="16" cy="14" r="3" fill="#49d7c5" />
              <circle cx="28" cy="14" r="3" fill="#49d7c5" />
              <circle cx="40" cy="14" r="3" fill="#f5c451" />
              <text
                x="52"
                y="17"
                fontFamily="var(--font-mono), monospace"
                fontSize="8"
                fill="#f2f6ff"
              >
                4 EVALUATED
              </text>
            </g>
            <g transform="translate(14 128)">
              <rect x="0" y="0" width="8" height="8" rx="2" fill="#35b8ff" />
              <text
                x="14"
                y="8"
                fontFamily="var(--font-mono), monospace"
                fontSize="8"
                fill="#f2f6ff"
              >
                HUMAN APPROVAL PENDING
              </text>
            </g>
          </g>
        </g>

        {/* ── Phase 5: real-world action targets ── */}
        <g ref={(el) => (phaseRefs.current.action = el)} opacity={reduced ? "1" : "0"}>
          {SECTORS.map((s, i) => {
            const ang = (Math.PI * 2 * i) / SECTORS.length - Math.PI / 2;
            const r = 210;
            const x = 500 + Math.cos(ang) * r;
            const y = 300 + Math.sin(ang) * r;
            return (
              <g key={s.key} transform={`translate(${x} ${y})`}>
                <rect
                  x="-42"
                  y="-14"
                  width="84"
                  height="28"
                  rx="8"
                  fill="#101a36"
                  stroke="#21456f"
                />
                <circle cx="-30" cy="0" r="4" fill="#2bb8ff" />
                <text
                  x="-20"
                  y="4"
                  fontFamily="var(--font-mono), monospace"
                  fontSize="9"
                  fill="#f2f6ff"
                  letterSpacing="1.4"
                >
                  {s.label.toUpperCase()}
                </text>
              </g>
            );
          })}
        </g>

        {/* feedback loop return */}
        <g ref={(el) => (phaseRefs.current.feedback = el)} opacity={reduced ? "1" : "0"}>
          <path
            d="M 720 480 C 800 460 820 200 500 200"
            stroke="#43e0f5"
            strokeWidth="1.2"
            fill="none"
            strokeDasharray="2 5"
            className="cv-dash"
          />
          <text
            x="640"
            y="500"
            fontFamily="var(--font-mono), monospace"
            fontSize="9"
            fill="#43e0f5"
            letterSpacing="1.6"
          >
            LEARN ↻ FEEDBACK
          </text>
        </g>
      </svg>
    </div>
  );
}
