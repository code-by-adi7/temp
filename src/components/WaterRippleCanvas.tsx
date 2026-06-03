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

  void main() {
    float c = texture2D(u_curr, v_uv).r;
    float p = texture2D(u_prev, v_uv).r;

    float n = texture2D(u_curr, v_uv + vec2(0.0,    u_px.y)).r;
    float s = texture2D(u_curr, v_uv - vec2(0.0,    u_px.y)).r;
    float e = texture2D(u_curr, v_uv + vec2(u_px.x, 0.0   )).r;
    float w = texture2D(u_curr, v_uv - vec2(u_px.x, 0.0   )).r;

    float next = (n + s + e + w) * 0.5 - p;
    next *= u_damp;

    float d = distance(v_uv, u_mouse);
    next   += u_splash * max(0.0, 1.0 - d / 0.04);

    gl_FragColor = vec4(clamp(next, -1.0, 1.0), 0.0, 0.0, 1.0);
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

  void main() {
    float h  = texture2D(u_height, v_uv).r;

    // Surface normal from neighbours
    float hL = texture2D(u_height, v_uv - vec2(u_px.x, 0.0)).r;
    float hR = texture2D(u_height, v_uv + vec2(u_px.x, 0.0)).r;
    float hD = texture2D(u_height, v_uv - vec2(0.0,    u_px.y)).r;
    float hU = texture2D(u_height, v_uv + vec2(0.0,    u_px.y)).r;

    // Specular on crests, subtle shadow in troughs
    float spec   = smoothstep(0.0, 0.25, h)  * 0.65;
    float shadow = smoothstep(0.0, 0.25, -h) * 0.30;

    float activity = abs(h);
    float alpha    = smoothstep(0.008, 0.07, activity) * 0.75;

    // Gold accent: #e8c547
    vec3 gold  = vec3(0.910, 0.773, 0.278);
    vec3 dark  = vec3(0.032, 0.032, 0.032);
    vec3 color = gold * spec + dark * shadow;

    gl_FragColor = vec4(color, alpha);
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
  const rafRef    = useRef<number>(0);

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
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

    /* uniform locations */
    const sU = {
      curr:   gl.getUniformLocation(simProg, "u_curr"),
      prev:   gl.getUniformLocation(simProg, "u_prev"),
      px:     gl.getUniformLocation(simProg, "u_px"),
      damp:   gl.getUniformLocation(simProg, "u_damp"),
      mouse:  gl.getUniformLocation(simProg, "u_mouse"),
      splash: gl.getUniformLocation(simProg, "u_splash"),
    };
    const rU = {
      height: gl.getUniformLocation(renProg, "u_height"),
      px:     gl.getUniformLocation(renProg, "u_px"),
    };

    /* ping-pong state */
    const SIM_SCALE = 3; // simulate at 1/3 res for performance
    let simW = 1, simH = 1;
    let tex0: WebGLTexture, tex1: WebGLTexture;
    let fbo0: WebGLFramebuffer, fbo1: WebGLFramebuffer;

    const allocFBOs = (w: number, h: number) => {
      simW = Math.max(1, Math.floor(w / SIM_SCALE));
      simH = Math.max(1, Math.floor(h / SIM_SCALE));
      if (tex0) gl.deleteTexture(tex0);
      if (tex1) gl.deleteTexture(tex1);
      if (fbo0) gl.deleteFramebuffer(fbo0);
      if (fbo1) gl.deleteFramebuffer(fbo1);
      tex0 = mkTex(gl, simW, simH);
      tex1 = mkTex(gl, simW, simH);
      fbo0 = mkFBO(gl, tex0);
      fbo1 = mkFBO(gl, tex1);
    };

    const ro = new ResizeObserver(() => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width === w && canvas.height === h) return;
      canvas.width  = w;
      canvas.height = h;
      allocFBOs(w, h);
    });
    ro.observe(canvas);
    allocFBOs(canvas.clientWidth || 1, canvas.clientHeight || 1);

    /* mouse / touch */
    let mUV = { x: -1, y: -1 };
    let splash = 0;
    let lastT  = 0;

    const onMove = (cx: number, cy: number) => {
      const r = canvas.getBoundingClientRect();
      mUV.x = (cx - r.left)  / r.width;
      mUV.y = 1 - (cy - r.top) / r.height; // flip Y for WebGL
      splash = performance.now() - lastT < 80 ? 0.75 : 0.55;
      lastT  = performance.now();
    };

    const onMM  = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const onTM  = (e: TouchEvent) => { e.preventDefault(); onMove(e.touches[0].clientX, e.touches[0].clientY); };
    const onML  = () => { splash = 0; };

    canvas.addEventListener("mousemove",  onMM);
    canvas.addEventListener("touchmove",  onTM, { passive: false });
    canvas.addEventListener("mouseleave", onML);

    /* render loop */
    let ping = true;

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

      const currT = ping ? tex0 : tex1;
      const prevT = ping ? tex1 : tex0;
      const dstF  = ping ? fbo1 : fbo0;

      gl.bindFramebuffer(gl.FRAMEBUFFER, dstF);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, currT); gl.uniform1i(sU.curr, 0);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, prevT); gl.uniform1i(sU.prev, 1);
      gl.uniform2f(sU.px, 1 / simW, 1 / simH);
      gl.uniform1f(sU.damp, 0.987);
      gl.uniform2f(sU.mouse, mUV.x, mUV.y);
      gl.uniform1f(sU.splash, splash);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      splash *= 0.82;
      ping = !ping;

      /* --- render pass --- */
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, cw, ch);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(renProg);
      const rp = gl.getAttribLocation(renProg, "a_pos");
      gl.enableVertexAttribArray(rp);
      gl.vertexAttribPointer(rp, 2, gl.FLOAT, false, 0, 0);

      const htTex = ping ? tex0 : tex1;
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, htTex); gl.uniform1i(rU.height, 0);
      gl.uniform2f(rU.px, 1 / simW, 1 / simH);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      canvas.removeEventListener("mousemove",  onMM);
      canvas.removeEventListener("touchmove",  onTM);
      canvas.removeEventListener("mouseleave", onML);
      gl.deleteProgram(simProg);
      gl.deleteProgram(renProg);
      gl.deleteBuffer(quad);
      if (tex0) gl.deleteTexture(tex0);
      if (tex1) gl.deleteTexture(tex1);
      if (fbo0) gl.deleteFramebuffer(fbo0);
      if (fbo1) gl.deleteFramebuffer(fbo1);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        touchAction: "none",
        pointerEvents: "auto",
      }}
      aria-hidden="true"
    />
  );
}
