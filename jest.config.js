module.exports = {
    'rootDir': __dirname,
    'roots': [
        '<rootDir>/src',
    ],
    'testMatch': [
        '**/__tests__/**/*.+(ts|tsx|js)',
        '**/?(*.)+(spec|test).+(ts|tsx|js)',
    ],
    'transform': {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    'moduleNameMapper': {
        '^~(.*)$': '<rootDir>/src$1',
    },
    'setupFiles': ['dotenv/config'],
};
