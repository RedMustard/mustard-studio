module.exports = {
    env: {
        browser: true
    },
    extends: ['airbnb-typescript'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        project: './tsconfig.eslint.json'
    },
    rules: {
        'default-case': [1],
        'jsx-quotes': [2, 'prefer-double'],
        'prefer-destructuring': [1],
        'prefer-template': ['error'],
        'no-multiple-empty-lines': ['error', { max: 2 }],
        'no-underscore-dangle': [0],
        'no-use-before-define': [1],
        'no-useless-escape': [1],
        'react/jsx-indent': [0],
        'react/jsx-indent-props': [0],
        'react/jsx-quotes': [0],
        'react/forbid-prop-types': [0],
        'react/prop-types': [0],
        'react/jsx-props-no-spreading': [0],
        'react/no-unknown-property': ['error', { ignore: ['class'] }],
        'react/require-default-props': [0],
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/no-unused-vars': [0],
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'variable',
                format: ['camelCase']
            },
            {
                selector: 'typeLike',
                format: ['PascalCase']
            },
            {
                selector: 'variable',
                types: ['function'],
                format: ['camelCase', 'PascalCase']
            }
        ],
        'max-len': [
            'error',
            {
                code: 150,
                ignoreComments: true,
                ignoreRegExpLiterals: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true
            }
        ],
        'no-plusplus': [
            'error',
            {
                allowForLoopAfterthoughts: true
            }
        ],
        'jsx-a11y/label-has-for': [
            2,
            {
                components: ['Label'],
                required: {
                    some: ['nesting', 'id']
                },
                allowChildren: false
            }
        ],
        'jsx-a11y/label-has-associated-control': [
            2,
            {
                labelComponents: ['SRLabel'],
                labelAttributes: ['labelId'],
                controlComponents: ['input', 'select'],
                depth: 3
            }
        ],
        'import-name': ['off']
    },
    settings: {
        react: {
            pragma: 'h',
            version: 'detect'
        }
    },
    overrides: [
        {
            files: ['src/sw.js'],
            rules: {
                'import/no-extraneous-dependencies': 0,
            }
        }
    ]
};
