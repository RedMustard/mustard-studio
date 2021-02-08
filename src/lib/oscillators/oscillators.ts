import { OscillatorDetune, OscillatorId, StudioService } from '../../types/types';
import { getAudioContext } from '../audioContext/audioContext';
import { getFrequencyByOctaveOffset } from '../utils/audio/audio';
import { logger } from '../utils/logger/logger';

const oscillators: {
    [key in OscillatorId]: OscillatorNode;
} = {
    osc1: undefined,
    osc2: undefined,
    oscSub: undefined,
};

export const setOscillatorById = (oscillatorId: OscillatorId, oscillator: OscillatorNode) => {
    switch (oscillatorId) {
        case 'osc1':
            oscillators.osc1 = oscillator;
            break;
        case 'osc2':
            oscillators.osc2 = oscillator;
            break;
        case 'oscSub':
            oscillators.oscSub = oscillator;
            break;
        default:
            break;
    }
};

export const getOscillators = () => oscillators;

export const resetOscillators = () => {
    oscillators.osc1 = undefined;
    oscillators.osc2 = undefined;
    oscillators.oscSub = undefined;
};

export const startOscillators = (
    oscillatorFrequency: number,
    studioService: StudioService,
) => {
    const { gainNodes, settings } = studioService;
    const audioContext = getAudioContext();

    (Object.keys(oscillators) as OscillatorId[]).forEach((oscillatorId) => {
        const oscSettings = settings[oscillatorId];
        const oscGainNode = gainNodes[oscillatorId];
        const oscEnabled = oscSettings.enabled;
        const oscType = oscSettings.type;
        const oscOctave = oscSettings.octave;
        const calculatedFrequency = getFrequencyByOctaveOffset(oscOctave, oscillatorFrequency);


        if (oscEnabled) {
            oscillators[oscillatorId] = audioContext.createOscillator();
            oscillators[oscillatorId].type = oscType;
            oscillators[oscillatorId].frequency.value = calculatedFrequency;

            if (oscSettings.hasOwnProperty('detune')) {
                oscillators[oscillatorId].detune.value = (oscSettings as OscillatorDetune).detune;
            }

            oscillators[oscillatorId].connect(oscGainNode);
            oscillators[oscillatorId].start();
            logger.info(`Starting oscillator ${oscillatorId} with frequency`, calculatedFrequency);
        }
    });
};

export const stopOscillatorById = (oscillatorId: OscillatorId) => {
    switch (oscillatorId) {
        case 'osc1':
            if (oscillators.osc1) {
                oscillators.osc1.stop();
                logger.info('Stopping oscillator', oscillatorId);
            }
            break;
        case 'osc2':
            if (oscillators.osc2) {
                oscillators.osc2.stop();
                logger.info('Stopping oscillator', oscillatorId);
            }
            break;
        case 'oscSub':
            if (oscillators.oscSub) {
                oscillators.oscSub.stop();
                logger.info('Stopping oscillator', oscillatorId);
            }
            break;
        default:
            break;
    }
};


export const stopOscillators = () => {
    (Object.keys(oscillators) as OscillatorId[]).forEach((oscillatorId) => {
        if (oscillators[oscillatorId]) {
            oscillators[oscillatorId].stop();
            oscillators[oscillatorId] = undefined;
            logger.info('Stopping oscillator', oscillatorId);
        }
    });
};
