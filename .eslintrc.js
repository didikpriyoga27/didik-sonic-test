module.exports = {
  root: true,
  plugins: ['simple-import-sort'],
  extends: '@react-native',
  rules: {
    'react-native/no-inline-styles': 'off',
    'simple-import-sort/imports': 'error',
    'no-duplicate-imports': 'error',
    'no-console': 'error',
  },
};
