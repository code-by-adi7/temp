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
      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          animation: "marquee 20s linear infinite",
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
      </div>
    </div>
  );
}
