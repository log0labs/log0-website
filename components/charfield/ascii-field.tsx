"use client";

import { useEffect, useRef } from "react";
import type { FieldFn } from "./types";

/*
  Interactive ASCII field, canvas-rendered. Inspired by bentolabs.ai hero.

  Pass a procedural `field` fn (add one with `npx charfield add <name>`), or pass
  `src` to sample an image into an ASCII portrait instead.

  Mouse acts as a gravity well: cells near the cursor brighten, swap to denser
  glyphs, and warp toward it (falloff by distance). Pointer-leave eases back.

  Drop into a `relative` parent; it fills the parent. Canvas is pointer-events
  passthrough - the pointer is read off `window` so overlaid content stays clickable.
*/

// brightness ramp: index 0 = darkest, last = densest
const RAMP = " .·:-=+*coO0#%@".split("");
// glyphs swapped in near the cursor (alive / noisy look)
const HOT = "01+*=#%".split("");

type Props = {
  /** procedural field fn; omit when rendering an image via `src` */
  field?: FieldFn;
  /** image URL; when set, samples the image into an ASCII portrait */
  src?: string;
  /** css px size of one character cell; 8-9 = dense */
  cell?: number;
  /** accent color of the brightest cells */
  color?: string;
  /** base color of dim cells */
  dim?: string;
  /** radius (px) of mouse influence */
  radius?: number;
  /** rotation / flow speed multiplier */
  speed?: number;
  /** when false, ignore the pointer (no hover warp) - for inline decoration */
  interactive?: boolean;
  className?: string;
};

export default function AsciiHero({
  field,
  src,
  cell = 8,
  color = "#7fc8ff",
  dim = "rgba(127,200,255,0.16)",
  radius = 110,
  speed = 1,
  interactive = true,
  className,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cols = 0;
    let rows = 0;
    let W = 0;
    let H = 0;
    // image mode when a src is given; otherwise render the procedural field fn
    const useImage = !!src;

    // per-cell base brightness 0..1 (image mode only)
    let base: Float32Array = new Float32Array(0);

    // pointer in css px, eased toward the real target; px/py = previous frame
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, px: -9999, py: -9999 };

    // ---- image sampling -------------------------------------------------
    let img: HTMLImageElement | null = null;
    const sampleImage = () => {
      if (!img || !cols || !rows) return;
      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const octx = off.getContext("2d");
      if (!octx) return;
      const ir = img.width / img.height;
      const gr = cols / rows;
      let sw = img.width;
      let sh = img.height;
      let sx = 0;
      let sy = 0;
      if (ir > gr) {
        sw = img.height * gr;
        sx = (img.width - sw) / 2;
      } else {
        sh = img.width / gr;
        sy = (img.height - sh) / 2;
      }
      octx.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows);
      const data = octx.getImageData(0, 0, cols, rows).data;
      base = new Float32Array(cols * rows);
      for (let i = 0; i < cols * rows; i++) {
        const a = data[i * 4 + 3] / 255;
        base[i] =
          ((0.299 * data[i * 4] +
            0.587 * data[i * 4 + 1] +
            0.114 * data[i * 4 + 2]) /
            255) *
          a;
      }
    };

    // ---- resize ---------------------------------------------------------
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.max(1, Math.floor(W / cell));
      rows = Math.max(1, Math.floor(H / cell));
      ctx.font = `${cell}px ui-monospace, "SFMono-Regular", monospace`;
      ctx.textBaseline = "top";
      if (useImage && img) sampleImage();
    };

    // ---- render loop ----------------------------------------------------
    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const t = (now - start) / 1000;
      const env = { W, H, speed };

      mouse.x += (mouse.tx - mouse.x) * 0.15;
      mouse.y += (mouse.ty - mouse.y) * 0.15;
      // pointer velocity this frame (drives the "fling" drag)
      const mvx = mouse.x - mouse.px;
      const mvy = mouse.y - mouse.py;
      mouse.px = mouse.x;
      mouse.py = mouse.y;

      ctx.clearRect(0, 0, W, H);
      const r2 = radius * radius;

      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          const cx = gx * cell;
          const cy = gy * cell;

          let bri = useImage
            ? base[gy * cols + gx] || 0
            : field
              ? field(cx + cell * 0.5, cy + cell * 0.5, t, env)
              : 0;

          // subtle twinkle on image cells so the portrait feels alive
          if (useImage && bri > 0.06) {
            bri *= 0.82 + 0.18 * Math.sin(t * 2.5 + gx * 1.3 + gy * 0.7);
          }

          if (bri < 0.06) {
            // still let the mouse light up empty space faintly
            if (mouse.x < -1000) continue;
          }

          // cursor interaction: radiating ripple + swirl vortex + velocity drag
          let dx = 0;
          let dy = 0;
          let hot = 0;
          const mdx = cx - mouse.x;
          const mdy = cy - mouse.y;
          const d2 = mdx * mdx + mdy * mdy;
          if (d2 < r2) {
            const d = Math.sqrt(d2) || 1;
            const f = 1 - d / radius;
            const ff = f * f; // smooth falloff
            const nx = mdx / d;
            const ny = mdy / d;
            // water-like ripple radiating outward from the cursor
            const ripple = Math.sin(d * 0.18 - t * 4.5);
            const push = ripple * ff * 8; // radial displacement (ripple)
            const swirl = ff * 7; // tangential (vortex)
            dx = nx * push - ny * swirl + mvx * ff * 0.5; // + fling along motion
            dy = ny * push + nx * swirl + mvy * ff * 0.5;
            // brightness: halo + glowing ripple crests
            hot = ff + Math.max(0, ripple) * ff * 0.6;
            bri = Math.min(1, bri + ff * 0.55 + Math.max(0, ripple) * ff * 0.5);
          }

          if (bri < 0.06) continue;

          const idx = Math.min(
            RAMP.length - 1,
            Math.floor(bri * (RAMP.length - 1))
          );
          let ch: string;
          if (hot > 0.22) {
            const j = Math.floor((t * 9 + gx * 3 + gy * 7) % HOT.length);
            ch = HOT[j];
          } else {
            ch = RAMP[idx];
          }
          if (ch === " ") continue;

          ctx.globalAlpha = Math.min(1, 0.3 + bri * 0.9);
          ctx.fillStyle = hot > 0.15 || bri > 0.48 ? color : dim;
          ctx.fillText(ch, cx + dx, cy + dy);
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };

    // ---- events ---------------------------------------------------------
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.tx = -9999;
      mouse.ty = -9999;
    };

    if (useImage) {
      img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = resize;
      img.src = src as string;
    }

    resize();
    window.addEventListener("resize", resize);
    if (interactive) {
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerleave", onLeave);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [field, src, cell, color, dim, radius, speed, interactive]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
