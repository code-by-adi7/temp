"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Work",    href: "#videos" },
  { label: "About",   href: "#about"  },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-500",
        scrolled
          ? "border-b"
          : "bg-transparent"
      )}
      style={
        scrolled
          ? { backgroundColor: "rgba(8,8,8,0.8)", backdropFilter: "blur(12px)", borderColor: "#1f1f1f" }
          : {}
      }
    >
      <div className="site-container flex items-center justify-between w-full">
        {/* Logo */}
        <a
          href="#"
          style={{
            fontFamily: "var(--font-antonio), sans-serif",
            fontWeight: 700,
            fontSize: "1.5rem",
            color: "#ffffff",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            textDecoration: "none",
          }}
        >
          SANU SIRIL
        </a>

        {/* Center Nav — Desktop only */}
        <ul className="hidden md:flex items-center gap-10" style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                style={{
                  fontFamily: "var(--font-dm-mono), monospace",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#6b6b6b",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#6b6b6b")}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Subscribe CTA */}
        <motion.a
          href="https://youtube.com/@sanusiril"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            backgroundColor: "#e8c547",
            color: "#080808",
            fontFamily: "var(--font-dm-mono), monospace",
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            padding: "0.625rem 1.25rem",
            borderRadius: "9999px",
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          <Play size={12} fill="#080808" />
          Subscribe
        </motion.a>
      </div>
    </motion.nav>
  );
}
