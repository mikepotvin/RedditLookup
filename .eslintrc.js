module.exports = {
  env: {
    node: true,
    es2021: true,
    es6: true,
    'jest/globals': true,
  },
  globals: {
    fetch: true,
    __DEV__: true,
  },
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-native', 'jest', 'prettier'],
  rules: {
    'react/prop-types': 0,
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-useless-escape': 0,
    'prefer-promise-reject-errors': 0,
    'react-native/no-unused-styles': 0,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-color-literals': 0,
    'react-native/no-raw-text': 0,
    'react-native/no-single-element-style-arrays': 2,
    'no-use-before-define': 'off',
    'no-console': 'error',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'prettier/prettier': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
