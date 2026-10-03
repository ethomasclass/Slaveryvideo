// YouTube thumbnail concepts, drawn at 1920x1080 with the video's own kit and exported at 1280x720
// (tools/thumbs.mjs renders frame 140 so every write-on has finished). No portrait of Nat Turner exists, so neither
// concept invents a face: they use the video's own documents.
//   A · the notice: Floyd's 1831 reward proclamation on the desk, the $500 line and the signature masked in coral.
//   B · the seed: the 1815 cotton plate, its open boll masked; SLAVERY WAS SUPPOSED TO FADE..., then a smaller 'then came cotton.'
import React from 'react';
import {AbsoluteFill, staticFile} from 'remotion';
import {Wordmark} from './kit/Intro';
import {Finish, Highlight, Note, PALETTES, PaletteCtx} from './kit/Kit';
import {DarkPaper} from './kit/common';
import {Doc} from './kit/gt';

export const THUMB_FRAMES = 150;
const TEAL = '#2FE0C4';
const NOTICE = 'img/ch01/floyd_reward_proclamation_1831_p1.jpg';
const SEED = 'img/arch/seeds_by_hand/cotton_plant_boll_botanical_register_1815.jpg';

/** Channel logo, top-left (YouTube covers the bottom-right with the running time). */
const Logo: React.FC = () => {
  const s = 0.27;
  return (
    <div style={{position: 'absolute', left: 36, top: 30, width: 1440 * s, height: 530 * s, overflow: 'hidden', borderRadius: 14, background: 'rgba(13,12,9,0.78)', boxShadow: '0 8px 24px rgba(0,0,0,0.6)'}}>
      <div style={{position: 'absolute', left: -170 * s, top: -275 * s, width: 1920, height: 1080, transform: `scale(${s})`, transformOrigin: '0 0'}}>
        <Wordmark clockAt={0} numAt={0} minAt={0} hisAt={0} />
      </div>
    </div>
  );
};

export const ThumbA: React.FC = () => (
  <PaletteCtx.Provider value={PALETTES.locked}>
    <AbsoluteFill style={{background: '#15130f', overflow: 'hidden'}}>
      <DarkPaper />
      <Doc src={NOTICE} x={1170} y={70} w={640} rot={3} at={0} marks={[
        {ellipse: [406, 596, 174, 50], at: 0, tint: true, seed: 3, width: 7},
        {box: [44, 235, 352, 262], rot: -4.5, pad: 6, at: 0, tint: true, seed: 4, width: 7},
        {box: [192, 90, 312, 110], pad: 4, at: 0, tint: true, seed: 5, width: 6},
      ]} />
      <AbsoluteFill style={{background: 'linear-gradient(90deg, rgba(8,7,5,0.9) 0%, rgba(8,7,5,0.7) 48%, rgba(8,7,5,0) 60%)'}} />
      <Note text="Virginia, 1831: a $500 reward" x={90} y={290} size={58} rot={-3} color={TEAL} />
      <Highlight text="WHY HOLD ON" x={70} y={420} size={170} at={0} seed={75} rot={-3} />
      <Highlight text="TIGHTER?" x={110} y={660} size={210} at={0} seed={77} rot={-2} />
      <Logo />
      <Finish vignette={0.3} />
    </AbsoluteFill>
  </PaletteCtx.Provider>
);

export const ThumbB: React.FC = () => (
  <PaletteCtx.Provider value={PALETTES.locked}>
    <AbsoluteFill style={{background: '#15130f', overflow: 'hidden'}}>
      <DarkPaper />
      <Doc src={SEED} x={1080} y={170} w={900} rot={-2.5} sepia={0} at={0} marks={[
        {ellipse: [2565, 2600, 470, 420], at: 0, tint: true, seed: 31, width: 8},
      ]} />
      <AbsoluteFill style={{background: 'linear-gradient(90deg, rgba(8,7,5,0.9) 0%, rgba(8,7,5,0.7) 44%, rgba(8,7,5,0) 56%)'}} />
      <Highlight text="SLAVERY WAS" x={70} y={210} size={140} at={0} seed={75} rot={-3} />
      <Highlight text="SUPPOSED TO" x={95} y={410} size={140} at={0} seed={76} rot={-2} />
      <Highlight text="FADE..." x={120} y={610} size={180} at={0} seed={77} rot={-3} />
      <Note text="then came cotton." x={140} y={880} size={84} rot={-3} color={TEAL} />
      <Logo />
      <Finish vignette={0.3} />
    </AbsoluteFill>
  </PaletteCtx.Provider>
);
