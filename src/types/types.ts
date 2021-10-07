export type PianoKeyCount = 88 | 61 | 49 | 37 | 25;
export type PianoKeyColor = 'white' | 'black';
export type KeyNumber = number;
export type KeyboardKey = { [keyboardCharacter: string]: KeyNumber };
export type Octave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type OscillatorId = 'osc1' | 'osc2' | 'oscSub';
export type ValueUnit = 'percent' | 'cent' | 'pan' | 'seconds';

export type Oscillator = {
    analyserNode: AnalyserNode,
    gainNode: GainNode,
    panNode: StereoPannerNode,
    settings: OscillatorSettings | OscillatorSettings & OscillatorDetuneSetting,
};

export type Envelope = {
    attack: number,
    decay: number,
    sustain: number,
    release: number,
};

export type StudioService = {
    master: {
        gainNode: GainNode,
        panNode: StereoPannerNode,
        settings: MasterSettings,
    },
    oscillators: {
        osc1: Oscillator,
        osc2: Oscillator,
        oscSub: Oscillator,
    }
    envelope: Envelope,
};

export type MasterSettings = {
    volume: number,
    pan: number,
};

export type OscillatorSettings = {
    enabled: boolean,
    octave: number,
    pan: number,
    type: OscillatorType,
    volume: number,
};

export type OscillatorDetuneSetting = {
    detune: number,
};

export type StudioServiceActionType =
    'SET_MASTER_VOLUME' |
    'SET_MASTER_GAIN' |
    'SET_MASTER_PAN_NODE' |
    'SET_MASTER_PAN_POSITION' |
    'SET_ENVELOPE_ATTACK' |
    'SET_ENVELOPE_SUSTAIN' |
    'SET_ENVELOPE_DECAY' |
    'SET_ENVELOPE_RELEASE' |
    'SET_OSC_1_VOLUME' |
    'SET_OSC_2_VOLUME' |
    'SET_OSC_SUB_VOLUME' |
    'SET_OSC_1_ANALYSER' |
    'SET_OSC_2_ANALYSER' |
    'SET_OSC_SUB_ANALYSER' |
    'SET_OSC_1_GAIN' |
    'SET_OSC_2_GAIN' |
    'SET_OSC_SUB_GAIN' |
    'SET_OSC_1_ENABLED' |
    'SET_OSC_2_ENABLED' |
    'SET_OSC_SUB_ENABLED' |
    'SET_OSC_1_TYPE' |
    'SET_OSC_2_TYPE' |
    'SET_OSC_SUB_TYPE' |
    'SET_OSC_1_DETUNE' |
    'SET_OSC_2_DETUNE' |
    'SET_OSC_1_PAN_NODE' |
    'SET_OSC_2_PAN_NODE' |
    'SET_OSC_SUB_PAN_NODE' |
    'SET_OSC_1_PAN_POSITION' |
    'SET_OSC_2_PAN_POSITION' |
    'SET_OSC_SUB_PAN_POSITION' |
    'SET_OSC_1_OCTAVE' |
    'SET_OSC_2_OCTAVE' |
    'SET_OSC_SUB_OCTAVE';

export type StudioServiceAction = {
    type: StudioServiceActionType;
    payload: any;
};

export type DispatchFunction = (args: StudioServiceAction) => void;

