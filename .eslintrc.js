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
    },
    "env": {
      "browser": true,
      "node": true,
      "jasmine": true
    },
};
