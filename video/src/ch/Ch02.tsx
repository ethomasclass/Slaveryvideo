// Chapter 2 · stub (to be built).
import React from 'react';
import {AbsoluteFill} from 'remotion';
import words from '../../public/audio/ch02_supposed_to_die.words.json';
import {DarkPaper} from '../kit/common';
import {ChapterShell, chapterFrames, LEAD, type Narration} from '../kit/shell';

const N = words as Narration;
export const CH02_FRAMES = chapterFrames(N, LEAD);

export const Ch02: React.FC = () => (
  <ChapterShell n={N} audio="audio/ch02_supposed_to_die.wav" lead={LEAD}>
    <AbsoluteFill><DarkPaper /></AbsoluteFill>
  </ChapterShell>
);
