"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { Play, ArrowRight } from "lucide-react";

/* ─── Stagger variants ─── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } },
};
const lineVariants = {
  hidden: { opacity: 0, y: 80, skewY: 3 },
  visible: {
    opacity: 1, y: 0, skewY: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

/* ─── Animated counter ─── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    // Start immediately if already in view (threshold: 0)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let elapsed = 0;
          const duration = 1400;
          const tick = () => {
            elapsed += 16;
            const prog = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - prog, 3);
            setCount(Math.floor(eased * target));
            if (prog < 1) requestAnimationFrame(tick);
            else setCount(target);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0, rootMargin: "0px" }
    );
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={nodeRef}>{count}{suffix}</span>;
}

/* ─── Magnetic hook ─── */
function useMagnetic(strength = 0.35) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      x.set((e.clientX - rect.left - rect.width / 2) * strength);
      y.set((e.clientY - rect.top - rect.height / 2) * strength);
    };
    const onLeave = () => { x.set(0); y.set(0); };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, [x, y, strength]);

  return { ref, x, y };
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  /* ─── Parallax scroll ─── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const blobY1   = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "55%"]), { stiffness: 55, damping: 18 });
  const blobY2   = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "38%"]), { stiffness: 55, damping: 18 });
  const contentY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "18%"]), { stiffness: 75, damping: 22 });
  const gridY    = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "28%"]), { stiffness: 50, damping: 18 });
  const fadeOut  = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.07], [1, 0]);

  const mag1 = useMagnetic(0.38);
  const mag2 = useMagnetic(0.38);

  const stats = [
    { target: 200, suffix: "+", label: "Subscribers" },
    { target: 500,   suffix: "k+", label: "Total Views"  },
    { target: 50, suffix: "+",  label: "Videos Made"  },
  ];

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "12rem",
        paddingBottom: "6rem",
        overflow: "hidden",
        backgroundColor: "#080808",
      }}
    >
      {/* ── Dot grid background ── */}
      <motion.div
        style={{
          y: gridY,
          position: "absolute",
          inset: "-20%",
          backgroundImage: "radial-gradient(circle, rgba(181, 192, 155, 0.26) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Blob 1 — top right ── */}
      <motion.div style={{
        y: blobY1,
        position: "absolute", top: "-10%", right: "-5%",
        width: "clamp(400px, 55vw, 800px)", height: "clamp(400px, 55vw, 800px)",
        borderRadius: "50%",
        background: "radial-gradient(circle at 40% 40%, rgba(232,197,71,0.13), transparent 70%)",
        filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
      }} />

      {/* ── Blob 2 — bottom left ── */}
      <motion.div style={{
        y: blobY2,
        position: "absolute", bottom: "0%", left: "-8%",
        width: "clamp(300px, 40vw, 560px)", height: "clamp(300px, 40vw, 560px)",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(232,197,71,0.07), transparent 65%)",
        filter: "blur(100px)", pointerEvents: "none", zIndex: 0,
      }} />

      {/* ── Pulsing center glow ── */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.25, 0.75, 0.25] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", top: "40%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: "clamp(300px, 60vw, 700px)", height: "clamp(150px, 25vw, 320px)",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(232,197,71,0.05), transparent 70%)",
          filter: "blur(60px)", pointerEvents: "none", zIndex: 0,
        }}
      />

      {/* ── MAIN CONTENT ── */}
      <motion.div
        style={{ y: contentY, opacity: fadeOut, width: "100%", position: "relative", zIndex: 1 }}
      >
        <div className="site-container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}
          >
            {/* Label pill */}
            <motion.div variants={fadeUp}>
              <motion.div
                whileHover={{ scale: 1.05, borderColor: "#e8c547" }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  border: "1px solid #2a2a2a", borderRadius: "9999px",
                  padding: "0.4rem 1rem",
                  backgroundColor: "rgba(232,197,71,0.06)",
                  cursor: "default", transition: "border-color 0.3s",
                }}
              >
                <motion.div
                  animate={{ rotate: [0, 18, -18, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                >
                
                </motion.div>
                <span style={{
                  fontFamily: "var(--font-dm-mono), monospace",
                  fontSize: "clamp(8px, 1.5vw, 10px)",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase", color: "#e8c547",
                }}>
                 
                </span>
              </motion.div>
            </motion.div>

            {/* ── MEGA HEADLINE — full width ── */}
            <div aria-label="Crafting Bold Stories" style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ overflow: "hidden" }}>
                <motion.span variants={lineVariants} className="text-mega" style={{
                  fontFamily: "var(--font-antonio), sans-serif",
                  fontWeight: 900, color: "#ffffff",
                  textTransform: "uppercase", display: "block",
                }}>
                  SIRIL
                </motion.span>
              </div>
              <div style={{ overflow: "hidden" }}>
                <motion.span variants={lineVariants} className="text-mega" style={{
                  fontFamily: "var(--font-antonio), sans-serif",
                  fontWeight: 900, textTransform: "uppercase",
                  display: "block",
                  WebkitTextStroke: "1.5px #ffffff",
                  color: "transparent",
                }}>
                  VLOGS
                </motion.span>
              </div>
              <div style={{ overflow: "hidden" }}>
                <motion.span variants={lineVariants} className="text-mega" style={{
                  fontFamily: "var(--font-antonio), sans-serif",
                  fontWeight: 700, color: "#e8c547",
                  textTransform: "uppercase", display: "block",
                }}>
                
                </motion.span>
              </div>
            </div>

            {/* ── BODY + BUTTONS row ── */}
            <motion.div
              variants={fadeUp}
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "2rem",
              }}
            >
              {/* Body copy */}
              <p style={{
                color: "#a8a8a8",
                fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)",
                lineHeight: 1.75,
                maxWidth: "32rem",
                margin: 0,
                flex: "1 1 260px",
              }}>
                Real moments. Raw emotions. Cinematic frames.
                Every video is a chapter — and you&apos;re invited to be
                part of the journey. Join 100K+ viewers already on board.
              </p>

              {/* CTA Buttons */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", flex: "0 0 auto" }}>
                <motion.a
                  ref={mag1.ref}
                  href="#videos"
                  style={{
                    x: mag1.x, y: mag1.y,
                    display: "flex", alignItems: "center", gap: "0.625rem",
                    backgroundColor: "#e8c547", color: "#080808",
                    fontFamily: "var(--font-dm-mono), monospace",
                    fontSize: "clamp(9px, 1.5vw, 11px)",
                    letterSpacing: "0.15em", textTransform: "uppercase",
                    padding: "clamp(0.75rem, 1.5vw, 1rem) clamp(1.25rem, 2.5vw, 1.875rem)",
                    borderRadius: "9999px", fontWeight: 600, textDecoration: "none",
                  }}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 32px rgba(232,197,71,0.45)" }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Play size={13} fill="#080808" color="#080808" />
                  Watch Latest
                </motion.a>

                <motion.a
                  ref={mag2.ref}
                  href="https://youtube.com/@sanusiril"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    x: mag2.x, y: mag2.y,
                    display: "flex", alignItems: "center", gap: "0.5rem",
                    border: "1px solid #2a2a2a", color: "#f0f0f0",
                    fontFamily: "var(--font-dm-mono), monospace",
                    fontSize: "clamp(9px, 1.5vw, 11px)",
                    letterSpacing: "0.15em", textTransform: "uppercase",
                    padding: "clamp(0.75rem, 1.5vw, 1rem) clamp(1.25rem, 2.5vw, 1.875rem)",
                    borderRadius: "9999px", textDecoration: "none",
                    transition: "border-color 0.2s, color 0.2s",
                  }}
                  whileHover={{ borderColor: "#e8c547", color: "#ffffff", scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                >
                  My Channel <ArrowRight size={13} />
                </motion.a>
              </div>
            </motion.div>

            {/* ── STATS — BIG NUMBERS ── */}
            <motion.div variants={fadeUp}>
              {/* Divider */}
              <div style={{ width: "100%", height: "1px", backgroundColor: "#1f1f1f", marginBottom: "2.5rem" }} />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "clamp(1rem, 4vw, 3rem)",
                }}
                className="hero-stats-grid"
              >
                {stats.map(({ target, suffix, label }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -6 }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.4rem",
                      cursor: "default",
                      paddingRight: i < 2 ? "clamp(1rem, 4vw, 3rem)" : 0,
                      borderRight: i < 2 ? "1px solid #1f1f1f" : "none",
                    }}
                  >
                    {/* Big number */}
                    <span
                      style={{
                        fontFamily: "var(--font-antonio), sans-serif",
                        fontSize: "clamp(3.5rem, 8vw, 7rem)",
                        fontWeight: 700,
                        color: "#ffffff",
                        lineHeight: 1,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      <Counter target={target} suffix={suffix} />
                    </span>
                    {/* Label */}
                    <span
                      style={{
                        fontFamily: "var(--font-dm-mono), monospace",
                        fontSize: "clamp(9px, 1.2vw, 11px)",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#6b6b6b",
                      }}
                    >
                      {label}
                    </span>
                    {/* Accent underline */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "2.5rem" }}
                      transition={{ delay: 1.2 + i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      style={{ height: "2px", backgroundColor: "#e8c547", borderRadius: "1px" }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll hint ── */}
      <motion.div
        style={{
          opacity: scrollHintOpacity,
          position: "absolute", bottom: "2rem", left: "50%",
          translateX: "-50%",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
          zIndex: 2,
        }}
      >
        <span style={{
          fontFamily: "var(--font-dm-mono), monospace",
          fontSize: "9px", letterSpacing: "0.25em",
          textTransform: "uppercase", color: "#3a3a3a",
        }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: "1px", height: "36px", background: "linear-gradient(to bottom, #3a3a3a, transparent)" }}
        />
      </motion.div>

      {/* ── Bottom border ── */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", backgroundColor: "#1f1f1f" }} />
    </section>
  );
}
