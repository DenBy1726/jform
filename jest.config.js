module.exports = {
    verbose: true,
    testMatch: [
        '**/__tests__/**/*.(js|jsx|ts|tsx)',
        '**/?(*.)+(spec|test).(js|jsx|ts|tsx)',
    ],
    preset: 'ts-jest/presets/js-with-ts',
    testEnvironment: 'node',
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx"]
};