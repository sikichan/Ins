export default {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended', // 使用 React
    'plugin:@typescript-eslint/recommended', // 使用 TypeScript
    'prettier', // 确保在最后一个配置引入
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'prettier/prettier': 'error',
  },
  plugins: ['prettier'],
};
