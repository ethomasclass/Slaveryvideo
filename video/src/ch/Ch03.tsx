// Chapter 3 · Fifty Pounds a Day: Britain's mills want cotton, the seeds make it slow, Whitney's gin makes it fast,
// and instead of freeing labor the gin drives cotton (and slavery) west over the Native nations' homelands, until
// cotton is America's biggest export and the North shares in the business.
import React from 'react';
import {AbsoluteFill, interpolate, random} from 'remotion';
import words from '../../public/audio/ch03_fifty_pounds.words.json';
import {clamp} from '../lib/anim';
import {Arrow, Highlight, Loop, Note, Tag, useGFrame, usePal} from '../kit/Kit';
import {DarkPaper, Sfx, WRITE} from '../kit/common';
import {type Cam, MapScene, Pin, PLACES, type Pt, Region, Route} from '../kit/map';
import {Bars, GREYS, SplitBar} from '../kit/charts';
import {cue, Doc, sizeOf, Underline} from '../kit/gt';
import {ChapterShell, chapterFrames, CropCard, Definition, LEAD, makeTimeline, type Narration, PhotoCard, type TL, useScene} from '../kit/shell';
import {MASKS} from '../masks';
import {COTTON_BALES_K, ENSLAVED, EXPORTS_1860} from '../data/charts';

const N = words as Narration;
export const CH03_FRAMES = chapterFrames(N, LEAD);

const MAPTAG = 'Samuel Augustus Mitchell, Map of the United States, 1836 · Library of Congress';
const ORANGE = '#FF9F1C';
const NEW_YORK: Pt = [3255, 1878];

/** Britain's power-loom sheds, hungry for cotton. */
const Mills: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const pal = usePal();
  return (
    <AbsoluteFill>
      <DarkPaper />
      <PhotoCard src="img/ch03/power_loom_baines_1835.png" x={90} y={200} w={900} rot={-2} at={1} filter="grayscale(1) contrast(1.3)" />
      {g >= t.at('Britain') && <Highlight text="BRITAIN" x={1090} y={110} size={100} at={t.at('Britain')} seed={31} rot={-2} />}
      <Note text="the first big factories" x={1110} y={300} size={50} rot={-3} at={t.at('first big') - 2} />
      <Note text="machines that spin & weave" x={1110} y={410} size={46} rot={-3} at={t.at('spin') - 2} />
      <Note text="faster than ever imagined" x={1130} y={510} size={44} rot={-3} at={t.at('faster') - 2} color="#ffffff" />
      <Note text="hungry for one thing:" x={1110} y={680} size={50} rot={-3} at={t.at('hungry') - 2} color="#ffffff" />
      <Note text="cotton." x={1150} y={790} size={90} rot={-3} at={t.at('cotton') - 2} color={pal.subject} />
      <Tag text="Power-loom weaving, engraved by J. Tingle after T. Allom · Baines, History of the Cotton Manufacture, 1835" />
    </AbsoluteFill>
  );
};

/** The inland South, where a tough cotton grows almost anywhere. */
const Inland: React.FC<{t: TL}> = ({t}) => {
  const keys: Cam[] = [
    {f: t.at('And across') - 2, x: 2350, y: 2800, s: 0.5},
    {f: t.at('almost anywhere'), x: 2300, y: 2820, s: 0.62},
  ];
  return (
    <MapScene keys={keys} dim={0.2}>
      {(S) => {
        const [cx, cy] = S([2330, 2830]);
        return (
          <>
            <Loop cx={cx} cy={cy} rx={300} ry={190} at={t.at('inland') + 2} seed={4} tilt={-8} width={6} />
            <Note text="the inland South" x={cx - 200} y={cy - 300} size={52} rot={-3} at={t.at('inland') - 2} color="#ffffff" />
            <Note text="a tough kind of cotton" x={110} y={760} size={52} rot={-3} at={t.at('tough kind') - 2} />
            <Note text="grows almost anywhere" x={150} y={870} size={52} rot={-3} at={t.at('almost anywhere') - 2} />
            <Note text="one problem…" x={1340} y={860} size={60} rot={-3} at={t.at('one problem') - 2} color="#ffffff" />
            <Tag text={MAPTAG} />
          </>
        );
      }}
    </MapScene>
  );
};

/** Sticky seeds, cleaned by hand: about a pound a day. The open boll on an 1815 botanical plate. */
const SEED = 'img/arch/seeds_by_hand/cotton_plant_boll_botanical_register_1815.jpg';
const Seeds: React.FC<{t: TL}> = ({t}) => {
  const pal = usePal();
  return (
    <AbsoluteFill>
      <DarkPaper />
      <Doc src={SEED} x={640} y={190} w={800} rot={-1.5} sepia={0} at={t.at("It's packed") - 1} push={[t.at("It's packed"), t.at('Then in 1793')]} zoom={1.12} fx={2565} fy={2600} marks={[
        // the opened boll, seeds bedded in the lint (3840 x 3130 plate)
        {ellipse: [2565, 2600, 470, 420], at: t.at('sticky'), tint: true, seed: 31},
      ]} />
      <Note text="packed with sticky green seeds" x={120} y={80} size={54} rot={-3} at={t.at('sticky') - 2} />
      <Note text="by hand: ≈ 1 lb / day" x={140} y={880} size={66} rot={-3} at={t.at('pound') - 4} color={pal.subject} />
      <Note text="never a big business" x={1140} y={890} size={56} rot={-3} at={t.at('never be') - 2} color="#ffffff" />
      <Tag text="Sydenham Edwards, cotton (Gossypium), Botanical Register, pl. 84, 1815 · Biodiversity Heritage Library" />
    </AbsoluteFill>
  );
};

/** Eli Whitney, 1793. */
const WHIT = 'img/ch03/whitney_morse_1822.jpg';
const Whitney: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  return (
    <AbsoluteFill>
      <DarkPaper />
      <CropCard src={WHIT} size={sizeOf(WHIT)} x={130} y={80} w={620} h={880} fx={1180} fy={1450} scale={0.31} rot={-2} at={t.at('Then in 1793') - 1} mask={MASKS.whitney} traceAt={t.at('Eli Whitney') + 2} />
      {g >= t.at('1793') && <Highlight text="1793" x={880} y={110} size={120} at={t.at('1793')} seed={33} rot={-2} />}
      <Note text="Eli Whitney" x={900} y={330} size={66} rot={-3} at={t.at('Eli Whitney') - 2} />
      <Note text="a young Yale graduate" x={920} y={450} size={50} rot={-3} at={t.at('Yale') - 2} color="#ffffff" />
      <Note text="staying on a Georgia plantation" x={920} y={560} size={50} rot={-3} at={t.at('Georgia') - 2} color="#ffffff" />
      <Note text="builds a simple machine" x={900} y={730} size={60} rot={-3} at={t.at('builds') - 2} />
      <Tag text="Samuel F. B. Morse, Eli Whitney, 1822 · Yale University Art Gallery" />
    </AbsoluteFill>
  );
};

/** The patent drawing: crank, toothed drum, slots. */
const PAT = 'img/ch03/whitney_patent_drawing_1794.jpg';
const Patent: React.FC<{t: TL}> = ({t}) => {
  const a = t.at('You turn');
  return (
    <AbsoluteFill>
      <DarkPaper />
      <Doc src={PAT} x={150} y={74} w={600} at={a - 1} rot={-1.5} push={[a, t.at("It's called")]} zoom={1.05} fx={1800} fy={3000} marks={[
        // the crank, the toothed drum, the slotted breastwork: patent-drawing pixels (3840 x 5760)
        {ellipse: [1818, 2246, 850, 610], at: t.at('crank') + 2, tint: true, seed: 5},
        {ellipse: [2200, 3616, 670, 425], at: t.at('drum') + 2, tint: true, seed: 6},
        {ellipse: [966, 4656, 580, 365], at: t.at('slots') + 2, tint: true, seed: 7},
      ]}>
        {(S) => {
          const [c3x, c3y] = S(1818, 2246);
          const [c7x, c7y] = S(2200, 3616);
          return (
            <>
              <Arrow x1={880} y1={245} x2={c3x + 150} y2={c3y - 20} bow={20} at={t.at('crank') + 4} />
              <Arrow x1={880} y1={475} x2={c7x + 120} y2={c7y} bow={-20} at={t.at('drum') + 4} />
            </>
          );
        }}
      </Doc>
      <Note text="turn a crank" x={900} y={190} size={56} rot={-3} at={t.at('turn a crank') - 2} />
      <Note text="a drum covered in wire teeth" x={900} y={420} size={52} rot={-3} at={t.at('drum') - 2} />
      <Note text="pulls the fibers through slots" x={900} y={630} size={50} rot={-3} at={t.at('pulls') - 2} color="#ffffff" />
      <Note text="too narrow for the seeds" x={940} y={730} size={50} rot={-3} at={t.at('too narrow') - 2} />
      <Tag text="Eli Whitney, cotton gin patent drawing, March 14, 1794 · National Archives" />
    </AbsoluteFill>
  );
};

/** Vocab: gin. And the number that changed the South: about fifty pounds a day. */
const Gin: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const pal = usePal();
  return (
    <AbsoluteFill>
      <DarkPaper />
      <PhotoCard src="img/ch03/cotton_gin_scenes_cotton_land_1871.jpg" x={1090} y={110} w={720} rot={2} at={t.at("It's called") - 1} filter="grayscale(1) contrast(1.25)" />
      <Note text="a “cotton engine”" x={140} y={110} size={54} rot={-3} at={t.at('cotton engine') - 2} color="#ffffff" />
      {g >= t.at('Gin') && <Highlight text="GIN" x={140} y={230} size={130} at={t.at('Gin')} seed={35} rot={-2} />}
      <Definition term="gin" def="short for “engine”: a machine that pulls cotton fiber away from its seeds" at={t.at('Gin') + 9} x={150} y={430} w={860} />
      <Note text="by hand: ≈ 1 lb / day" x={160} y={700} size={54} rot={-3} at={t.at('With a gin') - 2} color="#ffffff" />
      <Note text="with a gin: ≈ 50 lb / day" x={160} y={820} size={70} rot={-3} at={t.at('fifty') - 2} color={pal.subject} />
      <Tag text="Scenes in Cotton Land: The Cotton-Gin, 1871 (later depiction) · Library of Congress" />
    </AbsoluteFill>
  );
};

/** The expectation, crossed out. */
const Opposite: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  return (
    <AbsoluteFill>
      <DarkPaper />
      <Note text="you'd think: a machine that saves labor…" x={160} y={150} size={54} rot={-3} at={t.at("Now you'd") - 2} color="#ffffff" />
      <Note text="→ fewer enslaved workers" x={220} y={280} size={64} rot={-3} at={t.at('fewer enslaved') - 2} color={ORANGE} />
      <Underline x1={230} x2={940} y={340} at={t.at('exact opposite') - 2} width={8} color={ORANGE} seed={3} />
      {g >= t.at('It did the') && <Highlight text="IT DID THE EXACT OPPOSITE" x={130} y={520} size={90} at={t.at('It did the')} seed={37} rot={-2} />}
    </AbsoluteFill>
  );
};

/** Twin panels: cotton grown, then enslaved people, on one time axis (two charts, not a dual axis). */
const Twin: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const a = t.at('grow as much');
  const b = t.at('somebody still');
  return (
    <AbsoluteFill>
      <DarkPaper />
      {g >= t.at('Cleaning') && <Highlight text="COTTON AND SLAVERY GREW TOGETHER" x={110} y={60} size={70} at={t.at('Cleaning')} seed={39} rot={-1.5} />}
      <Note text="cotton grown" x={210} y={190} size={44} rot={-2} at={a - 4} color="#ffffff" />
      <Bars x={200} y={250} w={1520} h={250} max={4000} at={a - 6} per={4} seed={7} valueEvery={[0, 7]}
        bars={COTTON_BALES_K.map((d) => ({label: '', value: d.n, subject: true, show: d.n >= 1000 ? `${(d.n / 1000).toFixed(1)}M bales` : `${d.n}K bales`}))} />
      <Note text="enslaved people" x={210} y={560} size={44} rot={-2} at={b - 4} color="#ffffff" />
      <Bars x={200} y={620} w={1520} h={250} max={4.2e6} at={b - 6} per={4} seed={8} valueEvery={[0, 7]}
        bars={ENSLAVED.map((d) => ({label: String(d.year), value: d.n, show: `${(d.n / 1e6).toFixed(1)}M`}))} />
      <Note text="planted, hoed and picked by hand" x={1000} y={960} size={42} rot={-2} at={t.at('plant it') - 2} />
      <Tag text="Cotton: Historical Statistics of the U.S., K 554 · People: U.S. Census" />
    </AbsoluteFill>
  );
};

/** Hungry for land: the Louisiana Purchase opens the Mississippi Valley. */
const RIVER: Pt[] = [[1595, 2150], [1620, 2300], [1640, 2430], [1620, 2600], [1590, 2720], [1530, 2830], [1500, 2950], [1480, 3040], [1450, 3128], [1430, 3230], [1500, 3300], [1560, 3330]];
const Land: React.FC<{t: TL}> = ({t}) => {
  const keys: Cam[] = [
    {f: t.at('Cotton also') - 2, x: 2100, y: 2800, s: 0.42},
    {f: t.at('Louisiana Purchase'), x: 1850, y: 2750, s: 0.62},
  ];
  return (
    <MapScene keys={keys} dim={0.2} svg={() => <Route pts={RIVER} at={t.at('Mississippi Valley') - 2} dur={20} width={16} />}>
      {(S) => {
        const [lx, ly] = S([1560, 2450]);
        const [mx, my] = S([1620, 2600]);
        return (
          <>
            <Note text="cotton wore out the soil, too" x={940} y={90} size={54} rot={-3} at={t.at('wore out') - 4} color="#ffffff" />
            <Note text="→ always hungry for new land" x={960} y={200} size={54} rot={-3} at={t.at('hungry for new') - 2} />
            <Arrow x1={lx - 30} y1={ly} x2={lx - 330} y2={ly - 40} bow={-20} at={t.at('Louisiana Purchase') + 2} />
            <Note text="Louisiana Purchase, 1803" x={lx - 600} y={ly + 30} size={46} rot={-3} at={t.at('Louisiana Purchase') - 2} />
            <Note text="the Mississippi Valley" x={mx + 50} y={my + 10} size={50} rot={-3} at={t.at('Mississippi Valley') - 2} />
            <Tag text={MAPTAG} />
          </>
        );
      }}
    </MapScene>
  );
};

/** Vocab: Indian Removal Act. The five nations' homelands, labelled, then covered by cotton. */
const NATIONS: {key: 'cherokee' | 'creek' | 'choctaw' | 'chickasaw' | 'seminole'; word: string; label: string; dx: number; dy: number; land: Pt[]}[] = [
  {key: 'cherokee', word: 'Cherokee', label: 'Cherokee', dx: 30, dy: -86, land: [[2020, 2620], [2280, 2600], [2340, 2720], [2230, 2810], [2050, 2780]]},
  {key: 'creek', word: 'Creek', label: 'Creek', dx: 30, dy: -20, land: [[1930, 2810], [2120, 2820], [2170, 2960], [2070, 3060], [1920, 3000]]},
  {key: 'choctaw', word: 'Choctaw', label: 'Choctaw', dx: -230, dy: 30, land: [[1580, 2790], [1800, 2780], [1830, 2950], [1700, 3060], [1570, 2980]]},
  {key: 'chickasaw', word: 'Chickasaw', label: 'Chickasaw', dx: 34, dy: -80, land: [[1650, 2600], [1880, 2600], [1890, 2740], [1700, 2770], [1640, 2700]]},
  {key: 'seminole', word: 'Seminole', label: 'Seminole', dx: 34, dy: -40, land: [[2200, 3280], [2420, 3260], [2520, 3420], [2400, 3520], [2220, 3430]]},
];
const Removal: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const pal = usePal();
  const spread = t.at('became');
  const keys: Cam[] = [
    {f: t.at('And after the') - 2, x: 1760, y: 2990, s: 0.7},
    {f: t.at('Cherokee'), x: 1710, y: 2990, s: 0.9},
  ];
  return (
    <MapScene keys={keys} dim={0.25} svg={() => (
      <>{NATIONS.map((n, i) => <Region key={n.key} pts={n.land} at={spread + i * 4} color={pal.subject} fill="rgba(255,111,97,0.45)" width={6} />)}</>
    )}>
      {(S) => (
        <>
          <AbsoluteFill style={{background: 'linear-gradient(90deg, rgba(8,6,4,0.55) 0%, transparent 45%)'}} />
          {g >= t.at('Indian Removal') && <Highlight text="INDIAN REMOVAL ACT, 1830" x={90} y={70} size={74} at={t.at('Indian Removal')} seed={41} rot={-2} />}
          <Definition term="In·di·an Re·mov·al Act" def="the 1830 law used to force Native nations of the Southeast off their land, to west of the Mississippi" at={t.at('Indian Removal') + 9} x={90} y={200} w={720} />
          {NATIONS.map((n) => {
            const [px, py] = S(PLACES[n.key]);
            return (
              <React.Fragment key={n.key}>
                <Pin x={px} y={py} at={t.at(n.word)} />
                <Note text={n.label} x={px + n.dx} y={py + n.dy} size={44} rot={-3} at={t.at(n.word)} />
              </React.Fragment>
            );
          })}
          <Note text="forced off their homelands" x={110} y={800} size={52} rot={-3} at={t.at('off their') - 2} color="#ffffff" />
          <Note text="→ became cotton plantations" x={110} y={905} size={58} rot={-3} at={t.at('cotton plantations') - 2} color={pal.subject} />
          <Tag text={MAPTAG} />
        </>
      )}
    </MapScene>
  );
};

/** Three of every four pounds in Britain's mills: drawn bales. */
const Bale: React.FC<{x: number; y: number; at: number; on: boolean; seed: number}> = ({x, y, at, on, seed}) => {
  const g = useGFrame();
  const pal = usePal();
  if (g < at) return null;
  const k = interpolate(g, [at, at + 3, at + 6], [0.6, 1.08, 1], clamp);
  const s = 190;
  const j = (i: number) => (random(`bale${seed}${i}`) - 0.5) * 8;
  const d = `M${j(0)},${j(1)} L${s + j(2)},${j(3)} L${s + j(4)},${s + j(5)} L${j(6)},${s + j(7)} Z`;
  return (
    <svg style={{position: 'absolute', left: x, top: y, overflow: 'visible', transform: `scale(${k})`, transformOrigin: `${s / 2}px ${s / 2}px`}} width={s} height={s}>
      <path d={d} fill={on ? pal.subject : GREYS[1]} stroke={pal.mark} strokeWidth={5} strokeLinejoin="round" />
      {[0.33, 0.66].map((f) => <line key={f} x1={6} y1={s * f} x2={s - 6} y2={s * f + j(9)} stroke="#111" strokeWidth={5} opacity={0.6} />)}
    </svg>
  );
};
const ThreeInFour: React.FC<{t: TL}> = ({t}) => {
  const pal = usePal();
  const a = t.at('three out');
  return (
    <AbsoluteFill>
      <DarkPaper />
      <Note text="by 1860, in Britain's mills:" x={140} y={110} size={56} rot={-3} at={t.at('By 1860') - 2} color="#ffffff" />
      {[0, 1, 2, 3].map((i) => <Bale key={i} x={260 + i * 260} y={300} at={a + i * 3} on={i < 3} seed={i} />)}
      <Note text="3 of every 4 pounds of cotton" x={220} y={620} size={66} rot={-3} at={t.at('four pounds') - 2} color={pal.subject} />
      <Note text="came from the American South" x={260} y={750} size={58} rot={-3} at={t.at('came from') - 2} />
    </AbsoluteFill>
  );
};

/** Cotton as a share of everything the U.S. sold overseas, 1860. */
const Exports: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  return (
    <AbsoluteFill>
      <DarkPaper />
      {g >= t.at('and cotton was') && <Highlight text="WHAT AMERICA SOLD THE WORLD, 1860" x={110} y={70} size={76} at={t.at('and cotton was')} seed={43} rot={-1.5} />}
      <SplitBar x={160} y={380} w={1600} h={200} at={t.at('more than half') - 6} parts={[{label: 'raw cotton', value: EXPORTS_1860.cotton, subject: true}, {label: 'everything else', value: EXPORTS_1860.other}]} />
      <Note text="more than half" x={200} y={250} size={52} rot={-3} at={t.at('more than half') - 2} />
      <Note text="the oil of the 1800s" x={900} y={780} size={74} rot={-3} at={t.at('oil') - 4} color="#ffffff" />
      <Tag text="Historical Statistics of the U.S. · merchandise exports by value, 1860" />
    </AbsoluteFill>
  );
};

/** Not just a Southern business: Northern banks, ships and mills. */
const SHIPS: Pt[] = [NEW_YORK, [3420, 1960], [3700, 1960], [4000, 1900]];
const North: React.FC<{t: TL}> = ({t}) => {
  const keys: Cam[] = [
    {f: t.at("And it wasn't") - 2, x: 2900, y: 2300, s: 0.42},
    {f: t.at('Northern banks'), x: 3300, y: 1800, s: 0.85},
  ];
  return (
    <MapScene keys={keys} dim={0.25} svg={() => <Route pts={SHIPS} at={t.at('ships') + 2} dur={20} width={12} />}>
      {(S) => {
        const [nx, ny] = S(NEW_YORK);
        const [lx, ly] = S(PLACES.lowell);
        const [sx, sy] = S([3800, 1940]);
        return (
          <>
            <Note text="not just a Southern business" x={110} y={90} size={58} rot={-3} at={t.at("wasn't just") - 2} color="#ffffff" />
            <Pin x={nx} y={ny} at={t.at('Northern banks')} />
            <Note text="New York" x={nx - 300} y={ny - 40} size={46} rot={-3} at={t.at('Northern banks')} />
            <Note text="banks loaned the money" x={nx - 520} y={ny + 60} size={46} rot={-3} at={t.at('banks') - 2} />
            <Note text="ships carried the bales" x={sx - 260} y={sy + 70} size={46} rot={-3} at={t.at('ships') - 2} />
            <Pin x={lx} y={ly} at={t.at('mills spun')} />
            <Note text="Lowell mills" x={lx + 34} y={ly - 120} size={46} rot={-3} at={t.at('mills spun')} />
            <Note text="spun the thread" x={lx + 54} y={ly - 40} size={46} rot={-3} at={t.at('spun') - 2} />
            <Tag text={MAPTAG} />
          </>
        );
      }}
    </MapScene>
  );
};

const Body: React.FC = () => {
  const t = makeTimeline(N, 30);
  const at = t.at;
  const cuts: [number, React.ReactNode][] = [
    [0, <Mills t={t} />],
    [at('And across') - 1, <Inland t={t} />],
    [at("It's packed") - 1, <Seeds t={t} />],
    [at('Then in 1793') - 1, <Whitney t={t} />],
    [at('You turn') - 1, <Patent t={t} />],
    [at("It's called") - 1, <Gin t={t} />],
    [at("Now you'd") - 1, <Opposite t={t} />],
    [at('Cleaning') - 1, <Twin t={t} />],
    [at('Cotton also') - 1, <Land t={t} />],
    [at('And after the') - 1, <Removal t={t} />],
    [at('By 1860') - 1, <ThreeInFour t={t} />],
    [at('and cotton was') - 1, <Exports t={t} />],
    [at("And it wasn't") - 1, <North t={t} />],
  ];
  const scene = useScene(cuts);
  const notes = ['first big', 'spin', 'faster', 'hungry', 'cotton', 'inland', 'tough kind', 'almost anywhere', 'one problem', 'sticky', 'never be', 'Eli Whitney', 'Yale', 'Georgia',
    'builds', 'turn a crank', 'drum', 'pulls', 'too narrow', 'cotton engine', 'With a gin', 'fifty', "Now you'd", 'fewer enslaved', 'plant it', 'hungry for new', 'Louisiana Purchase',
    'Mississippi Valley', 'off their', 'cotton plantations', 'By 1860', 'four pounds', 'came from', 'more than half', "wasn't just", 'banks', 'ships', 'spun'];
  const early = [['pound', 4], ['wore out', 4], ['oil', 4]] as const;
  return (
    <>
      {scene}
      {cuts.slice(1).map(([f], i) => <Sfx key={i} at={f} src="sfx/whoosh.wav" volume={0.3} />)}
      {['Britain', '1793', 'Gin', 'It did the', 'Cleaning', 'Indian Removal', 'and cotton was'].map((c) => <Sfx key={c} at={at(c)} src="sfx/stamp.wav" volume={0.28} />)}
      {['Cherokee', 'Creek', 'Choctaw', 'Chickasaw', 'Seminole', 'Northern banks', 'mills spun'].map((c) => <Sfx key={c} at={at(c)} src="sfx/tick.wav" volume={0.45} />)}
      {notes.map((c) => <Sfx key={c} at={at(c) - 2} src={WRITE.src} volume={WRITE.volume} />)}
      {early.map(([c, d]) => <Sfx key={c} at={at(c) - d - 2} src={WRITE.src} volume={WRITE.volume} />)}
    </>
  );
};

export const Ch03: React.FC = () => (
  <ChapterShell n={N} audio="audio/ch03_fifty_pounds.wav" lead={LEAD} music={[{src: cue('cotton_engine', 'j_cold_open'), volume: 0.16, from: 180}]}>
    <Body />
  </ChapterShell>
);
