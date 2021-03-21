module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parserx
  plugins: ['react-hooks', 'prettier'],
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // Make sure this is always the last configuration in the extends array.
    'plugin:jest/recommended',
  ],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // Consider turning on eventually... lots of warnings though.
    'max-len': ['error', 100],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/react-in-jsx-scope': 'off',
    // This rule is redundent when using arrow functions and we should only use arrow functions
    'react/prop-types': 'off',
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'all',
        arrowParens: 'always',
        printWidth: 100,
      },
    ],
  },
};
