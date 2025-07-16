module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-case": [2, "always", ["camel-case", "pascal-case"]],
    "subject-case": [2, "always", ["lower-case","sentence-case", "start-case", "pascal-case", "upper-case"]],
  },
};