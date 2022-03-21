const path = require('path')
// const TypescriptDeclarationPlugin = require('typescript-declaration-webpack-plugin');
var DeclarationBundlerPlugin = require('declaration-bundler-webpack-plugin');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: './dist/index.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,

            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".ts"]
  },
  output: {
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  plugins: [
    new WebpackShellPluginNext({
      onBuildStart:{
        scripts: ['echo "===> Starting packing with WEBPACK 5"'],
        blocking: true,
        parallel: false
      },
      onBuildEnd:{
        scripts: [],
        blocking: false,
        parallel: true
      }
    }),
    new DeclarationBundlerPlugin({
      moduleName: 'chinese-poker',
      out: './dist/index.d.ts',
    })
  ],
  mode: "development",
  target: "node"
}