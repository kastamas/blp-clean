module.exports = {
  presets: ['next/babel'],
  plugins: [
    ['styled-components', { pure: true, ssr: true }],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
  ],
};
