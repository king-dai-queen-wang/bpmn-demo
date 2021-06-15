/*
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"]
};
*/
module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-nullish-coalescing-operator"
  ],
  sourceType: 'unambiguous'
}
