module.exports = {
    roots: ['<rootDir>/src'],
    collectCoverageFrom: [
        "<rootDir>/src/**/*.{ts,tsx}",
        "!<rootDir>/src/main/**/*",
        "!**/*.d.ts",
        "!**/*.scss.d.ts"
    ],
    coverageDirectory: "coverage",
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/src/main/test/cypress'
    ],
    moduleNameMapper: {
        '^.+\\.(scss)$': '<rootDir>/config/style-mock.js'
    },
    testEnvironment: "jsdom",
    transform: {
        ".+\\.(ts|tsx)$": "ts-jest"
    }
}