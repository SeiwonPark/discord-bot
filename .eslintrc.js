module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "standard-with-typescript",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    quotes: ["error", "double"],
    "import/no-unresolved": 0,
    indent: ["error", 2],
    semi: ["error", "never"],
    "linebreak-style": ["error", "unix"],
    "comma-spacing": ["error", { before: false, after: true }],
    "no-multiple-empty-lines": ["error", { max: 2, maxBOF: 1 }],
    "max-len": ["error", { code: 120 }],
    "object-curly-spacing": ["error", "always"],
    "valid-jsdoc": 0,
  },
};
