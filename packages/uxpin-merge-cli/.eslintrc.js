// module.exports = {
//   root: true,
//   parser: '@typescript-eslint/parser',
//   plugins: ['@typescript-eslint'],
//   extends: [
//     'eslint:recommended',
//     'plugin:@typescript-eslint/recommended',
//     'prettier',
//   ],
//   rules: {
//     // '@typescript-eslint/ban-ts-comment': 1,
//     // '@typescript-eslint/ban-types': 1,
//     // '@typescript-eslint/no-var-requires': 1,
//     // '@typescript-eslint/prefer-as-const': 1,
//     // 'no-prototype-builtins': 1,
//     // 'no-useless-escape': 1,
//   },
// };
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['*.js'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
  },
  env: {
    node: true,
  },
};