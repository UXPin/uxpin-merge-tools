const {
    defineConfig,
    globalIgnores,
} = require("eslint/config");

const tsParser = require("@typescript-eslint/parser");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const globals = require("globals");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([{
    languageOptions: {
        parser: tsParser,

        globals: {
            ...globals.node,
        },
    },

    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    extends: compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
    ),

    rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/ban-ts-comment": "warn",
        "@typescript-eslint/no-restricted-types": "warn", // TODO fix "Don't use `{}` as a type"
        "@typescript-eslint/no-var-requires": "warn",
        "@typescript-eslint/prefer-as-const": "warn",
        "no-prototype-builtins": "warn",
        "no-useless-escape": "warn",
    },
}, globalIgnores(["**/*.js", "test/resources/repos"]), globalIgnores(["src/types.d.ts"])]);
