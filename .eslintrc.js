module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
    {
      files: ['**/__tests__/**', '**/*.test.js'],
      env: {
        jest: true,
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'react',
  ],
  rules: {
    semi: ['error', 'always'],
    'react/jsx-props-no-spreading': 'off',
    'no-underscore-dangle': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
