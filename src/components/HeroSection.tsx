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
import WaterRippleCanvas from "@/components/WaterRippleCanvas";

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
export function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
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

  const gridY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "28%"]), { stiffness: 50, damping: 18 });
  const charY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "12%"]), { stiffness: 60, damping: 20 });
  const contentY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "18%"]), { stiffness: 75, damping: 22 });
  const fadeOut = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.07], [1, 0]);

  const mag1 = useMagnetic(0.38);
  const mag2 = useMagnetic(0.38);

  const stats = [
    { target: 200, suffix: "+", label: "Subscribers" },
    { target: 500, suffix: "k+", label: "Total Views" },
    { target: 50, suffix: "+", label: "Videos Made" },
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
        overflow: "clip",
        backgroundColor: "#161616ff",
      }}
    >
      {/* ── z0: Dot grid ── */}
      <motion.div
        aria-hidden
        style={{
          y: gridY,
          position: "absolute",
          inset: "-20%",
          backgroundImage: "radial-gradient(circle, rgba(232,197,71,0.22) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── z1: WebGL water ripple (transparent gold overlay) ── */}
      <WaterRippleCanvas />

      {/* ── z1: mn.png character — right side ── */}
      <motion.div
        className="hero-char"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          height: "100vh",
          width: "clamp(280px, 45vw, 680px)",
          zIndex: 1,
          /* gradient mask: fades left edge into transparent */
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 28%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 28%)",
        }}
      >
        <motion.img
          src="/mn.png"
          alt="Sanu Siril"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.04, filter: "brightness(1.1) drop-shadow(0px 10px 30px rgba(232,197,71,0.2))" }}
          whileTap={{ scale: 0.98 }}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "contain",
            objectPosition: "bottom right",
            display: "block",
            userSelect: "none",
            WebkitUserDrag: "none",
            cursor: "pointer",
            originY: 1, // scale from the bottom so feet stay planted
          } as any}
        />
      </motion.div>

      {/* ── z2: Edge vignettes (left & top) ── */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2,
        background: "linear-gradient(to right, rgba(8,8,8,0.5) 0%, transparent 45%)",
      }} />
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "200px",
        background: "linear-gradient(to bottom, rgba(8,8,8,0.6), transparent)",
        pointerEvents: "none", zIndex: 2,
      }} />
      <div aria-hidden style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "250px",
        background: "linear-gradient(to top, rgba(8,8,8,0.9), transparent)",
        pointerEvents: "none", zIndex: 2,
      }} />

      {/* ── MAIN CONTENT ── */}
      <motion.div
        className="hero-content-wrapper"
        style={{ y: contentY, opacity: fadeOut, width: "100%", position: "relative", zIndex: 2 }}
      >
        <div className="site-container hero-site-container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}
            className="hero-main-content"
          >
            {/* Label pill removed per user request, empty div preserves animation stagger index */}
            <motion.div variants={fadeUp} style={{ display: "none" }} />

            {/* ── MEGA HEADLINE — full width ── */}
            <div aria-label="Crafting Bold Stories" style={{ display: "flex", flexDirection: "column", marginTop: "3.5rem" }}>
              <div style={{ overflow: "hidden" }}>
                <motion.span variants={lineVariants} className="text-mega" style={{
                  fontFamily: "var(--font-antonio), sans-serif",
                  fontWeight: 900, color: "#ffffff",
                  textTransform: "uppercase", display: "block",
                }}>
                  SIRIL
                </motion.span>
              </div>
              <div style={{ overflow: "hidden", paddingBottom: "4.5rem" }}>
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
              className="hero-buttons-row"
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "2rem",
              }}
            >
              {/* Body copy restored with punchy text */}
              <p style={{
                color: "#a8a8a8",
                fontFamily: "var(--font-dm-mono), monospace",
                fontSize: "clamp(10px, 1.8vw, 12px)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                lineHeight: 1.75,
                maxWidth: "20rem",
                margin: 0,
                flex: "1 1 260px",
              }}>
                Capturing raw moments, cinematic stories, and the beauty of the unknown.
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

            {/* ── STATS — hidden on mobile, shown on sm+ ── */}
            <motion.div variants={fadeUp} className="hero-stats hidden sm:block">
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
        className="scroll-hint"
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
