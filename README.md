# Ins social-media-app

Based on React + Typescript + Vite

## TailwindCss

```shell
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

```js
// tailwind.config.js
content: [ "./index.html", "./src/**/*.{js,ts,jsx,tsx}" ];
```

```css
/*index.css*/
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```js
// #create a new file "postcss.config.js"
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

## Prettier and Eslint

```shell
npm install --save-dev --save-exact eslint prettier eslint-config-prettier eslint-plugin-prettier
touch .prettierignore
touch .prettierrc
touch .eslintrc.mjs
```

```js
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
    semi: [ 'error', 'always' ],
    quotes: [ 'error', 'single' ],
    'prettier/prettier': 'error',
  },
  plugins: [ 'prettier' ],
};

```

## @ alias

```shell
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
  }
}
```

```js
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [ react() ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

```

## shadcn/ui

```shell
npx shadcn-ui@latest init

```
