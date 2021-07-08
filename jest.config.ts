/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  moduleNameMapper: {
    '^.+\\.(css|less)$': '<rootDir>/src/views/__test__/mock/CssLoaderMock.jest.js'
  },
};
