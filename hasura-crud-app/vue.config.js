const webpack = require("webpack");

module.exports = {
  /* customize webpack.config.js */
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        Tether: "tether",
        "window.Tether": "tether",
        popper: "popper",
        "window.popper": "popper"
      })
    ]
  },
  chainWebpack: config => {
    config.resolve.extensions.prepend(".mjs");
    config.module
      .rule("mjs")
      .test(/\.mjs$/)
      .include.add(/node_modules/)
      .end()
      .type("javascript/auto");
  }
};
