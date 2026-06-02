"use client";

import { motion } from "framer-motion";
import { Video, Globe, Film } from "lucide-react";

const footerLinks = [
  { label: "Work",    href: "#videos"  },
  { label: "About",   href: "#about"   },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: Video, href: "https://youtube.com/@sanusiril",  label: "YouTube"   },
  { icon: Film,  href: "https://instagram.com/sanusiril", label: "Instagram" },
  { icon: Globe, href: "https://twitter.com/sanusiril",   label: "Twitter"   },
];

const megaTextVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const lineVariant = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #1f1f1f" }}>
      <div className="site-container" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>

        {/* Top row */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
          className="sm:flex-row sm:items-center"
        >
          <span
            style={{
              fontFamily: "var(--font-antonio), sans-serif",
              fontWeight: 700,
              fontSize: "1.5rem",
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            SANU SIRIL
          </span>
          <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            {footerLinks.map((link) => (
              <a
                key={link.label}
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
            ))}
          </nav>
        </div>

        <div className="divider" style={{ marginBottom: "3rem" }} />

        {/* Mega text */}
        <motion.div
          variants={megaTextVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ display: "flex", flexDirection: "column", marginBottom: "3rem", overflow: "hidden" }}
        >
          <motion.div variants={lineVariant} style={{ overflow: "hidden" }}>
            <span
              className="text-mega"
              style={{
                fontFamily: "var(--font-antonio), sans-serif",
                fontWeight: 700,
                color: "#ffffff",
                textTransform: "uppercase",
                display: "block",
              }}
            >
              SANU
            </span>
          </motion.div>
          <motion.div variants={lineVariant} style={{ overflow: "hidden" }}>
            <span
              className="text-mega"
              style={{
                fontFamily: "var(--font-antonio), sans-serif",
                fontWeight: 700,
                textTransform: "uppercase",
                display: "block",
                WebkitTextStroke: "1px #f0f0f0",
                color: "transparent",
              }}
            >
              SIRIL
            </span>
          </motion.div>
        </motion.div>

        <div className="divider" style={{ marginBottom: "2rem" }} />

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "1rem",
          }}
          className="sm:flex-row sm:items-center"
        >
          <p
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              fontSize: "10px",
              letterSpacing: "0.1em",
              color: "#6b6b6b",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            © {new Date().getFullYear()} Sanu Siril. All rights reserved.
          </p>

          {/* Social icons */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.93 }}
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "50%",
                  border: "1px solid #1f1f1f",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#6b6b6b",
                  textDecoration: "none",
                  transition: "color 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#e8c547";
                  e.currentTarget.style.color = "#e8c547";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#1f1f1f";
                  e.currentTarget.style.color = "#6b6b6b";
                }}
              >
                <Icon size={14} />
              </motion.a>
            ))}
          </div>

          <p
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              fontSize: "10px",
              letterSpacing: "0.1em",
              color: "#6b6b6b",
              margin: 0,
            }}
          >
            Made with love 🌴
          </p>
        </div>
      </div>
    </footer>
  );
}
