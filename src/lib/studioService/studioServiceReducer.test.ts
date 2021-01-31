import { studioServiceReducer } from './studioServiceReducer';
import { StudioServiceAction, StudioService } from '../../types/types';
import { getInitialState } from './StudioServiceStore';


// eslint-disable-next-line import/newline-after-import
const wamock = require('web-audio-mock-api');
const audioContext = new wamock.AudioContext();
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
            panNodes: {
                ...initialState.panNodes,
                master: audioContext.createStereoPanner(),
            },
        };
        action = {
            type: 'SET_MASTER_PAN_NODE',
            payload: audioContext.createStereoPanner(),
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_MASTER_PAN_POSITION', () => {
        modifiedState = {
            ...initialState,
            settings: {
                ...initialState.settings,
                master: {
                    ...initialState.settings.master,
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
            settings: {
                ...initialState.settings,
                master: {
                    ...initialState.settings.master,
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
            settings: {
                ...initialState.settings,
                osc1: {
                    ...initialState.settings.osc1,
                    volume: 1.0,
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
            settings: {
                ...initialState.settings,
                osc2: {
                    ...initialState.settings.osc2,
                    volume: 1.0,
                },
            },
        };
        action = {
            type: 'SET_OSC_2_VOLUME',
            payload: 1.0,
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_MASTER_GAIN', () => {
        modifiedState = {
            ...initialState,
            gainNodes: {
                ...initialState.gainNodes,
                master: audioContext.createGain(),
            },
        };
        action = {
            type: 'SET_MASTER_GAIN',
            payload: audioContext.createGain(),
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_OSC_1_GAIN', () => {
        modifiedState = {
            ...initialState,
            gainNodes: {
                ...initialState.gainNodes,
                osc1: audioContext.createGain(),
            },
        };
        action = {
            type: 'SET_OSC_1_GAIN',
            payload: audioContext.createGain(),
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_OSC_2_GAIN', () => {
        modifiedState = {
            ...initialState,
            gainNodes: {
                ...initialState.gainNodes,
                osc2: audioContext.createGain(),
            },
        };
        action = {
            type: 'SET_OSC_2_GAIN',
            payload: audioContext.createGain(),
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_OSC_1_ENABLED', () => {
        modifiedState = {
            ...initialState,
            settings: {
                ...initialState.settings,
                osc1: {
                    ...initialState.settings.osc1,
                    enabled: true,
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
            settings: {
                ...initialState.settings,
                osc2: {
                    ...initialState.settings.osc2,
                    enabled: true,
                },
            },
        };
        action = {
            type: 'SET_OSC_2_ENABLED',
            payload: true,
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_OSC_1_TYPE', () => {
        modifiedState = {
            ...initialState,
            settings: {
                ...initialState.settings,
                osc1: {
                    ...initialState.settings.osc1,
                    type: 'triangle',
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
            settings: {
                ...initialState.settings,
                osc2: {
                    ...initialState.settings.osc2,
                    type: 'square',
                },
            },
        };
        action = {
            type: 'SET_OSC_2_TYPE',
            payload: 'square',
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_OSC_1_DETUNE', () => {
        modifiedState = {
            ...initialState,
            settings: {
                ...initialState.settings,
                osc1: {
                    ...initialState.settings.osc1,
                    detune: 400,
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
            settings: {
                ...initialState.settings,
                osc2: {
                    ...initialState.settings.osc2,
                    detune: 400,
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
            panNodes: {
                ...initialState.panNodes,
                osc1: audioContext.createStereoPanner(),
            },
        };
        action = {
            type: 'SET_OSC_1_PAN_NODE',
            payload: audioContext.createStereoPanner(),
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_OSC_2_PAN_NODE', () => {
        modifiedState = {
            ...initialState,
            panNodes: {
                ...initialState.panNodes,
                osc2: audioContext.createStereoPanner(),
            },
        };
        action = {
            type: 'SET_OSC_2_PAN_NODE',
            payload: audioContext.createStereoPanner(),
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_OSC_1_PAN_POSITION', () => {
        modifiedState = {
            ...initialState,
            settings: {
                ...initialState.settings,
                osc1: {
                    ...initialState.settings.osc1,
                    pan: 1.0,
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
            settings: {
                ...initialState.settings,
                osc2: {
                    ...initialState.settings.osc2,
                    pan: 1.0,
                },
            },
        };
        action = {
            type: 'SET_OSC_2_PAN_POSITION',
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
