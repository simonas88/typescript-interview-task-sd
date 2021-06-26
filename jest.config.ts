import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  testPathIgnorePatterns: [
    '<rootDir>/src/__tests__/mock-css.js',
  ],
  moduleNameMapper: {
    '^.+\\.(css|scss)$': '<rootDir>/src/__tests__/mock-css.js',
  },
};

export default config;
