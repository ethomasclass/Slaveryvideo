// This video's subject masks (tools/mask.py). Import each JSON here and add a line to MASKS.
import {maskRef} from './kit/maskref';
import calhoun from '../public/img/masks/calhoun.json';
import douglass from '../public/img/masks/douglass.json';
import jacobs from '../public/img/masks/jacobs.json';
import jefferson from '../public/img/masks/jefferson.json';
import madison from '../public/img/masks/madison.json';
import randolph from '../public/img/masks/randolph.json';
import ruffin from '../public/img/masks/ruffin.json';
import sully from '../public/img/masks/sully.json';
import whitney from '../public/img/masks/whitney.json';

export const MASKS = {
  sully: maskRef('sully', sully),
  jefferson: maskRef('jefferson', jefferson),
  madison: maskRef('madison', madison),
  whitney: maskRef('whitney', whitney),
  douglass: maskRef('douglass', douglass),
  ruffin: maskRef('ruffin', ruffin),
  jacobs: maskRef('jacobs', jacobs),
  randolph: maskRef('randolph', randolph),
  calhoun: maskRef('calhoun', calhoun),
};
