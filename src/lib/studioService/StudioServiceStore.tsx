import { createContext, h } from 'preact';
import { useReducer } from 'preact/hooks';
import { DispatchFunction, StudioService } from '../../types/types';
import { deepClone } from '../utils/objects/objects';
import { studioServiceReducer } from './studioServiceReducer';


const initialState: StudioService = Object.freeze({
    volume: {
        master: 0.1,
        osc1: 0.5,
        osc2: 0.5,
    },
    gainNodes: {
        master: undefined,
        osc1: undefined,
        osc2: undefined,
    },
    oscillatorNodes: {
        osc1: {
            enabled: true,
            type: 'sine',
        },
        osc2: {
            enabled: false,
            type: 'sawtooth',
        },
    },
});

export const getInitialState = () => deepClone(initialState);

export const StudioServiceContext = createContext<[StudioService, DispatchFunction]>([getInitialState(), () => {}]);

export const StudioServiceStore = ({ children }: any) => {
    const [state, dispatch]: [StudioService, any] = useReducer(studioServiceReducer, getInitialState());

    return (
        <StudioServiceContext.Provider value={[state, dispatch]}>
            {children}
        </StudioServiceContext.Provider>
    );
};


// Todo: Remove/move?
// eslint-disable-next-line @typescript-eslint/naming-convention
// export const Audio = createContext<[AudioContext, Function]>([new window.AudioContext(), () => {}]);
