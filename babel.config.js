// for jest (unit testing)
module.exports = {
    presets: [
        ["@babel/preset-env", {targets: {node: "current"}}],
        "@babel/preset-typescript",
    ],
};
