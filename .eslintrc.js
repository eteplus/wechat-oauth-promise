module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    'browser': true,
    'node': true,
    'es6': true
  },
  parser: 'babel-eslint',
  extends: 'airbnb-base',
  rules: {
    'prefer-const': 0,
    'no-console': 0,
    'arrow-body-style': 0,
    'comma-dangle': [2, 'never'],
    'no-unused-vars': [2, {'vars': 'all', 'args': 'none'}]
  }
};
