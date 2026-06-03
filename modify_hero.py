import re

with open(r"c:\Users\USER\.gemini\antigravity\scratch\sanu-siril-portfolio\src\components\HeroSection.tsx", "r", encoding="utf-8") as f:
    content = f.read()

pattern = re.compile(r"\{\/\* ── MAIN CONTENT ── \*\/}(.*?)(?=\{\/\* ── Scroll hint ── \*\/})", re.DOTALL)
match = pattern.search(content)

if not match:
    print("Could not find MAIN CONTENT")
    exit(1)

main_content = match.group(1).strip()

back_content = main_content.replace('position: "relative", zIndex: 2', 'gridArea: "1/1", zIndex: 0, pointerEvents: "none"')
back_content = back_content.replace('color: "transparent",', 'color: "transparent", visibility: "hidden",')
back_content = re.sub(r'className="hero-buttons-row"\s+style=\{\{', 'className="hero-buttons-row" style={{ visibility: "hidden", pointerEvents: "none",', back_content)
back_content = re.sub(r'className="hero-stats hidden sm:block"', 'className="hero-stats hidden sm:block" style={{ visibility: "hidden" }}', back_content)

front_content = main_content.replace('position: "relative", zIndex: 2', 'gridArea: "1/1", zIndex: 4')
front_content = front_content.replace('color: "#ffffff",', 'color: "#ffffff", visibility: "hidden",')

new_block = f"""{{/* ── MAIN CONTENT (Interleaved Layers) ── */}}
      <div style={{{{ display: "grid", gridTemplateColumns: "1fr", width: "100%" }}}}>
        {{/* ── BACK LAYER (SIRIL) ── */}}
        {back_content}

        {{/* ── FRONT LAYER (VLOGS & Buttons) ── */}}
        {front_content}
      </div>

      """

new_file_content = content[:match.start()] + new_block + content[match.end():]

with open(r"c:\Users\USER\.gemini\antigravity\scratch\sanu-siril-portfolio\src\components\HeroSection.tsx", "w", encoding="utf-8") as f:
    f.write(new_file_content)

print("Success")
