module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: [
    'standard' // NOTE: USE STANDARD
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    indent: [
      'error',
      2,
      {
        SwitchCase: 1, // NOTE: CORRECT SWITCH...CASE STATEMENT LINTING.
        VariableDeclarator: 'first'
      }
    ],
    'no-extend-native': 0, // NOTE: DO NOT OVERRIDE ORIGINAL FUNCTIONS.
    'no-template-curly-in-string': 0 // NOTE: USE BIND FUNCTION INSTEAD.
  }
}
