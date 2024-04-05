import { defineConfig } from "rollup";
import esbuild, { minify } from "rollup-plugin-esbuild";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { dts } from "rollup-plugin-dts";

export default defineConfig([
  {
    input: "src/index.ts",
    output: {
      dir: "dist",
      format: "esm",
      generatedCode: "es2015",
      entryFileNames: "[name].mjs",
    },
    plugins: [
      commonjs(),
      nodeResolve(),
      esbuild({
        target: "es2015",
      }),
      minify(),
    ],
  },
  {
    input: "src/index.ts",
    output: {
      dir: "dist",
      format: "cjs",
      generatedCode: "es2015",
      entryFileNames: "[name].cjs",
    },
    plugins: [
      commonjs(),
      nodeResolve(),
      esbuild({
        target: "es2015",
      }),
      minify(),
    ],
  },
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.d.ts",
        format: "es",
      },
    ],
    plugins: [dts()],
  },
]);
