module.exports = {
    verbose: true,
    // setupFilesAfterEnv: ["../../setup-jsdom.js"],
    testMatch: ["**/test/**/*.test.ts"],
    preset: 'ts-jest/presets/js-with-ts',
    testEnvironment: 'node',
    // transform: {
    //     '^.+\\.ts?$': 'ts-jest',
    // },
    transformIgnorePatterns: ['<rootDir>/node_modules/']
};