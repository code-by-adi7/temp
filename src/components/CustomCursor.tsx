"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 28 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only show on non-touch desktop
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
    };
    const onDown  = () => setClicking(true);
    const onUp    = () => setClicking(false);
    const onLeave = () => setVisible(false);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup",   onUp);
    document.addEventListener("mouseleave", onLeave);

    // Hide native cursor
    document.documentElement.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup",   onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.style.cursor = "";
    };
  }, [mouseX, mouseY]);

  if (!visible) return null;

  return (
    <>
      {/* Focus Brackets Container */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          position: "fixed",
          top: 0,
          left: 0,
          width: "48px",
          height: "48px",
          pointerEvents: "none",
          zIndex: 9998,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
        animate={{ 
          scale: clicking ? 0.75 : 1,
          rotate: clicking ? 90 : 0
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Top Left */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "12px", height: "12px", borderTop: "2px solid #e8c547", borderLeft: "2px solid #e8c547" }} />
        {/* Top Right */}
        <div style={{ position: "absolute", top: 0, right: 0, width: "12px", height: "12px", borderTop: "2px solid #e8c547", borderRight: "2px solid #e8c547" }} />
        {/* Bottom Left */}
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "12px", height: "12px", borderBottom: "2px solid #e8c547", borderLeft: "2px solid #e8c547" }} />
        {/* Bottom Right */}
        <div style={{ position: "absolute", bottom: 0, right: 0, width: "12px", height: "12px", borderBottom: "2px solid #e8c547", borderRight: "2px solid #e8c547" }} />
      </motion.div>
      
      {/* Recording Dot (Center) */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          position: "fixed",
          top: 0,
          left: 0,
          width: "6px",
          height: "6px",
          backgroundColor: clicking ? "#ff3333" : "#ffffff", /* Turns red like recording when clicking */
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
          boxShadow: clicking ? "0 0 10px rgba(255,51,51,0.8)" : "none",
        }}
        animate={{ scale: clicking ? 1.5 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 15 }}
      />
    </>
  );
}
