module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'off',
    'vue/no-v-html': 'off',
    'space-before-function-paren': 'off',
    'indent': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/require-default-prop': 'off',
    'vue/html-self-closing': 'off',
    'vue/html-indent': 'off',
    // 'quote-props': [1, 'always']
  },
};
