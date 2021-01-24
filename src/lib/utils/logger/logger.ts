/* eslint-disable no-console */
const loggerColors = {
    warn: 'orange',
    error: 'red',
    info: '#75cf00',
};

const loggerStyles = 'color: #fff; padding: 6px; fontSize: 12px;';

export const logger = {
    warn: (...args: any) => {
        console.warn(
            '%cwarn',
            `background-color: ${loggerColors.warn}; ${loggerStyles}`,
            ...args,
        );
    },
    error: (...args: any) => {
        console.error(
            '%cerror',
            `background-color: ${loggerColors.error}; ${loggerStyles}`,
            ...args,
        );
    },
    info: (...args: any) => {
        console.info(
            '%cinfo',
            `background-color: ${loggerColors.info}; ${loggerStyles}`,
            ...args,
        );
    },
};
