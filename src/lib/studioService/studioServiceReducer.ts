import { StudioServiceAction, StudioService } from '../../types/types';

export const studioServiceReducer = (state: StudioService, action: StudioServiceAction): StudioService => {
    switch (action.type) {
        case 'SET_MASTER_VOLUME':
            return {
                ...state,
                settings: {
                    ...state.settings,
                    master: {
                        ...state.settings.master,
                        volume: action.payload,
                    },
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

        case 'SET_MASTER_PAN_NODE':
            return {
                ...state,
                panNodes: {
                    ...state.panNodes,
                    master: action.payload,
                },
            };

        case 'SET_MASTER_PAN_POSITION':
            return {
                ...state,
                settings: {
                    ...state.settings,
                    master: {
                        ...state.settings.master,
                        pan: action.payload,
                    },
                },
            };

        case 'SET_OSC_1_VOLUME':
            return {
                ...state,
                settings: {
                    ...state.settings,
                    osc1: {
                        ...state.settings.osc1,
                        volume: action.payload,
                    },
                },
            };

        case 'SET_OSC_2_VOLUME':
            return {
                ...state,
                settings: {
                    ...state.settings,
                    osc2: {
                        ...state.settings.osc2,
                        volume: action.payload,
                    },
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
                settings: {
                    ...state.settings,
                    osc1: {
                        ...state.settings.osc1,
                        enabled: action.payload,
                    },
                },
            };

        case 'SET_OSC_2_ENABLED':
            return {
                ...state,
                settings: {
                    ...state.settings,
                    osc2: {
                        ...state.settings.osc2,
                        enabled: action.payload,
                    },
                },
            };

        case 'SET_OSC_1_TYPE':
            return {
                ...state,
                settings: {
                    ...state.settings,
                    osc1: {
                        ...state.settings.osc1,
                        type: action.payload,
                    },
                },
            };

        case 'SET_OSC_2_TYPE':
            return {
                ...state,
                settings: {
                    ...state.settings,
                    osc2: {
                        ...state.settings.osc2,
                        type: action.payload,
                    },
                },
            };

        case 'SET_OSC_1_DETUNE':
            return {
                ...state,
                settings: {
                    ...state.settings,
                    osc1: {
                        ...state.settings.osc1,
                        detune: action.payload,
                    },
                },
            };

        case 'SET_OSC_2_DETUNE':
            return {
                ...state,
                settings: {
                    ...state.settings,
                    osc2: {
                        ...state.settings.osc2,
                        detune: action.payload,
                    },
                },
            };

        case 'SET_OSC_1_PAN_NODE':
            return {
                ...state,
                panNodes: {
                    ...state.panNodes,
                    osc1: action.payload,
                },
            };

        case 'SET_OSC_2_PAN_NODE':
            return {
                ...state,
                panNodes: {
                    ...state.panNodes,
                    osc2: action.payload,
                },
            };

        case 'SET_OSC_1_PAN_POSITION':
            return {
                ...state,
                settings: {
                    ...state.settings,
                    osc1: {
                        ...state.settings.osc1,
                        pan: action.payload,
                    },
                },
            };

        case 'SET_OSC_2_PAN_POSITION':
            return {
                ...state,
                settings: {
                    ...state.settings,
                    osc2: {
                        ...state.settings.osc2,
                        pan: action.payload,
                    },
                },
            };

        default:
            return state;
    }
};
