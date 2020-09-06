module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  "rules": {
    "no-unused-vars": "off",
    "no-console": "off",
    "quotes": ["warn", "single"],
    "no-useless-catch": "off",
    "no-case-declarations": 0,
    "no-empty-pattern": "off",
    "no-debugger": "off"
      
  }
};
