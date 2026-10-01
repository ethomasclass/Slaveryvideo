// Chapter 5 · The Pyramid: who lived in the slave states (pie 1), the white South as a pyramid, white
// families by slaveholding (pie 2), and the puzzle of why non-slaveholders defended slavery.
import React from 'react';
import {AbsoluteFill, interpolate, random} from 'remotion';
import words from '../../public/audio/ch05_pyramid.words.json';
import {clamp} from '../lib/anim';
import {Highlight, JF, Note, Tag, useGFrame, usePal} from '../kit/Kit';
import {DarkPaper, Sfx, WRITE} from '../kit/common';
import {Pie} from '../kit/charts';
import {cue} from '../kit/gt';
import {ChapterShell, chapterFrames, Definition, LEAD, makeTimeline, type Narration, PhotoCard, type TL, useScene} from '../kit/shell';
import {SLAVE_STATES_1860, WHITE_FAMILIES_1860} from '../data/charts';

const N = words as Narration;
export const CH05_FRAMES = chapterFrames(N, LEAD);
const pct = (a: number, total: number) => `${Math.round((a / total) * 100)}%`;

/** Pie 1: everyone in the 15 slave states, 1860. */
const WhoLived: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const s = SLAVE_STATES_1860;
  const total = s.enslaved + s.freeBlack + s.white;
  return (
    <AbsoluteFill>
      <DarkPaper />
      {g >= t.at('Start') && <Highlight text="WHO LIVED IN THE SLAVE STATES, 1860" x={110} y={70} size={74} at={t.at('Start')} seed={51} />}
      <Pie cx={760} cy={600} r={300} at={t.at('In 1860') - 8} per={9} seed={3} slices={[
        {label: 'enslaved', value: s.enslaved, subject: true, pct: pct(s.enslaved, total), note: 'about 1 in 3 people', labelAt: [1140, 470]},
        {label: 'free Black', value: s.freeBlack, pct: pct(s.freeBlack, total), labelAt: [1140, 700]},
        {label: 'white', value: s.white, pct: pct(s.white, total), labelAt: [360, 860]},
      ]} />
      <Tag text="U.S. Census, 1860 · population of the 15 slave states" />
    </AbsoluteFill>
  );
};

/** The white South as a drawn pyramid; `on` lights one tier in coral. */
const TIERS = [
  {key: 'planters', label: 'PLANTERS', y0: 170, y1: 400},
  {key: 'yeomen', label: 'YEOMEN', y0: 400, y1: 650},
  {key: 'poor', label: 'POOR WHITES', y0: 650, y1: 900},
];
const APEX = {x: 560, y: 170};
const BASE = {y: 900, half: 420};
const halfAt = (y: number) => ((y - APEX.y) / (BASE.y - APEX.y)) * BASE.half;
const Pyramid: React.FC<{at: number; on?: string; labels: Record<string, number>}> = ({at, on, labels}) => {
  const g = useGFrame();
  const pal = usePal();
  const p = interpolate(g, [at, at + 12], [0, 1], clamp);
  const j = (k: string, i: number) => (random(`py${k}${i}`) - 0.5) * 6;
  return (
    <svg style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}} width={1920} height={1080}>
      {TIERS.map((tr) => {
        const a = halfAt(tr.y0);
        const b = halfAt(tr.y1);
        const d = `M${APEX.x - a},${tr.y0} L${APEX.x + a},${tr.y0} L${APEX.x + b},${tr.y1} L${APEX.x - b},${tr.y1} Z`;
        return <path key={tr.key} d={d} fill={on === tr.key ? pal.subject : 'rgba(237,231,220,0.10)'} opacity={p >= 1 ? 1 : 0} />;
      })}
      <path d={`M${APEX.x + j('a', 0)},${APEX.y} L${APEX.x + BASE.half + j('b', 1)},${BASE.y} L${APEX.x - BASE.half + j('c', 2)},${BASE.y} Z`}
        fill="none" stroke={pal.mark} strokeWidth={6} strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
      {TIERS.slice(1).map((tr, i) => p >= 1 && <line key={tr.key} x1={APEX.x - halfAt(tr.y0) + 6} y1={tr.y0 + j('l', i)} x2={APEX.x + halfAt(tr.y0) - 6} y2={tr.y0 - j('r', i)} stroke={pal.mark} strokeWidth={4} />)}
      {TIERS.map((tr) => g >= (labels[tr.key] ?? 1e7) && (
        <text key={tr.key} x={APEX.x + halfAt((tr.y0 + tr.y1) / 2) + 40} y={(tr.y0 + tr.y1) / 2 + 22} style={{fontFamily: JF.display, fontSize: 60, fill: on === tr.key ? pal.subject : '#f4efe6'}}>{tr.label}</text>
      ))}
    </svg>
  );
};

const Planters: React.FC<{t: TL}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Pyramid at={t.at('Now picture')} on={useGFrame() >= t.at('At the very top') ? 'planters' : undefined} labels={{planters: t.at('planters')}} />
    <Note text="20 or more enslaved" x={1000} y={140} size={46} rot={-3} at={t.at('twenty') - 2} />
    <Note text="a tiny slice" x={1000} y={360} size={46} rot={-3} at={t.at('tiny') - 2} color="#ffffff" />
    <Note text="land · enslaved people · power" x={1000} y={450} size={46} rot={-3} at={t.at('huge share') - 2} />
    <Note text="a handful: 1,000+ people" x={1000} y={560} size={46} rot={-3} at={t.at('A handful') - 2} color="#ffffff" />
  </AbsoluteFill>
);

/** Paternalism: the planters' story about themselves, and who actually did the work. */
const Paternalism: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  return (
    <AbsoluteFill>
      <DarkPaper />
      <Note text="planters' story:" x={140} y={150} size={50} rot={-3} at={t.at('Planters liked') - 2} color="#ffffff" />
      <Note text={'"fathers" of one big family'} x={180} y={250} size={66} rot={-3} at={t.at('fathers') - 2} />
      {g >= t.at('paternalism') && <Highlight text="PATERNALISM" x={140} y={400} size={110} at={t.at('paternalism')} seed={53} />}
      <Definition term="pa·ter·nal·ism" def="slaveholders casting themselves as caring fathers to the people they owned" at={t.at('paternalism') + 9} x={150} y={570} w={1300} />
      <Note text="a story that made owning people feel acceptable" x={180} y={720} size={46} rot={-2} at={t.at('acceptable') - 10} color="#ffffff" />
      <Note text="the mistress ran the house; enslaved women did the work" x={180} y={850} size={46} rot={-2} at={t.at('Their wives') - 2} />
    </AbsoluteFill>
  );
};

const Below: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const on = g >= t.at('poor whites') ? 'poor' : 'yeomen';
  return (
    <AbsoluteFill>
      <DarkPaper />
      <Pyramid at={-20} on={on} labels={{planters: -1, yeomen: t.at('yeomen'), poor: t.at('poor whites')}} />
      {g < t.at('poor whites') && (
        <>
          <Note text="small family farms" x={1080} y={300} size={50} rot={-3} at={t.at('small farmers') - 2} />
          <Note text="most owned no one" x={1080} y={400} size={50} rot={-3} at={t.at('owned no one') - 2} color="#ffffff" />
          <Note text="some hoped to buy someone." x={1080} y={500} size={44} rot={-3} at={t.at('Some hoped') - 2} />
          <Note text="many never did." x={1080} y={590} size={44} rot={-3} at={t.at('Many never') - 2} color="#ffffff" />
        </>
      )}
      <PhotoCard src="img/ch05/poor_white_folks_beard_1845.jpg" x={1150} y={170} w={690} rot={2} at={t.at('poor whites') - 1} />
      <Note text="no land · rented or worked for wages" x={880} y={905} size={42} rot={-3} at={t.at('rented') - 2} />
      {g >= t.at('poor whites') && <Tag text="James Henry Beard, North Carolina Emigrants: Poor White Folks, 1845 · Cincinnati Art Museum" />}
    </AbsoluteFill>
  );
};

/** Pie 2: white families, 1860, by slaveholding. */
const Families: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const s = WHITE_FAMILIES_1860;
  const total = s.none + s.small + s.planters;
  return (
    <AbsoluteFill>
      <DarkPaper />
      {g >= t.at("Now here's") && <Highlight text="WHITE FAMILIES, 1860" x={110} y={70} size={84} at={t.at("Now here's")} seed={55} />}
      <Pie cx={760} cy={600} r={300} at={t.at('three out') - 8} per={9} seed={5} slices={[
        {label: 'owned no one', value: s.none, subject: true, pct: pct(s.none, total), note: 'about 3 in 4', labelAt: [1110, 800]},
        {label: 'enslaved 1 to 19', value: s.small, pct: pct(s.small, total), labelAt: [380, 300]},
        {label: 'planters (20 or more)', value: s.planters, pct: pct(s.planters, total), labelAt: [1100, 250]},
      ]} />
      <Tag text="U.S. Census, 1860 · families and slaveholders, 15 slave states" />
    </AbsoluteFill>
  );
};

/** The puzzle and its answers. */
const Puzzle: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const pal = usePal();
  return (
    <AbsoluteFill>
      <DarkPaper />
      <Note text="the puzzle:" x={140} y={110} size={54} rot={-3} at={t.at('puzzle') - 2} color="#ffffff" />
      <Note text="why defend a system they didn't own a piece of?" x={180} y={200} size={58} rot={-3} at={t.at('Why would') - 2} />
      <Note text="1 · hope to climb the pyramid" x={220} y={380} size={52} rot={-2} at={t.at('climb') - 4} color="#ffffff" />
      <Note text="2 · cotton money in every store and bank" x={220} y={480} size={52} rot={-2} at={t.at('Cotton money') - 2} color="#ffffff" />
      {g >= t.at('status') && <Highlight text="3 · STATUS" x={210} y={590} size={96} at={t.at('status')} seed={57} />}
      <Note text="always someone below him" x={760} y={620} size={50} rot={-3} at={t.at('always') - 2} />
      <Note text="being white = being free" x={760} y={720} size={50} rot={-3} at={t.at('Being white') - 2} color={pal.subject} />
      <Note text="4 · after Southampton: fear" x={220} y={860} size={58} rot={-2} at={t.at('after Southampton') - 2} color={g >= t.at('Fear') ? pal.subject : '#ffffff'} />
    </AbsoluteFill>
  );
};

const Body: React.FC = () => {
  const t = makeTimeline(N, 30);
  const at = t.at;
  const cuts: [number, React.ReactNode][] = [
    [0, <WhoLived t={t} />],
    [at('Now picture') - 1, <Planters t={t} />],
    [at('Planters liked') - 1, <Paternalism t={t} />],
    [at('Below them') - 1, <Below t={t} />],
    [at("Now here's") - 1, <Families t={t} />],
    [at("So here's the puzzle") - 1, <Puzzle t={t} />],
  ];
  const scene = useScene(cuts);
  const notes = ['twenty', 'tiny', 'huge share', 'A handful', 'Planters liked', 'fathers', 'acceptable', 'Their wives', 'small farmers', 'owned no one', 'Some hoped', 'rented', 'puzzle', 'Why would', 'climb', 'Cotton money', 'always', 'Being white', 'after Southampton'];
  return (
    <>
      {scene}
      {cuts.slice(1).map(([f], i) => <Sfx key={i} at={f} src="sfx/whoosh.wav" volume={0.3} />)}
      {['Start', 'paternalism', "Now here's", 'status'].map((c) => <Sfx key={c} at={at(c)} src="sfx/stamp.wav" volume={0.28} />)}
      {notes.map((c) => <Sfx key={c} at={at(c) - 2} src={WRITE.src} volume={WRITE.volume} />)}
    </>
  );
};

export const Ch05: React.FC = () => (
  <ChapterShell n={N} audio="audio/ch05_pyramid.wav" lead={LEAD} music={[{src: cue('pyramid', 'j_cold_open'), volume: 0.13}]}>
    <Body />
  </ChapterShell>
);
