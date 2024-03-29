module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:tailwindcss/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: ['./tsconfig.json'],
    ecmaFeatures: {
      jsx: true,
    },
  },
  ignorePatterns: [
    'vite.config.js',
    'tsconfig.json',
    'tailwind.config.ts',
    'postcss.config.js',
    '.eslintrc.cjs',
    '*d.ts',
  ],
  plugins: ['prettier', '@typescript-eslint', 'import'],
  rules: {
    'comma-dangle': 0,
    'tailwindcss/no-custom-classname': 0,
    'tailwindcss/enforces-negative-arbitrary-values': 0,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/button-has-type': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/interactive-supports-focus': 0,
    'no-underscore-dangle': 0,
    'no-unused-vars': 1,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
