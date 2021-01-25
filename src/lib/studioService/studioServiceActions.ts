import { logger } from '../utils/logger/logger';

export const handleChangeMasterVolume = (value: number, dispatch: Function) => {
    dispatch({ type: 'SET_MASTER_VOLUME', payload: value });
    logger.info(`Master volume changed to ${value * 100}%`);
};

export const setMasterGainNode = (gainNode: GainNode, dispatch: Function) => {
    dispatch({ type: 'SET_MASTER_GAIN', payload: gainNode });
    logger.info('Master gain node added');
};
