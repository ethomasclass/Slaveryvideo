// Chart data, with sources. Every number on screen comes from here; script/SCRIPT.md → Charts lists the sources.

/** Enslaved people counted by each census (U.S. Census Bureau, Working Paper 56, Table 1). */
export const ENSLAVED = [
  {year: 1790, n: 697681},
  {year: 1800, n: 893602},
  {year: 1810, n: 1191362},
  {year: 1820, n: 1538022},
  {year: 1830, n: 2009043},
  {year: 1840, n: 2487355},
  {year: 1850, n: 3204313},
  {year: 1860, n: 3953760},
];

/** Cotton grown, thousands of bales. PLACEHOLDER until verified (see SCRIPT.md → Charts). */
export const COTTON_BALES_K = [
  {year: 1790, n: 3},
  {year: 1800, n: 73},
  {year: 1810, n: 178},
  {year: 1820, n: 335},
  {year: 1830, n: 732},
  {year: 1840, n: 1348},
  {year: 1850, n: 2136},
  {year: 1860, n: 3841},
];

/** Pie 1: everyone living in the 15 slave states, 1860. PLACEHOLDER until verified. */
export const SLAVE_STATES_1860 = {enslaved: 3953696, freeBlack: 261918, white: 8036700};

/** Pie 2: white families in the slave states, 1860, by how many people they enslaved. PLACEHOLDER until verified. */
export const WHITE_FAMILIES_1860 = {none: 1131000, small: 339000, planters: 46300};

/** Cotton as a share of U.S. domestic exports by value, 1860 (HSUS; Beckert): ~61%. */
export const EXPORTS_1860 = {cotton: 191.8e6, other: 316.2e6 - 191.8e6};

/** Value of enslaved people vs. capital in railroads and manufacturing, 1860. PLACEHOLDER until verified. */
export const VALUE_1860 = {enslaved: 3.5e9, railroads: 1.1e9, manufacturing: 1.0e9};
