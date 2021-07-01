const path = require("path"); // python의 os와 같은 패키지
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  //entry는 내가 작성한 source code를 의미함
  entry: {
    main: "./src/client/js/main.js",
    videoPlayer: "./src/client/js/videoPlayer.js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  watch: true,
  mode: "development",
  //output은 complie된 결과물을 의미함
  output: {
    filename: "js/[name].js",
    //path는 output의 저장 경로를 의미함
    path: path.resolve(__dirname, "assets"), //os.path.join과 같은 함수
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/, //모든 javascript파일을
        use: {
          //babel-loader로 complie한다
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
