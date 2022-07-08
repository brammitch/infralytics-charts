export interface BaseTrace {
  name?: string;
  color?: string;
  y: (string | number)[];
}

export interface BarTrace extends BaseTrace {
  hovertext?: string[];
}
