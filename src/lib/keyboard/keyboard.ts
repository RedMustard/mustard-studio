import { startOscillators, stopOscillatorByFrequency } from '../oscillators/oscillators';
import { getFrequencyByKeyNumber } from '../utils/audio/audio';
import { logger } from '../utils/logger/logger';
// import { getFrequencyByKeyNumber } from '../utils/audio/audio';
// import { MIDI_NOTE_OFFSET } from '../../constants';

// let midi: WebMidi.MIDIAccess;

type KeyboardKey = { [T: string]: number }; // TODO change name
const keyboardKeys: KeyboardKey[] = [
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
];
let keyboardOctave = 0;

const handleOnKeyDownEvent = (e: KeyboardEvent) => {
    // const midiMessageData = e.data;
    // const midiNote = midiMessageData[1];
    // const midiVelocity = midiMessageData[2];
    // const midiNoteFrequency = getFrequencyByKeyNumber(midiNote - MIDI_NOTE_OFFSET);
    // if (midiVelocity > 0) {
    //     // Set MIDI on
    //     logger.info('MIDI on', midiVelocity);
    //     startOscillators(midiNoteFrequency);
    // } else {
    //     // Set MIDI off
    //     logger.info('MIDI off', midiVelocity);
    //     stopOscillatorByFrequency(midiNoteFrequency);
    // }

    keyboardKeys.forEach((keyboardKey: KeyboardKey) => {
        const key = Object.keys(keyboardKey)[0];
        if ((e.key === key || e.key === key.toLowerCase()) && !e.repeat) {
            logger.info('keyboard event', key, e);
            const frequency = getFrequencyByKeyNumber(keyboardKey[key] + (keyboardOctave * 12));
            logger.info('keyboard event frequency', frequency);
            startOscillators(frequency);
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
    keyboardKeys.forEach((keyboardKey: KeyboardKey) => {
        const key = Object.keys(keyboardKey)[0];
        if ((e.key === key || e.key === key.toLowerCase()) && !e.repeat) {
            logger.info('keyboard pressed', keyboardKey[key]);
            const frequency = getFrequencyByKeyNumber(keyboardKey[key] + (keyboardOctave * 12));
            logger.info('keyboard event frequency', frequency);
            stopOscillatorByFrequency(frequency);
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
