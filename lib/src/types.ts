export interface BarTrace {
  name?: string;
  color?: string;
  hovertext?: string[];
  x: string[];
  y: (string | number)[];
}

export interface RangeTrace {
  name?: string;
  color?: string;
  x: string[];
  y: (string | number)[];
}

export interface ThresholdTrace {
  name?: string;
  color?: string;
  x: string[];
  y: (string | number)[];
}
