// Chapter 6 · Sunup to Sundown (heavy, quiet palette): the base of the pyramid, field gangs from sunup to
// sundown, the daily weigh-in, women and children in the fields, rations and cabins, house versus field,
// Frederick Douglass and the alphabet, and the hand-off into chapter 7.
import React from 'react';
import {AbsoluteFill, Audio, interpolate, random, staticFile} from 'remotion';
import words from '../../public/audio/ch06_sunup.words.json';
import {clamp} from '../lib/anim';
import {Highlight, JF, Note, Tag, useGFrame, usePal} from '../kit/Kit';
import {DarkPaper, Sfx, WRITE} from '../kit/common';
import {Gen, sizeOf, Underline} from '../kit/gt';
import {ChapterShell, chapterFrames, CropCard, Definition, LEAD, makeTimeline, type Narration, PhotoCard, Quote, type TL, useScene} from '../kit/shell';
import {MASKS} from '../masks';

const N = words as Narration;
export const CH06_FRAMES = chapterFrames(N, LEAD);

const DOUGLASS = 'img/ch06/douglass_portrait.jpg';
const DTAG = 'Unidentified artist, Frederick Douglass, c. 1850, after a c. 1847 daguerreotype · National Portrait Gallery';
const BONE = '#EDE7DC';

/** A quiet line of bone type (Playfair) that fades in: for statements that should not be handwritten. */
const Line: React.FC<{text: string; x: number; y: number; at: number; size?: number; color?: string; italic?: boolean}> = ({text, x, y, at, size = 56, color = BONE, italic}) => {
  const g = useGFrame();
  if (g < at) return null;
  return (
    <div style={{position: 'absolute', left: x, top: y, fontFamily: JF.heavy, fontWeight: 700, fontStyle: italic ? 'italic' : undefined, fontSize: size, lineHeight: 1.2, color, whiteSpace: 'nowrap',
      textShadow: '0 3px 14px #000', opacity: interpolate(g, [at, at + 8], [0, 1], clamp)}}>{text}</div>
  );
};

/** Callback to chapter 5: the pyramid outline, standing on a bone slab. */
const Base: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const pal = usePal();
  const p = interpolate(g, [0, 12], [0, 1], clamp);
  const slab = interpolate(g, [t.at('pyramid') + 4, t.at('pyramid') + 14], [0, 1], clamp);
  const j = (k: string) => (random(`b6${k}`) - 0.5) * 6;
  return (
    <AbsoluteFill>
      <DarkPaper />
      <svg style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}} width={1920} height={1080}>
        <path d={`M${960 + j('a')},150 L${1380 + j('b')},700 L${540 + j('c')},700 Z`} fill="rgba(237,231,220,0.06)" stroke={pal.mark} strokeWidth={6} strokeLinejoin="round"
          pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
        {p >= 1 && [333, 516].map((y, i) => {
          const h = ((y - 150) / 550) * 420;
          return <line key={y} x1={960 - h + 6} y1={y + j(`l${i}`)} x2={960 + h - 6} y2={y - j(`r${i}`)} stroke={pal.mark} strokeWidth={3} opacity={0.6} />;
        })}
        <rect x={500} y={716} width={920 * slab} height={64} fill={BONE} opacity={0.92} />
      </svg>
      <Note text="the people it stood on" x={700} y={820} size={58} rot={-2} at={t.at('stood') - 2} />
    </AbsoluteFill>
  );
};

/** Field gangs, and the day drawn as the sun's arc from sunup to sundown (and past it at harvest). */
const Gangs: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const pal = usePal();
  const cx = 960;
  const cy = 940;
  const rx = 620;
  const ry = 300;
  const a0 = t.at('sunup');
  const a1 = t.at('sundown') + 10;
  const arc = interpolate(g, [a0, a1], [0, 1], clamp);
  const ang = Math.PI * (1 - arc);
  const sx = cx + rx * Math.cos(ang);
  const sy = cy - ry * Math.sin(ang);
  const pts = Array.from({length: 41}, (_, i) => {
    const a = Math.PI * (1 - i / 40);
    return `${i ? 'L' : 'M'}${(cx + rx * Math.cos(a)).toFixed(1)},${(cy - ry * Math.sin(a)).toFixed(1)}`;
  }).join(' ');
  const harvest = interpolate(g, [t.at('even longer'), t.at('even longer') + 10], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <DarkPaper />
      <Note text="most worked in the fields" x={130} y={90} size={50} rot={-2} at={t.at('most enslaved') - 2} color="#ffffff" />
      {g >= t.at('gangs') && <Highlight text="GANGS" x={130} y={190} size={100} at={t.at('gangs')} seed={61} rot={-2} />}
      <Definition term="gangs" def="groups of field workers driven together, row by row, all day" at={t.at('gangs') + 9} x={140} y={340} w={1100} />
      <svg style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}} width={1920} height={1080}>
        <line x1={240} y1={cy} x2={1680} y2={cy} stroke="rgba(237,231,220,0.5)" strokeWidth={3} />
        {g >= a0 && <path d={pts} fill="none" stroke={pal.mark} strokeWidth={4} strokeDasharray="14 12" opacity={0.75} pathLength={1000} style={{clipPath: `inset(0 ${(1 - arc) * 100}% 0 0)`}} />}
        {g >= a0 && <circle cx={sx} cy={sy} r={30} fill={BONE} stroke={pal.mark} strokeWidth={4} />}
        {harvest > 0 && <path d={`M${cx + rx},${cy} Q${cx + rx + 80},${cy + 40} ${cx + rx + 140 * harvest},${cy + 60 * harvest}`} fill="none" stroke={pal.mark} strokeWidth={4} strokeDasharray="6 10" />}
      </svg>
      <Note text="sunup" x={250} y={965} size={48} rot={-2} at={t.at('sunup') - 2} />
      <Note text="sundown" x={1480} y={965} size={48} rot={-2} at={t.at('sundown') - 2} />
      <Note text="at harvest: even longer" x={1280} y={560} size={46} rot={-3} at={t.at('At harvest') - 2} color="#ffffff" />
    </AbsoluteFill>
  );
};

/** The daily weigh-in (painting). */
const WeighIn: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  return (
    <Gen name="ch06_weighing_cotton" label="weighing cotton at day's end, Mississippi, c. 1850" a={t.at('At the end') - 1} b={t.at('Women worked')}>
      <AbsoluteFill style={{background: 'linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 45%, transparent 70%)'}} />
      {g >= t.at('weighed') && <Highlight text="THE DAILY WEIGH-IN" x={110} y={90} size={84} at={t.at('weighed')} seed={63} rot={-2} />}
      <Note text="every person's cotton, every day" x={130} y={240} size={46} rot={-2} at={t.at("each person's") - 2} color="#ffffff" />
      <Note text="fall short → whipped" x={130} y={780} size={56} rot={-2} at={t.at('Fall short') - 2} />
      <Note text="hit your number → the number goes up" x={130} y={880} size={56} rot={-2} at={t.at('Hit your') - 2} />
    </Gen>
  );
};

/** Women in the fields: plain notes, no pictures. */
const Women: React.FC<{t: TL}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Line text="Women worked the same hours as men." x={140} y={130} size={60} at={t.at('Women worked')} />
    <Note text="pregnant: in the fields until close to giving birth" x={180} y={330} size={50} rot={-2} at={t.at('Pregnant') - 2} />
    <Note text="sent back within weeks" x={180} y={450} size={50} rot={-2} at={t.at('then sent back') - 2} />
    <Note text="babies: brought to the field," x={180} y={600} size={50} rot={-2} at={t.at('bringing') - 2} color="#ffffff" />
    <Note text="or left with an older woman" x={260} y={700} size={50} rot={-2} at={t.at('or leaving') - 2} color="#ffffff" />
  </AbsoluteFill>
);

/** Children at work from five or six. */
const Children: React.FC<{t: TL}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Line text="Children started working at" x={140} y={150} size={60} at={t.at('Children started')} />
    <Note text="five or six years old" x={180} y={270} size={84} rot={-3} at={t.at('five or six') - 2} />
    <Note text="carrying water" x={260} y={500} size={52} rot={-2} at={t.at('carrying') - 2} color="#ffffff" />
    <Note text="pulling weeds" x={260} y={610} size={52} rot={-2} at={t.at('pulling') - 2} color="#ffffff" />
    <Note text="chasing birds away from the crops" x={260} y={720} size={52} rot={-2} at={t.at('chasing') - 2} color="#ffffff" />
  </AbsoluteFill>
);

/** Rations and clothing, with a row of quarters on the desk. */
const Rations: React.FC<{t: TL}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <PhotoCard src="img/ch06/hermitage_slave_quarters_savannah.jpg" x={1110} y={190} w={700} rot={2} at={t.at('Food was') - 1} />
    <Note text="slave quarters, Savannah, Georgia" x={1130} y={730} size={40} rot={-2} at={t.at('Food was') + 8} color="#ffffff" />
    <Note text="(photographed after the war)" x={1170} y={800} size={36} rot={-2} at={t.at('Food was') + 12} color="#ffffff" />
    <Note text="food: a weekly ration" x={130} y={170} size={54} rot={-2} at={t.at('weekly ration') - 2} />
    <Note text="mostly cornmeal, a little pork" x={170} y={280} size={50} rot={-2} at={t.at('cornmeal') - 2} color="#ffffff" />
    <Note text="clothing: 2 rough outfits a year" x={130} y={470} size={50} rot={-2} at={t.at('Clothing') - 2} />
    <Note text="one pair of shoes" x={170} y={580} size={50} rot={-2} at={t.at('one pair') - 2} color="#ffffff" />
    <Tag text="Wilson & Havens, Hermitage slave quarters, Savannah, Ga., c. 1867–85 · New York Public Library" />
  </AbsoluteFill>
);

/** The cabin (painting): an empty room. */
const Cabin: React.FC<{t: TL}> = ({t}) => (
  <Gen name="ch06_cabin_interior" label="inside a one-room cabin, c. 1850" a={t.at('Families slept') - 1} b={t.at('Some enslaved people')}>
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.55) 100%)'}} />
    <Note text="small wooden cabins" x={130} y={90} size={54} rot={-2} at={t.at('small wooden') - 2} />
    <Note text="dirt floors" x={130} y={190} size={50} rot={-2} at={t.at('dirt floors') - 2} color="#ffffff" />
    <Note text="sometimes two families to a cabin" x={130} y={840} size={50} rot={-2} at={t.at('sometimes two') - 2} />
    <Note text="beds of straw and rags" x={130} y={930} size={50} rot={-2} at={t.at('beds of straw') - 2} color="#ffffff" />
  </Gen>
);

/** House versus field. */
const House: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  return (
    <AbsoluteFill>
      <DarkPaper />
      {g >= t.at('house instead') && <Highlight text="IN THE OWNER'S HOUSE" x={130} y={100} size={84} at={t.at('house instead')} seed={65} rot={-2} />}
      <Note text="+ better food" x={170} y={270} size={52} rot={-2} at={t.at('better food') - 2} color="#ffffff" />
      <Note text="+ hand-me-down clothes" x={170} y={370} size={52} rot={-2} at={t.at('hand-me-down') - 2} color="#ffffff" />
      <Line text="But “better” is a relative word." x={140} y={540} size={66} at={t.at('But better')} />
      <Underline x1={420} x2={680} y={632} at={t.at('relative word')} seed={6} width={4} />
      <Note text="living under the owner's eye" x={170} y={730} size={56} rot={-2} at={t.at('living under') - 2} />
      <Note text="day and night" x={260} y={840} size={56} rot={-2} at={t.at('day and night') - 2} />
    </AbsoluteFill>
  );
};

/** Frederick Douglass: the daguerreotype on the left, the Baltimore story on the right. */
const Douglass: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  return (
    <AbsoluteFill>
      <DarkPaper />
      <CropCard src={DOUGLASS} size={sizeOf(DOUGLASS)} x={190} y={110} w={600} h={820} fx={2887} fy={1060} scale={0.552} rot={-1.5} at={t.at('As a boy') - 1} mask={MASKS.douglass}
        traceAt={t.at('Frederick Douglass') + 2} />
      {g >= t.at('Frederick Douglass') && <Highlight text="FREDERICK DOUGLASS" x={900} y={130} size={80} at={t.at('Frederick Douglass')} seed={67} rot={-2} />}
      <Note text="as a boy, in Baltimore" x={930} y={300} size={52} rot={-2} at={t.at('in Baltimore') - 4} color="#ffffff" />
      <Note text="learning the alphabet" x={930} y={430} size={56} rot={-2} at={t.at('alphabet') - 2} />
      <Note text="until the man of the house" x={930} y={580} size={52} rot={-2} at={t.at('until the man') - 2} />
      <Note text="found out and stopped it" x={990} y={680} size={52} rot={-2} at={t.at('found out') - 2} />
      <Tag text={DTAG} />
    </AbsoluteFill>
  );
};

/** Hugh Auld's words, as Douglass recorded them. */
const Unfit: React.FC<{t: TL}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Quote text="It would forever unfit him to be a slave." at={t.at('Reading the man') - 1} x={170} y={330} w={1640} size={78}
      who="Hugh Auld, as quoted in Frederick Douglass, Narrative, 1845" />
    <Note text="so that was exactly why he had to learn." x={220} y={620} size={60} rot={-2} at={t.at('Douglass decided') - 2} />
  </AbsoluteFill>
);

/** End of the chapter: a dark, quiet frame. */
const Dangerous: React.FC<{t: TL}> = ({t}) => (
  <AbsoluteFill style={{background: 'radial-gradient(ellipse at 45% 50%, #17150f 0%, #080706 75%)'}}>
    <Line text="For an enslaved woman, being close to the owner" x={180} y={400} size={54} at={t.at('And for an') + 6} color="rgba(237,231,220,0.75)" />
    <Line text="could be the most dangerous place of all." x={180} y={500} size={64} at={t.at('the most dangerous')} />
  </AbsoluteFill>
);

const Body: React.FC = () => {
  const t = makeTimeline(N, 30);
  const at = t.at;
  const cuts: [number, React.ReactNode][] = [
    [0, <Base t={t} />],
    [at('On a cotton') - 1, <Gangs t={t} />],
    [at('At the end') - 1, <WeighIn t={t} />],
    [at('Women worked') - 1, <Women t={t} />],
    [at('Children started') - 1, <Children t={t} />],
    [at('Food was') - 1, <Rations t={t} />],
    [at('Families slept') - 1, <Cabin t={t} />],
    [at('Some enslaved people') - 1, <House t={t} />],
    [at('As a boy') - 1, <Douglass t={t} />],
    [at('Reading the man') - 1, <Unfit t={t} />],
    [at('And for an') - 1, <Dangerous t={t} />],
  ];
  const scene = useScene(cuts);
  const notes = ['stood', 'most enslaved', 'sunup', 'sundown', 'At harvest', "each person's", 'Fall short', 'Hit your', 'Pregnant', 'then sent back', 'bringing', 'or leaving', 'five or six',
    'carrying', 'pulling', 'chasing', 'weekly ration', 'cornmeal', 'Clothing', 'one pair', 'small wooden', 'dirt floors', 'sometimes two', 'beds of straw', 'better food', 'hand-me-down',
    'living under', 'day and night', 'alphabet', 'until the man', 'found out', 'Douglass decided'];
  // r_dix for the field and the cabins only (its hopeful rise comes later), then j_grief from the house beat.
  const dixOut = at('Families slept');
  return (
    <>
      {scene}
      <Audio src={staticFile('music/r_dix.mp3')} volume={(f) => interpolate(f, [0, 20, dixOut - 75, dixOut + 30], [0, 0.12, 0.12, 0], clamp)} />
      {cuts.slice(1).map(([f], i) => <Sfx key={i} at={f} src="sfx/whoosh.wav" volume={0.2} />)}
      {notes.map((c) => <Sfx key={c} at={at(c) - 2} src={WRITE.src} volume={0.16} />)}
    </>
  );
};

export const Ch06: React.FC = () => {
  const t = makeTimeline(N, 30);
  return (
    <ChapterShell n={N} audio="audio/ch06_sunup.wav" lead={LEAD} quiet music={[{src: 'music/j_grief.mp3', volume: 0.12, from: t.at('Some enslaved people')}]}>
      <Body />
    </ChapterShell>
  );
};
