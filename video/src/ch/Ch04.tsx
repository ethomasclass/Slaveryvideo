// Chapter 4 · Sold South: the 1808 card from chapter 2 comes back, the Upper South sells people to the Deep South
// (the domestic slave trade, the Second Middle Passage, coffles and ships to New Orleans), families are sold apart,
// people are counted as money, and the census shows slavery nearly tripled by 1830. Restrained: few notes, no
// stamped human numbers except the census counter.
import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import words from '../../public/audio/ch04_sold_south.words.json';
import {clamp} from '../lib/anim';
import {Arrow, Highlight, Loop, Note, Tag, useGFrame, usePal} from '../kit/Kit';
import {DarkPaper, Sfx, WRITE} from '../kit/common';
import {type Cam, MapScene, Pin, PLACES, type Pt, Region, Route, smooth} from '../kit/map';
import {Bars} from '../kit/charts';
import {Counter, Gen, sizeOf} from '../kit/gt';
import {ChapterShell, chapterFrames, CropCard, Definition, LEAD, makeTimeline, type Narration, Photo, PhotoCard, Quote, type TL, useScene} from '../kit/shell';
import {ENSLAVED, TRADE_BY_DECADE} from '../data/charts';
import {HeldNote} from './Ch02';

const N = words as Narration;
export const CH04_FRAMES = chapterFrames(N, LEAD);

const MAPTAG = 'Samuel Augustus Mitchell, Map of the United States, 1836 · Library of Congress';

/** "Remember 1808?" The card from chapter 2, its expectation crossed out. */
const Remember: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  return (
    <AbsoluteFill>
      <DarkPaper />
      <Note text="remember 1808?" x={350} y={130} size={60} rot={-3} at={t.at('remember') - 2} color="#ffffff" />
      <HeldNote at={-30} strike={t.at('It actually')} />
      <Note text="it made the people already enslaved in America…" x={350} y={680} size={50} rot={-3} at={t.at('already enslaved') - 4} color="#ffffff" />
      {g >= t.at('more valuable') && <Highlight text="MORE VALUABLE" x={380} y={800} size={120} at={t.at('more valuable')} seed={45} rot={-2} />}
    </AbsoluteFill>
  );
};

/** Supply and demand on the map: the Upper South's surplus, the Deep South's hunger, and the trade between them. */
const UPPER: Pt[] = [[2900, 2030], [3080, 2090], [3110, 2380], [2950, 2450], [2600, 2450], [2480, 2380], [2650, 2230], [2820, 2130]];
const DEEP: Pt[] = [[1600, 2660], [2080, 2700], [2110, 3000], [2030, 3260], [1760, 3290], [1560, 3400], [1270, 3360], [1230, 3150], [1380, 2960], [1520, 2780]];
const Surplus: React.FC<{t: TL}> = ({t}) => {
  const keys: Cam[] = [
    {f: t.at('Virginia and Maryland') - 2, x: 2650, y: 2500, s: 0.75},
    {f: t.at('Cotton planters'), x: 2450, y: 2720, s: 0.62},
  ];
  return (
    <MapScene keys={keys} dim={0.25} svg={() => (
      <>
        <Region pts={UPPER} at={t.at('Virginia and Maryland')} width={9} />
        <Region pts={DEEP} at={t.at('Alabama') - 4} width={9} />
      </>
    )}>
      {(S) => {
        const [vx, vy] = S(PLACES.virginia);
        const [ax, ay] = S(PLACES.alabama);
        const [mx, my] = S(PLACES.mississippi);
        const [lx, ly] = S(PLACES.louisiana);
        return (
          <>
            <Note text="Virginia & Maryland" x={vx - 120} y={vy - 170} size={50} rot={-3} at={t.at('Virginia and Maryland') - 2} />
            <Note text="more enslaved workers" x={vx + 40} y={vy + 110} size={42} rot={-3} at={t.at('more enslaved') - 2} color="#ffffff" />
            <Note text="than tired fields needed" x={vx + 60} y={vy + 190} size={42} rot={-3} at={t.at('tired tobacco') - 2} color="#ffffff" />
            <Note text="Alabama" x={ax - 40} y={ay + 20} size={46} rot={-3} at={t.at('Alabama') - 2} />
            <Note text="Mississippi" x={mx - 200} y={my - 110} size={46} rot={-3} at={t.at('Mississippi') - 2} />
            <Note text="Louisiana" x={lx - 130} y={ly + 10} size={46} rot={-3} at={t.at('Louisiana') - 2} />
            <Note text="couldn't get enough" x={ax + 60} y={ay + 150} size={50} rot={-3} at={t.at("couldn't get") - 2} color="#ffffff" />
            <Arrow x1={vx - 120} y1={vy + 100} x2={ax + 70} y2={ay - 70} bow={60} width={7} at={t.at('selling people') - 2} dur={10} />
            <Note text="sold south" x={vx - 520} y={vy + 40} size={54} rot={-3} at={t.at('selling people') - 2} />
            <Tag text={MAPTAG} />
          </>
        );
      }}
    </MapScene>
  );
};

/** Vocab: the domestic slave trade, on a trading firm's own sign. */
const PB = 'img/ch04/price_birch_alexandria.jpg';
const Trade: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const sc = 912 / sizeOf(PB)[0];
  return (
    <AbsoluteFill>
      <DarkPaper />
      <PhotoCard src={PB} x={860} y={90} w={960} rot={2} at={t.at('This is called') - 1} />
      <Loop cx={884 + 760 * sc + 6} cy={114 + 265 * sc} rx={300} ry={72} at={t.at('domestic') + 4} seed={9} tilt={2} />
      <Note text="a slave-trading firm" x={110} y={220} size={50} rot={-3} at={t.at('This is called') + 2} color="#ffffff" />
      <Note text="Alexandria, Virginia" x={130} y={320} size={50} rot={-3} at={t.at('This is called') + 6} color="#ffffff" />
      {g >= t.at('domestic') && <Highlight text="DOMESTIC SLAVE TRADE" x={110} y={790} size={88} at={t.at('domestic')} seed={47} rot={-2} />}
      <Definition term="do·mes·tic slave trade" def="buying and selling enslaved people inside the United States" at={t.at('domestic') + 9} x={120} y={930} w={1700} />
      <Tag text="Andrew J. Russell, Price, Birch & Co., Dealers in Slaves, Alexandria, Va., photograph, 1863 (after Union capture)" x={44} y={40} />
    </AbsoluteFill>
  );
};

/** People moved from the Upper to the Lower South, decade by decade. */
const ByDecade: React.FC<{t: TL}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Note text="sold south, decade by decade" x={110} y={80} size={56} rot={-2} at={t.at('roughly') - 4} color="#ffffff" />
    <Bars x={200} y={260} w={1520} h={560} max={300000} at={t.at('roughly') - 6} per={5} seed={9}
      bars={TRADE_BY_DECADE.map((d) => ({label: d.decade, value: d.n, subject: d.decade === '1830s', show: `${Math.round(d.n / 1000)}K`}))} />
    <Note text="roughly a million people in all" x={230} y={250} size={50} rot={-3} at={t.at('a million') - 2} />
    <Note text="most of them sold" x={250} y={350} size={50} rot={-3} at={t.at('most of them') - 2} color="#ffffff" />
    <Tag text="Tadman, Speculators and Slaves (1989) · net moves, Upper to Lower South" />
  </AbsoluteFill>
);

/** Vocab: the Second Middle Passage, over the coffle on the road. */
const Passage: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  return (
    <Gen name="ch04_coffle_road" label="a coffle on a Southern road, 1830s" a={t.at('Some historians') - 1} b={t.at('Richmond')} z0={1.02} z1={1.06}>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(8,6,4,0.55) 0%, transparent 40%)'}} />
      {g >= t.at('Second Middle') && <Highlight text="SECOND MIDDLE PASSAGE" x={110} y={70} size={84} at={t.at('Second Middle')} seed={49} rot={-2} />}
      <Definition term="Sec·ond Mid·dle Pas·sage" def="historians' name for the forced move of about a million enslaved people to the Deep South" at={t.at('Second Middle') + 9} x={120} y={210} w={1180} />
    </Gen>
  );
};

/** A dashed sea route (map pixels) revealed along its length. */
const SeaRoute: React.FC<{pts: Pt[]; at: number; dur?: number; width?: number}> = ({pts, at, dur = 36, width = 13}) => {
  const g = useGFrame();
  const pal = usePal();
  const p = interpolate(g, [at, at + dur], [0, 1], clamp);
  if (p <= 0) return null;
  const d = smooth(pts);
  return (
    <>
      <defs>
        <mask id="ch04sea" maskUnits="userSpaceOnUse" x={0} y={0} width={5000} height={5000}>
          <path d={d} fill="none" stroke="#fff" strokeWidth={60} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
        </mask>
      </defs>
      <g mask="url(#ch04sea)">
        <path d={d} fill="none" stroke="rgba(0,0,0,0.45)" strokeWidth={width * 1.4} strokeDasharray="44 30" transform="translate(5 8)" />
        <path d={d} fill="none" stroke={pal.mark} strokeWidth={width} strokeDasharray="44 30" strokeLinecap="round" />
      </g>
    </>
  );
};

/** The two ways south: overland in coffles from Richmond, by sea around Florida to New Orleans. */
const OVERLAND: Pt[] = [PLACES.richmond, [2700, 2450], [2400, 2540], PLACES.nashville, [1850, 2700], [1650, 2900], PLACES.natchez];
const BY_SEA: Pt[] = [PLACES.alexandria, [3040, 2260], [3085, 2380], [3170, 2520], [3140, 2700], [2950, 2900], [2790, 3100], [2720, 3330], [2700, 3560], [2640, 3720],
  [2450, 3760], [2250, 3680], [2000, 3560], [1780, 3470], PLACES.newOrleans];
const CAP = 'img/ch04/coffle_passing_capitol_1815.jpg';
const Routes: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const keys: Cam[] = [{f: 0, x: 1607, y: 2900, s: 0.58}];
  return (
    <MapScene keys={keys} dim={0.3} svg={() => (
      <>
        <Route pts={OVERLAND} at={t.at('marched') - 2} dur={40} width={14} />
        <SeaRoute pts={BY_SEA} at={t.at('packed') - 2} dur={44} />
      </>
    )}>
      {(S) => {
        const [rx, ry] = S(PLACES.richmond);
        const [ax, ay] = S(PLACES.alexandria);
        const [nx, ny] = S(PLACES.natchez);
        const [ox, oy] = S(PLACES.newOrleans);
        const [hx, hy] = S([2300, 2480]);
        return (
          <>
            <AbsoluteFill style={{background: 'linear-gradient(90deg, rgba(8,6,4,0.75) 0%, rgba(8,6,4,0.5) 38%, transparent 48%)'}} />
            <Pin x={rx} y={ry} at={t.at('Richmond')} />
            <Note text="Richmond" x={rx - 250} y={ry - 10} size={44} rot={-3} at={t.at('Richmond')} />
            <Note text="hundreds of miles, on foot" x={hx - 260} y={hy + 30} size={46} rot={-3} at={t.at('hundreds') - 2} />
            <Pin x={nx} y={ny} at={t.at('hundreds') + 18} />
            <Note text="Natchez" x={nx + 26} y={ny + 10} size={44} rot={-3} at={t.at('hundreds') + 18} />
            <Pin x={ax} y={ay} at={t.at('packed')} />
            <Note text="Alexandria" x={ax - 290} y={ay - 30} size={44} rot={-3} at={t.at('packed')} />
            <Note text="by ship, around Florida" x={1060} y={560} size={46} rot={-3} at={t.at('ships') - 2} color="#ffffff" />
            <Pin x={ox} y={oy} at={t.at('New Orleans')} />
            <Note text="New Orleans" x={ox - 60} y={oy + 30} size={46} rot={-3} at={t.at('New Orleans')} />
            <CropCard src={CAP} size={sizeOf(CAP)} x={90} y={430} w={600} h={540} fx={660} fy={480} scale={0.75} rot={-1.5} at={t.at('chained') - 1} />
            {g >= t.at('coffles') && <Highlight text="COFFLES" x={90} y={80} size={100} at={t.at('coffles')} seed={51} rot={-2} />}
            <Definition term="cof·fles" def="lines of enslaved people chained together and marched overland" at={t.at('coffles') + 9} x={100} y={230} w={720} />
            <Tag text="Mitchell, Map of the United States, 1836 · A Slave-Coffle Passing the Capitol, wood engraving, pub. 1876 · Library of Congress" />
          </>
        );
      }}
    </MapScene>
  );
};

/** New Orleans: the biggest slave market in the country. */
const RO = 'img/ch04/rotunda_new_orleans_1842.jpg';
const Market: React.FC<{t: TL}> = ({t}) => (
  <AbsoluteFill>
    <Photo src={RO} size={sizeOf(RO)} fx={960} fy={1080} z0={1.02} z1={1.06} a={t.at('which became') - 1} b={t.at('The law')} bw="grayscale(1) contrast(1.3) brightness(0.8)" />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(8,6,4,0.7) 0%, rgba(8,6,4,0.35) 30%, transparent 45%)'}} />
    <Note text="New Orleans" x={110} y={80} size={56} rot={-3} at={t.at('which became') - 2} color="#ffffff" />
    <Note text="the biggest slave market in the country" x={130} y={180} size={54} rot={-3} at={t.at('biggest') - 2} />
    <Note text="think about what that meant for a family" x={130} y={290} size={50} rot={-3} at={t.at('Think about') - 2} color="#ffffff" />
    <Tag text="William Henry Brooke, Sale of Estates, Pictures and Slaves in the Rotunda, New Orleans, 1842" />
  </AbsoluteFill>
);

/** Families sold apart. */
const Families: React.FC<{t: TL}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <PhotoCard src="img/ch04/slave_auction_richmond_1856.jpg" x={100} y={200} w={960} rot={-2} at={t.at('The law') - 1} filter="grayscale(1) contrast(1.25)" />
    <Note text="the law didn't recognize" x={1150} y={160} size={46} rot={-3} at={t.at('The law') - 2} color="#ffffff" />
    <Note text="their marriages" x={1170} y={250} size={56} rot={-3} at={t.at('marriages') - 2} />
    <Note text="a husband" x={1190} y={420} size={54} rot={-3} at={t.at('husband') - 2} />
    <Note text="a wife" x={1190} y={510} size={54} rot={-3} at={t.at('wife') - 2} />
    <Note text="a child" x={1190} y={600} size={54} rot={-3} at={t.at('child') - 2} />
    <Note text="any day could be the last" x={1150} y={790} size={50} rot={-3} at={t.at('Any day') - 2} color="#ffffff" />
    <Tag text="Slave Auction at Richmond, Virginia, Illustrated London News, Sept. 27, 1856" />
  </AbsoluteFill>
);

/** Harriett Hill, in her own words. */
const Hill: React.FC<{t: TL}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Note text="Harriett Hill, interviewed in the 1930s" x={160} y={180} size={50} rot={-2} at={t.at('Harriett Hill') - 2} color="#ffffff" />
    <Note text="sold away from her mother in Georgia, at age three" x={180} y={280} size={46} rot={-2} at={t.at('remembered') - 2} />
    <Quote text="It lack selling a calf from the cow. Exactly, but we are human beings and ought to be better than do sich." at={t.at('She said it') - 2} x={160} y={470} w={1560} size={66}
      who="Harriett Hill, interviewed 1930s · Federal Writers' Project" />
  </AbsoluteFill>
);

/** People as money: mortgages, and prices that rose with cotton. */
const Money: React.FC<{t: TL}> = ({t}) => {
  const pal = usePal();
  return (
    <AbsoluteFill>
      <DarkPaper />
      <PhotoCard src="img/ch04/slave_trade_washington_1830.jpg" x={900} y={90} w={920} rot={2} at={t.at('To the people') - 1} />
      <Note text="to their owners:" x={110} y={110} size={50} rot={-3} at={t.at('To the people') - 2} color="#ffffff" />
      <Note text="not only workers" x={130} y={220} size={56} rot={-3} at={t.at("weren't only") - 2} />
      <Note text="they were money" x={130} y={340} size={74} rot={-3} at={t.at('They were money') - 2} color={pal.subject} />
      <Note text="planters borrowed against them," x={130} y={640} size={52} rot={-3} at={t.at('borrowed') - 2} />
      <Note text="the way people borrow against a house today" x={150} y={740} size={48} rot={-3} at={t.at('the way people') - 2} color="#ffffff" />
      <Note text="when cotton prices rose, so did the price of people" x={130} y={870} size={48} rot={-3} at={t.at('When the price') - 2} />
      <Tag text="United States Slave Trade, engraving, 1830 · Library of Congress" x={44} y={40} />
    </AbsoluteFill>
  );
};

/** The census, 1790 to 1830: nearly tripled. */
const Census: React.FC<{t: TL}> = ({t}) => {
  const pal = usePal();
  const rows = ENSLAVED.filter((d) => d.year <= 1830);
  return (
    <AbsoluteFill>
      <DarkPaper />
      <Note text="the census, 1790 → 1830" x={110} y={80} size={56} rot={-2} at={t.at('By 1830') - 2} color="#ffffff" />
      <Bars x={200} y={260} w={950} h={560} max={4.2e6} at={t.at('By 1830') - 4} per={5} seed={4} valueEvery={[0, 4]}
        bars={rows.map((d) => ({label: String(d.year), value: d.n, subject: d.year === 1830, show: `${(d.n / 1e6).toFixed(1)}M`}))} />
      <Counter year={1830} from={ENSLAVED[0].n} to={ENSLAVED[4].n} at={t.at('census counted')} dur={36} />
      <Note text="supposed to die…" x={1230} y={470} size={56} rot={-3} at={t.at('supposed to die') - 2} color="#ffffff" />
      <Note text="nearly tripled" x={1250} y={590} size={74} rot={-3} at={t.at('nearly tripled') - 2} color={pal.subject} />
      <Tag text="U.S. Census, 1790–1830" />
    </AbsoluteFill>
  );
};

const Body: React.FC = () => {
  const t = makeTimeline(N, 30);
  const at = t.at;
  const cuts: [number, React.ReactNode][] = [
    [0, <Remember t={t} />],
    [at('Virginia and Maryland') - 1, <Surplus t={t} />],
    [at('This is called') - 1, <Trade t={t} />],
    [at('roughly') - 1, <ByDecade t={t} />],
    [at('Some historians') - 1, <Passage t={t} />],
    [at('Richmond') - 1, <Routes t={t} />],
    [at('which became') - 1, <Market t={t} />],
    [at('The law') - 1, <Families t={t} />],
    [at('Harriett Hill') - 1, <Hill t={t} />],
    [at('To the people') - 1, <Money t={t} />],
    [at('By 1830') - 1, <Census t={t} />],
  ];
  const scene = useScene(cuts);
  const notes = ['remember', 'Virginia and Maryland', 'more enslaved', 'tired tobacco', 'Alabama', 'Mississippi', 'Louisiana', "couldn't get", 'selling people', 'a million',
    'most of them', 'hundreds', 'ships', 'which became', 'biggest', 'Think about', 'The law', 'marriages', 'husband', 'wife', 'child', 'Any day', 'Harriett Hill', 'remembered',
    'To the people', "weren't only", 'They were money', 'borrowed', 'the way people', 'When the price', 'By 1830', 'supposed to die', 'nearly tripled'];
  const early: [string, number][] = [['already enslaved', 4], ['roughly', 4]];
  const later: [string, number][] = [['This is called', 2], ['This is called', 6]];
  return (
    <>
      {scene}
      {cuts.slice(1).map(([f], i) => <Sfx key={i} at={f} src="sfx/whoosh.wav" volume={0.3} />)}
      {['more valuable', 'domestic', 'Second Middle', 'coffles'].map((c) => <Sfx key={c} at={at(c)} src="sfx/stamp.wav" volume={0.28} />)}
      {[at('Richmond'), at('hundreds') + 18, at('packed'), at('New Orleans')].map((f) => <Sfx key={f} at={f} src="sfx/tick.wav" volume={0.45} />)}
      {notes.map((c) => <Sfx key={c} at={at(c) - 2} src={WRITE.src} volume={WRITE.volume} />)}
      {early.map(([c, d]) => <Sfx key={c} at={at(c) - d - 2} src={WRITE.src} volume={WRITE.volume} />)}
      {later.map(([c, d]) => <Sfx key={c + d} at={at(c) + d - 2} src={WRITE.src} volume={WRITE.volume} />)}
    </>
  );
};

export const Ch04: React.FC = () => (
  <ChapterShell n={N} audio="audio/ch04_sold_south.wav" lead={LEAD} music={[{src: 'music/r_abolition_a.mp3', volume: 0.13}]}>
    <Body />
  </ChapterShell>
);
