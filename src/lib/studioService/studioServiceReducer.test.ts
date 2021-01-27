import { studioServiceReducer } from './studioServiceReducer';
import { StudioServiceAction, StudioService } from '../../types/types';
import { getInitialState } from './StudioServiceStore';

const wamock = require('web-audio-mock-api');

const audioContext = new wamock.AudioContext();

describe('studioServiceReducer', () => {
    let initialState: StudioService;
    let modifiedState: StudioService;
    let action: StudioServiceAction;

    beforeAll(() => {
        initialState = getInitialState();
    });

    it('SET_MASTER_VOLUME', () => {
        modifiedState = {
            ...initialState,
            volume: {
                ...initialState.volume,
                master: 1.0,
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
            volume: {
                ...initialState.volume,
                osc1: 1.0,
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
            volume: {
                ...initialState.volume,
                osc2: 1.0,
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

    it('returns same state with invalid action', () => {
        action = {
            // @ts-expect-error
            type: 'INVALID_ACTION',
            payload: 1.0,
        };
        expect(studioServiceReducer(initialState, action)).toEqual(initialState);
    });
});
