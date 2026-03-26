import { useState, useEffect, useRef, useCallback } from "react";

const SERVICES = [
  {
    icon: "🏠",
    title: "Remodelaciones",
    desc: "Transformamos tu espacio con diseños modernos y funcionales. Casas, departamentos y oficinas.",
    tags: ["Interiores", "Exteriores", "Diseño"],
  },
  {
    icon: "⚡",
    title: "Electricidad",
    desc: "Instalaciones eléctricas seguras y a norma. Tableros, circuitos, iluminación LED y automatización.",
    tags: ["Residencial", "Comercial", "Certificado"],
  },
  {
    icon: "🔧",
    title: "Gasfitería",
    desc: "Redes de agua potable, alcantarillado, calefacción y reparaciones con materiales de primera.",
    tags: ["Agua", "Gas", "Calefacción"],
  },
  {
    icon: "🏗️",
    title: "Obra Gruesa",
    desc: "Construcción de muros, radieres, fundaciones y ampliaciones con estructura sólida y durable.",
    tags: ["Ampliaciones", "Muros", "Estructura"],
  },
  {
    icon: "🎨",
    title: "Terminaciones",
    desc: "Pintura, cerámicos, pisos flotantes, molduras y todo el detalle fino que marca la diferencia.",
    tags: ["Pintura", "Pisos", "Cerámica"],
  },
  {
    icon: "🪟",
    title: "Instalaciones",
    desc: "Puertas, ventanas, closets, muebles de cocina y todo tipo de instalaciones a medida.",
    tags: ["Cocinas", "Closets", "Ventanas"],
  },
];

const PROJECTS = [
  { title: "Depto Providencia", type: "Remodelación completa", area: "85 m²", color: "#2563EB" },
  { title: "Casa Lo Barnechea", type: "Ampliación + terminaciones", area: "120 m²", color: "#2C5282" },
  { title: "Oficina Las Condes", type: "Habilitación comercial", area: "200 m²", color: "#1E3A8A" },
  { title: "Depto Ñuñoa", type: "Cocina + baños", area: "45 m²", color: "#3B82F6" },
];

const STATS = [
  { value: "150+", label: "Proyectos" },
  { value: "98%", label: "Satisfacción" },
  { value: "12", label: "Años exp." },
  { value: "24/7", label: "Soporte" },
];

function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function RevealDiv({ children, delay = 0, direction = "up", className = "", style = {} }) {
  const [ref, visible] = useScrollReveal();
  const dirs = { up: "translateY(60px)", down: "translateY(-60px)", left: "translateX(60px)", right: "translateX(-60px)", scale: "scale(0.9)" };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0) scale(1)" : dirs[direction],
        transition: `opacity 0.8s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.8s cubic-bezier(.16,1,.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hov, setHov] = useState(false);
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = () => setHov(true);
    const out = () => setHov(false);
    window.addEventListener("mousemove", move);
    document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
      el.addEventListener("mouseenter", over);
      el.addEventListener("mouseleave", out);
    });
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <>
      <div style={{
        position: "fixed", top: pos.y - 6, left: pos.x - 6, width: 12, height: 12,
        background: "#2563EB", borderRadius: "50%", pointerEvents: "none", zIndex: 9999,
        transition: "transform 0.1s", transform: hov ? "scale(2.5)" : "scale(1)", mixBlendMode: "difference",
      }} />
    </>
  );
}

function Navbar({ scrolled }) {
  const [open, setOpen] = useState(false);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? "12px 0" : "20px 0",
      background: scrolled ? "rgba(15,15,15,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(212,168,83,0.15)" : "none",
      transition: "all 0.4s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 38, height: 38, background: "linear-gradient(135deg, #2563EB, #1E40AF)",
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "#0F0F0F", fontWeight: 900, fontSize: 16 }}>P</span>
          </div>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: "#fff", letterSpacing: 3 }}>
            PRISMA <span style={{ color: "#2563EB" }}>OBRAS</span>
          </span>
        </div>

        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Servicios", "Proyectos", "Nosotros", "Contacto"].map((t) => (
            <a key={t} href={`#${t.toLowerCase()}`} data-hover style={{
              color: "rgba(255,255,255,0.7)", textDecoration: "none", fontFamily: "'DM Sans', sans-serif",
              fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase", transition: "color 0.3s",
              fontWeight: 500,
            }}
              onMouseEnter={(e) => (e.target.style.color = "#2563EB")}
              onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.7)")}
            >{t}</a>
          ))}
          <button data-hover style={{
            background: "linear-gradient(135deg, #2563EB, #1D4ED8)", color: "#0F0F0F",
            border: "none", padding: "10px 24px", fontFamily: "'DM Sans', sans-serif",
            fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase",
            cursor: "pointer", borderRadius: 2, transition: "transform 0.3s, box-shadow 0.3s",
          }}
            onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 25px rgba(212,168,83,0.4)"; }}
            onMouseLeave={(e) => { e.target.style.transform = ""; e.target.style.boxShadow = ""; }}
          >Cotizar</button>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => { setTimeout(() => setLoaded(true), 200); }, []);

  const handleMouse = useCallback((e) => {
    setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
  }, []);

  return (
    <section
      onMouseMove={handleMouse}
      style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden", background: "#0F0F0F",
      }}
    >
      {/* Animated grid */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.06,
        backgroundImage: `linear-gradient(rgba(212,168,83,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,83,0.5) 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
        transform: `translate(${(mousePos.x - 0.5) * 20}px, ${(mousePos.y - 0.5) * 20}px)`,
        transition: "transform 0.3s ease-out",
      }} />

      {/* Diagonal accent line */}
      <div style={{
        position: "absolute", top: "-20%", right: "-10%", width: "50%", height: "140%",
        background: "linear-gradient(135deg, transparent, rgba(212,168,83,0.03), rgba(212,168,83,0.08), rgba(212,168,83,0.03), transparent)",
        transform: "rotate(-15deg)",
      }} />

      {/* Floating geometric shapes */}
      {[
        { size: 200, top: "15%", left: "8%", delay: "0s", dur: "20s" },
        { size: 150, top: "60%", right: "5%", delay: "5s", dur: "25s" },
        { size: 100, bottom: "10%", left: "15%", delay: "10s", dur: "18s" },
      ].map((s, i) => (
        <div key={i} style={{
          position: "absolute", width: s.size, height: s.size, ...s,
          border: "1px solid rgba(212,168,83,0.08)", borderRadius: i === 1 ? "50%" : 0,
          animation: `floatShape ${s.dur} ease-in-out ${s.delay} infinite alternate`,
        }} />
      ))}

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 900, padding: "0 24px" }}>
        <div style={{
          overflow: "hidden", marginBottom: 16,
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(.16,1,.3,1) 0.3s",
        }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 13, letterSpacing: 4,
            color: "#2563EB", textTransform: "uppercase", fontWeight: 500,
            display: "inline-flex", alignItems: "center", gap: 12,
          }}>
            <span style={{ width: 40, height: 1, background: "#2563EB", display: "inline-block" }} />
            Construcción & Remodelación
            <span style={{ width: 40, height: 1, background: "#2563EB", display: "inline-block" }} />
          </span>
        </div>

        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(52px, 10vw, 120px)",
          color: "#FAFAFA", lineHeight: 0.95, margin: "0 0 24px", letterSpacing: 2,
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(40px)",
          transition: "all 1s cubic-bezier(.16,1,.3,1) 0.5s",
        }}>
          HACEMOS{" "}
          <span style={{
            background: "linear-gradient(135deg, #2563EB, #60A5FA, #2563EB)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>REALIDAD</span>
          <br />TU PROYECTO
        </h1>

        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: "rgba(255,255,255,0.55)",
          maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.7, fontWeight: 300,
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(.16,1,.3,1) 0.8s",
        }}>
          Remodelaciones integrales, instalaciones eléctricas,
          gasfitería y terminaciones con estándar profesional.
        </p>

        <div style={{
          display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(.16,1,.3,1) 1s",
        }}>
          <button data-hover style={{
            background: "linear-gradient(135deg, #2563EB, #1D4ED8)", color: "#0F0F0F",
            border: "none", padding: "16px 40px", fontFamily: "'DM Sans', sans-serif",
            fontSize: 14, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase",
            cursor: "pointer", borderRadius: 2, transition: "all 0.4s",
            boxShadow: "0 4px 30px rgba(212,168,83,0.3)",
          }}
            onMouseEnter={(e) => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = "0 12px 40px rgba(212,168,83,0.5)"; }}
            onMouseLeave={(e) => { e.target.style.transform = ""; e.target.style.boxShadow = "0 4px 30px rgba(212,168,83,0.3)"; }}
          >Solicitar Cotización</button>

          <button data-hover style={{
            background: "transparent", color: "#FAFAFA",
            border: "1px solid rgba(255,255,255,0.2)", padding: "16px 40px",
            fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500,
            letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer",
            borderRadius: 2, transition: "all 0.4s",
          }}
            onMouseEnter={(e) => { e.target.style.borderColor = "#2563EB"; e.target.style.color = "#2563EB"; }}
            onMouseLeave={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.2)"; e.target.style.color = "#FAFAFA"; }}
          >Ver Proyectos</button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        opacity: loaded ? 0.5 : 0, transition: "opacity 1.5s ease 1.5s",
      }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: 3, color: "#2563EB", textTransform: "uppercase" }}>Scroll</span>
        <div style={{
          width: 1, height: 40, background: "linear-gradient(to bottom, #2563EB, transparent)",
          animation: "scrollPulse 2s ease-in-out infinite",
        }} />
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section style={{ background: "#0A0A0A", padding: "60px 24px", borderTop: "1px solid rgba(212,168,83,0.1)", borderBottom: "1px solid rgba(212,168,83,0.1)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
        {STATS.map((s, i) => (
          <RevealDiv key={i} delay={i * 0.1} style={{ textAlign: "center" }}>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, color: "#2563EB",
              lineHeight: 1, marginBottom: 4,
            }}>{s.value}</div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)",
              letterSpacing: 3, textTransform: "uppercase",
            }}>{s.label}</div>
          </RevealDiv>
        ))}
      </div>
    </section>
  );
}

function Services() {
  const [active, setActive] = useState(null);
  return (
    <section id="servicios" style={{ background: "#0F0F0F", padding: "120px 24px", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: 1, height: 80, background: "linear-gradient(to bottom, rgba(212,168,83,0.3), transparent)",
      }} />
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <RevealDiv>
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: 4,
            color: "#2563EB", textTransform: "uppercase", fontWeight: 500,
          }}>Lo que hacemos</span>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 6vw, 72px)",
            color: "#FAFAFA", margin: "12px 0 60px", letterSpacing: 2, lineHeight: 1,
          }}>NUESTROS SERVICIOS</h2>
        </RevealDiv>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {SERVICES.map((s, i) => (
            <RevealDiv key={i} delay={i * 0.08}>
              <div
                data-hover
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                style={{
                  background: active === i ? "rgba(212,168,83,0.06)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${active === i ? "rgba(212,168,83,0.3)" : "rgba(255,255,255,0.06)"}`,
                  borderRadius: 4, padding: 36, cursor: "pointer",
                  transition: "all 0.5s cubic-bezier(.16,1,.3,1)",
                  transform: active === i ? "translateY(-4px)" : "translateY(0)",
                  position: "relative", overflow: "hidden",
                }}
              >
                <div style={{
                  position: "absolute", top: -40, right: -40, width: 120, height: 120,
                  background: "radial-gradient(circle, rgba(212,168,83,0.08), transparent)",
                  opacity: active === i ? 1 : 0, transition: "opacity 0.5s",
                }} />
                <div style={{ fontSize: 36, marginBottom: 16 }}>{s.icon}</div>
                <h3 style={{
                  fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, color: "#FAFAFA",
                  letterSpacing: 2, margin: "0 0 12px",
                }}>{s.title}</h3>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.7, margin: "0 0 20px",
                }}>{s.desc}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {s.tags.map((t) => (
                    <span key={t} style={{
                      fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#2563EB",
                      border: "1px solid rgba(212,168,83,0.2)", padding: "4px 12px", borderRadius: 2,
                      letterSpacing: 1, textTransform: "uppercase",
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </RevealDiv>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [hov, setHov] = useState(null);
  return (
    <section id="proyectos" style={{ background: "#0A0A0A", padding: "120px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <RevealDiv>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 60, flexWrap: "wrap", gap: 20 }}>
            <div>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: 4, color: "#2563EB", textTransform: "uppercase", fontWeight: 500 }}>
                Portfolio
              </span>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 6vw, 72px)",
                color: "#FAFAFA", margin: "12px 0 0", letterSpacing: 2, lineHeight: 1,
              }}>PROYECTOS RECIENTES</h2>
            </div>
            <button data-hover style={{
              background: "transparent", border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.6)", padding: "12px 28px",
              fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: 2,
              textTransform: "uppercase", cursor: "pointer", borderRadius: 2,
              transition: "all 0.3s",
            }}
              onMouseEnter={(e) => { e.target.style.borderColor = "#2563EB"; e.target.style.color = "#2563EB"; }}
              onMouseLeave={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.15)"; e.target.style.color = "rgba(255,255,255,0.6)"; }}
            >Ver Todos →</button>
          </div>
        </RevealDiv>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {PROJECTS.map((p, i) => (
            <RevealDiv key={i} delay={i * 0.1}>
              <div
                data-hover
                onMouseEnter={() => setHov(i)}
                onMouseLeave={() => setHov(null)}
                style={{
                  position: "relative", aspectRatio: "16/10", borderRadius: 4,
                  overflow: "hidden", cursor: "pointer",
                  background: `linear-gradient(135deg, ${p.color}22, ${p.color}08)`,
                  border: `1px solid ${hov === i ? p.color + "44" : "rgba(255,255,255,0.04)"}`,
                  transition: "all 0.5s cubic-bezier(.16,1,.3,1)",
                  transform: hov === i ? "scale(1.01)" : "scale(1)",
                }}
              >
                {/* Abstract pattern */}
                <div style={{
                  position: "absolute", inset: 0, opacity: 0.15,
                  backgroundImage: `
                    linear-gradient(45deg, ${p.color}33 25%, transparent 25%),
                    linear-gradient(-45deg, ${p.color}33 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, ${p.color}33 75%),
                    linear-gradient(-45deg, transparent 75%, ${p.color}33 75%)
                  `,
                  backgroundSize: "40px 40px",
                  backgroundPosition: "0 0, 0 20px, 20px -20px, -20px 0px",
                  transform: hov === i ? "scale(1.1)" : "scale(1)",
                  transition: "transform 0.8s ease",
                }} />

                {/* Large number */}
                <div style={{
                  position: "absolute", top: -20, right: 20,
                  fontFamily: "'Bebas Neue', sans-serif", fontSize: 160, color: p.color,
                  opacity: 0.08, lineHeight: 1,
                }}>0{i + 1}</div>

                {/* Content */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, padding: 32,
                  background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
                }}>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: p.color,
                    letterSpacing: 3, textTransform: "uppercase", marginBottom: 8, fontWeight: 500,
                  }}>{p.type}</div>
                  <h3 style={{
                    fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: "#FAFAFA",
                    letterSpacing: 2, margin: 0, lineHeight: 1,
                  }}>{p.title}</h3>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)",
                    marginTop: 8, display: "inline-block",
                  }}>{p.area}</span>
                </div>

                {/* Hover arrow */}
                <div style={{
                  position: "absolute", top: 24, right: 24,
                  width: 44, height: 44, borderRadius: "50%",
                  background: hov === i ? p.color : "transparent",
                  border: `1px solid ${hov === i ? p.color : "rgba(255,255,255,0.1)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.4s cubic-bezier(.16,1,.3,1)",
                  transform: hov === i ? "scale(1) rotate(0deg)" : "scale(0.9) rotate(-45deg)",
                }}>
                  <span style={{
                    fontSize: 18, color: hov === i ? "#0F0F0F" : "rgba(255,255,255,0.3)",
                    transition: "color 0.3s",
                  }}>→</span>
                </div>
              </div>
            </RevealDiv>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { n: "01", title: "Contacto", desc: "Cuéntanos tu proyecto y agendamos una visita técnica sin costo." },
    { n: "02", title: "Diagnóstico", desc: "Evaluamos el espacio, tomamos medidas y definimos alcances." },
    { n: "03", title: "Cotización", desc: "Presupuesto detallado, transparente y sin sorpresas." },
    { n: "04", title: "Ejecución", desc: "Manos a la obra con plazos claros y supervisión permanente." },
  ];
  return (
    <section id="nosotros" style={{ background: "#0F0F0F", padding: "120px 24px", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <RevealDiv>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: 4, color: "#2563EB", textTransform: "uppercase", fontWeight: 500 }}>
            Cómo trabajamos
          </span>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 6vw, 72px)",
            color: "#FAFAFA", margin: "12px 0 60px", letterSpacing: 2, lineHeight: 1,
          }}>PROCESO SIMPLE</h2>
        </RevealDiv>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, position: "relative" }}>
          {/* Connecting line */}
          <div style={{
            position: "absolute", top: 32, left: "12.5%", right: "12.5%", height: 1,
            background: "linear-gradient(to right, transparent, rgba(212,168,83,0.2), rgba(212,168,83,0.2), transparent)",
          }} />

          {steps.map((s, i) => (
            <RevealDiv key={i} delay={i * 0.15} style={{ textAlign: "center", position: "relative" }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                border: "2px solid rgba(212,168,83,0.3)",
                background: "#0F0F0F",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 24px", position: "relative", zIndex: 2,
              }}>
                <span style={{
                  fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: "#2563EB",
                }}>{s.n}</span>
              </div>
              <h3 style={{
                fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: "#FAFAFA",
                letterSpacing: 2, margin: "0 0 8px",
              }}>{s.title}</h3>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)",
                lineHeight: 1.7, padding: "0 12px",
              }}>{s.desc}</p>
            </RevealDiv>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contacto" style={{ background: "#0A0A0A", padding: "120px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 50%, rgba(212,168,83,0.08), transparent 70%)",
      }} />
      <div style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 2, textAlign: "center" }}>
        <RevealDiv>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: 4, color: "#2563EB", textTransform: "uppercase", fontWeight: 500 }}>
            Empecemos
          </span>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 6vw, 64px)",
            color: "#FAFAFA", margin: "12px 0 20px", letterSpacing: 2, lineHeight: 1,
          }}>¿TIENES UN PROYECTO<br />EN MENTE?</h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.45)",
            lineHeight: 1.7, marginBottom: 40,
          }}>
            Conversemos sobre tu próxima remodelación. Visita técnica y cotización sin compromiso.
          </p>
        </RevealDiv>

        <RevealDiv delay={0.2}>
          <div style={{ display: "flex", gap: 12, maxWidth: 500, margin: "0 auto" }}>
            <input
              type="email"
              placeholder="Tu correo electrónico"
              style={{
                flex: 1, padding: "16px 20px", background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)", color: "#FAFAFA",
                fontFamily: "'DM Sans', sans-serif", fontSize: 14, borderRadius: 2,
                outline: "none", transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(212,168,83,0.4)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
            />
            <button data-hover style={{
              background: "linear-gradient(135deg, #2563EB, #1D4ED8)", color: "#0F0F0F",
              border: "none", padding: "16px 32px", fontFamily: "'DM Sans', sans-serif",
              fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase",
              cursor: "pointer", borderRadius: 2, whiteSpace: "nowrap",
              transition: "all 0.3s",
            }}
              onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 25px rgba(212,168,83,0.4)"; }}
              onMouseLeave={(e) => { e.target.style.transform = ""; e.target.style.boxShadow = ""; }}
            >Enviar</button>
          </div>
        </RevealDiv>

        <RevealDiv delay={0.35}>
          <div style={{
            display: "flex", justifyContent: "center", gap: 48, marginTop: 60,
            flexWrap: "wrap",
          }}>
            {[
              { label: "WhatsApp", value: "+56 9 XXXX XXXX" },
              { label: "Email", value: "contacto@prismaobras.cl" },
              { label: "Santiago", value: "Región Metropolitana" },
            ].map((c) => (
              <div key={c.label}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#2563EB", letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>
                  {c.label}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.6)" }}>
                  {c.value}
                </div>
              </div>
            ))}
          </div>
        </RevealDiv>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      background: "#0F0F0F", padding: "40px 24px",
      borderTop: "1px solid rgba(212,168,83,0.1)",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", display: "flex",
        justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16,
      }}>
        <span style={{
          fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: "rgba(255,255,255,0.3)",
          letterSpacing: 3,
        }}>
          PRISMA <span style={{ color: "rgba(212,168,83,0.5)" }}>OBRAS</span>
        </span>
        <span style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.2)",
          letterSpacing: 1,
        }}>
          © 2026 Prisma Obras SpA — Todos los derechos reservados
        </span>
      </div>
    </footer>
  );
}

export default function PrismaObras() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0F0F0F; overflow-x: hidden; }
        ::selection { background: rgba(212,168,83,0.3); color: #FAFAFA; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0A0A0A; }
        ::-webkit-scrollbar-thumb { background: rgba(212,168,83,0.3); border-radius: 3px; }

        @keyframes floatShape {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-30px) rotate(5deg); }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.3); }
        }

        @media (max-width: 768px) {
          nav > div > div:last-child a { display: none !important; }
          section > div > div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
          section > div > div[style*="grid-template-columns: repeat(2"] { grid-template-columns: 1fr !important; }
          section > div > div[style*="grid-template-columns: repeat(4"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
      <Cursor />
      <Navbar scrolled={scrolled} />
      <Hero />
      <Stats />
      <Services />
      <Projects />
      <Process />
      <CTA />
      <Footer />
    </>
  );
}
