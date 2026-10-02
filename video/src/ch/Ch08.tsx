// Chapter 8 · A World Outside Work (heavy, quiet palette; the warmest chapter): lives of their own, marriage and
// names, family, faith (Ephesians 6:5 vs "Go Down, Moses"), hush harbors, everyday resistance and how it differed
// for men and women (the class writing prompt), Harriet Jacobs, and the hand-off to Southampton.
import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import words from '../../public/audio/ch08_world_outside.words.json';
import {clamp} from '../lib/anim';
import {Arrow, Highlight, JF, Note, Tag, useGFrame, usePal} from '../kit/Kit';
import {DarkPaper, Sfx, WRITE} from '../kit/common';
import {type Cam, MapScene, Pin, PLACES, Route} from '../kit/map';
import {cue, Doc, Pic, sizeOf} from '../kit/gt';
import {ChapterShell, chapterFrames, CropCard, Definition, LEAD, makeTimeline, type Narration, PhotoCard, type TL, useScene} from '../kit/shell';
import {MASKS} from '../masks';

const N = words as Narration;
export const CH08_FRAMES = chapterFrames(N, LEAD);

const BONE = '#EDE7DC';
const JACOBS = 'img/ch08/harriet_jacobs_1894.jpg';
const MAPTAG = 'Samuel Augustus Mitchell, Map of the United States, 1836 · Library of Congress';

/** A quiet line of bone type (Playfair) that fades in: for statements that should not be handwritten. */
const Line: React.FC<{text: string; x: number; y: number; at: number; size?: number; color?: string}> = ({text, x, y, at, size = 56, color = BONE}) => {
  const g = useGFrame();
  if (g < at) return null;
  return (
    <div style={{position: 'absolute', left: x, top: y, fontFamily: JF.heavy, fontWeight: 700, fontSize: size, lineHeight: 1.2, color, whiteSpace: 'nowrap',
      textShadow: '0 3px 14px #000', opacity: interpolate(g, [at, at + 8], [0, 1], clamp)}}>{text}</div>
  );
};

/** A primary-source quote set in Playfair with the line breaks given (the kit's Quote wraps on its own). */
const QuoteLines: React.FC<{lines: string[]; at: number; x: number; y: number; size?: number; who?: string}> = ({lines, at, x, y, size = 72, who}) => {
  const g = useGFrame();
  if (g < at) return null;
  return (
    <div style={{position: 'absolute', left: x, top: y, opacity: interpolate(g, [at, at + 6], [0, 1], clamp)}}>
      {lines.map((l, i) => (
        <div key={i} style={{fontFamily: JF.heavy, fontWeight: 900, fontSize: size, lineHeight: 1.3, color: '#f4efe6', textShadow: '0 3px 14px #000', whiteSpace: 'nowrap'}}>
          {i === 0 ? '“' : ''}{l}{i === lines.length - 1 ? '”' : ''}
        </div>
      ))}
      {who && <div style={{marginTop: 24, fontFamily: JF.mono, fontSize: 24, letterSpacing: 2, color: 'rgba(244,239,230,0.8)', textTransform: 'uppercase'}}>{who}</div>}
    </div>
  );
};

/** A hand-drawn box with a centred handwritten label, drawn on from `at`. */
const Box: React.FC<{x: number; y: number; w: number; h: number; at: number; label: string; size?: number; color?: string}> = ({x, y, w, h, at, label, size = 46, color}) => {
  const g = useGFrame();
  const pal = usePal();
  if (g < at) return null;
  const p = interpolate(g, [at, at + 8], [0, 1], clamp);
  return (
    <>
      <svg style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}} width={1920} height={1080}>
        <path d={`M${x},${y + 2} L${x + w - 3},${y} L${x + w},${y + h - 2} L${x + 2},${y + h} Z`} fill="rgba(10,10,10,0.35)" stroke={pal.mark} strokeWidth={4} strokeLinejoin="round"
          pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
      </svg>
      <div style={{position: 'absolute', left: x, top: y, width: w, height: h, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Nanum Pen Script", cursive',
        fontSize: size * 1.55, color: color ?? '#ffffff', whiteSpace: 'nowrap', opacity: interpolate(g, [at + 3, at + 7], [0, 1], clamp), textShadow: '0 0 2px #111, 0 2px 8px #000'}}>{label}</div>
    </>
  );
};

/** The turn: not the whole story. */
const Turn: React.FC<{t: TL}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Line text="So far, it might sound like enslaved people" x={160} y={200} size={56} at={t.at('So far')} color="rgba(237,231,220,0.8)" />
    <Line text="only had things done to them." x={160} y={290} size={56} at={t.at('only had')} color="rgba(237,231,220,0.8)" />
    <Note text="that's not the whole story." x={200} y={500} size={66} rot={-2} at={t.at("But that's") - 2} color="#ffffff" />
    <Note text="not even close." x={240} y={640} size={90} rot={-3} at={t.at('Not even close') - 2} />
  </AbsoluteFill>
);

/** Lives of their own: marriage. */
const Lives: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  return (
    <AbsoluteFill>
      <DarkPaper />
      {g >= t.at('built lives') && <Highlight text="LIVES OF THEIR OWN" x={140} y={160} size={100} at={t.at('built lives')} seed={81} rot={-2} />}
      <Note text="the law didn't recognize their marriages" x={180} y={430} size={54} rot={-2} at={t.at('The law') - 2} color="#ffffff" />
      <Note text="they married anyway." x={220} y={560} size={76} rot={-3} at={t.at('married anyway') - 2} />
    </AbsoluteFill>
  );
};

/** Naming children after kin, drawn as a small diagram. */
const Names: React.FC<{t: TL}> = ({t}) => {
  const kin: [string, string, number][] = [['grandparents', 'grandparents', 260], ['aunts', 'aunts', 760], ['uncles', 'uncles', 1260]];
  return (
    <AbsoluteFill>
      <DarkPaper />
      <Note text="children were named after family:" x={140} y={80} size={50} rot={-2} at={t.at('They named') - 2} color="#ffffff" />
      {kin.map(([c, label, x]) => <Box key={c} x={x} y={240} w={400} h={120} at={t.at(c)} label={label} />)}
      {kin.map(([c, , x], i) => <Arrow key={c} x1={x + 200} y1={380} x2={960 + (i - 1) * 120} y2={540} bow={(i - 1) * -20} at={t.at(c) + 4} />)}
      <Box x={680} y={560} w={560} h={130} at={t.at('They named')} label="a child's name" color={BONE} />
      <Note text="so family ties would survive, even if people were sold apart" x={140} y={820} size={50} rot={-2} at={t.at('so family ties') - 2} />
    </AbsoluteFill>
  );
};

/** Family: O'Sullivan's 1862 photograph and the historian's phrase. */
const Family: React.FC<{t: TL}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <PhotoCard src="img/ch08/five_generations_smiths_plantation_1862.jpg" x={130} y={90} w={620} rot={-2} at={t.at('One historian') - 1} />
    <Note text="one historian calls family" x={860} y={110} size={46} rot={-2} at={t.at('One historian') - 2} color="#ffffff" />
    <QuoteLines lines={['a world outside', 'of the world of work']} at={t.at('a world outside') - 1} x={860} y={210} size={68} who="a historian" />
    <Note text="a man could be a father" x={880} y={600} size={54} rot={-2} at={t.at('a man could') - 2} />
    <Note text="a woman could be a mother" x={880} y={710} size={54} rot={-2} at={t.at('a woman could') - 2} />
    <Note text="not just somebody's property" x={920} y={830} size={54} rot={-2} at={t.at('not just') - 2} color="#ffffff" />
    <Tag text="Timothy O'Sullivan, Family on Smith's Plantation, Beaufort, S.C., 1862 · Library of Congress" />
  </AbsoluteFill>
);

/** Faith: the verse white preachers chose. */
const Verse: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  return (
    <AbsoluteFill>
      <DarkPaper />
      {g >= t.at('faith') && <Highlight text="A FAITH OF THEIR OWN" x={140} y={110} size={96} at={t.at('faith')} seed={83} rot={-2} />}
      <Note text="what white preachers on plantations preached:" x={170} y={330} size={50} rot={-2} at={t.at('White preachers') - 2} color="#ffffff" />
      <QuoteLines lines={['Servants, be obedient to them', 'that are your masters.']} at={t.at('Servants') - 1} x={170} y={460} size={80} who="Ephesians 6:5, as preached on plantations" />
    </AbsoluteFill>
  );
};

/** The story enslaved Christians heard. */
const Exodus: React.FC<{t: TL}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Note text="enslaved Christians heard a different story:" x={140} y={120} size={52} rot={-2} at={t.at('But enslaved') - 2} color="#ffffff" />
    <Note text="Moses." x={200} y={300} size={100} rot={-3} at={t.at('Moses') - 2} />
    <Note text="Pharaoh." x={700} y={300} size={100} rot={-3} at={t.at('Pharaoh') - 2} />
    <Line text="A God who sets his people free." x={200} y={560} size={80} at={t.at('A God')} />
  </AbsoluteFill>
);

/** "Go Down, Moses." */
const Song: React.FC<{t: TL}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Note text="they sang it:" x={160} y={130} size={54} rot={-2} at={t.at('They sang') - 2} color="#ffffff" />
    <QuoteLines lines={['Go down, Moses,', 'way down in Egypt land.', 'Tell old Pharaoh,', 'let my people go.']} at={t.at('Go down') - 1} x={170} y={250} size={84} who="Spiritual, “Go Down, Moses”" />
  </AbsoluteFill>
);

/** Hush harbors, over the closest period painting: Antrobus's night burial in the woods, 1860. */
const HARBOR = 'img/arch/hush_harbor/antrobus_plantation_burial_1860.jpg';
const Harbor: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  return (
    <Pic src={HARBOR} tag="John Antrobus, Plantation Burial, 1860: a night funeral in the woods · Historic New Orleans Collection" a={t.at('At night') - 1} b={t.at('Resistance came')} fx={1000} fy={700} z0={1.04} z1={1.12} bw="grayscale(1) contrast(1.15) brightness(0.9)">
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, transparent 35%, transparent 70%, rgba(0,0,0,0.55) 100%)'}} />
      <Note text="at night, in secret" x={120} y={80} size={50} rot={-2} at={t.at('At night') - 2} color="#ffffff" />
      {g >= t.at('hush harbors') && <Highlight text="HUSH HARBORS" x={110} y={170} size={96} at={t.at('hush harbors')} seed={85} rot={-2} />}
      <Definition term="hush har·bors" def="secret places in the woods where enslaved people met to pray" at={t.at('hush harbors') + 9} x={120} y={320} w={1200} />
      <Note text="an iron pot turned upside down, to muffle the sound of prayer" x={120} y={900} size={48} rot={-2} at={t.at('turned a big') - 2} />
    </Pic>
  );
};

/** Everyday resistance. */
const Everyday: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const items: [string, string][] = [['Working slowly', 'working slowly'], ['Breaking tools', 'breaking tools'], ['Faking sickness', 'faking sickness'], ['Running away', 'running away, for a few days or for good']];
  return (
    <AbsoluteFill>
      <DarkPaper />
      {g >= t.at('Resistance came') && <Highlight text="EVERYDAY RESISTANCE" x={140} y={110} size={96} at={t.at('Resistance came')} seed={87} rot={-2} />}
      {items.map(([c, text], i) => <Note key={c} text={`·  ${text}`} x={200} y={330 + i * 130} size={60} rot={-2} at={t.at(c) - 2} />)}
    </AbsoluteFill>
  );
};

/** Men and women: how resistance differed (sets up the class writing prompt). */
const MenWomen: React.FC<{t: TL}> = ({t}) => {
  const pal = usePal();
  const g = useGFrame();
  const head = (text: string, x: number, color: string) => (
    <div style={{position: 'absolute', left: x, top: 150, fontFamily: JF.mono, fontSize: 40, letterSpacing: 6, color, opacity: interpolate(g, [t.at('Men ran') - 1, t.at('Men ran') + 5], [0, 1], clamp)}}>{text}</div>
  );
  return (
    <AbsoluteFill>
      <DarkPaper />
      <div style={{position: 'absolute', left: 140, top: 60, fontFamily: JF.mono, fontSize: 26, letterSpacing: 4, color: 'rgba(255,255,255,0.75)'}}>HOW RESISTANCE DIFFERED</div>
      <div style={{position: 'absolute', left: 958, top: 140, width: 4, height: 800, background: 'rgba(244,239,230,0.6)'}} />
      {head('MEN', 140, pal.mark)}
      {head('WOMEN', 1040, BONE)}
      <Note text="ran away more often" x={150} y={300} size={62} rot={-2} at={t.at('Men ran') - 2} />
      <Note text="usually had children" x={1040} y={300} size={58} rot={-2} at={t.at('Women usually') - 2} color="#ffffff" />
      <Note text="they couldn't leave behind" x={1040} y={410} size={58} rot={-2} at={t.at('children they') - 2} color="#ffffff" />
      <Note text="resisted in ways" x={1040} y={590} size={58} rot={-2} at={t.at('resisted') - 2} />
      <Note text="that kept them close" x={1040} y={700} size={58} rot={-2} at={t.at('kept them') - 2} />
    </AbsoluteFill>
  );
};

/** Harriet Jacobs: her portrait over the map, a pin on Edenton. */
const Jacobs: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const keys: Cam[] = [{f: t.at('Harriet Jacobs') - 1, x: 2240, y: 2420, s: 0.5}, {f: t.at('North Carolina') + 8, x: 2157, y: 2387, s: 0.55}];
  return (
    <MapScene keys={keys} dim={0.45}>
      {(S) => {
        const [px, py] = S(PLACES.edenton);
        return (
          <>
            <Pin x={px} y={py} at={t.at('North Carolina')} />
            <Note text="Edenton, N.C." x={px + 30} y={py + 20} size={48} rot={-3} at={t.at('North Carolina') + 2} />
            <CropCard src={JACOBS} size={sizeOf(JACOBS)} x={140} y={130} w={520} h={760} fx={860} fy={1450} scale={0.34} rot={-2} at={t.at('Harriet Jacobs') - 1} mask={MASKS.jacobs}
              traceAt={t.at('Harriet Jacobs') + 6} />
            {g >= t.at('Harriet Jacobs') && <Highlight text="HARRIET JACOBS" x={780} y={110} size={84} at={t.at('Harriet Jacobs')} seed={89} rot={-2} />}
            <Note text="1835: she ran" x={800} y={270} size={56} rot={-2} at={t.at('In 1835') - 2} />
            <Note text="but not far." x={840} y={380} size={56} rot={-2} at={t.at('But not far') - 2} color="#ffffff" />
            <Tag text={MAPTAG} y={1000} />
            <Tag text="Gilbert Studios, Harriet Jacobs, Washington, D.C., 1894 · restoration by Adam Cuerden, Wikimedia Commons" />
          </>
        );
      }}
    </MapScene>
  );
};

/** The crawl space, in her own words (Incidents, 1861, pp. 173, 175). */
const P173 = 'img/arch/crawl_space/incidents_p173_loophole_of_retreat_garret_1861.jpg';
const P175 = 'img/arch/crawl_space/incidents_p175_peeping_hole_1861.jpg';
const Crawl: React.FC<{t: TL}> = ({t}) => {
  const a = t.at('three feet');
  const th = t.at('Through a tiny');
  return (
    <AbsoluteFill>
      <DarkPaper />
      <Doc src={P173} x={1270} y={60} w={520} rot={-1.5} at={t.at('She hid') - 1} push={[t.at('She hid'), th]} zoom={1.15} fx={740} fy={1150} marks={[
        // "The garret was only nine feet long and seven wide. The highest part was three feet high" (1500 x 2660 scan)
        {box: [690, 1050, 1405, 1114], pad: 6, at: t.at('crawl space') + 4, tint: true, noTrace: true},
        {box: [80, 1120, 662, 1180], pad: 6, at: t.at('crawl space') + 6, tint: true, noTrace: true},
        {box: [735, 1120, 1405, 1180], pad: 6, at: a, tint: true, noTrace: true},
        {box: [80, 1188, 385, 1250], pad: 6, at: a + 2, tint: true, noTrace: true},
        {underline: [735, 1405, 1182], at: a + 2, seed: 87, width: 4},
        {underline: [80, 385, 1252], at: a + 6, seed: 88, width: 4},
      ]} />
      <Doc src={P175} x={1240} y={90} w={520} rot={2} at={th - 1} push={[th, t.at('In 1842')]} zoom={1.12} fx={760} fy={2300} marks={[
        // "Through my peeping-hole I could watch the children"
        {box: [110, 2265, 1420, 2332], pad: 6, at: th + 2, tint: true, seed: 89, width: 4},
      ]} />
      <Note text="a crawl space in her grandmother's attic" x={110} y={90} size={46} rot={-2} at={t.at('crawl space') - 2} color="#ffffff" />
      <Note text="9 ft long · 7 ft wide" x={130} y={250} size={56} rot={-3} at={t.at('crawl space') + 6} />
      <Note text="3 ft at its highest" x={130} y={360} size={72} rot={-3} at={a + 2} />
      <Note text="almost 7 years" x={110} y={640} size={76} rot={-3} at={t.at('almost seven') - 2} />
      <Note text="through a tiny hole," x={110} y={830} size={46} rot={-2} at={th - 2} color="#ffffff" />
      <Note text="she watched her children play" x={130} y={910} size={46} rot={-2} at={th + 2} color="#ffffff" />
      <Tag text="Harriet Jacobs, Incidents in the Life of a Slave Girl, 1861, pp. 173, 175 · Internet Archive" />
    </AbsoluteFill>
  );
};

/** 1842: north, and the book. */
const North: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const keys: Cam[] = [{f: t.at('In 1842') - 1, x: 3000, y: 2330, s: 0.62}, {f: t.at('escaped north') + 20, x: 3180, y: 2250, s: 0.75}];
  const pin = PLACES.edenton;
  const end = PLACES.philadelphia;
  return (
    <MapScene keys={keys} dim={0.45} svg={() => <Route pts={[pin, [3190, 2470], [3300, 2200], [3250, 2040], end]} at={t.at('escaped north') - 2} dur={30} width={12} dashed />}>
      {(S) => {
        const [px, py] = S(pin);
        return (
          <>
            <Pin x={px} y={py} at={-10} />
            <Note text="1842: escaped north" x={110} y={110} size={64} rot={-3} at={t.at('In 1842') - 2} />
            <Note text="later, she told her story" x={110} y={820} size={52} rot={-2} at={t.at('later she') - 2} color="#ffffff" />
            <Doc src="img/ch08/incidents_title_page_1861.jpg" x={1290} y={130} w={480} at={t.at('told her story') - 1} rot={2} push={[t.at('told her story'), t.at('And very rarely')]} zoom={1.08} fx={960} fy={700}
              marks={[{box: [462, 1158, 1420, 1234], pad: 22, at: t.at('told her story') + 8, tint: true, seed: 81, width: 4}]} />
            <Tag text={MAPTAG} y={1000} />
            {g >= t.at('told her story') && <Tag text="Harriet Jacobs (“Linda Brent”), Incidents in the Life of a Slave Girl, title page, Boston, 1861" />}
          </>
        );
      }}
    </MapScene>
  );
};

/** Open rebellion, and the one that happened: back to Southampton for chapter 9. */
const Rebellion: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const keys: Cam[] = [{f: t.at('And very rarely') - 1, x: 2500, y: 2420, s: 0.36}, {f: t.at('Nat Turners') - 4, x: 2560, y: 2420, s: 0.4}, {f: t.at('Nat Turners') + 40, x: 2622, y: 2378, s: 0.9}];
  return (
    <MapScene keys={keys} dim={0.45}>
      {(S) => {
        const [px, py] = S(PLACES.southampton);
        return (
          <>
            <Note text="very rarely:" x={130} y={90} size={50} rot={-2} at={t.at('very rarely') - 2} color="#ffffff" />
            {g >= t.at('open rebellion') && <Highlight text="OPEN REBELLION" x={130} y={180} size={96} at={t.at('open rebellion')} seed={91} rot={-2} />}
            <Note text="most plots betrayed before they began" x={150} y={380} size={50} rot={-2} at={t.at('Most plots') - 2} />
            <Note text="dozens of the accused hanged" x={150} y={480} size={50} rot={-2} at={t.at('dozens') - 2} />
            <Pin x={px} y={py} at={t.at('Nat Turners') + 30} />
            <Note text="Southampton County, Va." x={px - 380} y={py + 40} size={46} rot={-3} at={t.at('Nat Turners') + 32} />
            <Note text="Nat Turner's: the deadliest that actually happened" x={150} y={900} size={52} rot={-2} at={t.at('deadliest') - 2} color="#ffffff" />
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
    [0, <Turn t={t} />],
    [at('Under all') - 1, <Lives t={t} />],
    [at('They named') - 1, <Names t={t} />],
    [at('One historian') - 1, <Family t={t} />],
    [at('They built a faith') - 1, <Verse t={t} />],
    [at('But enslaved') - 1, <Exodus t={t} />],
    [at('They sang') - 1, <Song t={t} />],
    [at('At night') - 1, <Harbor t={t} />],
    [at('Resistance came') - 1, <Everyday t={t} />],
    [at('Men ran') - 1, <MenWomen t={t} />],
    [at('Harriet Jacobs') - 1, <Jacobs t={t} />],
    [at('She hid') - 1, <Crawl t={t} />],
    [at('In 1842') - 1, <North t={t} />],
    [at('And very rarely') - 1, <Rebellion t={t} />],
  ];
  const scene = useScene(cuts);
  const notes = ["But that's", 'Not even close', 'The law', 'married anyway', 'They named', 'so family ties', 'One historian', 'a man could', 'a woman could', 'not just', 'White preachers',
    'But enslaved', 'Moses', 'Pharaoh', 'They sang', 'At night', 'turned a big', 'Working slowly', 'Breaking tools', 'Faking sickness', 'Running away', 'Men ran', 'Women usually',
    'children they', 'resisted', 'kept them', 'In 1835', 'But not far', 'crawl space', 'almost seven', 'Through a tiny', 'In 1842', 'later she', 'very rarely', 'Most plots', 'dozens', 'deadliest'];
  return (
    <>
      {scene}
      {cuts.slice(1).map(([f], i) => <Sfx key={i} at={f} src="sfx/whoosh.wav" volume={0.2} />)}
      {[at('North Carolina'), at('Nat Turners') + 30].map((f) => <Sfx key={f} at={f} src="sfx/tick.wav" volume={0.3} />)}
      {notes.map((c) => <Sfx key={c} at={at(c) - 2} src={WRITE.src} volume={0.16} />)}
    </>
  );
};

export const Ch08: React.FC = () => (
  <ChapterShell n={N} audio="audio/ch08_world_outside.wav" lead={LEAD} quiet music={[{src: cue('world_outside', 'r_dix'), volume: 0.12}]}>
    <Body />
  </ChapterShell>
);
