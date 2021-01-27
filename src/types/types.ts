export type KeyboardKeyCount = 88 | 61 | 49 | 37 | 25;
export type KeyboardKeyColor = 'white' | 'black';
export type Octave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type OscillatorId = 'osc1' | 'osc2';


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
            // node: OscillatorNode,
            enabled: boolean,
            // frequency: number,
            type: OscillatorType,
        },
        osc2: {
            // node: OscillatorNode,
            enabled: boolean,
            // frequency: number,
            type: OscillatorType,
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
    'SET_OSC_2_TYPE';

export type StudioServiceAction = {
    type: StudioServiceActionType;
    payload: any;
};

export type DispatchFunction = <T = StudioServiceAction>(args: T) => void;

