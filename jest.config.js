module.exports = {
    roots: ['<rootDir>/src'],
    collectCoverageFrom: [
        "<rootDir>/src/**/*.{ts,tsx}",
        "!**/*.d.ts",
        "!**/*.scss.d.ts"
    ],
    coverageDirectory: "coverage",
    moduleNameMapper: {
        '^.+\\.(scss)$': '<rootDir>/config/style-mock.js'
    },
    testEnvironment: "jsdom",
    transform: {
        ".+\\.(ts|tsx)$": "ts-jest"
    }
}