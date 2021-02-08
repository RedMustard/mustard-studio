import * as audioContext from '../audioContext/audioContext';
import * as audio from '../utils/audio/audio';
import { OscillatorId, StudioService } from '../../types/types';
import { getInitialState } from '../studioService/StudioServiceStore';
import {
    setOscillatorById,
    getOscillators,
    resetOscillators,
    stopOscillatorById,
    startOscillators,
    stopOscillators,
} from './oscillators';


// eslint-disable-next-line import/newline-after-import
const wamock = require('web-audio-mock-api');
const mockAudioContext = new wamock.AudioContext();


describe('setOscillatorById', () => {
    let oscillatorId: OscillatorId;
    let mockOscillator: OscillatorNode;

    afterEach(() => {
        resetOscillators();
        mockOscillator = mockAudioContext.createOscillator();
    });

    it('sets osc1', () => {
        oscillatorId = 'osc1';
        setOscillatorById(oscillatorId, mockOscillator);
        expect(getOscillators().osc1).toBe(mockOscillator);
    });

    it('sets osc2', () => {
        oscillatorId = 'osc2';
        setOscillatorById(oscillatorId, mockOscillator);
        expect(getOscillators().osc2).toBe(mockOscillator);
    });

    it('sets oscSub', () => {
        oscillatorId = 'oscSub';
        setOscillatorById(oscillatorId, mockOscillator);
        expect(getOscillators().oscSub).toBe(mockOscillator);
    });

    it('does not set an oscillator with invalid oscillatorId', () => {
        const oscillators: {
            [key in OscillatorId]: OscillatorNode;
        } = {
            osc1: undefined,
            osc2: undefined,
            oscSub: undefined,
        };
        oscillatorId = 'invalidOscillatorId' as OscillatorId;
        const currentOscillators = getOscillators();
        setOscillatorById(oscillatorId, mockOscillator);
        expect(JSON.stringify(currentOscillators)).toBe(JSON.stringify(oscillators));
    });
});


describe('startsOscillators', () => {
    const studioService: StudioService = getInitialState();
    const oscillatorFrequency = 440;
    const mockOscillator = {
        start: jest.fn().mockReturnThis(),
        stop: jest.fn().mockReturnThis(),
        connect: jest.fn().mockReturnThis(),
        disconnect: jest.fn().mockReturnThis(),
        detune: {
            value: 0,
        },
        frequency: {
            value: 0,
        },
    };

    beforeAll(() => {
        jest.spyOn(mockAudioContext, 'createOscillator').mockImplementation(() => mockOscillator);
        jest.spyOn(audio, 'getFrequencyByOctaveOffset').mockImplementation(() => 440);
    });

    beforeEach(() => {
        jest.spyOn(audioContext, 'getAudioContext').mockImplementation(() => mockAudioContext);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('starts all oscillators', () => {
        const numberOfOscillators = 3;
        startOscillators(
            oscillatorFrequency,
            studioService,
        );
        expect(audio.getFrequencyByOctaveOffset).toBeCalledTimes(numberOfOscillators);
        expect(mockAudioContext.createOscillator).toBeCalledTimes(numberOfOscillators);
        expect(mockOscillator.connect).toBeCalledTimes(numberOfOscillators);
        expect(mockOscillator.start).toBeCalledTimes(numberOfOscillators);
    });

    it('only starts osc1 when osc2 and oscSub are disabled', () => {
        jest.spyOn(mockAudioContext, 'createOscillator').mockImplementation(() => mockOscillator);
        const numberOfOscillators = 1;
        const modifiedStudioService: StudioService = {
            ...studioService,
            settings: {
                ...studioService.settings,
                osc2: {
                    ...studioService.settings.osc2,
                    enabled: false,
                },
                oscSub: {
                    ...studioService.settings.oscSub,
                    enabled: false,
                },
            },
        };
        startOscillators(
            oscillatorFrequency,
            modifiedStudioService,
        );
        expect(mockAudioContext.createOscillator).toBeCalledTimes(numberOfOscillators);
    });

    it('only starts osc2 when osc1 and oscSub are disabled', () => {
        jest.spyOn(mockAudioContext, 'createOscillator').mockImplementation(() => mockOscillator);
        const numberOfOscillators = 1;
        const modifiedStudioService: StudioService = {
            ...studioService,
            settings: {
                ...studioService.settings,
                osc1: {
                    ...studioService.settings.osc1,
                    enabled: false,
                },
                oscSub: {
                    ...studioService.settings.oscSub,
                    enabled: false,
                },
            },
        };
        startOscillators(
            oscillatorFrequency,
            modifiedStudioService,
        );
        expect(mockAudioContext.createOscillator).toBeCalledTimes(numberOfOscillators);
    });

    it('only starts oscSub when osc1 and osc2 are disabled', () => {
        jest.spyOn(mockAudioContext, 'createOscillator').mockImplementation(() => mockOscillator);
        const numberOfOscillators = 1;
        const modifiedStudioService: StudioService = {
            ...studioService,
            settings: {
                ...studioService.settings,
                osc1: {
                    ...studioService.settings.osc1,
                    enabled: false,
                },
                osc2: {
                    ...studioService.settings.osc2,
                    enabled: false,
                },
            },
        };
        startOscillators(
            oscillatorFrequency,
            modifiedStudioService,
        );
        expect(mockAudioContext.createOscillator).toBeCalledTimes(numberOfOscillators);
    });

    it('sets detune for osc1', () => {
        const modifiedStudioService: StudioService = {
            ...studioService,
            settings: {
                ...studioService.settings,
                osc1: {
                    ...studioService.settings.osc1,
                    detune: 5,
                },
            },
        };
        startOscillators(
            oscillatorFrequency,
            modifiedStudioService,
        );
        expect(getOscillators().osc1.detune.value).toBe(5);
    });

    it('sets detune for osc2', () => {
        const modifiedStudioService: StudioService = {
            ...studioService,
            settings: {
                ...studioService.settings,
                osc2: {
                    ...studioService.settings.osc2,
                    detune: 7,
                },
            },
        };
        startOscillators(
            oscillatorFrequency,
            modifiedStudioService,
        );
        expect(getOscillators().osc2.detune.value).toBe(7);
    });

    it('sets detune for oscSub', () => {
        const modifiedStudioService: StudioService = {
            ...studioService,
            settings: {
                ...studioService.settings,
                osc1: {
                    ...studioService.settings.osc1,
                    detune: 5,
                },
                osc2: {
                    ...studioService.settings.osc2,
                    detune: 7,
                },
                oscSub: {
                    ...studioService.settings.oscSub,
                },
            },
        };
        startOscillators(
            oscillatorFrequency,
            modifiedStudioService,
        );
        expect(getOscillators().oscSub.detune.value).toBe(0);
    });
});


describe('stopOscillatorById', () => {
    let oscillatorId: OscillatorId;
    const studioService = getInitialState();
    const oscillatorFrequency = 440;
    const mockOscillator = {
        start: jest.fn().mockReturnThis(),
        stop: jest.fn().mockReturnThis(),
        connect: jest.fn().mockReturnThis(),
        disconnect: jest.fn().mockReturnThis(),
        detune: {
            value: 1,
        },
        frequency: {
            value: 1,
        },
    };

    beforeEach(() => {
        jest.resetAllMocks();
        resetOscillators();
        jest.spyOn(audioContext, 'getAudioContext').mockImplementation(() => mockAudioContext);
        jest.spyOn(mockAudioContext, 'createOscillator').mockImplementation(() => mockOscillator);
    });

    it('stops osc1', () => {
        oscillatorId = 'osc1';
        startOscillators(oscillatorFrequency, studioService);
        stopOscillatorById(oscillatorId);
        expect(mockOscillator.stop).toBeCalledTimes(1);
    });

    it('stops osc2', () => {
        oscillatorId = 'osc2';
        startOscillators(oscillatorFrequency, studioService);
        stopOscillatorById(oscillatorId);
        expect(mockOscillator.stop).toBeCalledTimes(1);
    });

    it('stops oscSub', () => {
        oscillatorId = 'oscSub';
        startOscillators(oscillatorFrequency, studioService);
        stopOscillatorById(oscillatorId);
        expect(mockOscillator.stop).toBeCalledTimes(1);
    });

    it('does not stop oscillator with invalid oscillatorId', () => {
        oscillatorId = 'invalidOscillatorId' as OscillatorId;
        startOscillators(oscillatorFrequency, studioService);
        stopOscillatorById(oscillatorId);
        expect(mockOscillator.stop).not.toBeCalled();
    });

    it('does not stop osc1 if osc1 does not exist', () => {
        oscillatorId = 'osc1' as OscillatorId;
        stopOscillatorById(oscillatorId);
        expect(mockOscillator.stop).not.toBeCalled();
    });

    it('does not stop osc2 if osc2 does not exist', () => {
        oscillatorId = 'osc2' as OscillatorId;
        stopOscillatorById(oscillatorId);
        expect(mockOscillator.stop).not.toBeCalled();
    });

    it('does not stop oscSub if oscSub does not exist', () => {
        oscillatorId = 'oscSub' as OscillatorId;
        stopOscillatorById(oscillatorId);
        expect(mockOscillator.stop).not.toBeCalled();
    });
});


describe('stopOscillators', () => {
    const studioService = getInitialState();
    const oscillatorFrequency = 440;
    const mockOscillator = {
        start: jest.fn().mockReturnThis(),
        stop: jest.fn().mockReturnThis(),
        connect: jest.fn().mockReturnThis(),
        disconnect: jest.fn().mockReturnThis(),
        detune: {
            value: 1,
        },
        frequency: {
            value: 1,
        },
    };

    beforeEach(() => {
        jest.resetAllMocks();
        jest.spyOn(audioContext, 'getAudioContext').mockImplementation(() => mockAudioContext);
        jest.spyOn(mockAudioContext, 'createOscillator').mockImplementation(() => mockOscillator);
    });

    it('stops all oscillators', () => {
        startOscillators(oscillatorFrequency, studioService);
        stopOscillators();
        expect(mockOscillator.stop).toBeCalledTimes(3);
    });
});
