export type KeyboardKeyCount = 88 | 61 | 49 | 37 | 25;
export type KeyboardKeyColor = 'white' | 'black';
export type Octave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type StudioService = {
    volume: {
        master: number;
        oscillator1: number;
        oscillator2: number;
    },
    gainNodes: {
        master: GainNode,
        oscillator1: GainNode,
        oscillator2: GainNode,
    },
};
export interface GenericAction {
    type: string;
    payload: any;
}
