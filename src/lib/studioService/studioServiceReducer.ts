import { GenericAction, StudioService } from '../../types/types';

export const studioServiceReducer = (state: StudioService, action: GenericAction) => {
    switch (action.type) {
        case 'SET_MASTER_VOLUME':
            return {
                ...state,
                volume: {
                    ...state.volume,
                    master: action.payload,
                },
            };

        case 'SET_OSCILLATOR_1_VOLUME':
            return {
                ...state,
                volume: {
                    ...state.volume,
                    oscillator1: action.payload,
                },
            };

        case 'SET_OSCILLATOR_2_VOLUME':
            return {
                ...state,
                volume: {
                    ...state.volume,
                    oscillator2: action.payload,
                },
            };

        case 'SET_MASTER_GAIN':
            return {
                ...state,
                gainNodes: {
                    ...state.gainNodes,
                    master: action.payload,
                },
            };

        case 'SET_OSCILLATOR_1_GAIN':
            return {
                ...state,
                gainNodes: {
                    ...state.gainNodes,
                    oscillator1: action.payload,
                },
            };

        case 'SET_OSCILLATOR_2_GAIN':
            return {
                ...state,
                gainNodes: {
                    ...state.gainNodes,
                    oscillator2: action.payload,
                },
            };

        default:
            return state;
    }
};
