"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { videos, type Video } from "@/data/videos";
import { Counter } from "@/components/HeroSection";

function VideoCard({ video, index }: { video: Video; index: number }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        flexShrink: 0,
        width: "clamp(280px, 38vw, 480px)",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {/* Thumbnail */}
      <a
        href={`https://youtu.be/Xnxnon_iQeM?si=CQ_Q2sDFE_yFPoNa`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Watch ${video.title}`}
        className="group"
        style={{
          display: "block",
          position: "relative",
          aspectRatio: "16 / 9",
          overflow: "hidden",
          borderRadius: "0.875rem",
          backgroundColor: "#111111",
          border: "1px solid #1f1f1f",
          flexShrink: 0,
        }}
      >
        {/* Skeleton shimmer */}
        {!imgLoaded && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#111111",
              backgroundImage:
                "linear-gradient(90deg, #111 0%, #1f1f1f 50%, #111 100%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.5s infinite",
            }}
          />
        )}

        {/* Thumbnail image */}
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.4s",
            opacity: imgLoaded ? 1 : 0,
            display: "block",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        />

        {/* Hover overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(8,8,8,0.6)",
            opacity: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "opacity 0.3s",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
        >
          <div
            style={{
              width: "3.5rem",
              height: "3.5rem",
              borderRadius: "50%",
              backgroundColor: "#e8c547",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 30px rgba(232,197,71,0.4)",
            }}
          >
            <Play size={20} fill="#080808" color="#080808" style={{ marginLeft: "3px" }} />
          </div>
        </div>

        {/* Duration badge */}
        <div
          style={{
            position: "absolute",
            bottom: "0.75rem",
            right: "0.75rem",
            backgroundColor: "rgba(8,8,8,0.85)",
            backdropFilter: "blur(4px)",
            padding: "2px 8px",
            borderRadius: "4px",
            fontFamily: "var(--font-dm-mono), monospace",
            fontSize: "10px",
            color: "#ffffff",
            letterSpacing: "0.05em",
          }}
        >
          {video.duration}
        </div>

        {/* Index number */}
        <div
          style={{
            position: "absolute",
            top: "0.75rem",
            left: "0.75rem",
            fontFamily: "var(--font-antonio), sans-serif",
            fontSize: "0.625rem",
            letterSpacing: "0.15em",
            color: "rgba(255,255,255,0.3)",
            textTransform: "uppercase",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
      </a>

      {/* Metadata */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
        <span className="section-label">{video.category}</span>
        <a
          href={`https://youtube.com/watch?v=${video.youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover-underline"
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontWeight: 500,
            color: "#f0f0f0",
            fontSize: "1.05rem",
            lineHeight: 1.35,
            textDecoration: "none",
            transition: "color 0.2s",
            display: "block",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#f0f0f0")}
        >
          {video.title}
        </a>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
            fontFamily: "var(--font-dm-mono), monospace",
            fontSize: "11px",
            color: "#6b6b6b",
          }}
        >
          <span>{video.views} views</span>
          <span>·</span>
          <span>{video.duration}</span>
        </div>
      </div>
    </motion.article>
  );
}

export default function VideoSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 32
      : 500;
    el.scrollBy({ left: dir === "right" ? cardWidth : -cardWidth, behavior: "smooth" });
    setTimeout(updateScrollState, 400);
  };

  return (
    <section
      id="videos"
      style={{
        paddingTop: "8rem",
        paddingBottom: "8rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          backgroundColor: "#1f1f1f",
        }}
      />

      {/* Section Header */}
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "1.5rem",
            marginBottom: "3rem",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <span className="section-label">Latest Videos</span>
            <h2
              className="text-kilo"
              style={{
                fontFamily: "var(--font-antonio), sans-serif",
                color: "#ffffff",
                textTransform: "uppercase",
                fontWeight: 700,
                margin: 0,
              }}
            >
              RECENT<br />WORK
            </h2>
          </div>

          {/* Right side: nav arrows + view-all link */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              paddingBottom: "0.5rem",
            }}
          >
            {/* Arrow buttons */}
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <motion.button
                onClick={() => scroll("left")}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                style={{
                  width: "2.75rem",
                  height: "2.75rem",
                  borderRadius: "50%",
                  border: `1px solid ${canScrollLeft ? "#3a3a3a" : "#1f1f1f"}`,
                  backgroundColor: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: canScrollLeft ? "#f0f0f0" : "#3a3a3a",
                  cursor: canScrollLeft ? "pointer" : "not-allowed",
                  transition: "all 0.2s",
                }}
              >
                <ChevronLeft size={16} />
              </motion.button>
              <motion.button
                onClick={() => scroll("right")}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                style={{
                  width: "2.75rem",
                  height: "2.75rem",
                  borderRadius: "50%",
                  border: `1px solid ${canScrollRight ? "#e8c547" : "#1f1f1f"}`,
                  backgroundColor: canScrollRight ? "#e8c547" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: canScrollRight ? "#080808" : "#3a3a3a",
                  cursor: canScrollRight ? "pointer" : "not-allowed",
                  transition: "all 0.2s",
                }}
              >
                <ChevronRight size={16} />
              </motion.button>
            </div>

            <motion.a
              href="https://youtube.com/@sanusiril"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 4 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "var(--font-dm-mono), monospace",
                fontSize: "11px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#6b6b6b",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#e8c547")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6b6b6b")}
            >
              View All
              <ExternalLink size={11} />
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Horizontal scroll track — bleeds edge to edge with left gutter */}
      <div
        ref={trackRef}
        onScroll={updateScrollState}
        style={{
          display: "flex",
          gap: "2rem",
          overflowX: "auto",
          overflowY: "hidden",
          paddingLeft: "clamp(1.25rem, 5vw, 5rem)",
          paddingRight: "clamp(1.25rem, 5vw, 5rem)",
          paddingBottom: "1.5rem",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          cursor: "grab",
          WebkitOverflowScrolling: "touch",
        }}
        /* Hide webkit scrollbar via inline hack */
        className="hide-scrollbar"
        /* Drag-to-scroll */
        onMouseDown={(e) => {
          const el = trackRef.current;
          if (!el) return;
          el.style.cursor = "grabbing";
          const startX = e.pageX - el.offsetLeft;
          const scrollLeft = el.scrollLeft;

          const onMove = (me: MouseEvent) => {
            const x = me.pageX - el.offsetLeft;
            el.scrollLeft = scrollLeft - (x - startX);
            updateScrollState();
          };
          const onUp = () => {
            el.style.cursor = "grab";
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseup", onUp);
          };
          document.addEventListener("mousemove", onMove);
          document.addEventListener("mouseup", onUp);
        }}
      >
        {videos.map((video, index) => (
          <VideoCard key={video.id} video={video} index={index} />
        ))}

        {/* Trailing spacer so last card isn't clipped */}
        <div style={{ flexShrink: 0, width: "1px" }} />
      </div>

      {/* Progress dots */}
      <div className="site-container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginTop: "1.5rem",
          }}
        >
          {videos.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === 0 && !canScrollLeft ? "1.5rem" : "0.375rem",
                height: "0.375rem",
                borderRadius: "9999px",
                backgroundColor: i === 0 && !canScrollLeft ? "#e8c547" : "#3a3a3a",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          backgroundColor: "#1f1f1f",
        }}
      />

      {/* ── MOBILE STATS (below work section) ── */}
      <div className="site-container block sm:hidden" style={{ marginTop: "4rem" }}>
        {/* Divider above stats */}
        <div style={{ width: "100%", height: "1px", backgroundColor: "#1f1f1f", marginBottom: "2.5rem" }} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)", /* Linear row / not stacked */
            gap: "clamp(0.5rem, 2vw, 1.5rem)",
          }}
        >
          {[
            { target: 200, suffix: "+", label: "Subscribers" },
            { target: 500, suffix: "k+", label: "Total Views" },
            { target: 50, suffix: "+", label: "Videos Made" },
          ].map(({ target, suffix, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
                cursor: "default",
                paddingRight: i < 2 ? "clamp(0.5rem, 2vw, 1.5rem)" : 0,
                borderRight: i < 2 ? "1px solid #1f1f1f" : "none",
                textAlign: "center", /* align content evenly for mobile */
              }}
            >
              {/* Big number */}
              <span
                style={{
                  fontFamily: "var(--font-antonio), sans-serif",
                  fontSize: "clamp(2rem, 8vw, 3.5rem)",
                  fontWeight: 700,
                  color: "#ffffff",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                <Counter target={target} suffix={suffix} />
              </span>
              {/* Label */}
              <span
                style={{
                  fontFamily: "var(--font-dm-mono), monospace",
                  fontSize: "clamp(8px, 2vw, 10px)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#6b6b6b",
                }}
              >
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
