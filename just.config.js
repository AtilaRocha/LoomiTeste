module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/node_modules/**',
    '!**/main.ts',
    '!**/di/**',
    '!**/infra/**',
    '!**/presentation/**',
    '!**/*.module.ts',
    '!**/*interface.ts',
    '!**/*dto.ts',
    '!**/*entity.ts',
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
