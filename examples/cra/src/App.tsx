import { BarTrace, DoubleBar } from "../../../dist";
import "./App.css";

function App() {
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

  return (
    <div className="App">
      <DoubleBar b1={b1} b2={b2} />
    </div>
  );
}

export default App;
