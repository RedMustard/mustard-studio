import { createContext, h } from 'preact';
import { useReducer } from 'preact/hooks';
import { StudioService } from '../../types/types';
import { deepClone } from '../utils/objects/objects';
import { studioServiceReducer } from './studioServiceReducer';


const initialState: StudioService = Object.freeze({
    volume: {
        master: 0.1,
        oscillator1: 0.5,
        oscillator2: 0.5,
    },
});

const getInitialState = () => deepClone(initialState);

export const StudioServiceStore = ({ children }: any) => {
    const [state, dispatch]: [StudioService, any] = useReducer(studioServiceReducer, getInitialState());

    return (
        <StudioServiceContext.Provider value={[state, dispatch]}>
            {children}
        </StudioServiceContext.Provider>
    );
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const StudioServiceContext = createContext<[StudioService, Function]>([getInitialState(), () => {}]);

// Todo: Remove/move?
// eslint-disable-next-line @typescript-eslint/naming-convention
// export const Audio = createContext<[AudioContext, Function]>([new window.AudioContext(), () => {}]);
