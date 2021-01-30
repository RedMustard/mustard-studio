import { getAudioContext, setAudioContext, resetAudioContext } from './audioContext';


describe('setAudioContext', () => {
    it('constructs and sets new AudioContext', () => {
        global.AudioContext = jest.fn();
        setAudioContext();
        expect(getAudioContext()).not.toBe(undefined);
    });
});

describe('resetAudioContext', () => {
    it('resets AudioContext', () => {
        global.AudioContext = jest.fn();
        setAudioContext();
        resetAudioContext();
        expect(getAudioContext()).toBe(undefined);
    });
});
