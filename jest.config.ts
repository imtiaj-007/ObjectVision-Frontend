import nextJest from 'next/jest';
import type { Config } from '@jest/types';

const createJestConfig = nextJest({
    dir: './',
});

const customJestConfig: Config.InitialOptions = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', { 
            tsconfig: 'tsconfig.jest.json',
            isolatedModules: true
        }],
    },
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/.next/',
        '<rootDir>/cypress/',
    ],
    moduleDirectories: ['node_modules', '<rootDir>/src'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    testMatch: [
        '**/*.test.ts',
        '**/*.test.tsx'
    ],
    testEnvironmentOptions: {
        customExportConditions: ['node', 'node-addons'],
    },
};

export default createJestConfig(customJestConfig);