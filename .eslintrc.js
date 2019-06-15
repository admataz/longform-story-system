module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "standard",
    "plugins": [
      "svelte3"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
      "ecmaVersion": 2019,
      "sourceType": "module"
    },
    "rules": {
    }
};