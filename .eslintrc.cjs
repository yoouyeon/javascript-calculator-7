module.exports = {
  env: {
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: ['airbnb-base', 'prettier'],
  rules: {
    'no-process-exit': 'error', // process.exit() 사용 금지
    'no-console': 'error', // console.log 사용 금지
    'import/extensions': 'off',
    'func-style': ['error', 'expression'], // 함수를 function 키워드로 선언하지 않는다.
  },
  overrides: [
    {
      files: ['__tests__/**', '*.test.js'],
      rules: {
        'max-lines-per-function': 'off',
      },
    },
  ],
};
