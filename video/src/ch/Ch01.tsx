// Chapter 1 · cold open: Gov. Floyd's reward proclamation → the revolt → Virginia's vote → the driving question.
// Then the channel intro and the title card (chapter 1 has no logo break in front).
import React from 'react';
import {AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame} from 'remotion';
import words from '../../public/audio/ch01_cold_open.words.json';
import {clamp} from '../lib/anim';
import {Arrow, Finish, Highlight, JF, Loop, Note, PALETTES, PaletteCtx, StepCtx, Tag, useGFrame, usePal} from '../kit/Kit';
import {DarkPaper, MapView, Sfx, WRITE} from '../kit/common';
import {ChannelIntro, INTRO_FRAMES} from '../kit/Intro';
import {type Cam, MapScene, Pin, PLACES} from '../kit/map';
import {Doc, Underline} from '../kit/gt';
import {makeTimeline, type Narration, PhotoCard, type TL, useScene} from '../kit/shell';
import {DATES, SUBTITLE, TITLE} from '../project';

const N = words as Narration;
const TITLE_FRAMES = 150;
const END = Math.ceil(N.duration * 30) + 20;
export const CH01_FRAMES = END + INTRO_FRAMES + TITLE_FRAMES;

const P1 = 'img/ch01/floyd_reward_proclamation_1831_p1.jpg';
const P2 = 'img/ch01/floyd_reward_proclamation_1831_p2.jpg';
const PTAG = 'Gov. John Floyd, reward proclamation, Sept. 17, 1831 · Library of Virginia';

/** Page 1 on the desk: the date, the reward, the signature. */
const Notice: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const pal = usePal();
  return (
    <AbsoluteFill>
      <DarkPaper />
      <Doc src={P1} x={170} y={170} w={600} at={2} rot={-2} push={[0, t.at('On the second')]} zoom={1.06} fx={300} fy={500}>
        {(S) => {
          const [sx, sy] = S(430, 640);
          return <Loop cx={sx} cy={sy} rx={150} ry={46} at={t.at('signs')} seed={3} tilt={-4} />;
        }}
      </Doc>
      {g >= t.at('September') && <Highlight text="SEPT. 17, 1831" x={880} y={150} size={92} at={t.at('September')} seed={5} rot={-2} />}
      <Note text="Richmond, Virginia" x={910} y={320} size={52} rot={-3} at={t.at('Richmond') - 2} color="#ffffff" />
      <Note text="the governor's signature" x={880} y={760} size={44} rot={-3} at={t.at('signs')} />
      {g >= t.at('500') && <div style={{position: 'absolute', left: 900, top: 440, fontFamily: JF.display, fontSize: 150, lineHeight: 1, color: pal.subject, textShadow: '0 6px 22px rgba(0,0,0,0.8)',
        transform: `scale(${interpolate(g, [t.at('500'), t.at('500') + 3, t.at('500') + 6], [1.35, 0.95, 1], clamp)})`, transformOrigin: 'left center'}}>$500</div>}
      <Note text="for a man named Nat" x={910} y={620} size={56} rot={-3} at={t.at('named') - 2} />
      <Tag text={PTAG} />
    </AbsoluteFill>
  );
};

/** Page 2: the description, phrase by phrase. */
const Description: React.FC<{t: TL}> = ({t}) => {
  const lines: [string, string][] = [
    ['Between 30', 'between 30 & 35 years old'],
    ['Five feet', '5 feet 6 or 8 inches high'],
    ['Broad', 'broad shouldered'],
    ['Large', 'large eyes'],
    ['Walks', 'walks brisk and active'],
  ];
  return (
    <AbsoluteFill>
      <DarkPaper />
      <Doc src={P2} x={150} y={110} w={660} at={1} rot={1.5} push={[0, t.at("It's the closest")]} zoom={1.08} fx={300} fy={140} />
      <Note text="page 2:" x={900} y={130} size={48} rot={-3} at={t.at('On the second')} color="#ffffff" />
      {lines.map(([cue, text], i) => <Note key={cue} text={text} x={930} y={240 + i * 118} size={54} rot={-3} at={t.at(cue) - 2} />)}
      {lines.map(([cue], i) => <Underline key={cue} x1={930} x2={1560} y={318 + i * 118} at={t.at(cue) + 4} seed={i + 1} width={3} />)}
      <Tag text={PTAG} />
    </AbsoluteFill>
  );
};

/** No portrait exists: an empty drawn frame, and the page instead. */
const NoPortrait: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const pal = usePal();
  const p = interpolate(g, [t.at("It's the closest"), t.at("It's the closest") + 12], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <DarkPaper />
      <svg style={{position: 'absolute', left: 0, top: 0}} width={1920} height={1080}>
        <ellipse cx={560} cy={520} rx={230} ry={300} fill="none" stroke={pal.mark} strokeWidth={6} strokeDasharray="18 16" pathLength={1000} strokeDashoffset={(1 - p) * 1000} opacity={0.85} />
      </svg>
      <Note text="no painting" x={410} y={420} size={50} rot={-3} at={t.at('painting') - 2} color="#ffffff" />
      <Note text="no photograph" x={395} y={540} size={50} rot={-3} at={t.at('photograph') - 2} color="#ffffff" />
      <PhotoCard src={P2} x={1060} y={150} w={560} rot={2} at={t.at('Nat Turner') - 1} fit="contain" filter="grayscale(1) sepia(0.3) contrast(1.15)" />
      <Note text="just this." x={1110} y={880} size={66} rot={-3} at={t.at('Just this') - 2} color={pal.subject} />
      <Arrow x1={800} y1={640} x2={1030} y2={600} bow={-40} at={t.at('Just this') + 4} />
      <Tag text={PTAG} />
    </AbsoluteFill>
  );
};

/** A month earlier: Southampton County on the 1836 map. */
const Southampton: React.FC<{t: TL}> = ({t}) => {
  const keys: Cam[] = [
    {f: t.at('A month') - 2, x: 2700, y: 2450, s: 0.32},
    {f: t.at('Southampton'), x: 2960, y: 2430, s: 0.62},
  ];
  return (
    <MapScene keys={keys} dim={0.2}>
      {(S) => {
        const [px, py] = S(PLACES.southampton);
        return (
          <>
            <Note text="Aug. 21–22, 1831" x={110} y={110} size={58} rot={-3} at={t.at('A month') - 2} color="#ffffff" />
            <Pin x={px} y={py} at={t.at('Southampton')} />
            <Note text="Southampton County" x={px - 560} y={py + 40} size={50} rot={-3} at={t.at('Southampton')} />
            <Note text="an enslaved preacher's revolt" x={110} y={900} size={50} rot={-3} at={t.at('preacher') - 2} />
            <Tag text="Samuel Augustus Mitchell, Map of the United States, 1836 · Library of Congress" />
          </>
        );
      }}
    </MapScene>
  );
};

/** The toll, stated plainly, then the reprisals. White newspapers' woodcut held as a document, not as illustration. */
const Toll: React.FC<{t: TL}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <PhotoCard src="img/ch01/horrid_massacre_woodcut_1831.jpg" x={140} y={190} w={720} rot={-2} at={t.at('Between 55') - 1} />
    <Note text="an 1831 woodcut:" x={150} y={800} size={40} rot={-2} at={t.at('Between 55') + 6} color="#ffffff" />
    <Note text="the story as white newspapers told it" x={150} y={865} size={40} rot={-2} at={t.at('Between 55') + 10} color="#ffffff" />
    <Note text="55–60 white people killed" x={1000} y={260} size={58} rot={-3} at={t.at('Between 55') - 2} color="#ffffff" />
    <Note text="then: white mobs & militias" x={1000} y={450} size={58} rot={-3} at={t.at('Then white') - 2} />
    <Note text="killed Black people across the region" x={1000} y={560} size={46} rot={-3} at={t.at('killed Black') - 2} />
    <Note text="most had nothing to do with it" x={1000} y={680} size={46} rot={-3} at={t.at('nothing') - 2} />
    <Tag text="Horrid Massacre in Virginia, woodcut, 1831 · Library of Congress" />
  </AbsoluteFill>
);

/** Virginia's lawmakers debate ending slavery, vote no, and make it harsher. */
const Vote: React.FC<{t: TL}> = ({t}) => {
  const keys: Cam[] = [
    {f: t.at('And then Virginia') - 2, x: 2600, y: 2380, s: 0.5},
    {f: t.at('lawmakers'), x: 2400, y: 2300, s: 0.75},
  ];
  const g = useGFrame();
  const pal = usePal();
  return (
    <MapScene keys={keys} dim={0.45}>
      {(S) => {
        const [rx, ry] = S(PLACES.richmond);
        return (
          <>
            <Pin x={rx} y={ry} at={t.at('lawmakers')} />
            <Note text="Richmond" x={rx + 30} y={ry - 80} size={44} rot={-3} at={t.at('lawmakers')} />
            {g >= t.at('debated') && <Highlight text="END SLAVERY?" x={110} y={120} size={110} at={t.at('debated')} seed={9} rot={-2} />}
            <Note text="voted no." x={160} y={380} size={80} rot={-3} at={t.at('They voted') - 2} color={pal.subject} />
            <Note text="…and made it harsher." x={160} y={520} size={64} rot={-3} at={t.at('harsher') - 4} color="#ffffff" />
            <Tag text="Samuel Augustus Mitchell, Map of the United States, 1836 · Library of Congress" />
          </>
        );
      }}
    </MapScene>
  );
};

/** The driving question. */
const Question: React.FC<{t: TL}> = ({t}) => {
  const pal = usePal();
  return (
    <AbsoluteFill>
      <DarkPaper />
      <Note text="the question:" x={200} y={180} size={60} rot={-3} at={t.at("So here's")} color="#ffffff" />
      <Note text="why did the South" x={260} y={320} size={88} rot={-3} at={t.at('Why did')} />
      <Note text="hold on tighter" x={300} y={470} size={96} rot={-3} at={t.at('hold on')} color={pal.subject} />
      <Note text="than ever?" x={340} y={620} size={88} rot={-3} at={t.at('than ever')} />
      <Note text="(it starts with a seed)" x={1150} y={850} size={50} rot={-4} at={t.at('seed') - 4} color="#ffffff" />
    </AbsoluteFill>
  );
};

/** Title card after the channel intro: the map dimmed, the title on orange, the subtitle in teal. */
const Title: React.FC = () => {
  const g = useGFrame();
  const pal = usePal();
  return (
    <AbsoluteFill style={{background: '#15130f'}}>
      <MapView cx={2400} cy={2600} s={0.26 + g * 0.0003} rot={0} dim={0.5} />
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 50%, rgba(8,6,4,0.2) 30%, rgba(8,6,4,0.85) 100%)'}} />
      <Highlight text={TITLE} x={330} y={360} size={180} at={4} seed={61} rot={-2} />
      {g >= 14 && <div style={{position: 'absolute', left: 380, top: 640, fontFamily: JF.display, fontSize: 64, color: pal.mark, textShadow: '0 3px 16px rgba(0,0,0,0.8)', opacity: interpolate(g, [14, 20], [0, 1], clamp)}}>{SUBTITLE}</div>}
      <Note text={DATES} x={1340} y={760} size={52} rot={-5} at={24} />
    </AbsoluteFill>
  );
};

const Body: React.FC = () => {
  const frame = useCurrentFrame();
  const t = makeTimeline(N, 30);
  const at = t.at;
  const cuts: [number, React.ReactNode][] = [
    [0, <Notice t={t} />],
    [at('On the second') - 1, <Description t={t} />],
    [at("It's the closest") - 1, <NoPortrait t={t} />],
    [at('A month') - 1, <Southampton t={t} />],
    [at('Between 55') - 1, <Toll t={t} />],
    [at('And then Virginia') - 1, <Vote t={t} />],
    [at("So here's") - 1, <Question t={t} />],
  ];
  let scene = useScene(cuts);
  if (frame >= END + INTRO_FRAMES) scene = <Sequence from={END + INTRO_FRAMES} layout="none"><Title /></Sequence>;
  else if (frame >= END) scene = <Sequence from={END} layout="none"><ChannelIntro /></Sequence>;
  const notes = ['Richmond', 'named', 'On the second', 'Between 30', 'Five feet', 'Broad', 'Large', 'Walks', 'painting', 'photograph', 'Just this', 'A month', 'preacher', 'Then white', 'killed Black', 'nothing', 'They voted', 'harsher', "So here's", 'Why did', 'hold on', 'than ever', 'seed'];
  return (
    <AbsoluteFill style={{background: '#000'}}>
      {scene}
      {frame < END && <Finish vignette={0.3} />}
      <Audio src={staticFile('audio/ch01_cold_open.wav')} />
      <Audio src={staticFile('music/r_cold_open.mp3')} volume={(f) => interpolate(f, [0, 15, END - 60, END], [0, 0.17, 0.12, 0], clamp)} />
      {cuts.slice(1).map(([f], i) => <Sfx key={i} at={f} src="sfx/whoosh.wav" volume={0.3} />)}
      {['September', '500', 'debated'].map((c) => <Sfx key={c} at={at(c)} src="sfx/stamp.wav" volume={0.28} />)}
      {['Southampton', 'lawmakers'].map((c) => <Sfx key={c} at={at(c)} src="sfx/tick.wav" volume={0.45} />)}
      {notes.map((c) => <Sfx key={c} at={at(c) - 2} src={WRITE.src} volume={WRITE.volume} />)}
      <Sfx at={END + INTRO_FRAMES + 4} src="sfx/stamp.wav" volume={0.4} />
    </AbsoluteFill>
  );
};

export const Ch01: React.FC = () => (
  <PaletteCtx.Provider value={PALETTES.locked}>
    <StepCtx.Provider value={2.5}>
      <Body />
    </StepCtx.Provider>
  </PaletteCtx.Provider>
);
