import Color from 'color';
import merge from 'lodash.merge';
import { PlotData } from 'plotly.js';
import { BarProps } from '../types';

export function useBarChart(props: BarProps): {
  data: Partial<PlotData>[];
  layout: Partial<Plotly.Layout>;
} {
  let offset: (number | undefined)[] = [-0.25];
  let width: number[] = [0.5];

  switch (props.traces.length) {
    case 2:
      offset = [-0.375, undefined];
      width = [0.4, 0.4];
      break;
    case 3:
      offset = [undefined, -0.225, undefined];
      width = [0.45, 0.45, 0.45];
      break;
    default:
      break;
  }

  const data: Partial<PlotData>[] = props.traces.map((trace, i) => ({
    name: trace.name,
    type: 'bar',
    yaxis: 'y2',
    hovertext: trace.hovertext ?? trace.name,
    hoverinfo: 'x+y+text',
    offset: offset[i],
    x: props.x,
    y: trace.y,
    width: width[i],
    marker: {
      color: trace.color,
      line: {
        color: Color(trace.color).darken(0.2).hex(),
        width: 1,
      },
      opacity: 0.95,
      pattern: {
        fillmode: 'overlay',
        fgcolor: Color(trace.color).lighten(0.2).hex(),
        shape: '/',
        solidity: 0.1,
      },
    },
  }));

  if (props.range) {
    data.push({
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

    data.push({
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

  if (props.thresholdLow) {
    data.push({
      name: props.thresholdLow.name,
      type: 'scatter',
      mode: 'lines',
      hoverinfo: 'none',
      x: props.x,
      y: props.thresholdLow.y,
      line: {
        color: props.thresholdLow.color,
        dash: 'dash',
        width: 2,
      },
      opacity: 0.8,
    });
  }

  if (props.thresholdHigh) {
    data.push({
      name: props.thresholdHigh.name,
      type: 'scatter',
      mode: 'lines',
      hoverinfo: 'none',
      x: props.x,
      y: props.thresholdHigh.y,
      line: {
        color: props.thresholdHigh.color,
        dash: 'dash',
        width: 2,
      },
      opacity: 0.8,
    });
  }

  // Determine height of y-axis by getting the max y-value of the data
  const values = data
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

  const layout: Partial<Plotly.Layout> = merge(
    {
      showlegend: true,
      barmode: 'group',
      xaxis,
      yaxis,
      yaxis2,
    },
    props.layoutProps
  );

  return { data, layout };
}
