import { OscillatorIdEnum } from '../../types/runtimeTypes';
import { StudioServiceAction, StudioService } from '../../types/types';
import {
    setOscillatorGainNodeByOscillatorId,
    setOscillatorSettingsByOscillatorId,
    setOscillatorPanNodeByOscillatorId,
    setOscillatorAnalyserNodeByOscillatorId,
} from '../oscillators/oscillators';

export const studioServiceReducer = (state: StudioService, action: StudioServiceAction): StudioService => {
    let newState: StudioService;

    switch (action.type) {
        case 'SET_MASTER_VOLUME':
            newState = {
                ...state,
                master: {
                    ...state.master,
                    settings: {
                        ...state.master.settings,
                        volume: action.payload,
                    },
                },
            };
            break;

        case 'SET_MASTER_GAIN':
            newState = {
                ...state,
                master: {
                    ...state.master,
                    gainNode: action.payload,
                },
            };
            break;

        case 'SET_MASTER_PAN_NODE':
            newState = {
                ...state,
                master: {
                    ...state.master,
                    panNode: action.payload,
                },
            };
            break;

        case 'SET_MASTER_PAN_POSITION':
            newState = {
                ...state,
                master: {
                    ...state.master,
                    settings: {
                        ...state.master.settings,
                        pan: action.payload,
                    },

                },
            };
            break;

        case 'SET_ENVELOPE_ATTACK':
            newState = {
                ...state,
                envelope: {
                    ...state.envelope,
                    attack: action.payload,
                },
            };
            break;

        case 'SET_ENVELOPE_DECAY':
            newState = {
                ...state,
                envelope: {
                    ...state.envelope,
                    decay: action.payload,
                },
            };
            break;

        case 'SET_ENVELOPE_SUSTAIN':
            newState = {
                ...state,
                envelope: {
                    ...state.envelope,
                    sustain: action.payload,
                },
            };
            break;

        case 'SET_ENVELOPE_RELEASE':
            newState = {
                ...state,
                envelope: {
                    ...state.envelope,
                    release: action.payload,
                },
            };
            break;

        case 'SET_OSC_1_VOLUME':
            newState = {
                ...state,
                oscillators: {
                    ...state.oscillators,
                    osc1: {
                        ...state.oscillators.osc1,
                        settings: {
                            ...state.oscillators.osc1.settings,
                            volume: action.payload,
                        },
                    },
                },
            };
            setOscillatorSettingsByOscillatorId(OscillatorIdEnum.OSC_1, newState.oscillators.osc1.settings);
            break;

        case 'SET_OSC_2_VOLUME':
            newState = {
                ...state,
                oscillators: {
                    ...state.oscillators,
                    osc2: {
                        ...state.oscillators.osc2,
                        settings: {
                            ...state.oscillators.osc2.settings,
                            volume: action.payload,
                        },
                    },
                },
            };
            setOscillatorSettingsByOscillatorId(OscillatorIdEnum.OSC_2, newState.oscillators.osc2.settings);
            break;

        case 'SET_OSC_SUB_VOLUME':
            newState = {
                ...state,
                oscillators: {
                    ...state.oscillators,
                    oscSub: {
                        ...state.oscillators.oscSub,
                        settings: {
                            ...state.oscillators.oscSub.settings,
                            volume: action.payload,
                        },
                    },
                },
            };
            setOscillatorSettingsByOscillatorId(OscillatorIdEnum.OSC_SUB, newState.oscillators.oscSub.settings);
            break;

        case 'SET_OSC_1_ANALYSER':
            newState = {
                ...state,
                oscillators: {
                    ...state.oscillators,
                    osc1: {
                        ...state.oscillators.osc1,
                        analyserNode: action.payload,
                    },
                },
            };
            setOscillatorAnalyserNodeByOscillatorId(OscillatorIdEnum.OSC_1, newState.oscillators.osc1.analyserNode);
            break;

        case 'SET_OSC_2_ANALYSER':
            newState = {
                ...state,
                oscillators: {
                    ...state.oscillators,
                    osc2: {
                        ...state.oscillators.osc2,
                        analyserNode: action.payload,
                    },
                },
            };
            setOscillatorAnalyserNodeByOscillatorId(OscillatorIdEnum.OSC_2, newState.oscillators.osc2.analyserNode);
            break;

        case 'SET_OSC_SUB_ANALYSER':
            newState = {
                ...state,
                oscillators: {
                    ...state.oscillators,
                    oscSub: {
                        ...state.oscillators.oscSub,
                        analyserNode: action.payload,
                    },
                },
            };
            setOscillatorAnalyserNodeByOscillatorId(OscillatorIdEnum.OSC_SUB, newState.oscillators.oscSub.analyserNode);
            break;

        case 'SET_OSC_1_GAIN':
            newState = {
                ...state,
                oscillators: {
                    ...state.oscillators,
                    osc1: {
                        ...state.oscillators.osc1,
                        gainNode: action.payload,
                    },
                },
            };
            setOscillatorGainNodeByOscillatorId(OscillatorIdEnum.OSC_1, newState.oscillators.osc1.gainNode);
            break;

        case 'SET_OSC_2_GAIN':
            newState = {
                ...state,
                oscillators: {
                    ...state.oscillators,
                    osc2: {
                        ...state.oscillators.osc2,
                        gainNode: action.payload,
                    },
                },
            };
            setOscillatorGainNodeByOscillatorId(OscillatorIdEnum.OSC_2, newState.oscillators.osc2.gainNode);
            break;

        case 'SET_OSC_SUB_GAIN':
            newState = {
                ...state,
                oscillators: {
                    ...state.oscillators,
                    oscSub: {
                        ...state.oscillators.oscSub,
                        gainNode: action.payload,
                    },
                },
            };
            setOscillatorGainNodeByOscillatorId(OscillatorIdEnum.OSC_SUB, newState.oscillators.oscSub.gainNode);
            break;

        case 'SET_OSC_1_ENABLED':
            newState = {
                ...state,
                oscillators: {
                    ...state.oscillators,
                    osc1: {
                        ...state.oscillators.osc1,
                        settings: {
                            ...state.oscillators.osc1.settings,
                            enabled: action.payload,
                        },
                    },
                },
            };
            setOscillatorSettingsByOscillatorId(OscillatorIdEnum.OSC_1, newState.oscillators.osc1.settings);
            break;

        case 'SET_OSC_2_ENABLED':
            newState = {
                ...state,
                oscillators: {
                    ...state.oscillators,
                    osc2: {
                        ...state.oscillators.osc2,
                        settings: {
                            ...state.oscillators.osc2.settings,
                            enabled: action.payload,
                        },
                    },
                },
            };
            setOscillatorSettingsByOscillatorId(OscillatorIdEnum.OSC_2, newState.oscillators.osc2.settings);
            break;

        case 'SET_OSC_SUB_ENABLED':
            newState = {
                ...state,
                oscillators: {
                    ...state.oscillators,
                    oscSub: {
                        ...state.oscillators.oscSub,
                        settings: {
                            ...state.oscillators.oscSub.settings,
                            enabled: action.payload,
                        },
                    },
                },
            };
            setOscillatorSettingsByOscillatorId(OscillatorIdEnum.OSC_SUB, newState.oscillators.oscSub.settings);
            break;

        case 'SET_OSC_1_TYPE':
            newState = {
                ...state,
                oscillators: {
                    ...state.oscillators,
                    osc1: {
                        ...state.oscillators.osc1,
                        settings: {
                            ...state.oscillators.osc1.settings,
                            type: action.payload,
                        },
                    },
                },
            };
            setOscillatorSettingsByOscillatorId(OscillatorIdEnum.OSC_1, newState.oscillators.osc1.settings);
            break;

        case 'SET_OSC_2_TYPE':
            newState = {
                ...state,
                oscillators: {
                    ...state.oscillators,
                    osc2: {
                        ...state.oscillators.osc2,
                        settings: {
                            ...state.oscillators.osc2.settings,
                            type: action.payload,
                        },
                    },
                },
            };
            setOscillatorSettingsByOscillatorId(OscillatorIdEnum.OSC_2, newState.oscillators.osc2.settings);
            break;

        case 'SET_OSC_SUB_TYPE':
            newState = {
                ...state,
                oscillators: {
                    ...state.oscillators,
                    oscSub: {
                        ...state.oscillators.oscSub,
                        settings: {
                            ...state.oscillators.oscSub.settings,
                            type: action.payload,
                        },
                    },
                },
            };
            setOscillatorSettingsByOscillatorId(OscillatorIdEnum.OSC_SUB, newState.oscillators.oscSub.settings);
            break;

        case 'SET_OSC_1_DETUNE':
            newState = {
                ...state,
                oscillators: {
                    ...state.oscillators,
                    osc1: {
                        ...state.oscillators.osc1,
                        settings: {
                            ...state.oscillators.osc1.settings,
                            detune: action.payload,
                        },
                    },
                },
            };
            setOscillatorSettingsByOscillatorId(OscillatorIdEnum.OSC_1, newState.oscillators.osc1.settings);
            break;

        case 'SET_OSC_2_DETUNE':
            newState = {
                ...state,
                oscillators: {
                    ...state.oscillators,
                    osc2: {
                        ...state.oscillators.osc2,
                        settings: {
                            ...state.oscillators.osc2.settings,
                            detune: action.payload,
                        },
                    },
                },
            };
            setOscillatorSettingsByOscillatorId(OscillatorIdEnum.OSC_2, newState.oscillators.osc2.settings);
            break;

        case 'SET_OSC_1_PAN_NODE':
            newState = {
                ...state,
                oscillators: {
                    ...state.oscillators,
                    osc1: {
                        ...state.oscillators.osc1,
                        panNode: action.payload,
                    },
                },
            };
            setOscillatorPanNodeByOscillatorId(OscillatorIdEnum.OSC_1, newState.oscillators.osc1.panNode);
            break;

        case 'SET_OSC_2_PAN_NODE':
            newState = {
                ...state,
                oscillators: {
                    ...state.oscillators,
                    osc2: {
                        ...state.oscillators.osc2,
                        panNode: action.payload,
                    },
                },
            };
            setOscillatorPanNodeByOscillatorId(OscillatorIdEnum.OSC_2, newState.oscillators.osc2.panNode);
            break;

        case 'SET_OSC_SUB_PAN_NODE':
            newState = {
                ...state,
                oscillators: {
                    ...state.oscillators,
                    oscSub: {
                        ...state.oscillators.oscSub,
                        panNode: action.payload,
                    },
                },
            };
            setOscillatorPanNodeByOscillatorId(OscillatorIdEnum.OSC_SUB, newState.oscillators.oscSub.panNode);
            break;

        case 'SET_OSC_1_PAN_POSITION':
            newState = {
                ...state,
                oscillators: {
                    ...state.oscillators,
                    osc1: {
                        ...state.oscillators.osc1,
                        settings: {
                            ...state.oscillators.osc1.settings,
                            pan: action.payload,
                        },
                    },
                },
            };
            setOscillatorSettingsByOscillatorId(OscillatorIdEnum.OSC_1, newState.oscillators.osc1.settings);

            break;

        case 'SET_OSC_2_PAN_POSITION':
            newState = {
                ...state,
                oscillators: {
                    ...state.oscillators,
                    osc2: {
                        ...state.oscillators.osc2,
                        settings: {
                            ...state.oscillators.osc2.settings,
                            pan: action.payload,
                        },
                    },
                },
            };
            setOscillatorSettingsByOscillatorId(OscillatorIdEnum.OSC_2, newState.oscillators.osc2.settings);
            break;

        case 'SET_OSC_SUB_PAN_POSITION':
            newState = {
                ...state,
                oscillators: {
                    ...state.oscillators,
                    oscSub: {
                        ...state.oscillators.oscSub,
                        settings: {
                            ...state.oscillators.oscSub.settings,
                            pan: action.payload,
                        },
                    },
                },
            };
            setOscillatorSettingsByOscillatorId(OscillatorIdEnum.OSC_SUB, newState.oscillators.oscSub.settings);
            break;

        case 'SET_OSC_1_OCTAVE':
            newState = {
                ...state,
                oscillators: {
                    ...state.oscillators,
                    osc1: {
                        ...state.oscillators.osc1,
                        settings: {
                            ...state.oscillators.osc1.settings,
                            octave: action.payload,
                        },
                    },
                },
            };
            setOscillatorSettingsByOscillatorId(OscillatorIdEnum.OSC_1, newState.oscillators.osc1.settings);
            break;

        case 'SET_OSC_2_OCTAVE':
            newState = {
                ...state,
                oscillators: {
                    ...state.oscillators,
                    osc2: {
                        ...state.oscillators.osc2,
                        settings: {
                            ...state.oscillators.osc2.settings,
                            octave: action.payload,
                        },
                    },
                },
            };
            setOscillatorSettingsByOscillatorId(OscillatorIdEnum.OSC_2, newState.oscillators.osc2.settings);
            break;

        case 'SET_OSC_SUB_OCTAVE':
            newState = {
                ...state,
                oscillators: {
                    ...state.oscillators,
                    oscSub: {
                        ...state.oscillators.oscSub,
                        settings: {
                            ...state.oscillators.oscSub.settings,
                            octave: action.payload,
                        },
                    },
                },
            };
            setOscillatorSettingsByOscillatorId(OscillatorIdEnum.OSC_SUB, newState.oscillators.oscSub.settings);
            break;

        default:
            newState = state;
            break;
    }
    return newState;
};
