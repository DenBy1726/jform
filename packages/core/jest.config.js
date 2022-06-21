module.exports = {
    verbose: true,
    setupFilesAfterEnv: ["../../setup-jsdom.js"],
    testMatch: ["**/test/**/*.test.js"],
    preset: 'ts-jest/presets/js-with-ts',
    testEnvironment: 'node',
    // transform: {
    //     '^.+\\.ts?$': 'ts-jest',
    // },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    "moduleNameMapper": {
        "^@jform/utils/(.*)$": "<rootDir>/../utils/src/$1"
    }
};