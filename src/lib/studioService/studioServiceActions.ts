import { DispatchFunction, OscillatorId } from '../../types/types';
import { stopOscillatorById } from '../oscillators/oscillators';
import { logger } from '../utils/logger/logger';

export const setMasterVolume = (value: number, dispatch: DispatchFunction) => {
    dispatch({ type: 'SET_MASTER_VOLUME', payload: value });
    logger.info(`Master volume set with value ${value * 100}%`);
};

export const setMasterGainNode = (gainNode: GainNode, dispatch: DispatchFunction) => {
    dispatch({ type: 'SET_MASTER_GAIN', payload: gainNode });
    logger.info('Master gain node added', gainNode);
};

export const setMasterPanNode = (panNode: StereoPannerNode, dispatch: DispatchFunction) => {
    dispatch({ type: 'SET_MASTER_PAN_NODE', payload: panNode });
    logger.info('Master pan node added', panNode);
};

export const setMasterPanPosition = (position: number, dispatch: DispatchFunction) => {
    dispatch({ type: 'SET_MASTER_PAN_POSITION', payload: position });
    logger.info('Master pan position set with value ', position);
};

export const setOscillatorVolume = (value: number, oscillatorId: OscillatorId, dispatch: DispatchFunction) => {
    switch (oscillatorId) {
        case 'osc1':
            dispatch({ type: 'SET_OSC_1_VOLUME', payload: value });
            logger.info(`Oscillator 1 volume set with value ${value * 100}%`);
            break;
        case 'osc2':
            dispatch({ type: 'SET_OSC_2_VOLUME', payload: value });
            logger.info(`Oscillator 2 volume set with value ${value * 100}%`);
            break;
        case 'oscSub':
            dispatch({ type: 'SET_OSC_SUB_VOLUME', payload: value });
            logger.info(`Oscillator 2 volume set with value ${value * 100}%`);
            break;
        default:
            logger.info('setOscillatorVolume unknown oscillatorId provided, no oscillator volume set. Received: ', oscillatorId);
            break;
    }
};

export const setOscillatorGainNode = (gainNode: GainNode, oscillatorId: OscillatorId, dispatch: DispatchFunction) => {
    switch (oscillatorId) {
        case 'osc1':
            dispatch({ type: 'SET_OSC_1_GAIN', payload: gainNode });
            logger.info('Oscillator 1 gain node added', gainNode);
            break;
        case 'osc2':
            dispatch({ type: 'SET_OSC_2_GAIN', payload: gainNode });
            logger.info('Oscillator 2 gain node added', gainNode);
            break;
        case 'oscSub':
            dispatch({ type: 'SET_OSC_SUB_GAIN', payload: gainNode });
            logger.info('Oscillator Sub gain node added', gainNode);
            break;
        default:
            logger.info('setOscillatorGainNode unknown oscillatorId provided, no oscillator gain node set. Received: ', oscillatorId);
            break;
    }
};

export const setOscillatorEnabled = (isEnabled: boolean, oscillatorId: OscillatorId, dispatch: DispatchFunction) => {
    switch (oscillatorId) {
        case 'osc1':
            dispatch({ type: 'SET_OSC_1_ENABLED', payload: isEnabled });
            stopOscillatorById('osc1');
            logger.info('Oscillator 1 isEnabled: ', isEnabled);
            break;
        case 'osc2':
            dispatch({ type: 'SET_OSC_2_ENABLED', payload: isEnabled });
            stopOscillatorById('osc2');
            logger.info('Oscillator 2 isEnabled: ', isEnabled);
            break;
        case 'oscSub':
            dispatch({ type: 'SET_OSC_SUB_ENABLED', payload: isEnabled });
            stopOscillatorById('oscSub');
            logger.info('Oscillator Sub isEnabled: ', isEnabled);
            break;
        default:
            logger.info('setOscillatorEnabled unknown oscillatorId provided, no oscillator set. Received: ', oscillatorId);
            break;
    }
};

export const setOscillatorType = (oscillatorType: OscillatorType, oscillatorId: OscillatorId, dispatch: DispatchFunction) => {
    switch (oscillatorId) {
        case 'osc1':
            dispatch({ type: 'SET_OSC_1_TYPE', payload: oscillatorType });
            logger.info(`Oscillator 1 type set to ${oscillatorType}`);
            break;
        case 'osc2':
            dispatch({ type: 'SET_OSC_2_TYPE', payload: oscillatorType });
            logger.info(`Oscillator 2 type set to ${oscillatorType}`);
            break;
        case 'oscSub':
            dispatch({ type: 'SET_OSC_SUB_TYPE', payload: oscillatorType });
            logger.info(`Oscillator Sub type set to ${oscillatorType}`);
            break;
        default:
            logger.info('setOscillatorType unknown oscillatorId provided, no oscillator type set. Received: ', oscillatorId);
            break;
    }
};

export const setOscillatorDetune = (value: number, oscillatorId: OscillatorId, dispatch: DispatchFunction) => {
    switch (oscillatorId) {
        case 'osc1':
            dispatch({ type: 'SET_OSC_1_DETUNE', payload: value });
            logger.info(`Oscillator 1 detune set to ${value}`);
            break;
        case 'osc2':
            dispatch({ type: 'SET_OSC_2_DETUNE', payload: value });
            logger.info(`Oscillator 2 detune set to ${value}`);
            break;
        default:
            logger.info('setOscillatorDetune unknown oscillatorId provided, no oscillator detune set. Received: ', oscillatorId);
            break;
    }
};

export const setOscillatorPanNode = (panNode: StereoPannerNode, oscillatorId: OscillatorId, dispatch: DispatchFunction) => {
    switch (oscillatorId) {
        case 'osc1':
            dispatch({ type: 'SET_OSC_1_PAN_NODE', payload: panNode });
            logger.info('Oscillator 1 pan node added', panNode);
            break;
        case 'osc2':
            dispatch({ type: 'SET_OSC_2_PAN_NODE', payload: panNode });
            logger.info('Oscillator 2 pan node added', panNode);
            break;
        case 'oscSub':
            dispatch({ type: 'SET_OSC_SUB_PAN_NODE', payload: panNode });
            logger.info('Oscillator Sub pan node added', panNode);
            break;
        default:
            logger.info('setOscillatorPanNode unknown oscillatorId provided, no oscillator pan node set. Received: ', oscillatorId);
            break;
    }
};

export const setOscillatorPanPosition = (position: number, oscillatorId: OscillatorId, dispatch: DispatchFunction) => {
    switch (oscillatorId) {
        case 'osc1':
            dispatch({ type: 'SET_OSC_1_PAN_POSITION', payload: position });
            logger.info('Oscillator 1 pan position set with value ', position);
            break;
        case 'osc2':
            dispatch({ type: 'SET_OSC_2_PAN_POSITION', payload: position });
            logger.info('Oscillator 2 pan position set with value ', position);
            break;
        case 'oscSub':
            dispatch({ type: 'SET_OSC_SUB_PAN_POSITION', payload: position });
            logger.info('Oscillator Sub pan position set with value ', position);
            break;
        default:
            logger.info('setOscillatorPanPosition unknown oscillatorId provided, no oscillator pan node set. Received: ', oscillatorId);
            break;
    }
};

export const setOscillatorOctave = (octave: number, oscillatorId: OscillatorId, dispatch: DispatchFunction) => {
    switch (oscillatorId) {
        case 'osc1':
            dispatch({ type: 'SET_OSC_1_OCTAVE', payload: octave });
            logger.info('Oscillator 1 octave set with value ', octave);
            break;
        case 'osc2':
            dispatch({ type: 'SET_OSC_2_OCTAVE', payload: octave });
            logger.info('Oscillator 2 octave set with value ', octave);
            break;
        case 'oscSub':
            dispatch({ type: 'SET_OSC_SUB_OCTAVE', payload: octave });
            logger.info('Oscillator Sub octave set with value ', octave);
            break;
        default:
            logger.info('setOscillatorOctave unknown oscillatorId provided, no oscillator pan node set. Received: ', oscillatorId);
            break;
    }
};
