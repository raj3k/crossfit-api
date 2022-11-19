/** @type {import('ts-jest').JestConfigWithTsJest} */
const aliases = require('module-alias-jest/register');
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: aliases.jest
};