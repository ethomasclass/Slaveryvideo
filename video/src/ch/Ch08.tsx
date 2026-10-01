// Chapter 8 · stub (to be built).
import React from 'react';
import {AbsoluteFill} from 'remotion';
import words from '../../public/audio/ch08_world_outside.words.json';
import {DarkPaper} from '../kit/common';
import {ChapterShell, chapterFrames, LEAD, type Narration} from '../kit/shell';

const N = words as Narration;
export const CH08_FRAMES = chapterFrames(N, LEAD);

export const Ch08: React.FC = () => (
  <ChapterShell n={N} audio="audio/ch08_world_outside.wav" lead={LEAD}>
    <AbsoluteFill><DarkPaper /></AbsoluteFill>
  </ChapterShell>
);
