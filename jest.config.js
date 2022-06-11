const { defaults } = require('jest-config')

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
    '\\.(css|scss|svg|jpg|jpeg|png|gif)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/packages/site//$1',
  },

  transform: {
    ...defaults.transform,
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },

  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/**/*.test.{ts,tsx}'],

  testPathIgnorePatterns: ['/node_modules/'],
}
