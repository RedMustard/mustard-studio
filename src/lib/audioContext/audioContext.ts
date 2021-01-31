import { logger } from '../utils/logger/logger';

let audioContext: AudioContext;

export const setAudioContext = () => {
    audioContext = new AudioContext();
    logger.info('setAudioContext set', audioContext);
};

export const getAudioContext = () => audioContext;

export const resetAudioContext = () => {
    audioContext = undefined;
    logger.info('resetting audioContext');
};
