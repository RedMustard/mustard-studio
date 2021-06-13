import * as oscillators from '../../oscillators/oscillators';
import * as audio from '../../utils/audio/audio';
import { startOscillators, stopOscillatorByFrequency } from '../../oscillators/oscillators';
import { getFrequencyByKeyNumber } from '../../utils/audio/audio';
import { logger } from '../../utils/logger/logger';
import { setKeyboardAccess } from './keyboard';
import { PIANO_OCTAVE_KEY_COUNT } from '../../../constants';

jest.mock('../../utils/logger/logger');


describe('setKeyboardAccess', () => {
    let events: any = {};

    beforeEach(() => {
        jest.resetAllMocks();
        jest.spyOn(oscillators, 'startOscillators').mockImplementation(() => jest.fn());
        jest.spyOn(oscillators, 'stopOscillatorByFrequency').mockImplementation(() => jest.fn());
        jest.spyOn(audio, 'getFrequencyByKeyNumber').mockImplementation((keyNumber: number) => keyNumber);
        events = {};
        window.addEventListener = jest.fn(((event, cb) => {
            events[event] = cb;
        }));
    });

    it('Sets keyboard access and adds event listeners', () => {
        window.addEventListener = jest.fn();
        setKeyboardAccess();
        expect(logger.info).toHaveBeenCalledWith('Keyboard access enabled');
        expect(window.addEventListener).toBeCalledTimes(2);
    });

    it('Starts oscillators on expected keyboard key down', () => {
        const keyboardKey = 'a';
        setKeyboardAccess();
        events.keydown({ key: keyboardKey });
        expect(startOscillators).toBeCalledTimes(1);
    });

    it('Stops oscillators on uppercase expected keyboard key down', () => {
        const keyboardKey = 'A';
        setKeyboardAccess();
        events.keydown({ key: keyboardKey });
        expect(startOscillators).toBeCalledTimes(1);
    });

    it('Stops oscillators on expected keyboard key up', () => {
        const keyboardKey = 'a';
        setKeyboardAccess();
        events.keyup({ key: keyboardKey });
        expect(stopOscillatorByFrequency).toBeCalledTimes(1);
    });

    it('Stops oscillators on uppercase expected keyboard key up', () => {
        const mappedKey = 'A';
        setKeyboardAccess();
        events.keyup({ key: mappedKey });
        expect(stopOscillatorByFrequency).toBeCalledTimes(1);
    });

    it('Increases octave when "x" is pressed', () => {
        const keyboardKey = 'a';
        const octaveIncreaseKey = 'x';
        const startingKeyNumber = 52;
        const increasedKeyNumber = startingKeyNumber + PIANO_OCTAVE_KEY_COUNT;

        setKeyboardAccess();
        events.keydown({ key: keyboardKey });
        expect(getFrequencyByKeyNumber).toHaveBeenCalledWith(startingKeyNumber);
        events.keydown({ key: octaveIncreaseKey });
        events.keydown({ key: keyboardKey });
        expect(getFrequencyByKeyNumber).toHaveBeenCalledWith(increasedKeyNumber);
    });

    it('Decreases octave when "z" is pressed', () => {
        const keyboardKey = 'a';
        const octaveDecreaseKey = 'z';
        const startingKeyNumber = 64; // Starting key is deteremined by the previous test
        const decreasedKeyNumber = startingKeyNumber - PIANO_OCTAVE_KEY_COUNT;

        setKeyboardAccess();
        events.keydown({ key: keyboardKey });
        expect(getFrequencyByKeyNumber).toHaveBeenCalledWith(startingKeyNumber);
        events.keydown({ key: octaveDecreaseKey });
        events.keydown({ key: keyboardKey });
        expect(getFrequencyByKeyNumber).toHaveBeenCalledWith(decreasedKeyNumber);
    });

    it('Has no action on unmapped key down', () => {
        const invalidKeyboardKey = 'v';
        setKeyboardAccess();
        events.keydown({ key: invalidKeyboardKey });
        expect(startOscillators).toBeCalledTimes(0);
    });

    it('Has no action on unmapped key up', () => {
        const invalidKeyboardKey = 'v';
        setKeyboardAccess();
        events.keyup({ key: invalidKeyboardKey });
        expect(startOscillators).toBeCalledTimes(0);
    });
});
