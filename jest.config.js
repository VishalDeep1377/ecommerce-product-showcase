/** @type {import('jest').Config} */
const config = {
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
  modulePaths: ['<rootDir>/node_modules'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\.(ts|tsx)$': '@swc/jest',
    '^.+\.(js|jsx)$': '@swc/jest',
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\.module\.(css|sass|scss)$'
  ],
  moduleNameMapper: {
    '^.+\.module\.(css|sass|scss)$': 'identity-obj-proxy',
    '^.+\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '^.+\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i': '<rootDir>/__mocks__/fileMock.js',
    '^@/(.*)$': '<rootDir>/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

module.exports = config; 