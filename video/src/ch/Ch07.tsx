// Chapter 7 · No Law Above Him (heavy, quiet palette): the law, Judge Ruffin's sentence in State v. Mann,
// violence as the tool of absolute power (the 1863 photograph, held still once), sexual violence in text only,
// and Celia: the map pin, the empty cabin, the trial, the end. No image of Celia exists; none is shown.
import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile} from 'remotion';
import words from '../../public/audio/ch07_no_law.words.json';
import {clamp} from '../lib/anim';
import {Highlight, JF, Note, Tag, useGFrame} from '../kit/Kit';
import {DarkPaper, Sfx, WRITE} from '../kit/common';
import {type Cam, MapScene, Pin, PLACES} from '../kit/map';
import {Doc, sizeOf, Underline} from '../kit/gt';
import {ChapterShell, chapterFrames, CropCard, LEAD, makeTimeline, type Narration, Quote, type TL, useScene} from '../kit/shell';
import {MASKS} from '../masks';

const N = words as Narration;
export const CH07_FRAMES = chapterFrames(N, LEAD);

const BONE = '#EDE7DC';
const RUFFIN = 'img/ch07/thomas_ruffin.jpg';
const BACK = 'img/ch07/gordon_scourged_back_1863.jpg';
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

/** The law, in plain lines. */
const Law: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  return (
    <AbsoluteFill>
      <DarkPaper />
      <Line text="Under Southern law, an enslaved person was" x={140} y={120} size={54} at={t.at('Under Southern')} />
      {g >= t.at('property') && <Highlight text="PROPERTY" x={140} y={230} size={110} at={t.at('property')} seed={71} rot={-2} />}
      <Note text="could not testify in court against a white person" x={180} y={540} size={52} rot={-2} at={t.at('testify') - 4} />
      <Underline x1={180} x2={1420} y={632} at={t.at('white person') + 4} seed={2} width={3} />
      <Note text="could not legally defend themselves against their owner" x={180} y={720} size={52} rot={-2} at={t.at('legally defend') - 4} />
      <Underline x1={180} x2={1560} y={812} at={t.at('their owner') + 4} seed={3} width={3} />
    </AbsoluteFill>
  );
};

/** Judge Thomas Ruffin and State v. Mann (1829). The source is small, so it is held as a card. */
const Ruffin: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  return (
    <AbsoluteFill>
      <DarkPaper />
      <CropCard src={RUFFIN} size={sizeOf(RUFFIN)} x={150} y={170} w={420} h={560} fx={150} fy={190} scale={1.5} rot={-2} at={t.at('In 1829') - 1} mask={MASKS.ruffin}
        traceAt={t.at('Thomas Ruffin') + 2} />
      <Note text="North Carolina, 1829" x={170} y={820} size={46} rot={-2} at={t.at('North Carolina') - 2} color="#ffffff" />
      {g >= t.at('Thomas Ruffin') && <Highlight text="JUDGE THOMAS RUFFIN" x={720} y={130} size={76} at={t.at('Thomas Ruffin')} seed={73} rot={-2} />}
      <Quote text="The power of the master must be absolute, to render the submission of the slave perfect." at={t.at('The power') - 1} x={730} y={340} w={1080} size={60}
        who="Thomas Ruffin, State v. Mann, North Carolina, 1829" />
      <Tag text="Thomas Ruffin, engraving from W. J. Peele, Lives of Distinguished North Carolinians, 1897 · Google Books" />
    </AbsoluteFill>
  );
};

/** Absolute power, and its main tool. */
const Power: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  return (
    <AbsoluteFill>
      <DarkPaper />
      {g >= t.at('Absolute power') && <Highlight text="ABSOLUTE POWER" x={160} y={330} size={110} at={t.at('Absolute power')} seed={75} rot={-2} />}
      <Line text="Its main tool: violence." x={180} y={560} size={70} at={t.at('violence') - 2} />
    </AbsoluteFill>
  );
};

/** The 1863 photograph of Gordon: held once, still, with no zoom, tint or marks on him. */
const Scourged: React.FC<{t: TL}> = ({t}) => {
  const [w0, h0] = sizeOf(BACK);
  const h = 940;
  const w = (w0 * h) / h0;
  return (
    <AbsoluteFill>
      <DarkPaper />
      <Img src={staticFile(BACK)} style={{position: 'absolute', left: 1300, top: 70, width: w, height: h, filter: 'grayscale(1) contrast(1.1)', boxShadow: '0 18px 34px rgba(0,0,0,0.6)'}} />
      <Note text="overseers: judged by the size of the crop" x={120} y={150} size={44} rot={-2} at={t.at('overseers') - 2} />
      <Note text="the whip was how they got it" x={120} y={260} size={44} rot={-2} at={t.at('whip') - 2} />
      <Note text="some owners: branding, iron collars, and worse" x={120} y={420} size={42} rot={-2} at={t.at('Some owners') - 2} color="#ffffff" />
      <Note text="Gordon, after escaping to Union lines," x={120} y={780} size={42} rot={-2} at={t.at('On big') + 20} color="#ffffff" />
      <Note text="Baton Rouge, Louisiana, 1863" x={160} y={850} size={42} rot={-2} at={t.at('On big') + 26} color="#ffffff" />
      <Tag text="Gordon (“The Scourged Back”), Baton Rouge, 1863 · carte de visite, Mathew Brady studio · National Portrait Gallery" />
    </AbsoluteFill>
  );
};

/** Sexual violence: stated in text only. */
const Bodies: React.FC<{t: TL}> = ({t}) => (
  <AbsoluteFill style={{background: 'radial-gradient(ellipse at 45% 50%, #1c1a14 0%, #0b0a08 80%)'}}>
    <Line text="For enslaved women, there was another kind of violence." x={140} y={200} size={54} at={t.at('For enslaved women')} />
    <Line text="Owners had near-total control over their bodies." x={140} y={330} size={54} at={t.at('Owners had')} color="rgba(237,231,220,0.85)" />
    <Line text="Many used it to rape them." x={140} y={460} size={54} at={t.at('many used') - 2} color="rgba(237,231,220,0.85)" />
    <Note text="under the law, it wasn't even a crime." x={170} y={660} size={60} rot={-2} at={t.at('Under the law') - 2} />
  </AbsoluteFill>
);

/** Celia: Callaway County, Missouri, 1850. */
const Missouri: React.FC<{t: TL}> = ({t}) => {
  const keys: Cam[] = [
    {f: t.at('In 1850') - 2, x: 2000, y: 2500, s: 0.28},
    {f: t.at('Missouri farmer') + 10, x: 1450, y: 2250, s: 1.0},
  ];
  return (
    <MapScene keys={keys} dim={0.25}>
      {(S) => {
        const [px, py] = S(PLACES.fultonMO);
        return (
          <>
            <Note text="1850" x={110} y={100} size={70} rot={-3} at={t.at('In 1850') - 2} color="#ffffff" />
            <Pin x={px} y={py} at={t.at('Missouri farmer')} />
            <Note text="Callaway County, Missouri" x={px + 40} y={py - 110} size={44} rot={-3} at={t.at('Missouri farmer') + 2} />
            <Note text="a girl named Celia · age 14" x={110} y={760} size={54} rot={-2} at={t.at('She was 14') - 4} />
            <Note text="1850–1855" x={110} y={870} size={54} rot={-2} at={t.at('For the next') - 2} color="#ffffff" />
            <Tag text={MAPTAG} />
          </>
        );
      }}
    </MapScene>
  );
};

/** 1855: the county's own indictment names her. No image of Celia exists, and no person stands in for her. */
const INDICT = 'img/arch/celia_trial/celia_indictment_aug_1855.jpg';
const Cabin: React.FC<{t: TL}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Doc src={INDICT} x={1200} y={80} w={560} rot={1.5} at={t.at('In 1855') - 1} push={[t.at('In 1855'), t.at('At her trial')]} zoom={1.1} fx={300} fy={450} marks={[
      // 562 x 879 scan: "Celia otherwise Celia Newsom, a Slave" ... "with a large piece of wood"
      {box: [62, 258, 540, 290], pad: 4, at: t.at('In 1855') + 8, tint: true, noTrace: true},
      {box: [62, 291, 170, 308], pad: 4, at: t.at('In 1855') + 10, tint: true, noTrace: true},
      {box: [372, 576, 540, 603], pad: 4, at: t.at('she hit'), tint: true, noTrace: true},
      {box: [62, 606, 262, 636], pad: 4, at: t.at('she hit') + 2, tint: true, noTrace: true},
    ]} />
    <Note text="1855" x={110} y={90} size={70} rot={-3} at={t.at('In 1855') - 2} color="#ffffff" />
    <Note text="pregnant again, she told him to stop" x={110} y={210} size={50} rot={-2} at={t.at('told him') - 2} />
    <Note text="he didn't." x={150} y={310} size={50} rot={-2} at={t.at("He didn't") - 2} />
    <Note text="she struck him with a heavy stick." x={110} y={720} size={50} rot={-2} at={t.at('she hit') - 2} />
    <Note text="he died." x={150} y={810} size={50} rot={-2} at={t.at('and he died') - 2} />
    <Note text="no image of Celia exists" x={110} y={940} size={38} rot={-2} at={t.at('In 1855') + 20} color="#ffffff" />
    <Tag text="State of Missouri v. Celia, a Slave: indictment, Callaway County Circuit Court, Aug. 1855 · via UMKC Famous Trials" />
  </AbsoluteFill>
);

/** The defense: the statute's words. */
const Statute: React.FC<{t: TL}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Note text="at her trial, her lawyers argued:" x={140} y={110} size={50} rot={-2} at={t.at('her lawyers') - 2} color="#ffffff" />
    <Line text="Missouri law made it a crime to force" x={160} y={260} size={56} at={t.at('Missouri law')} />
    <div style={{position: 'absolute', left: 160, top: 360}}>
      <Line text="“any woman”" x={0} y={0} size={140} at={t.at('any woman') - 1} />
    </div>
    <Underline x1={170} x2={880} y={545} at={t.at('any woman') + 8} seed={4} width={5} />
    <Line text="into sex." x={160} y={590} size={56} at={t.at('into sex')} />
    <Note text="and deadly force could be used to stop that crime" x={170} y={760} size={52} rot={-2} at={t.at('deadly force') - 4} />
  </AbsoluteFill>
);

/** The judge's refusal. */
const Refused: React.FC<{t: TL}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Line text="The judge refused to let the jury consider it." x={140} y={130} size={58} at={t.at('The judge')} />
    <Note text="in the eyes of the court:" x={160} y={330} size={50} rot={-2} at={t.at('In the eyes') - 2} color="#ffffff" />
    <Line text="a woman defending herself" x={180} y={450} size={72} at={t.at("wasn't a woman")} color="rgba(237,231,220,0.8)" />
    <Underline x1={170} x2={1130} y={500} at={t.at('She was property')} seed={5} width={6} />
    <Line text="property" x={180} y={620} size={96} at={t.at('She was property') + 6} />
    <Note text="that had turned on its owner" x={220} y={790} size={52} rot={-2} at={t.at('turned on') - 2} />
  </AbsoluteFill>
);

/** The end: quiet bone text on a dark frame, held. */
const End: React.FC<{t: TL}> = ({t}) => (
  <AbsoluteFill style={{background: 'radial-gradient(ellipse at 45% 50%, #17150f 0%, #080706 75%)'}}>
    <Line text="Celia" x={200} y={330} size={84} at={t.at('Celia was hanged')} />
    <Line text="hanged · December 1855" x={200} y={470} size={58} at={t.at('hanged')} color="rgba(237,231,220,0.85)" />
    <Line text="about 19 years old" x={200} y={570} size={58} at={t.at('about 19')} color="rgba(237,231,220,0.85)" />
  </AbsoluteFill>
);

const Body: React.FC = () => {
  const t = makeTimeline(N, 30);
  const at = t.at;
  const cuts: [number, React.ReactNode][] = [
    [0, <Law t={t} />],
    [at('In 1829') - 1, <Ruffin t={t} />],
    [at('Absolute power') - 1, <Power t={t} />],
    [at('On big') - 1, <Scourged t={t} />],
    [at('For enslaved women') - 1, <Bodies t={t} />],
    [at('In 1850') - 1, <Missouri t={t} />],
    [at('In 1855') - 1, <Cabin t={t} />],
    [at('At her trial') - 1, <Statute t={t} />],
    [at('The judge') - 1, <Refused t={t} />],
    [at('Celia was hanged') - 1, <End t={t} />],
  ];
  const scene = useScene(cuts);
  const notes = ['testify', 'legally defend', 'North Carolina', 'overseers', 'whip', 'Some owners', 'Under the law', 'In 1850', 'She was 14', 'For the next', 'In 1855', 'told him',
    "He didn't", 'she hit', 'her lawyers', 'deadly force', 'In the eyes', 'turned on'];
  return (
    <>
      {scene}
      {cuts.slice(1).map(([f], i) => <Sfx key={i} at={f} src="sfx/whoosh.wav" volume={0.2} />)}
      <Sfx at={at('Missouri farmer')} src="sfx/tick.wav" volume={0.3} />
      {notes.map((c) => <Sfx key={c} at={at(c) - 2} src={WRITE.src} volume={0.16} />)}
    </>
  );
};

export const Ch07: React.FC = () => (
  <ChapterShell n={N} audio="audio/ch07_no_law.wav" lead={LEAD} quiet music={[{src: 'music/w_aftermath.mp3', volume: 0.12}]}>
    <Body />
  </ChapterShell>
);
