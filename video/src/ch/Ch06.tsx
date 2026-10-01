// Chapter 6 · stub (to be built).
import React from 'react';
import {AbsoluteFill} from 'remotion';
import words from '../../public/audio/ch06_sunup.words.json';
import {DarkPaper} from '../kit/common';
import {ChapterShell, chapterFrames, LEAD, type Narration} from '../kit/shell';

const N = words as Narration;
export const CH06_FRAMES = chapterFrames(N, LEAD);

export const Ch06: React.FC = () => (
  <ChapterShell n={N} audio="audio/ch06_sunup.wav" lead={LEAD}>
    <AbsoluteFill><DarkPaper /></AbsoluteFill>
  </ChapterShell>
);
