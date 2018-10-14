module.exports = {
  extends: ['eslint:recommended'],
  env: {
    es6: true,
    node: true,
    mocha: true,
  },
  parserOptions: {
    ecmaVersion: 2017,
  },
  rules: {
    'no-console': 0,
  },
};
