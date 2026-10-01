// Chapter 7 · stub (to be built).
import React from 'react';
import {AbsoluteFill} from 'remotion';
import words from '../../public/audio/ch07_no_law.words.json';
import {DarkPaper} from '../kit/common';
import {ChapterShell, chapterFrames, LEAD, type Narration} from '../kit/shell';

const N = words as Narration;
export const CH07_FRAMES = chapterFrames(N, LEAD);

export const Ch07: React.FC = () => (
  <ChapterShell n={N} audio="audio/ch07_no_law.wav" lead={LEAD}>
    <AbsoluteFill><DarkPaper /></AbsoluteFill>
  </ChapterShell>
);
