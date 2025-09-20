import type { Instrument } from './types';

export const INSTRUMENTS: Instrument[] = [
  {
    name: 'Standard Guitar',
    tunings: {
      Standard: [
        { stringNum: 6, name: 'E2', frequency: 82.41 },
        { stringNum: 5, name: 'A2', frequency: 110.0 },
        { stringNum: 4, name: 'D3', frequency: 146.83 },
        { stringNum: 3, name: 'G3', frequency: 196.0 },
        { stringNum: 2, name: 'B3', frequency: 246.94 },
        { stringNum: 1, name: 'E4', frequency: 329.63 },
      ],
    },
  },
  {
    name: '4-String Bass',
    tunings: {
      Standard: [
        { stringNum: 4, name: 'E1', frequency: 41.20 },
        { stringNum: 3, name: 'A1', frequency: 55.00 },
        { stringNum: 2, name: 'D2', frequency: 73.42 },
        { stringNum: 1, name: 'G2', frequency: 98.00 },
      ],
    },
  },
  {
    name: '5-String Bass',
    tunings: {
      Standard: [
        { stringNum: 5, name: 'B0', frequency: 30.87 },
        { stringNum: 4, name: 'E1', frequency: 41.20 },
        { stringNum: 3, name: 'A1', frequency: 55.00 },
        { stringNum: 2, name: 'D2', frequency: 73.42 },
        { stringNum: 1, name: 'G2', frequency: 98.00 },
      ],
    },
  },
];
