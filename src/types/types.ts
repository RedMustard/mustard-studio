export type KeyboardKeyCount = 88 | 61 | 49 | 37 | 25;
export type KeyboardKeyColor = 'white' | 'black';
export type Octave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type OscillatorId = 'osc1' | 'osc2';
export type ValueUnit = 'percent' | 'cent' | 'pan';


export type StudioService = {
    settings: {
        master: {
            volume: number,
            pan: number,
        },
        osc1: {
            detune: number,
            enabled: boolean,
            pan: number,
            type: OscillatorType,
            volume: number,
        },
        osc2: {
            detune: number,
            enabled: boolean,
            pan: number,
            type: OscillatorType,
            volume: number,
        },
    },
    gainNodes: {
        master: GainNode,
        osc1: GainNode,
        osc2: GainNode,
    },
    panNodes: {
        master: StereoPannerNode,
        osc1: StereoPannerNode,
        osc2: StereoPannerNode,
    },
};

export type StudioServiceActionType =
    'SET_MASTER_VOLUME' |
    'SET_MASTER_GAIN' |
    'SET_MASTER_PAN_NODE' |
    'SET_MASTER_PAN_POSITION' |
    'SET_OSC_1_VOLUME' |
    'SET_OSC_2_VOLUME' |
    'SET_OSC_1_GAIN' |
    'SET_OSC_2_GAIN' |
    'SET_OSC_1_ENABLED' |
    'SET_OSC_2_ENABLED' |
    'SET_OSC_1_TYPE' |
    'SET_OSC_2_TYPE' |
    'SET_OSC_1_DETUNE' |
    'SET_OSC_2_DETUNE' |
    'SET_OSC_1_PAN_NODE' |
    'SET_OSC_2_PAN_NODE' |
    'SET_OSC_1_PAN_POSITION' |
    'SET_OSC_2_PAN_POSITION';

export type StudioServiceAction = {
    type: StudioServiceActionType;
    payload: any;
};

export type DispatchFunction = (args: StudioServiceAction) => void;

