import { createContext, h } from 'preact';
import { useReducer } from 'preact/hooks';
import { OSC_1_INITIAL_SETTINGS, OSC_2_INITIAL_SETTINGS, OSC_SUB_INITIAL_SETTINGS } from '../../constants';
import { DispatchFunction, StudioService } from '../../types/types';
import { deepClone } from '../utils/objects/objects';
import { studioServiceReducer } from './studioServiceReducer';


const initialState: StudioService = Object.freeze({
    master: {
        gainNode: undefined,
        panNode: undefined,
        settings: {
            volume: 0.1,
            pan: 0,
        },
    },
    oscillators: {
        osc1: {
            gainNode: undefined,
            panNode: undefined,
            settings: {
                ...OSC_1_INITIAL_SETTINGS,
            },
        },
        osc2: {
            gainNode: undefined,
            panNode: undefined,
            settings: {
                ...OSC_2_INITIAL_SETTINGS,
            },
        },
        oscSub: {
            gainNode: undefined,
            panNode: undefined,
            settings: {
                ...OSC_SUB_INITIAL_SETTINGS,
            },
        },
    },
});

export const getInitialState = () => deepClone(initialState);

export const StudioServiceContext = createContext<[StudioService, DispatchFunction]>([getInitialState(), () => {}]);

export const StudioServiceStore = ({ children }: any) => {
    const [state, dispatch]: [StudioService, DispatchFunction] = useReducer(studioServiceReducer, getInitialState());

    return (
        <StudioServiceContext.Provider value={[state, dispatch]}>
            {children}
        </StudioServiceContext.Provider>
    );
};
