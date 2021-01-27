import { DispatchFunction, OscillatorId } from '../../types/types';
import { logger } from '../utils/logger/logger';

export const handleChangeMasterVolume = (value: number, dispatch: DispatchFunction) => {
    dispatch({ type: 'SET_MASTER_VOLUME', payload: value });
    logger.info(`Master volume set with value ${value * 100}%`);
};

export const setMasterGainNode = (gainNode: GainNode, dispatch: DispatchFunction) => {
    dispatch({ type: 'SET_MASTER_GAIN', payload: gainNode });
    logger.info('Master gain node added', gainNode);
};

export const setOscillatorEnabled = (enabled: boolean, oscillatorId: OscillatorId, dispatch: DispatchFunction) => {
    switch (oscillatorId) {
        case 'osc1':
            dispatch({ type: 'SET_OSC_1_ENABLED', payload: enabled });
            logger.info(`Oscillator node 1 ${enabled ? 'enabled' : 'disabled'}`);
            break;
        case 'osc2':
            dispatch({ type: 'SET_OSC_2_ENABLED', payload: enabled });
            logger.info(`Oscillator node 2 ${enabled ? 'enabled' : 'disabled'}`);
            break;
        default:
            logger.info('Unknown oscillatorId provided, no oscillator set. Received: ', oscillatorId);
            break;
    }
};

export const setOscillatorType = (oscillatorType: OscillatorType, oscillatorId: OscillatorId, dispatch: DispatchFunction) => {
    switch (oscillatorId) {
        case 'osc1':
            break;
        case 'osc2':
            break;
        default:
            break;
    }
};
