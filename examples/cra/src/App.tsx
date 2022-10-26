import { BarTrace, BaseTrace, Bar } from '../../../dist';

import './App.css';

function App() {
  const x = ['', 'Site A', 'Site B', 'Site C', 'Site D', 'Site E', '-'];
  // ticks
  const values = [0, 1, 2, 3, 4, 5, 6];
  const labels = ['', 'Site A', 'Site B', 'Site C', 'Site D', 'Site E', ''];

  const b1: BarTrace = {
    name: 'Allocated',
    color: '#0097a7',
    y: ['', 35, 45, 65, 115, 25, ''],
    hovertext: [
      '',
      'Allocated: 35',
      'Allocated: 45',
      'Allocated: 65',
      'Allocated: 115',
      'Allocated: 25',
      '',
    ],
  };

  const b2: BarTrace = {
    name: 'Used',
    color: '#ff9800',
    y: ['', 5, 40, 50, 85, 20, ''],
    hovertext: ['', 'Used: 5', 'Used: 40', 'Used: 50', 'Used: 85', 'Used: 20', ''],
  };

  const t1: BaseTrace = {
    name: 'Low',
    color: '#ffd740',
    y: [80, 80, 80, 80, 80, 80, 80],
  };

  const t2: BaseTrace = {
    name: 'High',
    color: '#ff5252',
    y: [100, 100, 100, 100, 100, 100, 100],
  };

  const range: { l: BaseTrace; h: BaseTrace } = {
    l: {
      color: '#69f0ae',
      y: [30, 30, 30, 30, 30, 30, 30],
    },
    h: {
      name: 'Optimal',
      y: [65, 65, 65, 65, 65, 65, 65],
    },
  };

  return (
    <div className="App">
      <Bar
        traces={[b1, b2]}
        range={range}
        thresholdLow={t1}
        thresholdHigh={t2}
        ticks={{ labels, values }}
        x={x}
      />
    </div>
  );
}

export default App;
