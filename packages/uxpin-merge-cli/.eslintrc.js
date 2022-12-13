module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  ignorePatterns: ['*.js', 'test/resources/repos'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/ban-types': 'warn', // TODO fix "Don't use `{}` as a type"
    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/prefer-as-const': 'warn',
    'no-prototype-builtins': 'warn',
    'no-useless-escape': 'warn',
  },
  env: {
    node: true,
  },
};
