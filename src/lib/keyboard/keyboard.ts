import { startOscillators, stopOscillatorByFrequency } from '../oscillators/oscillators';
import { getFrequencyByKeyNumber } from '../utils/audio/audio';
import { logger } from '../utils/logger/logger';


type KeyboardKey = { [keyboardLetter: string]: number }; // TODO change name
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
let keyboardOctave = 4;
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

const handleOnKeyDownEvent = (e: KeyboardEvent) => {
    defaultKeys.forEach((keyboardKey: KeyboardKey, index) => {
        const keyOffset = keyboardOctave * 12;
        const keyLetter = Object.keys(keyboardKey)[0];
        const keyNumber = keyboardKey[keyLetter] + keyOffset;

        if ((e.key === keyLetter || e.key === keyLetter.toLowerCase()) && !e.repeat) {
            const frequency = getFrequencyByKeyNumber(keyNumber);
            startOscillators(frequency);
            logger.info('keyboard pressed', keyNumber);
            pressedKeys[index][keyLetter] = keyNumber;
        }
    });

    if (e.key === 'z' || e.key === 'Z') {
        keyboardOctave -= 1;
        logger.info('keyboard octave decreased to', keyboardOctave);
    }
    if (e.key === 'x' || e.key === 'X') {
        keyboardOctave += 1;
        logger.info('keyboard octave increased to', keyboardOctave);
    }
};

const handleOnKeyUpEvent = (e: KeyboardEvent) => {
    pressedKeys.forEach((keyboardKey: KeyboardKey, index) => {
        const keyLetter = Object.keys(keyboardKey)[0];
        const keyNumber = keyboardKey[keyLetter];

        if ((e.key === keyLetter || e.key === keyLetter.toLowerCase()) && !e.repeat) {
            const frequency = getFrequencyByKeyNumber(keyNumber);
            stopOscillatorByFrequency(frequency);
            pressedKeys[index][keyLetter] = undefined;
        }
    });
};

export const setKeyboardAccess = () => {
    window.addEventListener('keydown', (e: KeyboardEvent) => {
        handleOnKeyDownEvent(e);
    });

    window.addEventListener('keyup', (e: KeyboardEvent) => {
        handleOnKeyUpEvent(e);
    });
};
