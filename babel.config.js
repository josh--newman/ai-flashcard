module.exports = {
  // @emotion must be the first plugin in the list forstyles to work correctly
  plugins: ["@emotion/babel-plugin"],
  presets: [
    [
      "next/babel",
      {
        "preset-react": {
          runtime: "automatic",
          importSource: "@emotion/react",
        },
      },
    ],
  ],
};
