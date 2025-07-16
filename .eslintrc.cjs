/** @type {import("eslint").ESLint.ConfigData} */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint"],
  extends: ["airbnb", "airbnb/hooks", "airbnb-typescript", "prettier"],
  ignorePatterns: ["dist/**/*", "/*.*"],
  rules: {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-expressions": [
      "error",
      { allowShortCircuit: true, allowTernary: true, allowTaggedTemplates: true },
    ],
    "@typescript-eslint/quotes": ["error", "double", { avoidEscape: true }],
    /*
     * Known issue which `consistent-return` is not type-aware.
     * https://github.com/typescript-eslint/typescript-eslint/issues/1277
     */
    "consistent-return": "off",
    "import/no-absolute-path": "off",
    "import/no-extraneous-dependencies": ["error", { devDependencies: ["**/*.stories.tsx"] }],
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "unknown"],
        pathGroups: [
          {
            pattern: "@/**",
            group: "internal",
          },
        ],
        distinctGroup: false,
        pathGroupsExcludedImportTypes: [],
        "newlines-between": "never",
        alphabetize: {
          order: "asc",
        },
      },
    ],
    "import/prefer-default-export": "off",
    /*
     * Known issue when using next/link as it requires a href-free <a> tag inside of <Link> component.
     * https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md#case-i-use-nextjs-and-im-getting-this-error-inside-of-links
     */
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["hrefLeft", "hrefRight"],
        aspects: ["invalidHref", "preferButton"],
      },
    ],
    "no-nested-ternary": "off",
    "no-param-reassign": [
      "error",
      {
        props: true,
        ignorePropertyModificationsFor: [
          // rtk slice reducer functions
          "state",
          // default ignored properties
          "acc",
          "accumulator",
          "e",
          "ctx",
          "context",
          "req",
          "request",
          "res",
          "response",
          "$scope",
          "staticContext",
        ],
      },
    ],
    "no-restricted-exports": ["error", { restrictedNamedExports: ["then"] }],
    "react/destructuring-assignment": "off",
    "react/display-name": "off",
    "react/function-component-definition": [
      "error",
      {
        namedComponents: ["function-declaration", "arrow-function"],
        unnamedComponents: ["function-expression", "arrow-function"],
      },
    ],
    "react/jsx-no-duplicate-props": ["error", { ignoreCase: false }],
    "react/jsx-no-useless-fragment": ["error", { allowExpressions: true }],
    "react/jsx-props-no-spreading": "off",
    "react/no-danger": "off",
    "react/react-in-jsx-scope": "off",
    "react/require-default-props": "off",
  },
};
