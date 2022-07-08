import Color from 'color';
import merge from 'lodash.merge';
import { PlotData } from 'plotly.js';
import { useEffect, useState } from 'react';
import createPlotlyComponent from 'react-plotly.js/factory';
import Plotly from '../plotly';
import { BarTrace, BaseTrace } from '../types';

const Plot = createPlotlyComponent(Plotly);

export interface DoubleBarProps {
  b1: BarTrace;
  b2: BarTrace;
  layoutProps?: Partial<Plotly.Layout>;
  max?: number;
  range?: {
    l: BaseTrace;
    h: BaseTrace;
  };
  t1?: BaseTrace;
  t2?: BaseTrace;
  ticks?: {
    labels: string[];
    values: number[];
  };
  x: string[];
}

export default function DoubleBar(props: DoubleBarProps) {
  const [data, setData] = useState<Partial<PlotData>[]>([]);
  const [layout, setLayout] = useState<Partial<Plotly.Layout>>({});

  useEffect(() => {
    const _data: Partial<PlotData>[] = [
      {
        name: props.b1.name,
        type: 'bar',
        yaxis: 'y2',
        hovertext: props.b1.hovertext ?? props.b1.name,
        hoverinfo: 'x+y+text',
        offset: -0.375,
        x: props.x,
        y: props.b1.y,
        width: 0.4,
        marker: {
          color: props.b1.color,
          line: {
            color: Color(props.b1.color).darken(0.2).hex(),
            width: 1,
          },
          opacity: 0.95,
          pattern: {
            fillmode: 'overlay',
            fgcolor: Color(props.b1.color).lighten(0.2).hex(),
            shape: '/',
            solidity: 0.1,
          },
        },
      },
      {
        name: props.b2.name,
        type: 'bar',
        yaxis: 'y2',
        hovertext: props.b2.hovertext ?? props.b2.name,
        hoverinfo: 'x+y+text',
        x: props.x,
        y: props.b2.y,
        width: 0.4,
        marker: {
          color: props.b2.color,
          line: {
            color: Color(props.b2.color).darken(0.2).hex(),
            width: 1,
          },
          opacity: 0.95,
          pattern: {
            fillmode: 'overlay',
            fgcolor: Color(props.b2.color).lighten(0.2).hex(),
            shape: '/',
            solidity: 0.1,
          },
        },
      },
    ];

    if (props.range) {
      _data.push({
        name: props.range.l.name,
        type: 'scatter',
        mode: 'lines',
        hoverinfo: 'none',
        x: props.x,
        y: props.range.l.y,
        line: {
          width: 0,
        },
        marker: {
          color: props.range.l.color,
        },
        showlegend: false,
      });

      _data.push({
        name: props.range.h.name,
        type: 'scatter',
        mode: 'lines',
        hoverinfo: 'none',
        x: props.x,
        y: props.range.h.y,
        line: {
          width: 0,
        },
        marker: {
          color: props.range.l.color,
        },
        fill: 'tonexty',
      });
    }

    if (props.t1) {
      _data.push({
        name: props.t1.name,
        type: 'scatter',
        mode: 'lines',
        hoverinfo: 'none',
        x: props.x,
        y: props.t1.y,
        line: {
          color: props.t1.color,
          dash: 'dash',
          width: 2,
        },
        opacity: 0.8,
      });
    }

    if (props.t2) {
      _data.push({
        name: props.t2.name,
        type: 'scatter',
        mode: 'lines',
        hoverinfo: 'none',
        x: props.x,
        y: props.t2.y,
        line: {
          color: props.t2.color,
          dash: 'dash',
          width: 2,
        },
        opacity: 0.8,
      });
    }

    // Determine height of y-axis by getting the max y-value of the data
    const values = _data
      .map((trace) => trace.y as number[])
      .flat()
      .filter((y) => typeof y === 'number');

    const ymax = Math.ceil(Math.max(...values, props?.max ?? 0) / 0.1) * 0.1;
    const dtick = (ymax / 10.0).toFixed(3);

    const xaxis: Plotly.Layout['xaxis'] = props.ticks
      ? {
          tickmode: 'array',
          tickvals: props.ticks.values,
          ticktext: props.ticks.labels,
        }
      : { tickmode: 'array' };

    const yaxis: Plotly.Layout['yaxis'] = {
      autotick: false,
      tick0: 0,
      dtick,
      range: [0, ymax],
      griddash: 'dash',
    };

    const yaxis2: Plotly.Layout['yaxis'] = Object.assign({}, yaxis, {
      overlaying: 'y',
    });

    const _layout: Partial<Plotly.Layout> = merge(
      {
        showlegend: true,
        barmode: 'group',
        // font:
        // margin:
        xaxis,
        yaxis,
        yaxis2,
      },
      props.layoutProps
    );

    setData(_data);
    setLayout(_layout);
  }, [
    props.b1,
    props.b2,
    props.layoutProps,
    props?.max,
    props.range,
    props.t1,
    props.t2,
    props.ticks,
    props.x,
  ]);

  return (
    <Plot data={data} layout={layout} useResizeHandler style={{ width: '100%', height: '100%' }} />
  );
}
