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
  const labels = ['Site A', 'Site B', 'Site C', 'Site D', 'Site E'];
  // y
  const b1y: (string | number)[] = [35, 45, 65, 115, 25];
  const b1hovertext: string[] = b1y.map((y) => `Allocated: ${y}`);
  const b2y: (string | number)[] = [5, 40, 50, 85, 20];
  const b2hovertext: string[] = b2y.map((y) => `Allocated: ${y}`);
  const b3y: (string | number)[] = [30, 50, 80, 70, 70];
  const b3hovertext: string[] = b3y.map((y) => `Allocated: ${y}`);
  for (const arr of [b1y, b2y, b3y]) {
    arr.unshift(' ');
    arr.push(' ');
  }

  for (const arr of [b1hovertext, b2hovertext, b3hovertext]) {
    arr.unshift(' ');
    arr.push(' ');
  }

  const b1: BarTrace = {
    name: 'Allocated',
    color: '#0097a7',
    y: b1y,
    hovertext: b1hovertext,
  };

  const b2: BarTrace = {
    name: 'Used',
    color: '#ff9800',
    y: b2y,
    hovertext: b2hovertext,
  };

  const b3: BarTrace = {
    name: 'Forecast',
    color: '#15d5d4',
    y: b3y,
    hovertext: b3hovertext,
  };

  const t1: BaseTrace = {
    name: 'Low',
    color: '#ffd740',
    y: Array(7).fill(80),
  };

  const t2: BaseTrace = {
    name: 'High',
    color: '#ff5252',
    y: Array(7).fill(100),
  };

  const range: { l: BaseTrace; h: BaseTrace } = {
    l: {
      color: '#69f0ae',
      y: Array(7).fill(30),
    },
    h: {
      name: 'Optimal',
      y: Array(7).fill(65),
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
