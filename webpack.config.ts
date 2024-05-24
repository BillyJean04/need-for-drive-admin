import path from "path";
import webpack from "webpack";

import buildWebpack from "./config/buildConfig/buildWebpack";
import { type BuildPaths } from "./config/buildConfig/types/types";

type Mode = "development" | "production";

interface EnvVariables {
  mode: Mode;
  port: number;
  analyzer: boolean;
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    output: path.resolve(__dirname, "build"),
    entry: path.resolve(__dirname, "src", "index.tsx"),
    html: path.resolve(__dirname, "public", "index.html"),
    public: path.resolve(__dirname, "public"),
    src: path.resolve(__dirname, "src"),
  };

  return buildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? "development",
    paths,
    analyzer: env.analyzer,
  }) satisfies webpack.Configuration;
};
