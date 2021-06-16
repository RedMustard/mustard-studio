import { OSC_1_INITIAL_SETTINGS, OSC_2_INITIAL_SETTINGS, OSC_SUB_INITIAL_SETTINGS } from '../../constants';
import {
    Oscillator,
    OscillatorDetuneSetting,
    OscillatorId,
    OscillatorSettings,
} from '../../types/types';
import { getAudioContext } from '../audioContext/audioContext';
import { getFrequencyByOctaveOffset } from '../utils/audio/audio';
import { logger } from '../utils/logger/logger';

let oscillatorNodes: {
    [frequency: string]: {
        [T: string]: OscillatorNode[];
    }
} = {};

let oscillatorConfigs: {
    [key in OscillatorId]: Oscillator
} = {
    osc1: {
        analyserNode: undefined,
        panNode: undefined,
        gainNode: undefined,
        settings: {
            ...OSC_1_INITIAL_SETTINGS,
        },
    },
    osc2: {
        analyserNode: undefined,
        panNode: undefined,
        gainNode: undefined,
        settings: {
            ...OSC_2_INITIAL_SETTINGS,
        },
    },
    oscSub: {
        analyserNode: undefined,
        panNode: undefined,
        gainNode: undefined,
        settings: {
            ...OSC_SUB_INITIAL_SETTINGS,
        },
    },
};

const addOscillatorNode = (oscillatorNode: OscillatorNode, frequency: number, oscillatorId: OscillatorId) => {
    if (!oscillatorNodes[frequency]) {
        oscillatorNodes[frequency] = {
            [oscillatorId]: [oscillatorNode],
        };
    } else if (!oscillatorNodes[frequency][oscillatorId]) {
        oscillatorNodes[frequency][oscillatorId] = [oscillatorNode];
    } else {
        oscillatorNodes[frequency][oscillatorId].push(oscillatorNode);
    }
    logger.info('Added oscillator nodes for frequency', frequency);
};

// TODO: Rename
const enableEnvelope = (
    audioContext: AudioContext,
    gainNode: GainNode,
    attack: number,
    decay: number,
    sustain: number,
) => {
    const now = audioContext.currentTime;
    // attack *= egMode;
    // decay *= egMode;
    gainNode.gain.cancelScheduledValues(0);
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(1, now + attack);
    gainNode.gain.linearRampToValueAtTime(sustain, now + attack + decay);
};

const disableEnvelope = (
    audioContext: AudioContext,
    gainNode: GainNode,
    release: number,
    oscillator: OscillatorNode,
) => {
    const now = audioContext.currentTime;
    // r *= egMode;
    gainNode.gain.cancelScheduledValues(0);
    gainNode.gain.setValueAtTime(gainNode.gain.value, now);
    gainNode.gain.linearRampToValueAtTime(0, now + release);
    oscillator.stop(now + release);
};

export const setOscillatorAnalyserNodeByOscillatorId = (oscillatorId: OscillatorId, analyserNode: AnalyserNode) => {
    switch (oscillatorId) {
        case 'osc1':
            oscillatorConfigs.osc1.analyserNode = analyserNode;
            break;
        case 'osc2':
            oscillatorConfigs.osc2.analyserNode = analyserNode;
            break;
        case 'oscSub':
            oscillatorConfigs.oscSub.analyserNode = analyserNode;
            break;
        default:
            break;
    }
};

export const setOscillatorGainNodeByOscillatorId = (oscillatorId: OscillatorId, gainNode: GainNode) => {
    switch (oscillatorId) {
        case 'osc1':
            oscillatorConfigs.osc1.gainNode = gainNode;
            break;
        case 'osc2':
            oscillatorConfigs.osc2.gainNode = gainNode;
            break;
        case 'oscSub':
            oscillatorConfigs.oscSub.gainNode = gainNode;
            break;
        default:
            break;
    }
};

export const setOscillatorPanNodeByOscillatorId = (oscillatorId: OscillatorId, panNode: StereoPannerNode) => {
    switch (oscillatorId) {
        case 'osc1':
            oscillatorConfigs.osc1.panNode = panNode;
            break;
        case 'osc2':
            oscillatorConfigs.osc2.panNode = panNode;
            break;
        case 'oscSub':
            oscillatorConfigs.oscSub.panNode = panNode;
            break;
        default:
            break;
    }
};

export const setOscillatorSettingsByOscillatorId = (
    oscillatorId: OscillatorId,
    oscillatorSettings: OscillatorSettings | OscillatorSettings & OscillatorDetuneSetting,
) => {
    switch (oscillatorId) {
        case 'osc1':
            oscillatorConfigs.osc1.settings = oscillatorSettings;
            break;
        case 'osc2':
            oscillatorConfigs.osc2.settings = oscillatorSettings;
            break;
        case 'oscSub':
            oscillatorConfigs.oscSub.settings = oscillatorSettings;
            break;
        default:
            break;
    }
};

export const getOscillatorsConfigs = () => oscillatorConfigs;

export const getOscillatorsNodes = () => oscillatorNodes;

export const resetOscillatorNodes = () => {
    oscillatorNodes = {};
};

export const resetOscillatorConfigs = () => {
    oscillatorConfigs = {
        osc1: {
            analyserNode: undefined,
            panNode: undefined,
            gainNode: undefined,
            settings: {
                ...OSC_1_INITIAL_SETTINGS,
            },
        },
        osc2: {
            analyserNode: undefined,
            panNode: undefined,
            gainNode: undefined,
            settings: {
                ...OSC_2_INITIAL_SETTINGS,
            },
        },
        oscSub: {
            analyserNode: undefined,
            panNode: undefined,
            gainNode: undefined,
            settings: {
                ...OSC_SUB_INITIAL_SETTINGS,
            },
        },
    };
};

export const startOscillators = (oscillatorFrequency: number) => {
    const audioContext = getAudioContext();

    (Object.keys(oscillatorConfigs) as OscillatorId[]).forEach((oscillatorId) => {
        const oscSettings = getOscillatorsConfigs()[oscillatorId].settings;
        const oscGainNode = getOscillatorsConfigs()[oscillatorId].gainNode;
        const oscAnalyserNode = getOscillatorsConfigs()[oscillatorId].analyserNode;
        const oscEnabled = oscSettings.enabled;
        const oscType = oscSettings.type;
        const oscOctave = oscSettings.octave;
        const calculatedFrequency = getFrequencyByOctaveOffset(oscOctave, oscillatorFrequency);

        if (oscEnabled) {
            const oscillator = audioContext.createOscillator();

            addOscillatorNode(oscillator, oscillatorFrequency, oscillatorId);
            oscillator.type = oscType;
            oscillator.frequency.value = calculatedFrequency;

            if (oscSettings.hasOwnProperty('detune')) {
                oscillator.detune.value = (oscSettings as OscillatorDetuneSetting).detune;
            }
            // TODO: Check if osc linked to envelope, if not don't call enableEnv and connect osc to analyser
            enableEnvelope(audioContext, oscGainNode, 1, 1, 1);
            oscGainNode.connect(oscAnalyserNode);
            oscillator.connect(oscGainNode);
            oscillator.start();
            logger.info(`Starting oscillator ${oscillatorId} with frequency`, calculatedFrequency);
        }
    });
};

export const stopOscillatorByFrequency = (frequency: number) => {
    const audioContext = getAudioContext();
    logger.info('Stopping all oscillators for frequency', frequency);
    if (oscillatorNodes[frequency]) {
        (Object.keys(oscillatorNodes[frequency]) as OscillatorId[]).forEach((oscillatorId: OscillatorId) => {
            oscillatorNodes[frequency][oscillatorId].forEach((oscillator) => {
                const oscGainNode = getOscillatorsConfigs()[oscillatorId].gainNode;
                disableEnvelope(audioContext, oscGainNode, 1, oscillator);
                // TODO: Check if osc linked to envelope, if not call stop directly
                // oscillator.stop();
            });
        });
    }
};

export const stopOscillatorById = (oscillatorId: OscillatorId) => {
    const audioContext = getAudioContext();

    logger.info('Stopping all oscillators for frequency', oscillatorId);
    (Object.keys(oscillatorNodes)).forEach((frequency) => {
        if (oscillatorNodes[frequency][oscillatorId]) {
            oscillatorNodes[frequency][oscillatorId].forEach((oscillator) => {
                const oscGainNode = getOscillatorsConfigs()[oscillatorId].gainNode;
                disableEnvelope(audioContext, oscGainNode, 1, oscillator);
                // TODO: Check if osc linked to envelope, if not call stop directly
                // oscillator.stop();
            });
        }
    });
};

export const stopOscillators = () => {
    const audioContext = getAudioContext();

    logger.info('Stopping all oscillators');
    (Object.keys(oscillatorNodes)).forEach((frequency) => {
        (Object.keys(oscillatorNodes[frequency]) as OscillatorId[]).forEach((oscillatorId: OscillatorId) => {
            oscillatorNodes[frequency][oscillatorId].forEach((oscillator) => {
                const oscGainNode = getOscillatorsConfigs()[oscillatorId].gainNode;
                disableEnvelope(audioContext, oscGainNode, 1, oscillator);
                // TODO: Check if osc linked to envelope, if not call stop directly
                // oscillator.stop();
            });
        });
    });
    oscillatorNodes = {};
};
