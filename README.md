# Ins

Based on React + Typescript + Vite

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: [ "./tsconfig.json", "./tsconfig.node.json" ],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked`
  or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and
  add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# Initialize

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
touch .eslintrc.js
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