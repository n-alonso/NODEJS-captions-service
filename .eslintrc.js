module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:import/recommended'],
  rules: {
    ['max-len']: 'off',
    ['no-console']: ['warn'],
    ['import/no-unresolved']: [2, { commonjs: true, amd: true }],
  },
  parserOptions: {
    // Required for certain syntax usages
    ecmaVersion: 2019,
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  plugins: ['import'],
  settings: {
    'import/resolver': 'node',
    'import/ignore': [],
  },
};