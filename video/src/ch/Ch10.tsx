// Chapter 10 · stub (to be built).
import React from 'react';
import {AbsoluteFill} from 'remotion';
import words from '../../public/audio/ch10_grip_tighter.words.json';
import {DarkPaper} from '../kit/common';
import {ChapterShell, chapterFrames, LEAD, type Narration} from '../kit/shell';

const N = words as Narration;
export const CH10_FRAMES = chapterFrames(N, LEAD);

export const Ch10: React.FC = () => (
  <ChapterShell n={N} audio="audio/ch10_grip_tighter.wav" lead={LEAD}>
    <AbsoluteFill><DarkPaper /></AbsoluteFill>
  </ChapterShell>
);
