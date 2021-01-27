import { StudioServiceAction, StudioService } from '../../types/types';

export const studioServiceReducer = (state: StudioService, action: StudioServiceAction): StudioService => {
    switch (action.type) {
        case 'SET_MASTER_VOLUME':
            return {
                ...state,
                volume: {
                    ...state.volume,
                    master: action.payload,
                },
            };

        case 'SET_OSC_1_VOLUME':
            return {
                ...state,
                volume: {
                    ...state.volume,
                    osc1: action.payload,
                },
            };

        case 'SET_OSC_2_VOLUME':
            return {
                ...state,
                volume: {
                    ...state.volume,
                    osc2: action.payload,
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

        case 'SET_OSC_1_GAIN':
            return {
                ...state,
                gainNodes: {
                    ...state.gainNodes,
                    osc1: action.payload,
                },
            };

        case 'SET_OSC_2_GAIN':
            return {
                ...state,
                gainNodes: {
                    ...state.gainNodes,
                    osc2: action.payload,
                },
            };

        case 'SET_OSC_1_ENABLED':
            return {
                ...state,
                oscillatorNodes: {
                    ...state.oscillatorNodes,
                    osc1: {
                        ...state.oscillatorNodes.osc1,
                        enabled: action.payload,
                    },
                },
            };

        case 'SET_OSC_2_ENABLED':
            return {
                ...state,
                oscillatorNodes: {
                    ...state.oscillatorNodes,
                    osc2: {
                        ...state.oscillatorNodes.osc2,
                        enabled: action.payload,
                    },
                },
            };

        default:
            return state;
    }
};
