/* eslint-env node */
/* eslint-disable no-console */
const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const cssnano = require("cssnano");
const DirectoryNamedPlugin = require("directory-named-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StaticSiteGeneratorPlugin = require("static-site-generator-webpack-plugin");
const SuppressChunksPlugin = require("suppress-chunks-webpack-plugin").default;
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const CsharpPlugin = require("@creuna/prop-types-csharp/webpack-plugin");

module.exports = (env = {}, options = {}) => {
  const shouldBuildStaticSite = env.static === true;
  const isProduction = options.mode === "production";
  const shouldUseAnalyzer = env.analyzer === true;

  const beProjectName = "KS.Web";
  const beTargetFolder = "Frontend";

  const outputPath = path.resolve(
    __dirname,
    isProduction ? `../${beProjectName}/${beTargetFolder}` : "./dist"
  );

  const csharpModels = {
    path: isProduction
      ? "../Presentation/Components"
      : `../../${beProjectName}/Presentation/Components`,
    namespace: beProjectName + ".Presentation.Components",
    baseClass: "ReactComponent",
  };

  if (shouldBuildStaticSite) {
    console.log("🖥  Building static site");
  }

  if (isProduction) {
    console.log("📦  Minifying code");
  }

  if (shouldUseAnalyzer) {
    console.log("🕵🏻  Starting bundle analyzer");
  }

  console.log("Outoput path: " + outputPath);
  console.log("C# models path: " + csharpModels.path);

  return {
    devServer: {
      disableHostCheck: true,
      inline: false,
      stats: "minimal",
      writeToDisk: (filePath) => filePath.endsWith(".cs"),
    },
    devtool: isProduction ? "source-map" : "cheap-module-eval-source-map",
    entry: (() => {
      const entries = {
        style: "./source/scss/style.scss",
      };
      const clientCommons = [
        "whatwg-fetch",
        "./source/js/input-detection-loader",
      ];
      const serverCommons = ["./source/js/server-polyfills.js"];

      if (shouldBuildStaticSite) {
        entries.client = clientCommons.concat(["./source/static-client.js"]);
        entries.server = serverCommons.concat(["./source/static-server.js"]);
      } else {
        entries.client = clientCommons.concat([
          "expose-loader?React!react",
          "expose-loader?ReactDOM!react-dom",
          "expose-loader?Components!./source/app.components.js",
        ]);
        entries.server = serverCommons.concat([
          "expose-loader?React!react",
          "expose-loader?ReactDOM!react-dom",
          "expose-loader?ReactDOMServer!react-dom/server",
          "expose-loader?Components!./source/app.components.js",
        ]);
      }

      return entries;
    })(),
    output: (() => {
      const output = {
        path: outputPath,
        filename: "[name].[chunkhash].js",
      };

      if (shouldBuildStaticSite) {
        output.libraryTarget = "umd";
        output.globalObject = "this";
      }

      return output;
    })(),
    module: {
      rules: [
        {
          test: /\.(config)$/,
          loader: "file-loader?name=[name].[ext]",
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: ["babel-loader", "eslint-loader"], // Check js files included correctly
        },
        {
          enforce: "pre",
          test: /\.scss$/,
          exclude: /node_modules/,
          use: "import-glob",
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                sourceMap: true,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: [autoprefixer].concat(isProduction ? [cssnano] : []),
                sourceMap: true,
              },
            },
            { loader: "resolve-url-loader" },
            { loader: "sass-loader", options: { sourceMap: true } },
          ],
        },
        {
          test: /\.(svg|jpg|jpeg|png|gif|mp4|webm|wav|mp3|m4a|aac|oga|ico|woff|woff2|ttf|eot)$/,
          exclude: [path.resolve(__dirname, "source/assets/inline-icons")],
          use: {
            loader: "file-loader",
            options: {
              publicPath: "assets",
              outputPath: "assets",
              name: (resourcePath) => {
                if (/fonts/.test(resourcePath)) {
                  return "fonts/[name].[hash].[ext]";
                }
                return "[folder]/[name].[hash].[ext]";
              },
            },
          },
        },
        {
          test: /\.svg$/,
          include: [path.resolve(__dirname, "source/assets/inline-icons")],
          use: [
            { loader: "svg-react-loader" },
            {
              loader: "svgo-loader",
              options: {
                plugins: [
                  { removeViewBox: false },
                  { removeAttrs: { attrs: "(class|data-name|id)" } },
                ],
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
      alias: {
        components: path.resolve("./source/components"),
        js: path.resolve("./source/js"),
        hooks: path.resolve("./source/hooks"),
      },
      plugins: [
        new DirectoryNamedPlugin({
          honorIndex: true,
          include: [
            path.resolve("./source/components"),
            path.resolve("./source/static-site/pages"),
          ],
        }),
      ],
    },
    plugins: [
      new FixStyleOnlyEntriesPlugin(),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ["**/*", csharpModels.path + "/*"],
        dangerouslyAllowCleanPatternsOutsideProject: true,
        dry: false,
      }),
      new CsharpPlugin({
        compilerOptions: {
          indent: 4,
          namespace: csharpModels.namespace,
          baseClass: csharpModels.baseClass,
        },
        exclude: ["node_modules", "source/static-site"],
        log: true,
        path: csharpModels.path,
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
      }),
      new ManifestPlugin(),
      new SuppressChunksPlugin(
        [
          {
            name: "style",
            match: /\.js(.map)?$/,
          },
        ].concat(shouldBuildStaticSite ? ["server"] : [])
      ),
    ]
      .concat(
        isProduction
          ? [
              // NOTE: This plugin currently makes the codebase crash when recompiling using webpack-dev-server
              new webpack.optimize.ModuleConcatenationPlugin(),
              new CopyWebpackPlugin(
                [
                  {
                    from: "source/static-site/assets/favicons",
                    to: "assets/favicons",
                  },
                  {
                    from: "source/scss/rich-text-formats.css",
                    to: "../css/rich-text-formats.css",
                  },
                ],
                { copyUnmodified: true }
              ),
            ]
          : []
      )
      .concat(
        shouldBuildStaticSite
          ? [
              new StaticSiteGeneratorPlugin({
                entry: "server",
                locals: {
                  isProduction,
                },
                paths: require("./source/static-site/paths"),
              }),
              new CopyWebpackPlugin(
                [
                  {
                    from: "source/static-site/assets",
                    to: "static-site/assets",
                  },
                  {
                    from: "source/static-site/api",
                    to: "static-site/api",
                  },
                  {
                    from: "source/static-site/index",
                  },
                ],
                { copyUnmodified: true }
              ),
            ]
          : []
      )
      .concat(shouldUseAnalyzer ? [new BundleAnalyzerPlugin()] : []),
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: (module) => {
              if (module.resource && /^.*\.(css|scss)$/.test(module.resource)) {
                return false;
              }

              return module.context && module.context.includes("node_modules");
            },
            chunks: (chunk) => chunk.name === "client",
            name: "vendor",
          },
        },
      },
    },
  };
};
