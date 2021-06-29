module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    quotes: ['error', 'single'],
    indent: ['error', 2, { SwitchCase: 1 }],
    'comma-dangle': ['warn', 'always-multiline'],
    'object-curly-spacing': ['warn', 'always'],
    'eol-last': ['error', 'always'],
    '@typescript-eslint/explicit-function-return-type': ['warn', {
      allowTypedFunctionExpressions: true,
      allowHigherOrderFunctions: true ,
      allowExpressions: true,
    }],
    'react/prop-types': 0,
    semi: 1,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [{
    files: ['./server/**/*.ts*'],
    env: {
      node: true,
    },
  }],
};
