module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  plugins: ["prettier"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:jest/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    'plugin:react/recommended', // uses react-specific linting rules
    'plugin:prettier/recommended', // enables eslint-plugin-prettier and eslint-config-prettier
    'prettier/react', // disables react-specific linting rules that conflict with prettier
  ],
  rules: {
    "no-console": "error",
    "@typescript-eslint/no-magic-numbers": ["error", {
      ignore: [0, 1, -1, 2, 0.5, -2, -0.5],
      ignoreEnums: true,
      ignoreNumericLiteralTypes: true,
      ignoreReadonlyClassProperties: true,
    }],
    "no-multiple-empty-lines": ["error", {
      max: 1,
      maxEOF: 0
    }],
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": ["error"],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        ignoreRestSiblings: true
      },
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "default",
        format: ["camelCase", "PascalCase"],
      },
      {
        selector: "typeParameter",
        filter: "^[A-Z]$",
        format: ["PascalCase"],
      },
      {
        selector: "typeParameter",
        filter: {
          regex: "^.{2,}$",
          match: true,
        },
        format: ["PascalCase"],
        prefix: ["T", "_T"],
      },
      {
        selector: "variable",
        format: ["camelCase", "UPPER_CASE", "PascalCase"],
      },
      {
        selector: "function",
        format: ["PascalCase", "camelCase"],
        trailingUnderscore: "allow",
      },
      {
        selector: "function",
        filter: "^(UNSAFE_|INTERNAL_|DEPRECATED_)",
        prefix: ["UNSAFE_", "INTERNAL_", "DEPRECATED_"],
        format: ["camelCase"],
      },
      {
        selector: "parameter",
        format: ["camelCase"],
        leadingUnderscore: "allow",
      },
      {
        selector: "method",
        filter: "^UNSAFE_",
        prefix: ["UNSAFE_"],
        format: ["camelCase"],
      },
      {
        selector: "property",
        modifiers: ["readonly"],
        format: ["camelCase", "PascalCase", "UPPER_CASE"],
      },
    ],
    "jest/no-commented-out-tests": "error",
    "jest/no-disabled-tests": "error",
    "prettier/prettier": "error",
  },
  env: {
    'react-native/react-native': true,
  },
  overrides: [{
    files: ["*.test.ts", "*.test.tsx"],
    "rules": {
      "no-magic-numbers": "off",
    }
  }]
};