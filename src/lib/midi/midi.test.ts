import { logger } from '../utils/logger/logger';
import { setMidiAccess } from './midi';

jest.mock('../utils/logger/logger');


// eslint-disable-next-line import/newline-after-import
// const wmMock = require('web-midi-test');
// const navigator = { requestMIDIAccess: wmMock.requestMIDIAccess };


describe('setMidiAccess', () => {
    // const oscillatorFrequency = 440;
    // const mockOscillator = {
    //     start: jest.fn().mockReturnThis(),
    //     stop: jest.fn().mockReturnThis(),
    //     connect: jest.fn().mockReturnThis(),
    //     disconnect: jest.fn().mockReturnThis(),
    //     detune: {
    //         value: 1,
    //     },
    //     frequency: {
    //         value: 1,
    //     },
    // };

    beforeEach(() => {
        jest.resetAllMocks();
        // jest.spyOn(mockAudioContext, 'createOscillator').mockImplementation(() => mockOscillator);
    });

    it('Results in console error when browser does not support midi', () => {
        setMidiAccess();
        // eslint-disable-next-line no-console
        expect(logger.error).toHaveBeenCalledWith('Browser does not support MIDI');
    });

    // TODO: Mock window navigator and/or requestMIDIAccess
    it('Initializes midi', () => {
        // window.navigator = navigator;
        // jest.spyOn(window.navigator, 'requestMIDIAccess').mockImplementation(wmMock.requestMIDIAccess);

        // setMidiAccess();
        // eslint-disable-next-line no-console
        // expect(logger.error).not.toHaveBeenCalledWith('Browser does not support MIDI');
    });

    it('handles midi messages and enables midi note', () => {
        // note is on
        // startOscillators is called
    });

    it('handles midi messages and disables midi note', () => {
        // note is off
        // stopOscillatorByFrequency is called
    });
});
