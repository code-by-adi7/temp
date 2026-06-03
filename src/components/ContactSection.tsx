"use client";

import { motion } from "framer-motion";
import { Video, Film, Globe } from "lucide-react";

const socials = [
  { icon: Video, href: "https://youtube.com/@sanusiril", label: "YouTube" },
  { icon: Film, href: "https://instagram.com/sanusiril", label: "Instagram" },
  { icon: Globe, href: "https://twitter.com/sanusiril", label: "Twitter" },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      style={{
        paddingTop: "8rem",
        paddingBottom: "8rem",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "400px",
          background: "radial-gradient(ellipse at center, rgba(232,197,71,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "2rem",
          }}
        >
          {/* Label */}
          <span className="section-label">GET IN TOUCH</span>

          {/* Heading */}
          <h2
            className="text-kilo"
            style={{
              fontFamily: "var(--font-antonio), sans-serif",
              color: "#ffffff",
              textTransform: "uppercase",
              fontWeight: 700,
              margin: 0,
              maxWidth: "800px",
            }}
          >
            LET&apos;S CREATE SOMETHING.
          </h2>

          {/* Body */}
          <p
            style={{
              color: "#a8a8a8",
              lineHeight: 1.7,
              maxWidth: "32rem",
              margin: 0,
            }}
          >
            For brand collaborations, sponsorships, or just to say hello — reach out.
          </p>

          {/* Email link */}
          <motion.a
            href="https://www.instagram.com/siril_vlogs_"
            whileHover={{ scale: 1.02 }}
            className="text-hecto"
            style={{
              fontFamily: "var(--font-antonio), sans-serif",
              color: "#ffffff",
              textDecoration: "underline",
              textDecorationColor: "#3a3a3a",
              textUnderlineOffset: "12px",
              transition: "color 0.2s, text-decoration-color 0.2s",
              fontWeight: 700,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#e8c547";
              e.currentTarget.style.textDecorationColor = "#e8c547";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.textDecorationColor = "#3a3a3a";
            }}
          >
            @siril_vlogs_
          </motion.a>

          {/* Social Icons */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "1rem" }}>
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
                  width: "3rem",
                  height: "3rem",
                  borderRadius: "50%",
                  border: "1px solid #1f1f1f",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#6b6b6b",
                  textDecoration: "none",
                  transition: "border-color 0.2s, color 0.2s",
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
        </motion.div>
      </div>
    </section>
  );
}
