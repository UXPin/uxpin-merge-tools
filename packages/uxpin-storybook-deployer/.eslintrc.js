module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  ignorePatterns: ["bin/**", "**.js"],
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  rules: {
    semi: 2,
  },
};
