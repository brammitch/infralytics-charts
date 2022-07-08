import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { BarTrace, BaseTrace } from '../../../dist';
import styles from '../styles/Home.module.css';

const DoubleBar = dynamic(() => import('../../../dist/charts/DoubleBar'), {
  ssr: false,
});
const TripleBar = dynamic(() => import('../../../dist/charts/TripleBar'), {
  ssr: false,
});

const Home: NextPage = () => {
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
      'Allocated: 15',
      'Allocated: 33',
      'Allocated: 64',
      'Allocated: 115',
      'Allocated: 26',
      '',
    ],
  };

  const b2: BarTrace = {
    name: 'Used',
    color: '#ff9800',
    y: ['', 5, 40, 50, 85, 20, ''],
    hovertext: ['', 'Used: 10', 'Used: 21', 'Used: 5', 'Used: 88', 'Used: 24', ''],
  };

  const b3: BarTrace = {
    name: 'Forecast',
    color: '#15d5d4',
    y: ['', 30, 50, 80, 70, 70, ''],
    hovertext: [
      '',
      'Forecast: 10',
      'Forecast: 21',
      'Forecast: 5',
      'Forecast: 88',
      'Forecast: 24',
      '',
    ],
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
    <div className={styles.container}>
      <Head>
        <title>Infralytics Charts</title>
        <meta name="description" content="@brammitch/plotly-react demo for Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <DoubleBar b1={b1} b2={b2} range={range} t1={t1} t2={t2} x={x} ticks={{ labels, values }} />
        <TripleBar
          b1={b3}
          b2={b1}
          b3={b2}
          layoutProps={{
            margin: {
              t: 100,
              r: 200,
              b: 100,
              l: 200,
            },
          }}
          range={range}
          t1={t1}
          t2={t2}
          x={x}
          ticks={{ labels, values }}
        />
      </main>
    </div>
  );
};

export default Home;
