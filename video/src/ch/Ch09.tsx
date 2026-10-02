// Chapter 9 · Southampton (heavy, quiet palette): back to the pin; Turner's early life from the Confessions (no portrait
// exists, so no face is ever shown as his); the vision; the eclipse map, then the eclipse; the second sign; the woods;
// the killings and the revenge stated in plain text over a dark map; the hiding and the reward; Gray and the Confessions;
// the exchange; the hanging; and the two facts side by side.
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import words from '../../public/audio/ch09_southampton.words.json';
import {clamp} from '../lib/anim';
import {JF, Highlight, Loop, Note, Tag, useGFrame, usePal} from '../kit/Kit';
import {DarkPaper, Sfx, WRITE} from '../kit/common';
import {type Cam, MapScene, Pin, PLACES} from '../kit/map';
import {cue, Doc, Pic, sizeOf} from '../kit/gt';
import {ChapterShell, chapterFrames, CropCard, LEAD, makeTimeline, type Narration, PhotoCard, Quote, type TL, useScene} from '../kit/shell';

const N = words as Narration;
export const CH09_FRAMES = chapterFrames(N, LEAD);

const BONE = '#EDE7DC';
const MAPTAG = 'Samuel Augustus Mitchell, Map of the United States, 1836 · Library of Congress';
const CONF = 'img/ch09/confessions_title_page_1831.jpg';
const CONFTAG = 'Thomas R. Gray, The Confessions of Nat Turner, title page, 1831 · Internet Archive';
const P2 = 'img/ch01/floyd_reward_proclamation_1831_p2.jpg';
const ECL = 'img/ch01/eclipse_map_1831.jpg';

/** A plain statement in bone Playfair: no write-on, no colour, a slow fade. For the facts that get no marks. */
const Plain: React.FC<{text: string; x: number; y: number; at: number; size?: number; w?: number; dim?: number}> = ({text, x, y, at, size = 56, w, dim = 1}) => {
  const g = useGFrame();
  if (g < at) return null;
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, whiteSpace: w ? 'normal' : 'nowrap', fontFamily: JF.heavy, fontWeight: 700, fontSize: size, lineHeight: 1.3, color: BONE,
      textShadow: '0 3px 14px #000', opacity: interpolate(g, [at, at + 8], [0, 1], clamp) * dim}}>{text}</div>
  );
};

/** Back to the pin: Southampton County, where Turner was born. */
const Back: React.FC<{t: TL}> = ({t}) => {
  const keys: Cam[] = [
    {f: 0, x: 2850, y: 2380, s: 0.34},
    {f: t.at('Southampton') + 6, x: 2990, y: 2440, s: 0.7},
  ];
  return (
    <MapScene keys={keys} dim={0.25}>
      {(S) => {
        const [px, py] = S(PLACES.southampton);
        return (
          <>
            <Pin x={px} y={py} at={t.at('Southampton')} />
            <Note text="Southampton County, Virginia" x={px - 820} y={py + 40} size={50} rot={-3} at={t.at('Southampton')} />
            <Note text="Nat Turner · born 1800" x={px + 40} y={py - 150} size={50} rot={-3} at={t.at('born') - 2} color="#ffffff" />
            <Tag text={MAPTAG} />
          </>
        );
      }}
    </MapScene>
  );
};

/** His early life, from the only account we have: the Confessions. No portrait exists. */
const Early: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  return (
    <AbsoluteFill>
      <DarkPaper />
      <Doc src={CONF} x={180} y={100} w={460} at={t.at('Even as') - 1} rot={-2} push={[t.at('Even as'), t.at('He also had')]} zoom={1.08} fx={960} fy={900}
        marks={[{box: [30, 804, 1570, 950], pad: 30, at: t.at('Even as') + 8, tint: true, seed: 92, width: 4}]} />
      <Note text="his story, as printed in 1831" x={800} y={120} size={44} rot={-3} at={t.at('Even as') + 2} color="#ffffff" />
      <Note text="seen as special, even as a kid" x={820} y={250} size={50} rot={-3} at={t.at('people around') - 2} />
      <Note text="learned to read so young" x={820} y={370} size={50} rot={-3} at={t.at('He learned') - 2} />
      <Note text="he couldn't remember learning" x={850} y={460} size={50} rot={-3} at={t.at('remember') - 4} />
      <Note text="preached to other enslaved people" x={820} y={590} size={50} rot={-3} at={t.at('preached') - 2} />
      {g >= t.at('Prophet') && <Highlight text="THE PROPHET" x={820} y={740} size={100} at={t.at('Prophet')} seed={91} rot={-2} />}
      <Tag text={CONFTAG} />
    </AbsoluteFill>
  );
};

/** The vision, in his words as Gray printed them. */
const Vision: React.FC<{t: TL}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Note text="he also had visions" x={170} y={130} size={50} rot={-3} at={t.at('visions') - 2} color="#ffffff" />
    <Quote text="I saw white spirits and black spirits engaged in battle, and the sun was darkened" at={t.at('described') - 1} x={170} y={300} w={1480} size={68}
      who="Nat Turner, The Confessions of Nat Turner, 1831" />
  </AbsoluteFill>
);

/** He took the sky as his signal: the 1831 map of the eclipse's path across the country. */
const EclipseMap: React.FC<{t: TL}> = ({t}) => {
  const frame = useCurrentFrame();
  const g = useGFrame();
  const a = t.at('He came') - 1;
  const scale = interpolate(frame, [a, t.at('moon')], [0.25, 0.28], clamp);
  return (
    <AbsoluteFill>
      <DarkPaper />
      <CropCard src={ECL} size={sizeOf(ECL)} x={130} y={150} w={860} h={760} fx={2050} fy={2050} scale={scale} rot={-1.5} at={a}>
        {(S) => {
          const [lx, ly] = S(2340, 2040);
          return <Loop cx={lx} cy={ly} rx={120} ry={70} at={t.at('February') + 4} seed={7} tilt={-30} width={6} />;
        }}
      </CropCard>
      <Note text="he believed God had chosen him" x={1060} y={170} size={46} rot={-3} at={t.at('came to believe') - 2} />
      <Note text="to fight slavery" x={1090} y={265} size={50} rot={-3} at={t.at('fight') - 2} />
      {g >= t.at('February') && <Highlight text="FEB. 12, 1831" x={1060} y={420} size={92} at={t.at('February')} seed={93} rot={-2} />}
      <Note text="its path, mapped that year" x={1080} y={590} size={44} rot={-3} at={t.at('February') + 6} color="#ffffff" />
      <Tag text="A Map of the Eclipse of Feb. 12th [1831] in Its Passage Across the United States · Boston Public Library · CC BY 2.0" />
    </AbsoluteFill>
  );
};

/** The eclipse, as a schoolbook drew it: the moon inside the sun's ring. */
const SMITH = 'img/arch/eclipse/smith_illustrated_astronomy_eclipses_plate_1849.jpg';
const SMITH_TAG = "Asa Smith, Smith's Illustrated Astronomy, 1849, Fig. 9: “Annular Eclipse of the Sun” · Internet Archive";
const Eclipse: React.FC<{t: TL}> = ({t}) => (
  <Pic src={SMITH} tag={SMITH_TAG} a={t.at('moon') - 1} b={t.at('When the sun')} fx={2766} fy={3562} z0={1.05} z1={1.7} bw="contrast(1.1) saturate(0.75) brightness(0.92)">
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.5) 22%, transparent 40%)'}} />
    <Note text="midday: the sky went strange and dim" x={110} y={100} size={48} rot={-3} at={t.at('sky went') - 2} color="#ffffff" />
    <Note text="he took it as the signal" x={130} y={200} size={54} rot={-3} at={t.at('signal') - 4} />
  </Pic>
);

/** Two signs, drawn: the darkened sun in February, the bluish-green sun in August. */
const Sun: React.FC<{cx: number; cy: number; at: number; kind: 'eclipse' | 'green'}> = ({cx, cy, at, kind}) => {
  const g = useGFrame();
  const pal = usePal();
  if (g < at) return null;
  const p = interpolate(g, [at, at + 12], [0, 1], clamp);
  const r = 150;
  return (
    <svg style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}} width={1920} height={1080}>
      <defs>
        <radialGradient id={`sun${kind}`}>
          <stop offset="0%" stopColor="#8fd3c8" stopOpacity={0.55} />
          <stop offset="70%" stopColor="#4f9f95" stopOpacity={0.25} />
          <stop offset="100%" stopColor="#4f9f95" stopOpacity={0} />
        </radialGradient>
      </defs>
      {kind === 'green' && <circle cx={cx} cy={cy} r={r * 1.5} fill={`url(#sun${kind})`} opacity={p} />}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={pal.mark} strokeWidth={6} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} transform={`rotate(-80 ${cx} ${cy})`} />
      {kind === 'eclipse' && p >= 1 && <circle cx={cx + 16} cy={cy - 6} r={r - 4} fill="#0d0c09" />}
    </svg>
  );
};
const Signs: React.FC<{t: TL}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Sun cx={560} cy={420} at={t.at('When the sun') - 1} kind="eclipse" />
    <Note text="February: the sun darkened" x={340} y={660} size={46} rot={-2} at={t.at('When the sun') - 1} color="#ffffff" />
    <Note text="the signal" x={460} y={760} size={50} rot={-2} at={t.at('When the sun') + 3} />
    <Sun cx={1320} cy={420} at={t.at('turned a strange')} kind="green" />
    <Note text="August: a bluish-green sun" x={1070} y={660} size={46} rot={-2} at={t.at('turned a strange') - 2} color="#ffffff" />
    <Note text="the second sign" x={1160} y={760} size={50} rot={-2} at={t.at('second') - 4} />
  </AbsoluteFill>
);

/** August 21st: the meeting in the woods, in the Confessions (p. 12). No portrait of Turner exists. */
const C12 = 'img/arch/woods_meeting/confessions_p12_dinner_in_the_woods_1831.jpg';
const Woods: React.FC<{t: TL}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Doc src={C12} x={1080} y={80} w={600} rot={1.5} at={t.at('On August') - 1} push={[t.at('On August'), t.at('They killed')]} zoom={1.2} fx={960} fy={600} marks={[
      // 1928 x 3348 scan: "they prepared in the woods a dinner" / "about three o'clock, I joined them" / "commence at home (Mr. J. Travis') on that night"
      {box: [580, 262, 1620, 340], pad: 8, at: t.at('his followers'), tint: true, noTrace: true},
      {box: [160, 342, 1110, 404], pad: 8, at: t.at('his followers') + 3, tint: true, noTrace: true},
      {box: [160, 1000, 1760, 1065], pad: 8, at: t.at('That night'), tint: true, noTrace: true},
      {box: [160, 1069, 470, 1130], pad: 8, at: t.at('That night') + 2, tint: true, noTrace: true},
    ]} />
    <Note text="Aug. 21, 1831" x={110} y={100} size={60} rot={-3} at={t.at('On August') - 2} color="#ffffff" />
    <Note text="a meeting in the woods" x={130} y={210} size={54} rot={-3} at={t.at('his followers') - 2} />
    <Note text="that night, they began" x={130} y={320} size={54} rot={-3} at={t.at('That night') - 2} />
    <Tag text="The Confessions of Nat Turner, Baltimore, 1831, p. 12 · Internet Archive" />
  </AbsoluteFill>
);

/** The killings and the revenge, stated plainly over the darkened map. No images. */
const Killings: React.FC<{t: TL}> = ({t}) => {
  const a = t.at('They killed') - 1;
  const keys: Cam[] = [
    {f: a, x: 2380, y: 2420, s: 0.62},
    {f: t.at('Turner hid'), x: 2420, y: 2430, s: 0.66},
  ];
  return (
    <MapScene keys={keys} dim={0.62}>
      {(S) => {
        const [px, py] = S(PLACES.southampton);
        return (
          <>
            <Pin x={px} y={py} at={a} r={10} />
            <Plain text="They killed nearly every white person they found," x={150} y={200} at={t.at('They killed')} size={54} />
            <Plain text="including women and children." x={150} y={290} at={t.at('including')} size={54} />
            <Plain text="Then came the revenge:" x={150} y={480} at={t.at('Then came')} size={54} />
            <Plain text="the killing of Black people" x={150} y={570} at={t.at('killing of')} size={54} />
            <Plain text="who had nothing to do with it." x={150} y={660} at={t.at('nothing')} size={54} />
            <Tag text={MAPTAG} />
          </>
        );
      }}
    </MapScene>
  );
};

/** More than two months in hiding; the governor's reward from the cold open; found on October 30th. */
const C17 = 'img/arch/hiding_place/confessions_p17_hole_under_fence_rails_cave_1831.jpg';
const Hiding: React.FC<{t: TL}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Doc src={C17} x={140} y={120} w={500} rot={-1.5} at={t.at('Turner hid') - 1} push={[t.at('Turner hid'), t.at('In jail')]} zoom={1.1} fx={960} fy={2000} marks={[
      // 1928 x 3348 scan: "I scratched a hole under a pile of fence rails in a field" / "taken ... by Mr. Benjamin Phipps, in a little hole I had dug out with my sword"
      {box: [330, 1330, 1700, 1394], pad: 8, at: t.at('hid'), tint: true, noTrace: true},
      {box: [160, 1398, 1345, 1462], pad: 8, at: t.at('hid') + 2, tint: true, noTrace: true},
      {box: [160, 2713, 1700, 2777], pad: 8, at: t.at('On October'), tint: true, noTrace: true},
      {box: [160, 2780, 890, 2844], pad: 8, at: t.at('On October') + 2, tint: true, noTrace: true},
    ]} />
    <Note text="hid for more than two months" x={720} y={110} size={48} rot={-3} at={t.at('hid') - 2} color="#ffffff" />
    <PhotoCard src={P2} x={1330} y={230} w={420} rot={2} at={t.at('two months') - 1} fit="contain" filter="grayscale(1) sepia(0.3) contrast(1.15)" />
    <Note text="the governor's $500 reward" x={1220} y={830} size={42} rot={-3} at={t.at('two months') + 4} color="#ffffff" />
    <Note text="Oct. 30, 1831: a farmer found him" x={700} y={930} size={54} rot={-3} at={t.at('On October') - 2} />
    <Tag text="The Confessions of Nat Turner, 1831, p. 17 · Internet Archive  |  Gov. John Floyd, reward proclamation, 1831 · Library of Virginia" />
  </AbsoluteFill>
);

/** In jail: Thomas Gray and the Confessions. Read with care. */
const Gray: React.FC<{t: TL}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Doc src={CONF} x={200} y={110} w={420} at={t.at('In jail') - 1} rot={1.5} push={[t.at('In jail'), t.at('But in it')]} zoom={1.1} fx={960} fy={1530}
      marks={[{box: [290, 1610, 1340, 1690], pad: 28, at: t.at('Thomas Gray') + 2, tint: true, seed: 4, width: 4}]} />
    <Note text="in jail:" x={820} y={130} size={50} rot={-3} at={t.at('In jail') - 2} color="#ffffff" />
    <Note text="Thomas R. Gray, a white lawyer" x={840} y={240} size={50} rot={-3} at={t.at('Thomas Gray') - 2} />
    <Note text="published The Confessions of Nat Turner" x={840} y={340} size={46} rot={-3} at={t.at('published') - 2} />
    <Note text="read it carefully:" x={820} y={540} size={50} rot={-3} at={t.at('read it carefully') - 2} color="#ffffff" />
    <Note text="Gray chose what to print" x={840} y={650} size={54} rot={-3} at={t.at('Gray chose') - 2} />
    <Tag text={CONFTAG} />
  </AbsoluteFill>
);

/** The exchange, as Gray printed it. */
const Exchange: React.FC<{t: TL}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Note text="he doesn't apologize" x={170} y={120} size={50} rot={-3} at={t.at('apologize') - 4} color="#ffffff" />
    <Quote text="Do you not find yourself mistaken now?" at={t.at('When Gray asked') - 1} x={170} y={300} w={1500} size={60} who="Thomas R. Gray" />
    <Quote text="Was not Christ crucified." at={t.at('Was not') - 1} x={170} y={590} w={1500} size={76} who="Nat Turner" />
    <Tag text="Thomas R. Gray, The Confessions of Nat Turner, 1831" />
  </AbsoluteFill>
);

/** The hanging, and the others. */
const Hanged: React.FC<{t: TL}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Plain text="Nat Turner was hanged" x={170} y={260} at={t.at('Nat Turner was', 2) - 1} size={72} />
    <Plain text="November 11th, 1831." x={170} y={360} at={t.at('November') - 1} size={72} />
    <Note text="Virginia hanged others too" x={190} y={590} size={50} rot={-3} at={t.at('Virginia hanged') - 2} color="#ffffff" />
    <Note text="and sold others out of the state" x={210} y={690} size={50} rot={-3} at={t.at('sold') - 2} color="#ffffff" />
  </AbsoluteFill>
);

/** Both facts at once: two plain lines side by side, neither marked. */
const Both: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const a = t.at('He fought') - 1;
  const p = interpolate(g, [a, a + 10], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <DarkPaper />
      <div style={{position: 'absolute', left: 958, top: 220, width: 4, height: 520 * p, background: 'rgba(244,239,230,0.7)'}} />
      <Plain text="He fought a system that was violent every single day." x={170} y={330} w={700} at={t.at('He fought')} size={58} />
      <Plain text="His rebellion also killed children." x={1060} y={330} w={700} at={t.at('His rebellion')} size={58} />
      <Note text="how to hold both facts at once" x={640} y={850} size={46} rot={-2} at={t.at('Historians') - 2} color="#ffffff" />
    </AbsoluteFill>
  );
};

const Body: React.FC = () => {
  const t = makeTimeline(N, 30);
  const at = t.at;
  const cuts: [number, React.ReactNode][] = [
    [0, <Back t={t} />],
    [at('Even as') - 1, <Early t={t} />],
    [at('He also had') - 1, <Vision t={t} />],
    [at('He came') - 1, <EclipseMap t={t} />],
    [at('moon') - 1, <Eclipse t={t} />],
    [at('When the sun') - 1, <Signs t={t} />],
    [at('On August') - 1, <Woods t={t} />],
    [at('They killed') - 1, <Killings t={t} />],
    [at('Turner hid') - 1, <Hiding t={t} />],
    [at('In jail') - 1, <Gray t={t} />],
    [at('But in it') - 1, <Exchange t={t} />],
    [at('Nat Turner was', 2) - 1, <Hanged t={t} />],
    [at('He fought') - 1, <Both t={t} />],
  ];
  const scene = useScene(cuts);
  // marker sound at each note's start (the notes start 2–4 frames before their word)
  const notes = [
    at('Southampton'), at('born') - 2, at('Even as') + 2, at('people around') - 2, at('He learned') - 2, at('remember') - 4, at('preached') - 2,
    at('visions') - 2, at('came to believe') - 2, at('fight') - 2, at('February') + 6, at('sky went') - 2, at('signal') - 4,
    at('When the sun') - 1, at('When the sun') + 3, at('turned a strange') - 2, at('second') - 4, at('On August') - 2, at('That night') - 2,
    at('hid') - 2, at('two months') + 4, at('On October') - 2, at('In jail') - 2, at('Thomas Gray') - 2, at('published') - 2,
    at('read it carefully') - 2, at('Gray chose') - 2, at('apologize') - 4, at('Virginia hanged') - 2, at('sold') - 2, at('Historians') - 2,
  ];
  return (
    <>
      {scene}
      {cuts.slice(1).map(([f], i) => <Sfx key={i} at={f} src="sfx/whoosh.wav" volume={0.2} />)}
      <Sfx at={at('Southampton')} src="sfx/tick.wav" volume={0.45} />
      {notes.map((f, i) => <Sfx key={`n${i}`} at={f} src={WRITE.src} volume={WRITE.volume} />)}
    </>
  );
};

export const Ch09: React.FC = () => (
  <ChapterShell n={N} audio="audio/ch09_southampton.wav" lead={LEAD} quiet music={[{src: cue('southampton', 'w_fire'), volume: 0.12}]}>
    <Body />
  </ChapterShell>
);
