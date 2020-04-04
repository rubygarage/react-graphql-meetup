// babel.config.js
module.exports = {
  "presets": [
    "@babel/env",
    "@babel/preset-react"
  ],
  "plugins": [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-transform-async-to-generator",
    "@babel/plugin-proposal-class-properties"
  ]
};
