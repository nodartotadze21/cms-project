import react from 'eslint-plugin-react-hooks'

export default [
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'react-hooks': react,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
]
