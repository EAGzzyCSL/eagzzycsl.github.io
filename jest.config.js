module.exports = {
  clearMocks: true,

  collectCoverage: false,

  collectCoverageFrom: ['packages/**/*.{js,ts,tsx}'],

  coverageDirectory: 'coverage',

  coveragePathIgnorePatterns: ['/node_modules/'],

  coverageReporters: ['text', 'text-summary'],

  coverageThreshold: {
    global: {
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0,
    },
  },

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/packages/site//$1',
    '\\.(css|scss|svg)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': 'scripts/fileMock.js',
  },

  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/**/*.test.{js,ts,tsx}'],

  testPathIgnorePatterns: ['/node_modules/'],
}
