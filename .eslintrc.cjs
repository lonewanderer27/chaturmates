module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:react/recommended', 'eslint:recommended', 'plugin:storybook/recommended'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    allowImportExportEverywhere: true
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'react/react-in-jsx-scope': 'off',

  }
}
