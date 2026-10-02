// Chapter 10 · Grip Tighter (heavy, quiet palette; the answer to the driving question): blame on outsiders; Virginia's
// debate and Randolph's plan; the 73–58 vote as two tallies; the harsher laws; Calhoun's "positive good"; then the
// answer: the seed, the census to 1860, the wealth chart, the pyramid, the choice, the darkened sky again, and a quiet map.
import React from 'react';
import {AbsoluteFill, Audio, interpolate, random, Sequence, staticFile, useCurrentFrame} from 'remotion';
import words from '../../public/audio/ch10_grip_tighter.words.json';
import {clamp} from '../lib/anim';
import {Arrow, Highlight, JF, Note, Tag, useGFrame, usePal} from '../kit/Kit';
import {DarkPaper, Sfx, WRITE} from '../kit/common';
import {type Cam, MapScene, Pin, PLACES} from '../kit/map';
import {Bars, HBars} from '../kit/charts';
import {Counter, cue, Doc, Gen, sizeOf, Underline} from '../kit/gt';
import {ChapterShell, chapterFrames, CropCard, Definition, LEAD, makeTimeline, type Narration, Quote, type TL, useScene} from '../kit/shell';
import {MASKS} from '../masks';
import {ENSLAVED, VALUE_1860} from '../data/charts';

const N = words as Narration;
export const CH10_FRAMES = chapterFrames(N, LEAD);
const T0 = makeTimeline(N, 30);
/** The hand-off from the grip cue to r_ending, so r_ending's last dark chord (~54 s in) lands under "the whole country came to tearing apart". */
const XF = T0.at('Then the cotton') - 3;

const BONE = '#EDE7DC';
const MAPTAG = 'Samuel Augustus Mitchell, Map of the United States, 1836 · Library of Congress';
const RANDOLPH = 'img/ch10/thomas_jefferson_randolph.jpg';
const CALHOUN = 'img/ch10/calhoun_brady_1849.jpg';
const GIN = 'img/ch03/whitney_patent_drawing_1794.jpg';

/** A plain statement in bone Playfair: no write-on, a short fade; `dim` fades it back later. */
const Plain: React.FC<{text: string; x: number; y: number; at: number; size?: number; dim?: number}> = ({text, x, y, at, size = 56, dim = 1}) => {
  const g = useGFrame();
  if (g < at) return null;
  return (
    <div style={{position: 'absolute', left: x, top: y, whiteSpace: 'nowrap', fontFamily: JF.heavy, fontWeight: 700, fontSize: size, lineHeight: 1.3, color: BONE,
      textShadow: '0 3px 14px #000', opacity: interpolate(g, [at, at + 8], [0, 1], clamp) * dim}}>{text}</div>
  );
};

/** What did Southampton mean? Most blamed outsiders. */
const Meant: React.FC<{t: TL}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Note text="what did Southampton mean?" x={160} y={150} size={60} rot={-3} at={t.at('decide') - 2} color="#ffffff" />
    <Note text="most white Southerners blamed outsiders:" x={200} y={340} size={54} rot={-3} at={t.at('Most white') - 2} />
    <Note text="Northern abolitionist newspapers" x={300} y={500} size={54} rot={-2} at={t.at('Northern') - 2} color="#ffffff" />
    <Note text="pamphlets smuggled in on ships" x={300} y={620} size={54} rot={-2} at={t.at('pamphlets') - 2} color="#ffffff" />
    <Arrow x1={250} y1={460} x2={285} y2={540} bow={-14} at={t.at('Northern')} />
    <Arrow x1={240} y1={470} x2={285} y2={665} bow={-30} at={t.at('pamphlets')} />
  </AbsoluteFill>
);

/** But in Virginia, some lawmakers asked about slavery itself. */
const Virginia: React.FC<{t: TL}> = ({t}) => {
  const keys: Cam[] = [
    {f: t.at('But in Virginia') - 1, x: 2750, y: 2380, s: 0.42},
    {f: t.at('some lawmakers') + 4, x: 2960, y: 2335, s: 0.8},
  ];
  return (
    <MapScene keys={keys} dim={0.4}>
      {(S) => {
        const [rx, ry] = S(PLACES.richmond);
        return (
          <>
            <Pin x={rx} y={ry} at={t.at('some lawmakers')} />
            <Note text="Richmond" x={rx + 30} y={ry - 90} size={46} rot={-3} at={t.at('some lawmakers')} />
            <Note text="some lawmakers said what others wouldn't" x={110} y={110} size={50} rot={-3} at={t.at('said what') - 2} color="#ffffff" />
            <Note text="maybe the problem wasn't pamphlets." x={140} y={770} size={52} rot={-3} at={t.at('Maybe the problem') - 2} />
            <Note text="maybe it was slavery." x={160} y={880} size={62} rot={-3} at={t.at('Maybe it was') - 2} />
            <Tag text={MAPTAG} x={44} y={40} />
          </>
        );
      }}
    </MapScene>
  );
};

/** January 1832: two weeks of debate (painting). */
const Debate: React.FC<{t: TL}> = ({t}) => (
  <Gen name="ch10_house_of_delegates" label="Virginia House of Delegates, Richmond, January 1832" a={t.at('In January') - 1} b={t.at('Thomas')}>
    <Note text="Jan. 1832" x={110} y={100} size={62} rot={-3} at={t.at('January') - 2} color="#ffffff" />
    <Note text="two weeks of debate" x={130} y={210} size={54} rot={-3} at={t.at('two weeks') - 2} />
  </Gen>
);

/** Thomas Jefferson Randolph and gradual emancipation. */
const Randolph: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const a = t.at('Thomas') - 1;
  return (
    <AbsoluteFill>
      <DarkPaper />
      <CropCard src={RANDOLPH} size={sizeOf(RANDOLPH)} x={150} y={160} w={540} h={740} fx={320} fy={366} scale={1.05} rot={-2} at={a} mask={MASKS.randolph} traceAt={a + 4} />
      <Note text="Thomas Jefferson Randolph" x={820} y={150} size={54} rot={-3} at={t.at('Thomas') - 2} color="#ffffff" />
      <Note text="Jefferson's grandson" x={850} y={260} size={52} rot={-3} at={t.at('grandson') - 2} />
      {g >= t.at('gradual') && <Highlight text="GRADUAL EMANCIPATION" x={800} y={420} size={74} at={t.at('gradual')} seed={101} rot={-2} />}
      <Definition term="grad·u·al e·man·ci·pa·tion" def="a plan to end slavery slowly, over many years" at={t.at('gradual') + 9} x={820} y={570} w={980} />
      <Tag text="Charles Willson Peale, Thomas Jefferson Randolph · Monticello" />
    </AbsoluteFill>
  );
};

/** n tally marks in groups of five, drawn on over `dur` frames. */
const Tally: React.FC<{n: number; x: number; y: number; at: number; dur?: number; h?: number}> = ({n, x, y, at, dur = 18, h = 74}) => {
  const g = useGFrame();
  const pal = usePal();
  if (g < at) return null;
  const k = Math.round(n * interpolate(g, [at, at + dur], [0, 1], clamp));
  const marks: React.ReactNode[] = [];
  for (let i = 0; i < k; i++) {
    const grp = Math.floor(i / 5);
    const j = i % 5;
    const gx = x + grp * 84;
    const w = (s: string) => (random(`ty${s}${i}`) - 0.5) * 5;
    marks.push(j < 4
      ? <line key={i} x1={gx + j * 15 + w('a')} y1={y + w('b')} x2={gx + j * 15 + w('c')} y2={y + h + w('d')} stroke={pal.mark} strokeWidth={6} strokeLinecap="round" />
      : <line key={i} x1={gx - 8} y1={y + h - 12} x2={gx + 54} y2={y + 12} stroke={pal.mark} strokeWidth={6} strokeLinecap="round" />);
  }
  return <svg style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}} width={1920} height={1080}>{marks}</svg>;
};

/** The closest vote: 73 to 58, counted as marks, not stamped. */
const Vote: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const row = (label: string, n: number, y: number, at: number) => g >= at && (
    <>
      <div style={{position: 'absolute', left: 160, top: y - 14, fontFamily: JF.display, fontSize: 100, lineHeight: 1, color: BONE, textShadow: '0 4px 16px rgba(0,0,0,0.8)',
        opacity: interpolate(g, [at, at + 6], [0, 1], clamp)}}>{n}</div>
      <div style={{position: 'absolute', left: 300, top: y + 22, fontFamily: JF.mono, fontSize: 26, letterSpacing: 3, color: 'rgba(255,255,255,0.8)'}}>{label}</div>
      <Tally n={n} x={470} y={y} at={at} />
    </>
  );
  return (
    <AbsoluteFill>
      <DarkPaper />
      <Note text="the closest vote:" x={160} y={110} size={52} rot={-3} at={t.at('closest') - 2} color="#ffffff" />
      <Note text="should they even start writing a law to end slavery?" x={190} y={210} size={50} rot={-3} at={t.at('on whether') - 2} />
      {row('NO', 73, 420, t.at('73'))}
      {row('YES', 58, 600, t.at('58'))}
      <Note text="it failed." x={180} y={820} size={66} rot={-3} at={t.at('failed') - 2} color="#ffffff" />
      <Tag text="Journal of the Virginia House of Delegates, January 25, 1832" />
    </AbsoluteFill>
  );
};

/** The South went the other way: Virginia's ban on Black preachers. */
const OtherWay: React.FC<{t: TL}> = ({t}) => {
  const keys: Cam[] = [
    {f: t.at('And then the South') - 1, x: 2800, y: 2380, s: 0.5},
    {f: t.at('States across'), x: 2820, y: 2370, s: 0.56},
  ];
  return (
    <MapScene keys={keys} dim={0.5}>
      {() => (
        <>
          <Note text="the South went the other way" x={110} y={110} size={58} rot={-3} at={t.at('other way') - 4} color="#ffffff" />
          <Note text="Virginia, 1832:" x={140} y={760} size={52} rot={-3} at={t.at('Virginia banned') - 2} color="#ffffff" />
          <Note text="Black preachers banned from holding meetings" x={160} y={860} size={52} rot={-3} at={t.at('Black preachers') - 2} />
          <Tag text={MAPTAG} x={44} y={40} />
        </>
      )}
    </MapScene>
  );
};

/** Slave codes, tightened: the list. */
const Codes: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const items: [string, string][] = [
    ['curfews', 'curfews'],
    ['passes', 'passes to travel'],
    ['bans', 'bans on gatherings'],
    ['more laws', 'laws against teaching enslaved people to read'],
  ];
  return (
    <AbsoluteFill>
      <DarkPaper />
      {g >= t.at('slave codes') && <Highlight text="SLAVE CODES" x={120} y={100} size={100} at={t.at('slave codes')} seed={103} rot={-2} />}
      <Definition term="slave codes" def="the laws that controlled enslaved people's lives" at={t.at('slave codes') + 9} x={140} y={270} w={1300} />
      {items.map(([c, text], i) => <Note key={c} text={`· ${text}`} x={200} y={440 + i * 112} size={52} rot={-2} at={t.at(c) - 2} />)}
      <Note text="tightened across the South" x={1180} y={140} size={46} rot={-3} at={t.at('tightened') - 2} color="#ffffff" />
    </AbsoluteFill>
  );
};

/** Calhoun: "a positive good." */
const Calhoun: React.FC<{t: TL}> = ({t}) => {
  const a = t.at('A few years') - 1;
  return (
    <AbsoluteFill>
      <DarkPaper />
      <CropCard src={CALHOUN} size={sizeOf(CALHOUN)} x={150} y={160} w={540} h={740} fx={484} fy={625} scale={0.6} rot={2} at={a} mask={MASKS.calhoun} traceAt={t.at('Calhoun') + 2} />
      <Note text="John C. Calhoun · South Carolina" x={800} y={140} size={50} rot={-3} at={t.at('John C') - 2} color="#ffffff" />
      <Note text="U.S. Senate, 1837" x={830} y={240} size={50} rot={-3} at={t.at('Senate') - 2} />
      <Quote text="instead of an evil, a good—a positive good." at={t.at('called slavery') - 1} x={810} y={420} w={1000} size={64} who="John C. Calhoun, U.S. Senate, 1837" />
      <Tag text="Mathew Brady, John C. Calhoun, daguerreotype, 1849 · Beinecke Library, Yale" />
    </AbsoluteFill>
  );
};

/** The driving question, asked again. */
const Question: React.FC<{t: TL}> = ({t}) => {
  const pal = usePal();
  return (
    <AbsoluteFill>
      <DarkPaper />
      <Note text="back to our question:" x={200} y={180} size={60} rot={-3} at={t.at('back to our') - 2} color="#ffffff" />
      <Note text="why did the South" x={260} y={320} size={88} rot={-3} at={t.at('Why did') - 2} />
      <Note text="hold on tighter" x={300} y={470} size={96} rot={-3} at={t.at('hold on') - 2} color={pal.subject} />
      <Note text="than ever?" x={340} y={620} size={88} rot={-3} at={t.at('than ever') - 2} />
    </AbsoluteFill>
  );
};

/** Go back to that seed: 1790, then the gin. */
const Seed: React.FC<{t: TL}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Counter year={1790} from={ENSLAVED[0].n} to={ENSLAVED[0].n} at={t.at('In 1790') - 2} dur={1} />
    <Note text="(it starts with a seed)" x={160} y={120} size={50} rot={-4} at={t.at('seed') - 4} color="#ffffff" />
    <Note text="1790: slavery might fade" x={180} y={280} size={58} rot={-3} at={t.at('In 1790') - 2} />
    <Doc src={GIN} x={1240} y={250} w={420} at={t.at('cotton gin') - 1} rot={2} push={[t.at('cotton gin'), t.at('By 1860')]} zoom={1.08}
      marks={[{ellipse: [1818, 2246, 850, 610], at: t.at('cotton gin') + 4, tint: true, seed: 5}]} />
    <Note text="then: the cotton gin" x={200} y={430} size={58} rot={-3} at={t.at('Then the cotton') - 2} />
    <Arrow x1={900} y1={485} x2={1200} y2={470} bow={-30} at={t.at('cotton gin') + 4} />
    <Note text="enslaved people became the engine" x={200} y={590} size={52} rot={-3} at={t.at('engine') - 4} />
    <Note text="of America's most valuable export" x={230} y={690} size={52} rot={-3} at={t.at('most valuable') - 2} />
    <Tag text="Eli Whitney, cotton gin patent drawing, March 14, 1794 · National Archives" />
  </AbsoluteFill>
);

/** By 1860: the full census run, the counter ticking to four million. */
const Count: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const a = t.at('By 1860');
  return (
    <AbsoluteFill>
      <DarkPaper />
      {g >= a && <Highlight text="ENSLAVED PEOPLE COUNTED" x={110} y={70} size={74} at={a} seed={105} rot={-2} />}
      <Counter year={1860} from={ENSLAVED[0].n} to={ENSLAVED[ENSLAVED.length - 1].n} at={a} dur={30} />
      <Bars x={200} y={260} w={1520} h={560} max={4.2e6} at={a - 6} per={3} bars={ENSLAVED.map((d) => ({label: String(d.year), value: d.n, subject: d.year === 1860,
        show: d.n >= 1e6 ? `${(d.n / 1e6).toFixed(1)}M` : `${Math.round(d.n / 1000)}K`}))} />
      <Note text="four million people" x={250} y={330} size={54} rot={-3} at={t.at('four million') - 2} />
      <Tag text="U.S. Census, 1790–1860" />
    </AbsoluteFill>
  );
};

/** Worth more than all the railroads and factories combined. */
const Wealth: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const a = t.at('worth');
  const vx = 160 + (VALUE_1860.enslaved / 3.2e9) * 1150 + 24;
  return (
    <AbsoluteFill>
      <DarkPaper />
      {g >= a && <Highlight text="WHERE THE WEALTH WAS, 1860" x={110} y={70} size={84} at={a} seed={107} rot={-2} />}
      <HBars x={160} y={400} w={1150} rowH={130} gap={190} max={3.2e9} at={a + 2} rows={[
        {label: 'four million enslaved people, counted as property', parts: [{label: 'enslaved', value: VALUE_1860.enslaved, subject: true}]},
        {label: 'all the railroads + all the factories', parts: [{label: 'railroads', value: VALUE_1860.railroads}, {label: 'factories', value: VALUE_1860.manufacturing}]},
      ]} />
      <Underline x1={vx} x2={vx + 370} y={505} at={t.at('combined')} seed={6} />
      <Note text="letting go = giving up the biggest pile of wealth in the country" x={160} y={900} size={44} rot={-2} at={t.at('Letting go') - 2} color="#ffffff" />
      <Tag text="Historical Statistics of the U.S., Bb213 · U.S. Census 1860" x={44} y={1030} />
    </AbsoluteFill>
  );
};

/** The pyramid from ch05, now standing on slavery. `on` lights one tier. */
const TIERS = [
  {key: 'planters', label: 'PLANTERS', y0: 150, y1: 360},
  {key: 'yeomen', label: 'YEOMEN', y0: 360, y1: 570},
  {key: 'poor', label: 'POOR WHITES', y0: 570, y1: 780},
];
const APEX = {x: 560, y: 150};
const BASE = {y: 780, half: 400};
const halfAt = (y: number) => ((y - APEX.y) / (BASE.y - APEX.y)) * BASE.half;
const Pyramid: React.FC<{at: number; on?: string; slabAt: number}> = ({at, on, slabAt}) => {
  const g = useGFrame();
  const pal = usePal();
  const p = interpolate(g, [at, at + 12], [0, 1], clamp);
  const q = interpolate(g, [slabAt, slabAt + 10], [0, 1], clamp);
  const j = (k: string, i: number) => (random(`gp${k}${i}`) - 0.5) * 6;
  const sx0 = APEX.x - BASE.half - 30;
  const sx1 = APEX.x + BASE.half + 30;
  return (
    <svg style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}} width={1920} height={1080}>
      {TIERS.map((tr) => {
        const a = halfAt(tr.y0);
        const b = halfAt(tr.y1);
        const d = `M${APEX.x - a},${tr.y0} L${APEX.x + a},${tr.y0} L${APEX.x + b},${tr.y1} L${APEX.x - b},${tr.y1} Z`;
        return <path key={tr.key} d={d} fill={on === tr.key ? pal.subject : 'rgba(237,231,220,0.10)'} opacity={p >= 1 ? (on === tr.key ? 0.85 : 1) : 0} />;
      })}
      <path d={`M${APEX.x + j('a', 0)},${APEX.y} L${APEX.x + BASE.half + j('b', 1)},${BASE.y} L${APEX.x - BASE.half + j('c', 2)},${BASE.y} Z`}
        fill="none" stroke={pal.mark} strokeWidth={6} strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
      {TIERS.slice(1).map((tr, i) => p >= 1 && <line key={tr.key} x1={APEX.x - halfAt(tr.y0) + 6} y1={tr.y0 + j('l', i)} x2={APEX.x + halfAt(tr.y0) - 6} y2={tr.y0 - j('r', i)} stroke={pal.mark} strokeWidth={4} />)}
      {p >= 1 && TIERS.map((tr) => (
        <text key={tr.key} x={APEX.x + halfAt((tr.y0 + tr.y1) / 2) + 40} y={(tr.y0 + tr.y1) / 2 + 22} style={{fontFamily: JF.display, fontSize: 56, fill: '#f4efe6'}}>{tr.label}</text>
      ))}
      {q > 0 && (
        <>
          <path d={`M${sx0},${BASE.y + 14} L${sx1},${BASE.y + 14 + j('s', 1)} L${sx1 + j('s', 2)},${BASE.y + 104} L${sx0},${BASE.y + 104 + j('s', 3)} Z`} fill="rgba(0,0,0,0.3)"
            stroke={pal.mark} strokeWidth={6} strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - q} />
          {q >= 1 && <text x={APEX.x} y={BASE.y + 78} textAnchor="middle" style={{fontFamily: JF.display, fontSize: 52, letterSpacing: 4, fill: '#f4efe6'}}>SLAVERY</text>}
        </>
      )}
    </svg>
  );
};
const Held: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  return (
    <AbsoluteFill>
      <DarkPaper />
      <Pyramid at={t.at('And it wasnt') - 1} slabAt={t.at('Slavery held')} on={g >= t.at('poorest') ? 'poor' : undefined} />
      <Note text="and it wasn't only money" x={1100} y={110} size={50} rot={-3} at={t.at('only money') - 4} color="#ffffff" />
      <Note text="slavery held up the whole pyramid" x={1040} y={210} size={44} rot={-3} at={t.at('Slavery held') - 2} />
      <Note text="even the poorest white farmer:" x={1060} y={820} size={46} rot={-3} at={t.at('poorest') - 4} />
      <Note text="it told him who he was" x={1090} y={915} size={50} rot={-3} at={t.at('who he was') - 2} color="#ffffff" />
    </AbsoluteFill>
  );
};

/** The system could be fought; the South had a choice. */
const Choice: React.FC<{t: TL}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Note text="Nat Turner showed the system could be fought" x={160} y={330} size={58} rot={-3} at={t.at('showed') - 2} />
    <Note text="the South had a choice." x={200} y={500} size={66} rot={-3} at={t.at('had a choice') - 2} color="#ffffff" />
  </AbsoluteFill>
);

/** Loosen or tighten. It tightened. */
const Tightened: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const done = t.at('It tightened');
  const dim = interpolate(g, [done, done + 8], [1, 0.3], clamp);
  return (
    <AbsoluteFill>
      <DarkPaper />
      <Plain text="Loosen its grip," x={200} y={240} at={t.at('Loosen')} size={84} dim={dim} />
      <Plain text="or tighten it." x={1040} y={240} at={t.at('or tighten')} size={84} />
      {g >= done && <Highlight text="IT TIGHTENED." x={560} y={470} size={130} at={done} seed={109} rot={-2} />}
      <Note text="more laws." x={300} y={760} size={62} rot={-3} at={t.at('More laws', 2) - 2} />
      <Note text="more patrols." x={800} y={760} size={62} rot={-3} at={t.at('More patrols') - 2} />
      <Note text="more fear." x={1330} y={760} size={62} rot={-3} at={t.at('More fear') - 2} color="#ffffff" />
    </AbsoluteFill>
  );
};

/** The same darkened sky as ch09. */
const Sky: React.FC<{t: TL}> = ({t}) => (
  <Gen name="ch01_eclipse" label="Southampton County, Virginia, February 1831: the eclipse" a={t.at('In February') - 1} b={t.at('And the tighter')}>
    <Note text="Feb. 1831: he saw a sign" x={110} y={100} size={54} rot={-3} at={t.at('saw a sign') - 2} color="#ffffff" />
    <Note text="Aug. 1831: the South saw one too" x={130} y={200} size={54} rot={-3} at={t.at('That August') - 2} />
    <Note text="they read it differently." x={130} y={870} size={60} rot={-3} at={t.at('They just') - 2} color="#ffffff" />
  </Gen>
);

/** The last frame: the map of the states, dimming. No marks. */
const End: React.FC<{t: TL}> = ({t}) => {
  const frame = useCurrentFrame();
  const a = t.at('And the tighter') - 1;
  const end = Math.ceil(N.duration * 30) + 30;
  const keys: Cam[] = [
    {f: a, x: 2350, y: 2450, s: 0.25},
    {f: end, x: 2350, y: 2450, s: 0.235},
  ];
  return (
    <MapScene keys={keys} dim={interpolate(frame, [a, end], [0.3, 0.68], clamp)}>
      {() => <Tag text={MAPTAG} />}
    </MapScene>
  );
};

const Body: React.FC = () => {
  const t = makeTimeline(N, 30);
  const at = t.at;
  const cuts: [number, React.ReactNode][] = [
    [0, <Meant t={t} />],
    [at('But in Virginia') - 1, <Virginia t={t} />],
    [at('In January') - 1, <Debate t={t} />],
    [at('Thomas') - 1, <Randolph t={t} />],
    [at('The closest') - 1, <Vote t={t} />],
    [at('And then the South') - 1, <OtherWay t={t} />],
    [at('States across') - 1, <Codes t={t} />],
    [at('A few years') - 1, <Calhoun t={t} />],
    [at('So back to') - 1, <Question t={t} />],
    [at('Go back') - 1, <Seed t={t} />],
    [at('By 1860') - 1, <Count t={t} />],
    [at('worth') - 1, <Wealth t={t} />],
    [at('And it wasnt') - 1, <Held t={t} />],
    [at('So when Nat') - 1, <Choice t={t} />],
    [at('Loosen') - 1, <Tightened t={t} />],
    [at('In February') - 1, <Sky t={t} />],
    [at('And the tighter') - 1, <End t={t} />],
  ];
  const scene = useScene(cuts);
  // marker sound at each note's start
  const notes = [
    at('decide') - 2, at('Most white') - 2, at('Northern') - 2, at('pamphlets') - 2,
    at('some lawmakers'), at('said what') - 2, at('Maybe the problem') - 2, at('Maybe it was') - 2, at('January') - 2, at('two weeks') - 2,
    at('Thomas') - 2, at('grandson') - 2, at('closest') - 2, at('on whether') - 2, at('failed') - 2,
    at('other way') - 4, at('Virginia banned') - 2, at('Black preachers') - 2, at('tightened') - 2,
    at('curfews') - 2, at('passes') - 2, at('bans') - 2, at('more laws') - 2, at('John C') - 2, at('Senate') - 2,
    at('back to our') - 2, at('Why did') - 2, at('hold on') - 2, at('than ever') - 2,
    at('seed') - 4, at('In 1790') - 2, at('Then the cotton') - 2, at('engine') - 4, at('most valuable') - 2, at('four million') - 2, at('Letting go') - 2,
    at('only money') - 4, at('Slavery held') - 2, at('poorest') - 4, at('who he was') - 2, at('showed') - 2, at('had a choice') - 2,
    at('More laws', 2) - 2, at('More patrols') - 2, at('More fear') - 2, at('saw a sign') - 2, at('That August') - 2, at('They just') - 2,
  ];
  return (
    <>
      {scene}
      <Sequence durationInFrames={XF + 30} layout="none">
        <Audio src={staticFile(cue('grip', 'r_nativism'))} volume={(f) => interpolate(f, [0, 20, XF - 10, XF + 25], [0, 0.12, 0.12, 0], clamp)} />
      </Sequence>
      {cuts.slice(1).map(([f], i) => <Sfx key={i} at={f} src="sfx/whoosh.wav" volume={0.2} />)}
      <Sfx at={at('some lawmakers')} src="sfx/tick.wav" volume={0.45} />
      {notes.map((f, i) => <Sfx key={`n${i}`} at={f} src={WRITE.src} volume={WRITE.volume} />)}
    </>
  );
};

export const Ch10: React.FC = () => (
  <ChapterShell n={N} audio="audio/ch10_grip_tighter.wav" lead={LEAD} quiet music={[{src: 'music/r_ending.mp3', volume: 0.12, from: XF}]}>
    <Body />
  </ChapterShell>
);
