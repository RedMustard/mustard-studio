/* eslint-disable no-console */
const loggerColors = {
    warn: 'orange',
    error: 'red',
    info: '#75cf00',
};

const loggerStyles = 'color: #fff; fontSize: 12px;';

export const logger = {
    warn: (...args: any) => {
        console.warn(
            '%c warn ',
            `background-color: ${loggerColors.warn}; ${loggerStyles}`,
            ...args,
        );
    },
    error: (...args: any) => {
        console.error(
            '%c error ',
            `background-color: ${loggerColors.error}; ${loggerStyles}`,
            ...args,
        );
    },
    info: (...args: any) => {
        console.info(
            '%c info ',
            `background-color: ${loggerColors.info}; ${loggerStyles}`,
            ...args,
        );
    },
};
