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
      {/* Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          backgroundColor: "#e8c547",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 999,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
        animate={{ scale: clicking ? 0.5 : 1 }}
      />
      {/* Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          position: "fixed",
          top: 0,
          left: 0,
          width: "36px",
          height: "36px",
          border: "1px solid rgba(232,197,71,0.4)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 998,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
        animate={{ scale: clicking ? 1.4 : 1 }}
        transition={{ scale: { duration: 0.15 } }}
      />
    </>
  );
}
