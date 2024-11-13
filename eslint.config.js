// eslint.config.js
module.exports = [
  {
    files: ["*.js", "*.jsx", "*.ts", "*.tsx"], // specify which files this config applies to
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
      },
      globals: {
        window: "readonly",
        document: "readonly",
      },
    },
    rules: {
      "no-console": "warn",
      "no-unused-vars": "warn",
    },
  },
  {
    // Add any additional configs you might need here (e.g., shared configurations)
  },
];
