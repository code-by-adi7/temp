"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Work",    href: "#videos"  },
  { label: "About",  href: "#about"   },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setMenuOpen(false);

  return (
    <>
      {/* ── Nav bar ── */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0,  opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay: 0.2 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "border-b" : "bg-transparent"
        )}
        style={{
          height: "64px",
          display: "flex",
          alignItems: "center",
          ...(scrolled
            ? { backgroundColor: "rgba(8,8,8,0.92)", backdropFilter: "blur(12px)", borderColor: "#1f1f1f" }
            : {}),
        }}
      >
        {/* Inner row — explicit padding, no site-container to avoid overflow */}
        <div
          style={{
            width: "100%",
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "0 clamp(1rem, 5vw, 5rem)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <a
            href="#"
            style={{
              fontFamily: "var(--font-antonio), sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.1rem, 4vw, 1.5rem)",
              color: "#ffffff",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              textDecoration: "none",
              flexShrink: 0,
              minWidth: 0,
              minHeight: 0,
            }}
          >
            SANU SIRIL
          </a>

          {/* Center Nav — desktop only */}
          <ul
            className="hidden md:flex items-center gap-10"
            style={{ listStyle: "none", margin: 0, padding: 0 }}
          >
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
                    minWidth: 0,
                    minHeight: 0,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#6b6b6b")}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Subscribe — desktop only */}
          <motion.a
            href="https://youtube.com/@sanusiril"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="hidden md:flex"
            style={{
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
              flexShrink: 0,
              minWidth: 0,
              minHeight: 0,
            }}
          >
            <Play size={12} fill="#080808" />
            Subscribe
          </motion.a>

          {/* Hamburger — mobile only (hidden on md+) */}
          <button
            className="md:hidden flex items-center justify-center"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{
              background: "none",
              border: "none",
              color: "#ffffff",
              cursor: "pointer",
              padding: "10px",
              margin: 0,
              lineHeight: 0,
              flexShrink: 0,
              minWidth: 0,
              minHeight: 0,
            }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile menu overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{
              position: "fixed",
              top: "64px",
              left: 0,
              right: 0,
              backgroundColor: "rgba(8,8,8,0.98)",
              backdropFilter: "blur(16px)",
              borderBottom: "1px solid #1f1f1f",
              zIndex: 49,
              padding: "1.5rem 1.25rem 2rem",
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={close}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.06 }}
                style={{
                  display: "block",
                  fontFamily: "var(--font-dm-mono), monospace",
                  fontSize: "12px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#6b6b6b",
                  textDecoration: "none",
                  padding: "1rem 0",
                  borderBottom: "1px solid #1a1a1a",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#6b6b6b")}
              >
                {link.label}
              </motion.a>
            ))}

            <motion.a
              href="https://youtube.com/@sanusiril"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                marginTop: "1.5rem",
                backgroundColor: "#e8c547",
                color: "#080808",
                fontFamily: "var(--font-dm-mono), monospace",
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                padding: "0.75rem 1.5rem",
                borderRadius: "9999px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              <Play size={12} fill="#080808" />
              Subscribe on YouTube
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
