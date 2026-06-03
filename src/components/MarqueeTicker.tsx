"use client";

import { motion } from "framer-motion";

export default function MarqueeTicker() {
  const text =
    "TRAVEL VLOGGER • FOOD • LIFESTYLE • STORYTELLER • CINEMATIC VLOGS • VISUAL STORIES • ";
  const repeated = Array(10).fill(text).join("");

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#e8c547",
        overflow: "hidden",
        height: "2.5rem",
        display: "flex",
        alignItems: "center",
        borderTop: "1px solid #c9a930",
        borderBottom: "1px solid #c9a930",
      }}
    >
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          willChange: "transform",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-antonio), sans-serif",
            fontSize: "11px",
            letterSpacing: "0.15em",
            color: "#080808",
            textTransform: "uppercase",
          }}
        >
          {repeated}
        </span>
        <span
          aria-hidden="true"
          style={{
            fontFamily: "var(--font-antonio), sans-serif",
            fontSize: "11px",
            letterSpacing: "0.15em",
            color: "#080808",
            textTransform: "uppercase",
          }}
        >
          {repeated}
        </span>
      </motion.div>
    </div>
  );
}

