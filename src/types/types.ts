export type KeyboardKeyCount = 88 | 61 | 49 | 37 | 25;
export type KeyboardKeyColor = 'white' | 'black';

export type StudioService = {
    volume: {
        master: number;
        oscillator1: number;
        oscillator2: number;
    },
};
export interface GenericAction {
    type: string;
    payload: any;
}
