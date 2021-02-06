import { createContext, h } from 'preact';
import { useReducer } from 'preact/hooks';
import { DispatchFunction, StudioService } from '../../types/types';
import { deepClone } from '../utils/objects/objects';
import { studioServiceReducer } from './studioServiceReducer';


const initialState: StudioService = Object.freeze({
    settings: {
        master: {
            volume: 0.1,
            pan: 0,
        },
        osc1: {
            detune: 0,
            enabled: true,
            octave: 0,
            pan: 0,
            type: 'sine',
            volume: 0.5,
        },
        osc2: {
            detune: 0,
            enabled: true,
            octave: 0,
            pan: 0,
            type: 'sine',
            volume: 0.5,
        },
        oscSub: {
            enabled: true,
            octave: -1,
            pan: 0,
            type: 'sine',
            volume: 0.5,
        },
    },
    gainNodes: {
        master: undefined,
        osc1: undefined,
        osc2: undefined,
        oscSub: undefined,
    },
    panNodes: {
        master: undefined,
        osc1: undefined,
        osc2: undefined,
        oscSub: undefined,
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
