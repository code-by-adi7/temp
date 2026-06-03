"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FloatingElements() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Defines a list of abstract floating shapes to scatter in the background
  const elements = [
    { type: "circle", size: 120, x: "15%", y: "5%", duration: 15, delay: 0 },
    { type: "plus", size: 40, x: "85%", y: "8%", duration: 20, delay: 2 },
    { type: "triangle", size: 55, x: "35%", y: "15%", duration: 18, delay: 1.2 },
    { type: "crosshair", size: 90, x: "50%", y: "25%", duration: 22, delay: 0.5 },
    { type: "square", size: 60, x: "10%", y: "30%", duration: 25, delay: 3 },
    { type: "plus", size: 25, x: "65%", y: "38%", duration: 16, delay: 2.8 },
    { type: "circle", size: 80, x: "75%", y: "45%", duration: 18, delay: 1 },
    { type: "triangle", size: 70, x: "85%", y: "52%", duration: 20, delay: 1.5 },
    { type: "plus", size: 30, x: "20%", y: "55%", duration: 12, delay: 4 },
    { type: "crosshair", size: 110, x: "80%", y: "65%", duration: 24, delay: 2.5 },
    { type: "circle", size: 45, x: "5%", y: "68%", duration: 15, delay: 0.2 },
    { type: "square", size: 45, x: "40%", y: "75%", duration: 16, delay: 1.5 },
    { type: "triangle", size: 60, x: "60%", y: "82%", duration: 19, delay: 3.1 },
    { type: "circle", size: 95, x: "15%", y: "85%", duration: 21, delay: 3.5 },
    { type: "crosshair", size: 50, x: "35%", y: "90%", duration: 14, delay: 1.1 },
    { type: "plus", size: 50, x: "90%", y: "92%", duration: 19, delay: 0.8 },
    { type: "square", size: 35, x: "60%", y: "96%", duration: 14, delay: 2.2 },
    { type: "circle", size: 70, x: "25%", y: "98%", duration: 18, delay: 0.5 },
  ];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 5, /* Behind the content, but above the main background */
        overflow: "hidden",
      }}
    >
      {elements.map((el, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            y: [-20, 20, -20],
            rotate: [0, 90, 180, 360],
          }}
          transition={{
            opacity: { duration: el.duration * 0.8, repeat: Infinity, ease: "easeInOut" },
            y: { duration: el.duration, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: el.duration * 1.5, repeat: Infinity, ease: "linear" },
            delay: el.delay,
          }}
          style={{
            position: "absolute",
            left: el.x,
            top: el.y,
            width: el.size,
            height: el.size,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(232, 197, 71, 0.4)", /* increased gold opacity */
          }}
        >
          {el.type === "circle" && (
            <div style={{ width: "100%", height: "100%", borderRadius: "50%", border: "1px solid currentColor" }} />
          )}
          {el.type === "square" && (
            <div style={{ width: "100%", height: "100%", border: "1px solid currentColor" }} />
          )}
          {el.type === "plus" && (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          )}
          {el.type === "crosshair" && (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" style={{ width: "100%", height: "100%" }}>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="2" x2="12" y2="22"></line>
              <line x1="2" y1="12" x2="22" y2="12"></line>
            </svg>
          )}
          {el.type === "triangle" && (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
              <polygon points="12 4 4 20 20 20"></polygon>
            </svg>
          )}
        </motion.div>
      ))}

      {/* Adding some large blurred glowing orbs */}
      <motion.div
        animate={{
          x: ["0%", "5%", "-5%", "0%"],
          y: ["0%", "10%", "-10%", "0%"],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "10%",
          left: "-10%",
          width: "40vw",
          height: "40vw",
          background: "radial-gradient(circle, rgba(232,197,71,0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
          borderRadius: "50%",
        }}
      />
      
      <motion.div
        animate={{
          x: ["0%", "-10%", "5%", "0%"],
          y: ["0%", "-5%", "15%", "0%"],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        style={{
          position: "absolute",
          bottom: "10%",
          right: "-10%",
          width: "50vw",
          height: "50vw",
          background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
          borderRadius: "50%",
        }}
      />

      <motion.div
        animate={{
          x: ["0%", "8%", "-8%", "0%"],
          y: ["0%", "-10%", "5%", "0%"],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{
          position: "absolute",
          top: "45%",
          left: "20%",
          width: "35vw",
          height: "35vw",
          background: "radial-gradient(circle, rgba(232,197,71,0.12) 0%, transparent 70%)",
          filter: "blur(70px)",
          borderRadius: "50%",
        }}
      />
    </div>
  );
}
