module.exports = {
  clearMocks: true,

  collectCoverage: false,

  collectCoverageFrom: ['packages/**/*.{ts,tsx}'],

  coverageDirectory: 'coverage',

  coveragePathIgnorePatterns: [
    '/node_modules/',
    'packages/site/.next',
    'packages/site/pages',
  ],

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
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/scripts/fileMock.js',
  },

  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/**/*.test.{ts,tsx}'],

  testPathIgnorePatterns: ['/node_modules/'],
}
