export interface Note {
  stringNum: number;
  name: string;
  frequency: number;
}

export interface Instrument {
  name: string;
  tunings: {
    [key: string]: Note[];
  };
}
