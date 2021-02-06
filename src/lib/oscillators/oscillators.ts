import { OscillatorId, StudioService } from '../../types/types';
import { getAudioContext } from '../audioContext/audioContext';
import { getFrequencyByOctaveOffset } from '../utils/audio/audio';
import { logger } from '../utils/logger/logger';


let osc1: OscillatorNode;
let osc2: OscillatorNode;
let oscSub: OscillatorNode;

export const startOscillatorById = (
    oscillatorId: OscillatorId,
    studioService: StudioService,
    oscillatorFrequency: number,
) => {
    const { gainNodes, settings } = studioService;
    const audioContext = getAudioContext();
    const oscSettings = settings[oscillatorId];
    const oscGainNode = gainNodes[oscillatorId];
    const oscEnabled = oscSettings.enabled;
    const oscType = oscSettings.type;
    const oscOctave = oscSettings.octave;
    const calculatedFrequency = getFrequencyByOctaveOffset(oscOctave, oscillatorFrequency);
    let oscDetune;

    switch (oscillatorId) {
        case 'osc1':
            if (oscEnabled) {
                oscDetune = settings.osc1.detune;
                osc1 = audioContext.createOscillator();
                osc1.type = oscType;
                osc1.detune.value = oscDetune;
                osc1.frequency.value = calculatedFrequency;
                osc1.connect(oscGainNode);
                osc1.start();
                logger.info('Starting Oscillator 1 with frequency', calculatedFrequency);
            }
            break;

        case 'osc2':
            if (oscEnabled) {
                oscDetune = settings.osc1.detune;
                osc2 = audioContext.createOscillator();
                osc2.type = oscType;
                osc2.detune.value = oscDetune;
                osc2.frequency.value = calculatedFrequency;
                osc2.connect(oscGainNode);
                osc2.start();
                logger.info('Starting Oscillator 2 with frequency', calculatedFrequency);
            }
            break;

        case 'oscSub':
            if (oscEnabled) {
                oscSub = audioContext.createOscillator();
                oscSub.type = oscType;
                oscSub.frequency.value = calculatedFrequency;
                oscSub.connect(oscGainNode);
                oscSub.start();
                logger.info('Starting Oscillator Sub with frequency', calculatedFrequency);
            }
            break;

        default:
            break;
    }
};

export const stopOscillatorById = (oscillatorId: OscillatorId) => {
    switch (oscillatorId) {
        case 'osc1':
            if (osc1) {
                osc1.stop();
                logger.info('Stopping Oscillator 1');
            }
            break;
        case 'osc2':
            if (osc2) {
                osc2.stop();
                logger.info('Stopping Oscillator 2');
            }
            break;
        case 'oscSub':
            if (oscSub) {
                oscSub.stop();
                logger.info('Stopping Oscillator Sub');
            }
            break;
        default:
            break;
    }
};

export const resetOscillators = () => {
    osc1 = undefined;
    osc2 = undefined;
    oscSub = undefined;
};
