module.exports = {
    verbose: true,
    // setupFilesAfterEnv: ["../../setup-jsdom.js"],
    testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx)$",
    preset: 'ts-jest/presets/js-with-ts',
    testEnvironment: 'node',
    // transform: {
    //     '^.+\\.ts?$': 'ts-jest',
    // },
    transformIgnorePatterns: ['<rootDir>/node_modules/']
};