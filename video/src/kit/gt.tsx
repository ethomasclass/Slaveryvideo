// Grip Tighter helpers on top of the template kit: archival pictures by path (sizes from src/imgs.ts),
// Gemini paintings with a labelled stand-in until the PNG exists, documents on the desk, hand-drawn
// underlines, the running census counter, and music that switches to the Suno cue once it is dropped in.
import React from 'react';
import {AbsoluteFill, Img, interpolate, random, staticFile, useCurrentFrame} from 'remotion';
import {IMG} from '../imgs';
import {clamp} from '../lib/anim';
import {JF, Tag, useGFrame, usePal} from './Kit';
import {DarkPaper} from './common';
import type {MaskRef} from './maskref';
import {hasFile, Photo} from './shell';

export const sizeOf = (src: string): [number, number] => {
  const s = IMG[src];
  if (!s) throw new Error(`No size for ${src}: run python3 tools/img_sizes.py`);
  return s;
};

/** Full-bleed archival picture (B&W, slow push) with its source tag. fx/fy default to the centre. */
export const Pic: React.FC<{src: string; tag: string; a: number; b: number; fx?: number; fy?: number; z0?: number; z1?: number; bw?: string; mask?: MaskRef; tint?: string | null;
  traceAt?: number; vignette?: number; children?: React.ReactNode}> = ({src, tag, a, b, fx, fy, z0, z1, bw, mask, tint, traceAt, vignette, children}) => {
  const size = sizeOf(src);
  return (
    <AbsoluteFill>
      <Photo src={src} size={size} fx={fx ?? size[0] / 2} fy={fy ?? size[1] / 2} z0={z0} z1={z1} a={a} b={b} bw={bw} mask={mask} tint={tint} traceAt={traceAt} vignette={vignette} />
      {children}
      <Tag text={tag} />
    </AbsoluteFill>
  );
};

/** A Gemini painting (public/img/gen/<name>.png) full-bleed with a slow push. Until it exists: a labelled stand-in. */
export const Gen: React.FC<{name: string; label: string; a: number; b: number; z0?: number; z1?: number; ox?: string; oy?: string; children?: React.ReactNode}> = ({
  name, label, a, b, z0 = 1.02, z1 = 1.1, ox = '50%', oy = '50%', children,
}) => {
  const frame = useCurrentFrame();
  const pal = usePal();
  const src = `img/gen/${name}.png`;
  const z = interpolate(frame, [a, b], [z0, z1], clamp);
  if (hasFile(src)) {
    return (
      <AbsoluteFill style={{background: '#111', overflow: 'hidden'}}>
        <Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: `${ox} ${oy}`, transform: `scale(${z})`, transformOrigin: `${ox} ${oy}`,
          filter: 'grayscale(1) contrast(1.15) brightness(0.92)'}} />
        <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 100%)'}} />
        {children}
        <Tag text={`Illustration · ${label}`} />
      </AbsoluteFill>
    );
  }
  return (
    <AbsoluteFill>
      <DarkPaper />
      <div style={{position: 'absolute', left: 260, top: 200, width: 1400, height: 680, border: `4px dashed ${pal.mark}`, opacity: 0.55}} />
      <div style={{position: 'absolute', left: 300, top: 470, width: 1320, textAlign: 'center', fontFamily: JF.mono, fontSize: 30, letterSpacing: 3, color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase'}}>
        painting to come · {name}.png
        <div style={{marginTop: 18, fontSize: 24, letterSpacing: 2, color: 'rgba(255,255,255,0.5)'}}>{label}</div>
      </div>
      {children}
      <Tag text={`Illustration · ${label}`} />
    </AbsoluteFill>
  );
};

/** A document or page on the desk: cream card, light sepia, pops on, then pushes in slowly toward (fx, fy). */
export const Doc: React.FC<{src: string; x: number; y: number; w: number; at: number; rot?: number; push?: [number, number]; fx?: number; fy?: number; zoom?: number; sepia?: number;
  children?: (S: (sx: number, sy: number) => number[]) => React.ReactNode}> = ({src, x, y, w, at, rot = 0, push, fx, fy, zoom = 1.25, sepia = 0.3, children}) => {
  const frame = useCurrentFrame();
  const g = useGFrame();
  if (g < at) return null;
  const size = sizeOf(src);
  const h = (w * size[1]) / size[0];
  const k = interpolate(g, [at, at + 5], [0, 1], {...clamp, easing: (t) => 1 - Math.pow(1 - t, 3) * (1 - 2.2 * t * (1 - t))});
  const z = push ? interpolate(frame, push, [1, zoom], clamp) : 1;
  const ox = fx ?? size[0] / 2;
  const oy = fy ?? size[1] / 2;
  const sc = w / size[0];
  // camera: zoom about the focus point, keeping it where it sits on screen at z = 1
  const S = (sx: number, sy: number) => [x + ox * sc + (sx - ox) * sc * z, y + oy * sc + (sy - oy) * sc * z];
  const [lx, ty] = S(0, 0);
  return (
    <>
      <div style={{position: 'absolute', left: lx - 16, top: ty - 16, width: w * z + 32, height: h * z + 32, background: '#f4efe6', boxShadow: '0 18px 34px rgba(0,0,0,0.6)',
        transform: `scale(${0.6 + 0.4 * k}) rotate(${rot}deg)`, opacity: Math.min(1, k * 2)}}>
        <Img src={staticFile(src)} style={{position: 'absolute', left: 16, top: 16, width: w * z, height: h * z, filter: `grayscale(1) sepia(${sepia}) contrast(1.15)`}} />
      </div>
      {k >= 1 && children?.(S)}
    </>
  );
};

/** A hand-drawn teal underline from (x1, y) to (x2, y), drawn on over `dur` frames. */
export const Underline: React.FC<{x1: number; x2: number; y: number; at: number; dur?: number; width?: number; color?: string; seed?: number}> = ({x1, x2, y, at, dur = 8, width = 6, color, seed = 1}) => {
  const g = useGFrame();
  const pal = usePal();
  if (g < at) return null;
  const p = interpolate(g, [at, at + dur], [0, 1], clamp);
  const pts = Array.from({length: 12}, (_, i) => `${i ? 'L' : 'M'}${x1 + ((x2 - x1) * i) / 11},${y + (random(`u${seed}${i}`) - 0.5) * 6 + i * 0.6}`).join(' ');
  return (
    <svg style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}} width={1920} height={1080}>
      <path d={pts} fill="none" stroke={color ?? pal.mark} strokeWidth={width} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
    </svg>
  );
};

/** The running census counter, top-right: "ENSLAVED · 1790" and the number, ticking from `from` to `to`. */
export const Counter: React.FC<{year: number; from: number; to: number; at: number; dur?: number; color?: string}> = ({year, from, to, at, dur = 30, color}) => {
  const g = useGFrame();
  if (g < at) return null;
  const v = Math.round(interpolate(g, [at, at + dur], [from, to], clamp));
  const o = interpolate(g, [at, at + 6], [0, 1], clamp);
  return (
    <div style={{position: 'absolute', right: 60, top: 46, textAlign: 'right', opacity: o, textShadow: '0 2px 10px rgba(0,0,0,0.9)'}}>
      <div style={{fontFamily: JF.mono, fontSize: 22, letterSpacing: 3, color: 'rgba(255,255,255,0.8)'}}>ENSLAVED · CENSUS OF {year}</div>
      <div style={{fontFamily: JF.display, fontSize: 64, lineHeight: 1.1, color: color ?? '#f4efe6'}}>{v.toLocaleString('en-US')}</div>
    </div>
  );
};

/** Music: the Suno cue if it has been dropped into public/music, else the stand-in from an earlier video. */
export const cue = (name: string, fallback: string) => (hasFile(`music/${name}.mp3`) ? `music/${name}.mp3` : `music/${fallback}.mp3`);
