import type { NextPage } from "next";
import Head from "next/head";
import { BarTrace } from "../../../dist/esm";
import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";
const DoubleBar = dynamic(() => import("../../../dist/esm/charts/DoubleBar"), {
  ssr: false,
});
const TripleBar = dynamic(() => import("../../../dist/esm/charts/TripleBar"), {
  ssr: false,
});

const Home: NextPage = () => {
  const x = ["", "Site A", "Site B", "Site C", "Site D", "Site E", ""];

  const b1: BarTrace = {
    name: "Allocated",
    x,
    y: ["", 15, 33, 64, 115, 26, ""],
    hovertext: [
      "",
      "Allocated: 15",
      "Allocated: 33",
      "Allocated: 64",
      "Allocated: 115",
      "Allocated: 26",
      "",
    ],
  };

  const b2: BarTrace = {
    name: "Used",
    x,
    y: ["", 10, 21, 5, 88, 24, ""],
    hovertext: [
      "",
      "Allocated: 10",
      "Allocated: 21",
      "Allocated: 5",
      "Allocated: 88",
      "Allocated: 24",
      "",
    ],
  };

  const b3: BarTrace = {
    name: "Forecast",
    x,
    y: ["", 18, 27, 64, 125, 20, ""],
    hovertext: [
      "",
      "Allocated: 10",
      "Allocated: 21",
      "Allocated: 5",
      "Allocated: 88",
      "Allocated: 24",
      "",
    ],
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Infralytics Charts</title>
        <meta name="description" content="infralytics-charts example page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <DoubleBar b1={b1} b2={b2} />
        <TripleBar b1={b3} b2={b1} b3={b2} />
      </main>
    </div>
  );
};

export default Home;
