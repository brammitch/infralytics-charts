export interface BaseTrace {
  name?: string;
  color?: string;
  y: (string | number)[];
}

export interface BarTrace extends BaseTrace {
  hovertext?: string[];
}

export interface BarProps {
  traces: [BarTrace] | [BarTrace, BarTrace] | [BarTrace, BarTrace, BarTrace];
  layoutProps?: Partial<Plotly.Layout>;
  max?: number;
  range?: {
    l: BaseTrace;
    h: BaseTrace;
  };
  thresholdLow?: BaseTrace;
  thresholdHigh?: BaseTrace;
  ticks?: {
    labels: string[];
    values: number[];
  };
  x: string[];
}
