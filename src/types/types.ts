export type KeyboardKeyCount = 88 | 61 | 49 | 37 | 25;
export type KeyboardKeyColor = 'white' | 'black';
export type Octave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type OscillatorId = 'osc1' | 'osc2';
export type ValueUnit = 'percent' | 'cent';


export type StudioService = {
    volume: {
        master: number;
        osc1: number;
        osc2: number;
    },
    gainNodes: {
        master: GainNode,
        osc1: GainNode,
        osc2: GainNode,
    },
    oscillatorNodes: {
        osc1: {
            enabled: boolean,
            type: OscillatorType,
            detune: number;
        },
        osc2: {
            enabled: boolean,
            type: OscillatorType,
            detune: number;
        },
    }
};

export type StudioServiceActionType =
    'SET_MASTER_VOLUME' |
    'SET_OSC_1_VOLUME' |
    'SET_OSC_2_VOLUME' |
    'SET_MASTER_GAIN' |
    'SET_OSC_1_GAIN' |
    'SET_OSC_2_GAIN' |
    'SET_OSC_1_ENABLED' |
    'SET_OSC_2_ENABLED' |
    'SET_OSC_1_TYPE' |
    'SET_OSC_2_TYPE' |
    'SET_OSC_1_DETUNE' |
    'SET_OSC_2_DETUNE';

export type StudioServiceAction = {
    type: StudioServiceActionType;
    payload: any;
};

export type DispatchFunction = (args: StudioServiceAction) => void;

