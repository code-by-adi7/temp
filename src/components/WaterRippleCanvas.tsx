"use client";

import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   GLSL – full-screen quad vertex shader
───────────────────────────────────────────── */
const VS = /* glsl */ `
  attribute vec2 a_pos;
  varying   vec2 v_uv;
  void main() {
    v_uv        = a_pos * 0.5 + 0.5;
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`;

/* ─────────────────────────────────────────────
   GLSL – ping-pong water simulation
───────────────────────────────────────────── */
const SIM_FS = /* glsl */ `
  precision highp float;
  varying vec2 v_uv;

  uniform sampler2D u_curr;
  uniform sampler2D u_prev;
  uniform vec2      u_px;
  uniform float     u_damp;
  uniform vec2      u_mouse;
  uniform float     u_splash;

  float un(float x) { return x * 2.0 - 1.0; }
  float pk(float x) { return x * 0.5 + 0.5; }

  void main() {
    float c = un(texture2D(u_curr, v_uv).r);
    float p = un(texture2D(u_prev, v_uv).r);

    float n = un(texture2D(u_curr, v_uv + vec2(0.0,    u_px.y)).r);
    float s = un(texture2D(u_curr, v_uv - vec2(0.0,    u_px.y)).r);
    float e = un(texture2D(u_curr, v_uv + vec2(u_px.x, 0.0   )).r);
    float w = un(texture2D(u_curr, v_uv - vec2(u_px.x, 0.0   )).r);

    float next = (n + s + e + w) * 0.5 - p;
    next *= u_damp;

    float d = distance(v_uv, u_mouse);
    next   += u_splash * max(0.0, 1.0 - d / 0.04);

    gl_FragColor = vec4(pk(clamp(next, -1.0, 1.0)), 0.0, 0.0, 1.0);
  }
`;

/* ─────────────────────────────────────────────
   GLSL – transparent gold-tinted ripple render
   (alpha-composited on top of the hero bg)
───────────────────────────────────────────── */
const RENDER_FS = /* glsl */ `
  precision highp float;
  varying vec2 v_uv;

  uniform sampler2D u_height;
  uniform vec2      u_px;

  uniform sampler2D u_bg;
  uniform vec4      u_imgRect; // left, bottom, width, height

  float un(float x) { return x * 2.0 - 1.0; }

  void main() {
    float h  = un(texture2D(u_height, v_uv).r);

    float spec   = smoothstep(0.0, 0.25, h)  * 0.65;
    float shadow = smoothstep(0.0, 0.25, -h) * 0.30;

    float activity = abs(h);
    float alpha    = smoothstep(0.008, 0.07, activity) * 0.75;

    vec3 gold  = vec3(0.032, 0.032, 0.032);
    vec3 dark  = vec3(0.032, 0.032, 0.032);
    vec3 color = gold * spec + dark * shadow;

    // Reveal image at ripple area
    float reveal = smoothstep(0.002, 0.06, activity);

    vec2 bgUv = (v_uv - u_imgRect.xy) / u_imgRect.zw;
    vec4 bg = vec4(0.0);
    if (bgUv.x >= 0.0 && bgUv.x <= 1.0 && bgUv.y >= 0.0 && bgUv.y <= 1.0) {
      bg = texture2D(u_bg, bgUv);
      // CSS mask: linear-gradient(to right, transparent 0%, black 28%)
      bg.a *= smoothstep(0.0, 0.28, bgUv.x);
    }

    vec3 finalColor = mix(color, bg.rgb, reveal * bg.a);
    float finalAlpha = max(alpha, reveal * bg.a);

    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`;

/* ─────────────────────────────────────────────
   WebGL helpers
───────────────────────────────────────────── */
function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
    console.error("Shader:", gl.getShaderInfoLog(s));
  return s;
}

function mkProgram(gl: WebGLRenderingContext, vs: string, fs: string) {
  const p = gl.createProgram()!;
  gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, vs));
  gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(p);
  return p;
}

function loadTexture(gl: WebGLRenderingContext, url: string, onLoaded?: (w: number, h: number) => void) {
  const tex = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]));
  const img = new Image();
  img.src = url;
  img.crossOrigin = "anonymous";
  img.onload = () => {
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    if (onLoaded) onLoaded(img.width, img.height);
  };
  return tex;
}

function mkTex(gl: WebGLRenderingContext, w: number, h: number) {
  const t = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, t);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return t;
}

function mkFBO(gl: WebGLRenderingContext, tex: WebGLTexture) {
  const f = gl.createFramebuffer()!;
  gl.bindFramebuffer(gl.FRAMEBUFFER, f);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  return f;
}

/* ─────────────────────────────────────────────
   Component — transparent water ripple overlay
───────────────────────────────────────────── */
export default function WaterRippleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,          // transparent background — hero bg shows through
      premultipliedAlpha: false,
      antialias: false,
      depth: false,
      preserveDrawingBuffer: false,
    });
    if (!gl) return;

    /* enable alpha blending */
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const simProg = mkProgram(gl, VS, SIM_FS);
    const renProg = mkProgram(gl, VS, RENDER_FS);

    /* full-screen quad */
    const quad = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    /* uniform locations */
    const sU = {
      curr: gl.getUniformLocation(simProg, "u_curr"),
      prev: gl.getUniformLocation(simProg, "u_prev"),
      px: gl.getUniformLocation(simProg, "u_px"),
      damp: gl.getUniformLocation(simProg, "u_damp"),
      mouse: gl.getUniformLocation(simProg, "u_mouse"),
      splash: gl.getUniformLocation(simProg, "u_splash"),
    };
    const rU = {
      height: gl.getUniformLocation(renProg, "u_height"),
      px: gl.getUniformLocation(renProg, "u_px"),
      bg: gl.getUniformLocation(renProg, "u_bg"),
      imgRect: gl.getUniformLocation(renProg, "u_imgRect"),
    };

    let imgW = 1, imgH = 1;
    const bgTex = loadTexture(gl, "/rl.png", (w, h) => {
      imgW = w; imgH = h;
    });

    /* ping-pong state */
    const SIM_SCALE = 3; // simulate at 1/3 res for performance
    let simW = 1, simH = 1;
    let texs: WebGLTexture[] = [];
    let fbos: WebGLFramebuffer[] = [];
    let frameIdx = 0;

    const allocFBOs = (w: number, h: number) => {
      simW = Math.max(1, Math.floor(w / SIM_SCALE));
      simH = Math.max(1, Math.floor(h / SIM_SCALE));

      texs.forEach(t => gl.deleteTexture(t));
      fbos.forEach(f => gl.deleteFramebuffer(f));
      texs = [];
      fbos = [];

      for (let i = 0; i < 3; i++) {
        const t = mkTex(gl, simW, simH);
        const f = mkFBO(gl, t);
        texs.push(t);
        fbos.push(f);

        // Initialize to neutral 0.5 (which un-packs to 0.0)
        gl.bindFramebuffer(gl.FRAMEBUFFER, f);
        gl.clearColor(0.5, 0.5, 0.5, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
      }
    };

    const ro = new ResizeObserver(() => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width === w && canvas.height === h) return;
      canvas.width = w;
      canvas.height = h;
      allocFBOs(w, h);
    });
    ro.observe(canvas);
    allocFBOs(canvas.clientWidth || 1, canvas.clientHeight || 1);

    /* mouse / touch */
    let mUV = { x: -1, y: -1 };
    let splash = 0;
    let lastT = 0;

    const onMove = (cx: number, cy: number) => {
      const r = canvas.getBoundingClientRect();
      mUV.x = (cx - r.left) / r.width;
      mUV.y = 1 - (cy - r.top) / r.height; // flip Y for WebGL
      splash = performance.now() - lastT < 80 ? 0.75 : 0.55;
      lastT = performance.now();
    };

    const onMM = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const onTM = (e: TouchEvent) => { onMove(e.touches[0].clientX, e.touches[0].clientY); };
    const onML = () => { splash = 0; };

    window.addEventListener("mousemove", onMM);
    window.addEventListener("touchmove", onTM, { passive: true });
    window.addEventListener("mouseleave", onML);

    /* render loop */
    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);

      const cw = canvas.width;
      const ch = canvas.height;

      /* --- sim pass --- */
      gl.useProgram(simProg);
      gl.bindBuffer(gl.ARRAY_BUFFER, quad);
      const sp = gl.getAttribLocation(simProg, "a_pos");
      gl.enableVertexAttribArray(sp);
      gl.vertexAttribPointer(sp, 2, gl.FLOAT, false, 0, 0);

      gl.viewport(0, 0, simW, simH);

      const currIdx = frameIdx % 3;
      const prevIdx = (frameIdx + 2) % 3; // (idx - 1)
      const nextIdx = (frameIdx + 1) % 3;

      const currT = texs[currIdx];
      const prevT = texs[prevIdx];
      const dstF = fbos[nextIdx];

      gl.bindFramebuffer(gl.FRAMEBUFFER, dstF);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, currT); gl.uniform1i(sU.curr, 0);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, prevT); gl.uniform1i(sU.prev, 1);
      gl.uniform2f(sU.px, 1 / simW, 1 / simH);
      gl.uniform1f(sU.damp, 0.987);
      gl.uniform2f(sU.mouse, mUV.x, mUV.y);
      gl.uniform1f(sU.splash, splash);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      splash *= 0.82;
      frameIdx++;

      /* --- render pass --- */
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, cw, ch);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(renProg);
      const rp = gl.getAttribLocation(renProg, "a_pos");
      gl.enableVertexAttribArray(rp);
      gl.vertexAttribPointer(rp, 2, gl.FLOAT, false, 0, 0);

      const htTex = texs[nextIdx];
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, htTex); gl.uniform1i(rU.height, 0);
      gl.uniform2f(rU.px, 1 / simW, 1 / simH);

      // Character image tracking (sync perfectly with the actual DOM element)
      const rect = canvas.getBoundingClientRect();

      let charW = 280;
      let charH = ch;
      let charTop = 0;
      let charLeft = 0;

      const charEl = document.querySelector(".hero-char");
      if (charEl) {
        const charRect = charEl.getBoundingClientRect();
        charW = charRect.width;
        charH = charRect.height;
        charTop = charRect.top;
        charLeft = charRect.left;
      }

      const boxAspect = charW / charH;
      const imgAspect = imgW / imgH;

      let drawW, drawH;
      if (boxAspect > imgAspect) {
        drawH = charH;
        drawW = charH * imgAspect;
      } else {
        drawW = charW;
        drawH = charW / imgAspect;
      }

      // Position the drawn image at the bottom right of the charRect box
      const imgWinLeft = charLeft + charW - drawW;
      const imgWinBottom = charTop + charH;

      // Convert fixed window coordinates to absolute WebGL canvas coordinates
      const canvasBoxLeft = imgWinLeft - rect.left;
      const canvasBoxBottom = rect.bottom - imgWinBottom;

      const left = canvasBoxLeft / cw;
      const bottom = canvasBoxBottom / ch;
      const width = drawW / cw;
      const height = drawH / ch;

      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, bgTex); gl.uniform1i(rU.bg, 1);
      gl.uniform4f(rU.imgRect, left, bottom, width, height);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", onMM);
      window.removeEventListener("touchmove", onTM);
      window.removeEventListener("mouseleave", onML);
      gl.deleteProgram(simProg);
      gl.deleteProgram(renProg);
      gl.deleteBuffer(quad);
      gl.deleteTexture(bgTex);
      texs.forEach(t => gl.deleteTexture(t));
      fbos.forEach(f => gl.deleteFramebuffer(f));
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "block",
        touchAction: "none",
        pointerEvents: "none",
        zIndex: 2,
      }}
      aria-hidden="true"
    />
  );
}
