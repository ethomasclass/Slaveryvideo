// Chapter 2 · Supposed to Die: rewind to 1790 (the first census, the old tobacco South), the founders who called
// slavery wrong and kept enslaving people, the 1808 ban on the overseas trade, and the "hold that thought" card
// that chapter 4 picks up again.
import React from 'react';
import {AbsoluteFill, interpolate, random} from 'remotion';
import words from '../../public/audio/ch02_supposed_to_die.words.json';
import {clamp} from '../lib/anim';
import {Arrow, Highlight, JF, Note, Tag, useGFrame, usePal} from '../kit/Kit';
import {DarkPaper, Sfx, WRITE} from '../kit/common';
import {type Cam, MapScene, PLACES, Region} from '../kit/map';
import {Bars} from '../kit/charts';
import {Counter, cue, sizeOf, Underline} from '../kit/gt';
import {ChapterShell, chapterFrames, CropCard, LEAD, makeTimeline, type Narration, PhotoCard, type TL, useScene} from '../kit/shell';
import {MASKS} from '../masks';
import {ENSLAVED} from '../data/charts';

const N = words as Narration;
export const CH02_FRAMES = chapterFrames(N, LEAD);

const MAPTAG = 'Samuel Augustus Mitchell, Map of the United States, 1836 · Library of Congress';
const ORANGE = '#FF9F1C';
const N1790 = ENSLAVED[0].n;

/**
 * The "hold that thought" card: 1808, the overseas ban, and the expectation that slavery would starve.
 * Drawn here in chapter 2 and brought back in chapter 4 ("remember 1808?"), where `strike` crosses out the expectation.
 * Its two notes write on at `at + 6` and `at + 12` (WRITE sfx belongs to the caller).
 */
export const HeldNote: React.FC<{at: number; strike?: number; x?: number; y?: number}> = ({at, strike = 1e7, x = 330, y = 300}) => {
  const g = useGFrame();
  const pal = usePal();
  if (g < at) return null;
  const W = 1260;
  const H = 320;
  const p = interpolate(g, [at, at + 8], [0, 1], clamp);
  const j = (k: string) => (random(`held${k}`) - 0.5) * 10;
  const d = `M${x + j('a')},${y + j('b')} L${x + W + j('c')},${y + j('d')} L${x + W + j('e')},${y + H + j('f')} L${x + j('g')},${y + H + j('h')} Z`;
  return (
    <>
      <svg style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}} width={1920} height={1080}>
        <path d={d} fill="rgba(0,0,0,0.3)" stroke={pal.mark} strokeWidth={6} strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
      </svg>
      {g >= at + 3 && <div style={{position: 'absolute', left: x + 50, top: y + 80, fontFamily: JF.display, fontSize: 130, lineHeight: 1, color: '#f4efe6', textShadow: '0 4px 16px rgba(0,0,0,0.8)',
        opacity: interpolate(g, [at + 3, at + 7], [0, 1], clamp)}}>1808</div>}
      <Note text="ban on bringing people from overseas" x={x + 410} y={y + 70} size={40} rot={-2} at={at + 6} />
      <Note text="→ slavery slowly starves?" x={x + 410} y={y + 170} size={52} rot={-2} at={at + 12} color={ORANGE} />
      <Underline x1={x + 410} x2={x + 1120} y={y + 222} at={strike} width={8} color={ORANGE} seed={8} />
    </>
  );
};

/** 1790: the first census, one bar on the chart that chapter 4 grows. */
const Rewind: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  return (
    <AbsoluteFill>
      <DarkPaper />
      <Note text="rewind about forty years" x={140} y={100} size={50} rot={-3} at={t.at('rewind') - 2} color="#ffffff" />
      {g >= t.at('1790') && <Highlight text="1790" x={140} y={220} size={140} at={t.at('1790')} seed={21} rot={-2} />}
      <Note text="the first U.S. census" x={560} y={500} size={56} rot={-3} at={t.at('first United') - 2} />
      <Note text="counts about 700,000 enslaved people" x={580} y={620} size={50} rot={-3} at={t.at('700,000') - 2} color="#ffffff" />
      <Bars x={220} y={200} w={220} h={640} max={4.2e6} at={t.at('700,000') - 6} seed={4} bars={[{label: '1790', value: N1790, subject: true, show: '≈ 700,000'}]} />
      <Counter year={1790} from={0} to={N1790} at={t.at('700,000')} />
      {g >= t.at('700,000') && <Tag text="U.S. Census, 1790" />}
    </AbsoluteFill>
  );
};

/** Where they lived: Virginia, Maryland and the Carolinas, shaded on the 1836 map. */
const OLD_SOUTH = [[2900, 2030], [3080, 2090], [3110, 2380], [3070, 2560], [2930, 2760], [2760, 2960], [2590, 3070], [2470, 2860], [2460, 2700], [2560, 2470], [2700, 2290], [2820, 2130]];
const OldSouth: React.FC<{t: TL}> = ({t}) => {
  const keys: Cam[] = [
    {f: t.at('Most of them') - 2, x: 2560, y: 2560, s: 0.55},
    {f: t.at('Carolinas'), x: 2540, y: 2560, s: 0.8},
  ];
  return (
    <MapScene keys={keys} dim={0.2} svg={() => <Region pts={OLD_SOUTH} at={t.at('Virginia') - 4} width={9} />}>
      {(S) => {
        const [vx, vy] = S(PLACES.virginia);
        const [mx, my] = S(PLACES.maryland);
        const [nx, ny] = S(PLACES.northCarolina);
        return (
          <>
            <Note text="Virginia" x={vx - 120} y={vy - 50} size={46} rot={-3} at={t.at('Virginia') - 2} />
            <Note text="Maryland" x={mx - 140} y={my - 120} size={46} rot={-3} at={t.at('Maryland') - 2} />
            <Note text="the Carolinas" x={nx - 220} y={ny + 30} size={46} rot={-3} at={t.at('Carolinas') - 2} />
            <Note text="growing tobacco & rice" x={120} y={880} size={54} rot={-3} at={t.at('growing') - 2} color="#ffffff" />
            <Counter year={1790} from={N1790} to={N1790} at={-999} />
            <Tag text={MAPTAG} />
          </>
        );
      }}
    </MapScene>
  );
};

/** Tobacco wears out the soil; planters turn to wheat. */
const Tobacco: React.FC<{t: TL}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <PhotoCard src="img/ch02/tobacco_plantation_virginia.jpg" x={90} y={200} w={940} rot={-2} at={t.at('And tobacco') - 1} filter="grayscale(1) contrast(1.35)" />
    <Note text="tobacco is in trouble" x={1130} y={150} size={52} rot={-3} at={t.at('in trouble') - 2} color="#ffffff" />
    <Note text="brutal on the soil" x={1140} y={300} size={50} rot={-3} at={t.at('brutal') - 2} />
    <Note text="a few seasons…" x={1140} y={410} size={50} rot={-3} at={t.at('After a few') - 2} />
    <Note text="…and the field is worn out" x={1160} y={500} size={44} rot={-3} at={t.at('worn out') - 4} />
    <Note text="planters switch to wheat" x={1140} y={660} size={50} rot={-3} at={t.at('switching') - 2} color="#ffffff" />
    <Note text="far fewer workers" x={1160} y={770} size={50} rot={-3} at={t.at('far fewer') - 2} />
    <Tag text="Enslaved workers on a Virginia tobacco plantation, engraving, 1759" />
  </AbsoluteFill>
);

/** The expectation of the 1790s. */
const Fade: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  return (
    <AbsoluteFill>
      <DarkPaper />
      <Note text="plenty of people at the time thought slavery might…" x={180} y={260} size={52} rot={-3} at={t.at('So plenty') - 2} color="#ffffff" />
      {g >= t.at('slowly fade') && <Highlight text="SLOWLY FADE AWAY" x={220} y={430} size={130} at={t.at('slowly fade')} seed={23} rot={-2} />}
      <Note text="…on its own" x={300} y={680} size={60} rot={-3} at={t.at('on its own') - 2} />
    </AbsoluteFill>
  );
};

/** Jefferson and Madison: what they wrote, and what they did. */
const JEF = 'img/ch02/jefferson_peale_1800.jpg';
const MAD = 'img/ch02/madison_stuart_1821.jpg';
const Founders: React.FC<{t: TL}> = ({t}) => {
  const pal = usePal();
  return (
    <AbsoluteFill>
      <DarkPaper />
      <CropCard src={JEF} size={sizeOf(JEF)} x={100} y={130} w={440} h={560} fx={1920} fy={2250} scale={0.17} rot={-2} at={t.at('Thomas Jefferson') - 1} mask={MASKS.jefferson} />
      <CropCard src={MAD} size={sizeOf(MAD)} x={600} y={150} w={440} h={560} fx={1520} fy={1950} scale={0.165} rot={2} at={t.at('James Madison') - 1} mask={MASKS.madison} />
      <Note text="Thomas Jefferson" x={130} y={760} size={44} rot={-2} at={t.at('Thomas Jefferson') + 2} color="#ffffff" />
      <Note text="James Madison" x={650} y={780} size={44} rot={-2} at={t.at('James Madison') + 2} color="#ffffff" />
      <div style={{position: 'absolute', left: 1110, top: 150, width: 4, height: 760, background: 'rgba(244,239,230,0.35)'}} />
      <Note text="they wrote:" x={1160} y={150} size={44} rot={-3} at={t.at('wrote that') - 2} color="#ffffff" />
      <Note text="slavery was wrong" x={1180} y={240} size={58} rot={-3} at={t.at('slavery was wrong') - 2} />
      <Note text="they kept enslaving:" x={1160} y={480} size={44} rot={-3} at={t.at('kept enslaving') - 2} color="#ffffff" />
      <Note text="100+ people at a time" x={1180} y={570} size={54} rot={-3} at={t.at('more than a hundred') - 2} color={pal.subject} />
      <Note text="for the rest of their lives" x={1180} y={690} size={42} rot={-3} at={t.at('for the rest') - 2} />
      <Tag text="Rembrandt Peale, Thomas Jefferson, 1800 · White House · Gilbert Stuart, James Madison, c. 1821 · National Gallery of Art" />
    </AbsoluteFill>
  );
};

/** The Constitution sets a date: a timeline from 1787 to 1808. */
const DateSet: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const pal = usePal();
  const a = t.at('set a date');
  const p = interpolate(g, [a, a + 12], [0, 1], clamp);
  const x0 = 260;
  const x1 = 1640;
  const y = 500;
  const end = t.at('Starting in');
  return (
    <AbsoluteFill>
      <DarkPaper />
      <Note text="the U.S. Constitution, 1787" x={140} y={110} size={54} rot={-3} at={t.at('The Constitution') - 2} color="#ffffff" />
      <Note text="even set a date" x={180} y={230} size={50} rot={-3} at={a - 2} />
      <svg style={{position: 'absolute', left: 0, top: 0}} width={1920} height={1080}>
        <line x1={x0} y1={y} x2={x0 + (x1 - x0) * p} y2={y} stroke={pal.mark} strokeWidth={6} strokeLinecap="round" />
        {g >= a && <circle cx={x0} cy={y} r={14} fill={pal.mark} />}
        {g >= end && <circle cx={x1} cy={y} r={16} fill={pal.subject} />}
      </svg>
      {g >= a && <div style={{position: 'absolute', left: x0 - 60, top: y + 34, fontFamily: JF.display, fontSize: 56, color: '#f4efe6'}}>1787</div>}
      {g >= end && <div style={{position: 'absolute', left: x1 - 80, top: y + 34, fontFamily: JF.display, fontSize: 72, color: pal.subject,
        transform: `scale(${interpolate(g, [end, end + 3, end + 6], [1.35, 0.95, 1], clamp)})`}}>1808</div>}
      <Note text="from 1808, Congress may ban" x={420} y={690} size={52} rot={-3} at={t.at('Congress') - 2} />
      <Note text="bringing enslaved people in from overseas" x={460} y={800} size={50} rot={-3} at={t.at('bringing') - 2} />
      <Tag text="U.S. Constitution, Article I, Section 9" />
    </AbsoluteFill>
  );
};

/** January 1, 1808: the ban takes effect, and the theory behind it. */
const Ban: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const pal = usePal();
  const x = t.at('supply');
  return (
    <AbsoluteFill>
      <DarkPaper />
      {g >= t.at('January') && <Highlight text="JAN. 1, 1808" x={140} y={110} size={110} at={t.at('January')} seed={25} rot={-2} />}
      <Note text="the ban takes effect" x={170} y={290} size={56} rot={-3} at={t.at('took effect') - 2} />
      <Note text="ships from overseas" x={170} y={500} size={52} rot={-3} at={t.at('Cut off') - 2} color="#ffffff" />
      <Arrow x1={780} y1={545} x2={1280} y2={545} bow={-30} at={t.at('Cut off') + 2} />
      <Note text="U.S." x={1320} y={490} size={60} rot={-3} at={t.at('Cut off') + 4} color="#ffffff" />
      {g >= x && <div style={{position: 'absolute', left: 990, top: 470, fontFamily: JF.sans, fontWeight: 800, fontSize: 90, color: pal.subject, textShadow: '0 3px 12px rgba(0,0,0,0.8)',
        transform: `scale(${interpolate(g, [x, x + 3, x + 6], [1.35, 0.95, 1], clamp)})`}}>✕</div>}
      <Note text="the thinking: slavery would slowly starve" x={170} y={740} size={56} rot={-3} at={t.at('slavery would') - 2} color={ORANGE} />
    </AbsoluteFill>
  );
};

/** Hold that thought: the card that chapter 4 comes back to. */
const Hold: React.FC<{t: TL}> = ({t}) => {
  const pal = usePal();
  return (
    <AbsoluteFill>
      <DarkPaper />
      <Note text="hold that thought" x={350} y={160} size={58} rot={-3} at={t.at('Hold that') - 2} color="#ffffff" />
      <HeldNote at={t.at('Hold that')} />
      <Note text="that is not what happened." x={420} y={720} size={70} rot={-3} at={t.at('not what happened') - 4} color={pal.subject} />
    </AbsoluteFill>
  );
};

const Body: React.FC = () => {
  const t = makeTimeline(N, 30);
  const at = t.at;
  const cuts: [number, React.ReactNode][] = [
    [0, <Rewind t={t} />],
    [at('Most of them') - 1, <OldSouth t={t} />],
    [at('And tobacco') - 1, <Tobacco t={t} />],
    [at('So plenty') - 1, <Fade t={t} />],
    [at('Leaders like') - 1, <Founders t={t} />],
    [at('The Constitution') - 1, <DateSet t={t} />],
    [at('And on January') - 1, <Ban t={t} />],
    [at('Hold that') - 1, <Hold t={t} />],
  ];
  const scene = useScene(cuts);
  const notes = ['rewind', 'first United', '700,000', 'Virginia', 'Maryland', 'Carolinas', 'growing', 'in trouble', 'brutal', 'After a few', 'switching', 'far fewer',
    'So plenty', 'on its own', 'wrote that', 'slavery was wrong', 'kept enslaving', 'more than a hundred', 'for the rest', 'The Constitution', 'set a date', 'Congress', 'bringing',
    'took effect', 'Cut off', 'slavery would', 'Hold that', 'not what happened'];
  return (
    <>
      {scene}
      {cuts.slice(1).map(([f], i) => <Sfx key={i} at={f} src="sfx/whoosh.wav" volume={0.3} />)}
      {['1790', 'slowly fade', 'January'].map((c) => <Sfx key={c} at={at(c)} src="sfx/stamp.wav" volume={0.28} />)}
      {notes.map((c) => <Sfx key={c} at={at(c) - 2} src={WRITE.src} volume={WRITE.volume} />)}
      {[at('Hold that') + 4, at('Hold that') + 10].map((f) => <Sfx key={f} at={f} src={WRITE.src} volume={WRITE.volume} />)}
    </>
  );
};

export const Ch02: React.FC = () => (
  <ChapterShell n={N} audio="audio/ch02_supposed_to_die.wav" lead={LEAD} music={[{src: cue('founding', 'r_ending'), volume: 0.13}]}>
    <Body />
  </ChapterShell>
);
