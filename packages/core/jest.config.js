let testConfig = require("../../jest.config")


module.exports = {
    ...testConfig,
    setupFilesAfterEnv: ["../../setup-jsdom.js"],
    "moduleNameMapper": {
        "^@jform/utils/(.*)$": "<rootDir>/../utils/src/$1"
    }
};