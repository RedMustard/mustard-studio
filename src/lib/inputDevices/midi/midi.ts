
import { startOscillators, stopOscillatorByFrequency } from '../../oscillators/oscillators';
import { logger } from '../../utils/logger/logger';
import { getFrequencyByKeyNumber } from '../../utils/audio/audio';
import { MIDI_NOTE_OFFSET } from '../../../constants';

let midi: WebMidi.MIDIAccess;

const handleOnMidiMessage = (e: WebMidi.MIDIMessageEvent) => {
    const midiMessageData = e.data;
    const midiNote = midiMessageData[1];
    const midiVelocity = midiMessageData[2];
    const midiNoteFrequency = getFrequencyByKeyNumber(midiNote - MIDI_NOTE_OFFSET);
    if (midiVelocity > 0) {
        // Set MIDI on
        logger.info('MIDI on', midiVelocity);
        startOscillators(midiNoteFrequency);
    } else {
        // Set MIDI off
        logger.info('MIDI off', midiVelocity);
        stopOscillatorByFrequency(midiNoteFrequency);
    }
    logger.info('midiMessage', e);
};

export const setMidiAccess = () => {
    try {
        window.navigator.requestMIDIAccess({ sysex: true })
            .then((midiAccess: WebMidi.MIDIAccess) => {
                midi = midiAccess;
                midi.inputs.forEach((input) => {
                    input.addEventListener('midimessage', (e) => handleOnMidiMessage(e));
                });
                logger.info('MIDI access set', midiAccess);
            })
            .catch((e) => {
                logger.error('Loading MIDI failed with error', e);
            });
    } catch (e) {
        logger.error('Browser does not support MIDI');
    }
};

