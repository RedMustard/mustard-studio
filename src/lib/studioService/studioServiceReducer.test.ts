import { studioServiceReducer } from './studioServiceReducer';
import { GenericAction, StudioService } from '../../types/types';

describe('studioServiceReducer', () => {
    let initialState: StudioService;
    let modifiedState: StudioService;
    let action: GenericAction;

    beforeAll(() => {
        initialState = {
            volume: {
                master: 0.1,
                oscillator1: 0.5,
                oscillator2: 0.5,
            },
        };
    });

    it('SET_MASTER_VOLUME', () => {
        modifiedState = {
            volume: {
                master: 1.0,
                oscillator1: 0.5,
                oscillator2: 0.5,
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
            volume: {
                master: 0.1,
                oscillator1: 1.0,
                oscillator2: 0.5,
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
            volume: {
                master: 0.1,
                oscillator1: 0.5,
                oscillator2: 1.0,
            },
        };
        action = {
            type: 'SET_OSCILLATOR_2_VOLUME',
            payload: 1.0,
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
