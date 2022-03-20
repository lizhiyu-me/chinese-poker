const path = require('path')
const TypescriptDeclarationPlugin = require('typescript-declaration-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index'
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
    new TypescriptDeclarationPlugin()
  ],
  mode: "production",
  target: "node"
}