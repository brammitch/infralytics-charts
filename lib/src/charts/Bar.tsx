import createPlotlyComponent from 'react-plotly.js/factory';
import Plotly from 'plotly.js-dist-min';
import { BarProps } from '../types';
import { useBarChart } from '../hooks';

const Plot = createPlotlyComponent(Plotly);

export default function Bar(props: BarProps) {
  const { data, layout } = useBarChart(props);

  return (
    <Plot data={data} layout={layout} useResizeHandler style={{ width: '100%', height: '100%' }} />
  );
}
