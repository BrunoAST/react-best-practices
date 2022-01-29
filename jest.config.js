module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts,tsx}",
    "!<rootDir>/src/main/**/*",
    "!**/*.d.ts",
    "!**/*.scss.d.ts"
  ],
  coverageDirectory: "coverage",
  setupFilesAfterEnv: ['<rootDir>/src/main/config/jest-setup.ts'],
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