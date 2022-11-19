import { StudioService } from '../../types/types';
import {
    ENVELOPE_INITIAL_SETTINGS,
    FILTER_INITIAL_SETTINGS,
    MASTER_INITIAL_SETTINGS,
    OSC_1_INITIAL_SETTINGS,
    OSC_2_INITIAL_SETTINGS,
    OSC_SUB_INITIAL_SETTINGS,
} from '../../constants';

// eslint-disable-next-line import/newline-after-import
const wamock = require('web-audio-mock-api');
const mockAudioContext = new wamock.AudioContext();

export const mockStudioService: StudioService = {
    master: {
        settings: {
            ...MASTER_INITIAL_SETTINGS,
        },
        gainNode: mockAudioContext.createGain(),
        panNode: mockAudioContext.createStereoPanner(),
    },
    filter: {
        filterNode: mockAudioContext.createBiquadFilter(),
        settings: {
            ...FILTER_INITIAL_SETTINGS,
        },
    },
    envelope: {
        ...ENVELOPE_INITIAL_SETTINGS,
    },
    oscillators: {
        osc1: {
            analyserNode: mockAudioContext.createAnalyser(),
            gainNode: mockAudioContext.createGain(),
            panNode: mockAudioContext.createStereoPanner(),
            settings: {
                ...OSC_1_INITIAL_SETTINGS,
            },
        },
        osc2: {
            analyserNode: mockAudioContext.createAnalyser(),
            gainNode: mockAudioContext.createGain(),
            panNode: mockAudioContext.createStereoPanner(),
            settings: {
                ...OSC_2_INITIAL_SETTINGS,
            },
        },
        oscSub: {
            analyserNode: mockAudioContext.createAnalyser(),
            gainNode: mockAudioContext.createGain(),
            panNode: mockAudioContext.createStereoPanner(),
            settings: {
                ...OSC_SUB_INITIAL_SETTINGS,
            },
        },
    },
};
