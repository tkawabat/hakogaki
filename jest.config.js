module.exports = {
    "testEnvironment": "jsdom",
    "transform": {
        "^.+\\.(ts|tsx)$": "@swc/jest"
    },
    "roots": [
        "<rootDir>/src"
    ],
    "testMatch": [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    moduleDirectories: ['node_modules', '<rootDir>'],
    testPathIgnorePatterns: [
        '/node_modules/',
    ],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.jest.json',
        },
    },
}