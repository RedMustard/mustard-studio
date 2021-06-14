import { studioServiceReducer } from './studioServiceReducer';
import { StudioServiceAction, StudioService } from '../../types/types';
import { getInitialState } from './StudioServiceStore';


// eslint-disable-next-line import/newline-after-import
const wamock = require('web-audio-mock-api');
const mockAudioContext = new wamock.AudioContext();
let initialState: StudioService;
let modifiedState: StudioService;
let action: StudioServiceAction;

describe('studioServiceReducer', () => {
    beforeAll(() => {
        initialState = getInitialState();
    });

    it('SET_MASTER_PAN_NODE', () => {
        modifiedState = {
            ...initialState,
            master: {
                ...initialState.master,
                panNode: mockAudioContext.createStereoPanner(),
            },
        };
        action = {
            type: 'SET_MASTER_PAN_NODE',
            payload: mockAudioContext.createStereoPanner(),
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_MASTER_PAN_POSITION', () => {
        modifiedState = {
            ...initialState,
            master: {
                ...initialState.master,
                settings: {
                    ...initialState.master.settings,
                    pan: 0.7,
                },
            },
        };
        action = {
            type: 'SET_MASTER_PAN_POSITION',
            payload: 0.7,
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_MASTER_VOLUME', () => {
        modifiedState = {
            ...initialState,
            master: {
                ...initialState.master,
                settings: {
                    ...initialState.master.settings,
                    volume: 1.0,
                },
            },
        };
        action = {
            type: 'SET_MASTER_VOLUME',
            payload: 1.0,
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_OSC_1_VOLUME', () => {
        modifiedState = {
            ...initialState,
            oscillators: {
                ...initialState.oscillators,
                osc1: {
                    ...initialState.oscillators.osc1,
                    settings: {
                        ...initialState.oscillators.osc1.settings,
                        volume: 1.0,
                    },
                },
            },
        };
        action = {
            type: 'SET_OSC_1_VOLUME',
            payload: 1.0,
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_OSC_2_VOLUME', () => {
        modifiedState = {
            ...initialState,
            oscillators: {
                ...initialState.oscillators,
                osc2: {
                    ...initialState.oscillators.osc2,
                    settings: {
                        ...initialState.oscillators.osc2.settings,
                        volume: 1.0,
                    },
                },
            },
        };
        action = {
            type: 'SET_OSC_2_VOLUME',
            payload: 1.0,
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_OSC_SUB_VOLUME', () => {
        modifiedState = {
            ...initialState,
            oscillators: {
                ...initialState.oscillators,
                oscSub: {
                    ...initialState.oscillators.oscSub,
                    settings: {
                        ...initialState.oscillators.oscSub.settings,
                        volume: 1.0,
                    },
                },
            },
        };
        action = {
            type: 'SET_OSC_SUB_VOLUME',
            payload: 1.0,
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_MASTER_GAIN', () => {
        modifiedState = {
            ...initialState,
            master: {
                ...initialState.master,
                gainNode: mockAudioContext.createGain(),
            },
        };
        action = {
            type: 'SET_MASTER_GAIN',
            payload: mockAudioContext.createGain(),
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_OSC_1_ANALYSER', () => {
        modifiedState = {
            ...initialState,
            oscillators: {
                ...initialState.oscillators,
                osc1: {
                    ...initialState.oscillators.osc1,
                    analyserNode: mockAudioContext.createAnalyser(),
                },
            },
        };
        action = {
            type: 'SET_OSC_1_ANALYSER',
            payload: mockAudioContext.createAnalyser(),
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_OSC_2_ANALYSER', () => {
        modifiedState = {
            ...initialState,
            oscillators: {
                ...initialState.oscillators,
                osc2: {
                    ...initialState.oscillators.osc2,
                    analyserNode: mockAudioContext.createAnalyser(),
                },
            },
        };
        action = {
            type: 'SET_OSC_2_ANALYSER',
            payload: mockAudioContext.createAnalyser(),
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_OSC_SUB_ANALYSER', () => {
        modifiedState = {
            ...initialState,
            oscillators: {
                ...initialState.oscillators,
                oscSub: {
                    ...initialState.oscillators.oscSub,
                    analyserNode: mockAudioContext.createAnalyser(),
                },
            },
        };
        action = {
            type: 'SET_OSC_SUB_ANALYSER',
            payload: mockAudioContext.createAnalyser(),
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_OSC_1_GAIN', () => {
        modifiedState = {
            ...initialState,
            oscillators: {
                ...initialState.oscillators,
                osc1: {
                    ...initialState.oscillators.osc1,
                    gainNode: mockAudioContext.createGain(),
                },
            },
        };
        action = {
            type: 'SET_OSC_1_GAIN',
            payload: mockAudioContext.createGain(),
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_OSC_2_GAIN', () => {
        modifiedState = {
            ...initialState,
            oscillators: {
                ...initialState.oscillators,
                osc2: {
                    ...initialState.oscillators.osc2,
                    gainNode: mockAudioContext.createGain(),
                },
            },
        };
        action = {
            type: 'SET_OSC_2_GAIN',
            payload: mockAudioContext.createGain(),
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_OSC_SUB_GAIN', () => {
        modifiedState = {
            ...initialState,
            oscillators: {
                ...initialState.oscillators,
                oscSub: {
                    ...initialState.oscillators.oscSub,
                    gainNode: mockAudioContext.createGain(),
                },
            },
        };
        action = {
            type: 'SET_OSC_SUB_GAIN',
            payload: mockAudioContext.createGain(),
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_OSC_1_ENABLED', () => {
        modifiedState = {
            ...initialState,
            oscillators: {
                ...initialState.oscillators,
                osc1: {
                    ...initialState.oscillators.osc1,
                    settings: {
                        ...initialState.oscillators.osc1.settings,
                        enabled: true,
                    },
                },
            },
        };
        action = {
            type: 'SET_OSC_1_ENABLED',
            payload: true,
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_OSC_2_ENABLED', () => {
        modifiedState = {
            ...initialState,
            oscillators: {
                ...initialState.oscillators,
                osc2: {
                    ...initialState.oscillators.osc2,
                    settings: {
                        ...initialState.oscillators.osc2.settings,
                        enabled: true,
                    },
                },
            },
        };
        action = {
            type: 'SET_OSC_2_ENABLED',
            payload: true,
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_OSC_SUB_ENABLED', () => {
        modifiedState = {
            ...initialState,
            oscillators: {
                ...initialState.oscillators,
                oscSub: {
                    ...initialState.oscillators.oscSub,
                    settings: {
                        ...initialState.oscillators.oscSub.settings,
                        enabled: true,
                    },
                },
            },
        };
        action = {
            type: 'SET_OSC_SUB_ENABLED',
            payload: true,
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_OSC_1_TYPE', () => {
        modifiedState = {
            ...initialState,
            oscillators: {
                ...initialState.oscillators,
                osc1: {
                    ...initialState.oscillators.osc1,
                    settings: {
                        ...initialState.oscillators.osc1.settings,
                        type: 'triangle',
                    },
                },
            },
        };
        action = {
            type: 'SET_OSC_1_TYPE',
            payload: 'triangle',
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_OSC_2_TYPE', () => {
        modifiedState = {
            ...initialState,
            oscillators: {
                ...initialState.oscillators,
                osc2: {
                    ...initialState.oscillators.osc2,
                    settings: {
                        ...initialState.oscillators.osc2.settings,
                        type: 'square',
                    },
                },
            },
        };
        action = {
            type: 'SET_OSC_2_TYPE',
            payload: 'square',
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_OSC_SUB_TYPE', () => {
        modifiedState = {
            ...initialState,
            oscillators: {
                ...initialState.oscillators,
                oscSub: {
                    ...initialState.oscillators.oscSub,
                    settings: {
                        ...initialState.oscillators.oscSub.settings,
                        type: 'square',
                    },
                },
            },
        };
        action = {
            type: 'SET_OSC_SUB_TYPE',
            payload: 'square',
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_OSC_1_DETUNE', () => {
        modifiedState = {
            ...initialState,
            oscillators: {
                ...initialState.oscillators,
                osc1: {
                    ...initialState.oscillators.osc1,
                    settings: {
                        ...initialState.oscillators.osc1.settings,
                        detune: 400,
                    },
                },
            },
        };
        action = {
            type: 'SET_OSC_1_DETUNE',
            payload: 400,
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_OSC_2_DETUNE', () => {
        modifiedState = {
            ...initialState,
            oscillators: {
                ...initialState.oscillators,
                osc2: {
                    ...initialState.oscillators.osc2,
                    settings: {
                        ...initialState.oscillators.osc2.settings,
                        detune: 400,
                    },
                },
            },
        };
        action = {
            type: 'SET_OSC_2_DETUNE',
            payload: 400,
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_OSC_1_PAN_NODE', () => {
        modifiedState = {
            ...initialState,
            oscillators: {
                ...initialState.oscillators,
                osc1: {
                    ...initialState.oscillators.osc1,
                    panNode: mockAudioContext.createStereoPanner(),
                },
            },
        };
        action = {
            type: 'SET_OSC_1_PAN_NODE',
            payload: mockAudioContext.createStereoPanner(),
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_OSC_2_PAN_NODE', () => {
        modifiedState = {
            ...initialState,
            oscillators: {
                ...initialState.oscillators,
                osc2: {
                    ...initialState.oscillators.osc2,
                    panNode: mockAudioContext.createStereoPanner(),
                },
            },
        };
        action = {
            type: 'SET_OSC_2_PAN_NODE',
            payload: mockAudioContext.createStereoPanner(),
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_OSC_SUB_PAN_NODE', () => {
        modifiedState = {
            ...initialState,
            oscillators: {
                ...initialState.oscillators,
                oscSub: {
                    ...initialState.oscillators.oscSub,
                    panNode: mockAudioContext.createStereoPanner(),
                },
            },
        };
        action = {
            type: 'SET_OSC_SUB_PAN_NODE',
            payload: mockAudioContext.createStereoPanner(),
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_OSC_1_PAN_POSITION', () => {
        modifiedState = {
            ...initialState,
            oscillators: {
                ...initialState.oscillators,
                osc1: {
                    ...initialState.oscillators.osc1,
                    settings: {
                        ...initialState.oscillators.osc1.settings,
                        pan: 1.0,
                    },
                },
            },
        };
        action = {
            type: 'SET_OSC_1_PAN_POSITION',
            payload: 1.0,
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_OSC_2_PAN_POSITION', () => {
        modifiedState = {
            ...initialState,
            oscillators: {
                ...initialState.oscillators,
                osc2: {
                    ...initialState.oscillators.osc2,
                    settings: {
                        ...initialState.oscillators.osc2.settings,
                        pan: 1.0,
                    },
                },
            },
        };
        action = {
            type: 'SET_OSC_2_PAN_POSITION',
            payload: 1.0,
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_OSC_SUB_PAN_POSITION', () => {
        modifiedState = {
            ...initialState,
            oscillators: {
                ...initialState.oscillators,
                oscSub: {
                    ...initialState.oscillators.oscSub,
                    settings: {
                        ...initialState.oscillators.oscSub.settings,
                        pan: 1.0,
                    },
                },
            },
        };
        action = {
            type: 'SET_OSC_SUB_PAN_POSITION',
            payload: 1.0,
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_OSC_1_OCTAVE', () => {
        modifiedState = {
            ...initialState,
            oscillators: {
                ...initialState.oscillators,
                osc1: {
                    ...initialState.oscillators.osc1,
                    settings: {
                        ...initialState.oscillators.osc1.settings,
                        octave: 1.0,
                    },
                },
            },
        };
        action = {
            type: 'SET_OSC_1_OCTAVE',
            payload: 1.0,
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_OSC_2_OCTAVE', () => {
        modifiedState = {
            ...initialState,
            oscillators: {
                ...initialState.oscillators,
                osc2: {
                    ...initialState.oscillators.osc2,
                    settings: {
                        ...initialState.oscillators.osc2.settings,
                        octave: 1.0,
                    },
                },
            },
        };
        action = {
            type: 'SET_OSC_2_OCTAVE',
            payload: 1.0,
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_OSC_SUB_OCTAVE', () => {
        modifiedState = {
            ...initialState,
            oscillators: {
                ...initialState.oscillators,
                oscSub: {
                    ...initialState.oscillators.oscSub,
                    settings: {
                        ...initialState.oscillators.oscSub.settings,
                        octave: 1.0,
                    },
                },
            },
        };
        action = {
            type: 'SET_OSC_SUB_OCTAVE',
            payload: 1.0,
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('returns same state with invalid action', () => {
        action = {
            // @ts-expect-error
            type: 'INVALID_ACTION',
            payload: 1.0,
        };
        expect(studioServiceReducer(initialState, action)).toEqual(initialState);
    });
});
