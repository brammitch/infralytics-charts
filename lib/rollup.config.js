import { babel } from "@rollup/plugin-babel";
import multiInput from "rollup-plugin-multi-input";
import typescript from "rollup-plugin-typescript2";
import pkg from "../package.json";

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  /@babel\/runtime/,
  "lodash",
  "react",
  "react/jsx-runtime",
  "react-plotly.js/factory",
  "plotly.js/lib/core",
];

const input = ["./src/index.ts", "./src/charts/*.tsx"];

const plugins = [
  babel({
    babelHelpers: "runtime",
    extensions: [".js", ".jsx", ".es6", ".es", ".mjs"],
  }),
  multiInput(),
  typescript({
    tsconfig: "./tsconfig.json",
    typescript: require("typescript"),
  }),
];

const rollupConfig = [
  {
    input,
    output: {
      dir: `../dist/esm`,
      format: "esm",
      sourcemap: true,
    },
    plugins,
    external,
  },
  {
    input,
    output: {
      dir: `../dist/cjs`,
      format: "cjs",
      sourcemap: true,
    },
    plugins,
    external,
  },
];

export default rollupConfig;
