import { ModuleOptions } from "webpack";

import { BuildOptions } from "./types/types";

export default function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
  const { mode } = options;

  let assetLoader;

  if (mode === "production") {
    assetLoader = {
      test: /\.(gif|png|jpe?g)$/i,
      use: [
        "file-loader",
        {
          loader: "image-webpack-loader",
          options: {
            mozjpeg: {
              progressive: true,
            },
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: [0.65, 0.9],
              speed: 4,
            },
            gifsicle: {
              interlaced: false,
            },
            webp: {
              quality: 75,
            },
          },
        },
      ],
    };
  } else {
    assetLoader = {
      test: /\.(png|jpg|jpeg|gif)$/i,
      type: "asset/resource",
    };
  }

  const svgLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: "convertColors",
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      },
    ],
  };

  const scssLoader = {
    test: /\.(sa|sc|c)ss$/,
    use: ["style-loader", "css-loader", "sass-loader"],
  };

  const babelLoader = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
    },
  };

  return [assetLoader, scssLoader, babelLoader, svgLoader];
}
