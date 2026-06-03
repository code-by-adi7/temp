"use client";

import { motion } from "framer-motion";

export default function WelcomeScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
      onClick={onEnter}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#080808",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        overflow: "hidden",
      }}
    >
      {/* Click Anywhere hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{
          position: "absolute",
          top: "clamp(2rem, 5vh, 4rem)",
          fontFamily: "var(--font-dm-mono), monospace",
          fontSize: "11px",
          letterSpacing: "0.2em",
          color: "rgba(255, 255, 255, 0.4)",
          textTransform: "uppercase",
        }}
      >
        Click anywhere to enter
      </motion.div>

      {/* Centered Mega Text */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <div style={{ overflow: "hidden" }}>
          <motion.span
            initial={{ opacity: 0, y: 80, skewY: 3 }}
            animate={{ opacity: 1, y: 0, skewY: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-mega"
            style={{
              fontFamily: "var(--font-antonio), sans-serif",
              fontWeight: 900,
              color: "#ffffff",
              textTransform: "uppercase",
              display: "block",
              lineHeight: 1,
            }}
          >
            SIRIL
          </motion.span>
        </div>
        <div style={{ overflow: "hidden" }}>
          <motion.span
            initial={{ opacity: 0, y: 80, skewY: 3 }}
            animate={{ opacity: 1, y: 0, skewY: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-mega"
            style={{
              fontFamily: "var(--font-antonio), sans-serif",
              fontWeight: 900,
              textTransform: "uppercase",
              display: "block",
              WebkitTextStroke: "1.5px #ffffff",
              color: "transparent",
              lineHeight: 1,
              paddingBottom: "1.5rem",
            }}
          >
            VLOGS
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
