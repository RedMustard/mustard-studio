import { MAX_PIANO_OCTAVE, MIN_PIANO_OCTAVE, PIANO_OCTAVE_KEY_COUNT } from '../../../constants';
import { KeyboardKey, Octave, StudioService } from '../../../types/types';
import { startOscillatorsByFrequency, stopOscillatorByFrequency } from '../../oscillators/oscillators';
import { getFrequencyByKeyNumber } from '../../utils/audio/audio';
import { logger } from '../../utils/logger/logger';


const defaultKeys: KeyboardKey[] = [
    { A: 4 },
    { W: 5 },
    { S: 6 },
    { E: 7 },
    { D: 8 },
    { F: 9 },
    { T: 10 },
    { G: 11 },
    { Y: 12 },
    { H: 13 },
    { U: 14 },
    { J: 15 },
    { K: 16 },
    { O: 17 },
    { L: 18 },
    { P: 19 },
    { ';': 20 },
    { ':': 20 },
];
const pressedKeys: KeyboardKey[] = [
    { A: undefined },
    { W: undefined },
    { S: undefined },
    { E: undefined },
    { D: undefined },
    { F: undefined },
    { T: undefined },
    { G: undefined },
    { Y: undefined },
    { H: undefined },
    { U: undefined },
    { J: undefined },
    { K: undefined },
    { O: undefined },
    { L: undefined },
    { P: undefined },
    { ';': undefined },
    { ':': undefined },
];
let keyboardOctave: Octave = 4;
let currentStudioService: StudioService;


const handleOnKeyDownEvent = (e: KeyboardEvent) => {
    defaultKeys.forEach((keyboardKey: KeyboardKey, index) => {
        const keyOffset = keyboardOctave * PIANO_OCTAVE_KEY_COUNT;
        const keyLetter = Object.keys(keyboardKey)[0];
        const keyNumber = keyboardKey[keyLetter] + keyOffset;

        if ((e.key === keyLetter || e.key === keyLetter.toLowerCase()) && !e.repeat) {
            const frequency = getFrequencyByKeyNumber(keyNumber);
            startOscillatorsByFrequency(frequency, currentStudioService);
            logger.info('Keyboard pressed', keyNumber);
            pressedKeys[index][keyLetter] = keyNumber;
        }
    });

    if ((e.key === 'z' || e.key === 'Z') && keyboardOctave > MIN_PIANO_OCTAVE) {
        keyboardOctave -= 1;
        logger.info('Keyboard octave decreased to', keyboardOctave);
    }
    if ((e.key === 'x' || e.key === 'X') && keyboardOctave < MAX_PIANO_OCTAVE) {
        keyboardOctave += 1;
        logger.info('Keyboard octave increased to', keyboardOctave);
    }
};

const handleOnKeyUpEvent = (e: KeyboardEvent) => {
    pressedKeys.forEach((keyboardKey: KeyboardKey, index) => {
        const keyLetter = Object.keys(keyboardKey)[0];
        const keyNumber = keyboardKey[keyLetter];

        if ((e.key === keyLetter || e.key === keyLetter.toLowerCase()) && !e.repeat) {
            const frequency = getFrequencyByKeyNumber(keyNumber);
            stopOscillatorByFrequency(frequency, currentStudioService);
            logger.info('handleOnKeyUpEvent: oscillators stopped');
            pressedKeys[index][keyLetter] = undefined;
        }
    });
};

export const removeKeyboardAccess = () => {
    window.removeEventListener('keydown', handleOnKeyDownEvent);
    window.removeEventListener('keyup', handleOnKeyUpEvent);
};

export const setKeyboardAccess = () => {
    window.addEventListener('keydown', handleOnKeyDownEvent);
    window.addEventListener('keyup', handleOnKeyUpEvent);
    logger.info('Keyboard access enabled');
};

export const setKeyboardStudioService = (studioService: StudioService) => {
    currentStudioService = studioService;
};
