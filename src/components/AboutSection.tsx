"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const tags = [
  "Filmmaking", "Travel", "Food", "Culture", "Storytelling", "Photography",
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        paddingTop: "8rem",
        paddingBottom: "8rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="site-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "4rem",
            alignItems: "start",
          }}
          className="lg:grid-cols-5"
        >
          {/* LEFT — Decorative column */}
          <div
            style={{ position: "relative" }}
            className="lg:col-span-2"
          >
            <span className="section-label">ABOUT</span>

            {/* Massive decorative number */}
            <motion.span
              style={{
                y,
                fontFamily: "var(--font-antonio), sans-serif",
                fontSize: "clamp(8rem, 20vw, 20rem)",
                lineHeight: 1,
                color: "#1f1f1f",
                userSelect: "none",
                display: "block",
                fontWeight: 700,
                marginTop: "1rem",
              }}
            >
              01
            </motion.span>
          </div>

          {/* RIGHT — Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
            className="lg:col-span-3"
          >
            {/* Heading */}
            <h2
              className="text-hecto"
              style={{
                fontFamily: "var(--font-antonio), sans-serif",
                color: "#ffffff",
                textTransform: "uppercase",
                fontWeight: 700,
                margin: 0,
              }}
            >
              CREATOR.<br />EXPLORER.<br />STORYTELLER.
            </h2>

            {/* Paragraphs */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <p style={{ color: "#a8a8a8", lineHeight: 1.75, margin: 0 }}>
                Sanu Siril is a YouTube vlogger crafting immersive travel, food,
                and lifestyle content. With a cinematic eye and an authentic voice, every video
                is a journey into the soul of God&apos;s Own Country.
              </p>
              <p style={{ color: "#a8a8a8", lineHeight: 1.75, margin: 0 }}>
                What started as a personal diary became a community of 100K+ viewers who share
                the love for authentic storytelling, off-beat destinations, and the quiet magic
                of breathtaking landscapes.
              </p>
            </div>

            {/* Divider */}
            <div className="divider" />

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}
            >
              {tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    border: "1px solid #1f1f1f",
                    borderRadius: "9999px",
                    padding: "0.375rem 1rem",
                    fontFamily: "var(--font-dm-mono), monospace",
                    fontSize: "11px",
                    letterSpacing: "0.05em",
                    color: "#6b6b6b",
                    transition: "border-color 0.2s, color 0.2s",
                    cursor: "default",
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
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.a
              href="https://youtube.com/@sanusiril"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 6 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "var(--font-dm-mono), monospace",
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#e8c547",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
            >
              Visit My Channel →
            </motion.a>
          </motion.div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", backgroundColor: "#1f1f1f" }} />
    </section>
  );
}
