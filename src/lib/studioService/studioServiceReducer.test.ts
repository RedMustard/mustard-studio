import { studioServiceReducer } from './studioServiceReducer';
import { GenericAction, StudioService } from '../../types/types';
import { getInitialState } from './StudioServiceStore';

const wamock = require('web-audio-mock-api');

const audioContext = new wamock.AudioContext();

describe('studioServiceReducer', () => {
    let initialState: StudioService;
    let modifiedState: StudioService;
    let action: GenericAction;

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

    it('SET_OSCILLATOR_1_VOLUME', () => {
        modifiedState = {
            ...initialState,
            volume: {
                ...initialState.volume,
                oscillator1: 1.0,
            },
        };
        action = {
            type: 'SET_OSCILLATOR_1_VOLUME',
            payload: 1.0,
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_OSCILLATOR_2_VOLUME', () => {
        modifiedState = {
            ...initialState,
            volume: {
                ...initialState.volume,
                oscillator2: 1.0,
            },
        };
        action = {
            type: 'SET_OSCILLATOR_2_VOLUME',
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

    it('SET_OSCILLATOR_1_GAIN', () => {
        modifiedState = {
            ...initialState,
            gainNodes: {
                ...initialState.gainNodes,
                oscillator1: audioContext.createGain(),
            },
        };
        action = {
            type: 'SET_OSCILLATOR_1_GAIN',
            payload: audioContext.createGain(),
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('SET_OSCILLATOR_2_GAIN', () => {
        modifiedState = {
            ...initialState,
            gainNodes: {
                ...initialState.gainNodes,
                oscillator2: audioContext.createGain(),
            },
        };
        action = {
            type: 'SET_OSCILLATOR_2_GAIN',
            payload: audioContext.createGain(),
        };
        expect(studioServiceReducer(initialState, action)).toEqual(modifiedState);
    });

    it('returns same state with invalid action', () => {
        action = {
            type: 'INVALID_ACTION',
            payload: 1.0,
        };
        expect(studioServiceReducer(initialState, action)).toEqual(initialState);
    });
});
