module.exports = {
    "extends": "airbnb",
    "plugins": [
        "import"
    ],
    "rules" : {
      "no-plusplus" : 0,
      "max-len" : 1,
      "func-names" : 0,
      "prefer-rest-params" : 1,
      "no-restricted-syntax" : 0,
      "no-mixed-operators" : 0,
      "guard-for-in" : 0,
      "no-param-reassign" : 1,
      "no-bitwise" : 0,
      "no-underscore-dangle": 0,
    },
    "env": {
      "browser": true,
      "node": true,
      "jasmine": true
    },
};
