module.exports = {
    verbose: true,
    setupFilesAfterEnv: ["../../setup-jsdom.js"],
    testRegex: "(/__tests__/.*|\\.(test|spec))\\.(js|jsx)$",
    moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx"],
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