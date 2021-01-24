/* eslint-disable no-console */
import { logger } from './logger';

const info = jest.spyOn(global.console, 'info');
const warn = jest.spyOn(global.console, 'warn');
const error = jest.spyOn(global.console, 'error');


describe('logger', () => {
    it('logs info', () => {
        logger.info('test info log');
        expect(info).toBeCalled();
    });

    it('logs warning', () => {
        logger.warn('test warn log');
        expect(warn).toBeCalled();
    });

    it('logs error', () => {
        logger.error('test error log');
        expect(error).toBeCalled();
    });
});
