import * as audioContext from '../audioContext/audioContext';
import * as audio from '../utils/audio/audio';
import { OscillatorId } from '../../types/types';
import {
    getOscillatorNodes,
    resetOscillatorNodes,
    stopOscillatorById,
    startOscillatorsByFrequency,
    stopOscillators,
    stopOscillatorByFrequency,
    resetOscillatorGainNodes,
    addOscillatorGainNode,
    addOscillatorNode,
    getOscillatorGainNodes,
    getOscillatorGainNodesByFrequency,
} from './oscillators';
import { mockStudioService } from '../../tests/__mocks__/studioServiceMock';


// eslint-disable-next-line import/newline-after-import
const wamock = require('web-audio-mock-api');
const mockAudioContext = new wamock.AudioContext();

describe('startOscillatorsByFrequency', () => {
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

    beforeEach(() => {
        jest.spyOn(mockAudioContext, 'createOscillator').mockImplementation(() => mockOscillator);
        jest.spyOn(audioContext, 'getAudioContext').mockImplementation(() => mockAudioContext);
        jest.spyOn(audio, 'getFrequencyByOctaveOffset').mockImplementation(() => 440);
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    afterAll(() => {
        jest.clearAllMocks();
        resetOscillatorNodes();
        resetOscillatorGainNodes();
    });

    it('starts all oscillators', () => {
        const numberOfOscillators = 3;
        startOscillatorsByFrequency(oscillatorFrequency, mockStudioService);
        expect(audio.getFrequencyByOctaveOffset).toBeCalledTimes(numberOfOscillators);
        expect(mockAudioContext.createOscillator).toBeCalledTimes(numberOfOscillators);
        expect(mockOscillator.connect).toBeCalledTimes(numberOfOscillators);
        expect(mockOscillator.start).toBeCalledTimes(numberOfOscillators);
    });

    it('only starts osc1 when osc2 and oscSub are disabled', () => {
        const numberOfOscillators = 1;
        const modifiedStudioService = {
            ...mockStudioService,
            oscillators: {
                ...mockStudioService.oscillators,
                osc2: {
                    ...mockStudioService.oscillators.osc2,
                    settings: {
                        ...mockStudioService.oscillators.osc2.settings,
                        enabled: false,
                    },
                },
                oscSub: {
                    ...mockStudioService.oscillators.oscSub,
                    settings: {
                        ...mockStudioService.oscillators.oscSub.settings,
                        enabled: false,
                    },
                },
            },
        };
        startOscillatorsByFrequency(oscillatorFrequency, modifiedStudioService);
        expect(mockAudioContext.createOscillator).toBeCalledTimes(numberOfOscillators);
        expect(mockOscillator.connect).toBeCalledTimes(numberOfOscillators);
        expect(mockOscillator.start).toBeCalledTimes(numberOfOscillators);
    });

    it('only starts osc2 when osc1 and oscSub are disabled', () => {
        const numberOfOscillators = 1;
        const modifiedStudioService = {
            ...mockStudioService,
            oscillators: {
                ...mockStudioService.oscillators,
                osc1: {
                    ...mockStudioService.oscillators.osc1,
                    settings: {
                        ...mockStudioService.oscillators.osc1.settings,
                        enabled: false,
                    },
                },
                oscSub: {
                    ...mockStudioService.oscillators.oscSub,
                    settings: {
                        ...mockStudioService.oscillators.oscSub.settings,
                        enabled: false,
                    },
                },
            },
        };
        startOscillatorsByFrequency(oscillatorFrequency, modifiedStudioService);
        expect(mockAudioContext.createOscillator).toBeCalledTimes(numberOfOscillators);
        expect(mockOscillator.connect).toBeCalledTimes(numberOfOscillators);
        expect(mockOscillator.start).toBeCalledTimes(numberOfOscillators);
    });

    it('only starts oscSub when osc1 and osc2 are disabled', () => {
        const numberOfOscillators = 1;
        const modifiedStudioService = {
            ...mockStudioService,
            oscillators: {
                ...mockStudioService.oscillators,
                osc1: {
                    ...mockStudioService.oscillators.osc1,
                    settings: {
                        ...mockStudioService.oscillators.osc1.settings,
                        enabled: false,
                    },
                },
                osc2: {
                    ...mockStudioService.oscillators.osc2,
                    settings: {
                        ...mockStudioService.oscillators.osc2.settings,
                        enabled: false,
                    },
                },
            },
        };
        startOscillatorsByFrequency(oscillatorFrequency, modifiedStudioService);
        expect(mockAudioContext.createOscillator).toBeCalledTimes(numberOfOscillators);
        expect(mockOscillator.connect).toBeCalledTimes(numberOfOscillators);
        expect(mockOscillator.start).toBeCalledTimes(numberOfOscillators);
    });
});


describe('addOscillatorNode', () => {
    const mockOscillatorNode = mockAudioContext.createOscillator();

    afterEach(() => {
        resetOscillatorNodes();
    });

    it('adds oscillator node for new frequency', () => {
        const activeOscillatorNodes: {
            [frequency: string]: {
                [oscillatorId: string]: OscillatorNode[];
            }
        } = {
            440: {
                osc1: [mockOscillatorNode],
            },
        };
        addOscillatorNode(mockOscillatorNode, 440, 'osc1');
        expect(getOscillatorNodes()).toMatchObject(activeOscillatorNodes);
    });

    it('adds oscillator node for existing frequency, but new oscillatorId', () => {
        const activeOscillatorNodes: {
            [frequency: string]: {
                [oscillatorId: string]: OscillatorNode[];
            }
        } = {
            440: {
                osc1: [mockOscillatorNode],
                osc2: [mockOscillatorNode],
            },
        };
        addOscillatorNode(mockOscillatorNode, 440, 'osc1');
        addOscillatorNode(mockOscillatorNode, 440, 'osc2');
        expect(getOscillatorNodes()).toMatchObject(activeOscillatorNodes);
    });

    it('adds oscillator node for existing frequency and existing oscillatorId', () => {
        const activeOscillatorNodes: {
            [frequency: string]: {
                [oscillatorId: string]: OscillatorNode[];
            }
        } = {
            440: {
                osc1: [mockOscillatorNode, mockOscillatorNode],
            },
        };
        addOscillatorNode(mockOscillatorNode, 440, 'osc1');
        addOscillatorNode(mockOscillatorNode, 440, 'osc1');
        expect(getOscillatorNodes()).toMatchObject(activeOscillatorNodes);
    });
});


describe('addOscillatorGainNode', () => {
    const mockGainNode = mockAudioContext.createGain();

    afterEach(() => {
        resetOscillatorNodes();
    });

    it('adds oscillator node for new frequency', () => {
        const activeOscillatorGainNodes: {
            [frequency: string]: {
                [oscillatorId: string]: GainNode;
            }
        } = {
            440: {
                osc1: mockGainNode,
            },
        };
        addOscillatorGainNode(mockGainNode, 440, 'osc1');
        expect(getOscillatorGainNodes()).toMatchObject(activeOscillatorGainNodes);
    });
});


describe('getOscillatorNodes', () => {
    const mockOscillatorNode = mockAudioContext.createOscillator();

    const defaultOscillatorNodes: {
        [frequency: string]: {
            [oscillatorId: string]: OscillatorNode[];
        }
    } = {};

    const activeOscillatorNodes: {
        [frequency: string]: {
            [oscillatorId: string]: OscillatorNode[];
        }
    } = {
        440: {
            osc1: [mockOscillatorNode],
        },
    };

    beforeEach(() => {
        jest.resetAllMocks();
    });

    afterAll(() => {
        jest.clearAllMocks();
        resetOscillatorNodes();
        resetOscillatorGainNodes();
    });

    it('returns default oscillator nodes', () => {
        expect(getOscillatorNodes()).toMatchObject(defaultOscillatorNodes);
    });

    it('returns oscillator nodes when oscillator nodes exist', () => {
        addOscillatorNode(mockOscillatorNode, 440, 'osc1');
        expect(getOscillatorNodes()).toMatchObject(activeOscillatorNodes);
    });
});


describe('getOscillatorGainNodes', () => {
    const mockGainNode = mockAudioContext.createGain();

    const defaultOscillatorGainNodes: {
        [frequency: string]: {
            [oscillatorId: string]: GainNode;
        }
    } = {};

    const activeOscillatorNodes: {
        [frequency: string]: {
            [oscillatorId: string]: OscillatorNode[];
        }
    } = {
        440: {
            osc1: mockGainNode,
        },
    };

    afterAll(() => {
        jest.clearAllMocks();
        resetOscillatorNodes();
        resetOscillatorGainNodes();
    });

    it('returns default oscillator gain nodes', () => {
        expect(getOscillatorGainNodes()).toMatchObject(defaultOscillatorGainNodes);
    });

    it('returns oscillator gain nodes when gain nodes exist', () => {
        addOscillatorGainNode(mockGainNode, 440, 'osc1');
        expect(getOscillatorGainNodes()).toMatchObject(activeOscillatorNodes);
    });
});


describe('getOscillatorGainNodesByFrequency', () => {
    const mockGainNode = mockAudioContext.createGain();
    let activeOscillatorNodes: {
        [oscillatorId: string]: OscillatorNode[];
    };

    afterAll(() => {
        jest.clearAllMocks();
        resetOscillatorNodes();
        resetOscillatorGainNodes();
    });

    it('returns undefined when frequency doesn\'t exist', () => {
        expect(getOscillatorGainNodesByFrequency(440)).toBe(undefined);
    });

    it('returns oscillator gain nodes when frequency exists', () => {
        activeOscillatorNodes = {
            osc1: mockGainNode,
        };
        addOscillatorGainNode(mockGainNode, 440, 'osc1');
        expect(getOscillatorGainNodesByFrequency(440)).toMatchObject(activeOscillatorNodes);
    });

    it('returns multiple oscillator gain nodes when multiple exist for a frequency', () => {
        activeOscillatorNodes = {
            osc1: mockGainNode,
            osc2: mockGainNode,
        };
        addOscillatorGainNode(mockGainNode, 440, 'osc1');
        addOscillatorGainNode(mockGainNode, 440, 'osc2');
        expect(getOscillatorGainNodesByFrequency(440)).toMatchObject(activeOscillatorNodes);
    });
});


describe('resetOscillatorNodes', () => {
    const mockOscillatorNode = mockAudioContext.createOscillator();

    it('adds an oscillator node and then resets oscillator nodes', () => {
        addOscillatorNode(mockOscillatorNode, 440, 'osc1');
        resetOscillatorNodes();
        expect(getOscillatorNodes()).toMatchObject({});
    });
});


describe('resetOscillatorGainNodes', () => {
    const mockGainNode = mockAudioContext.createGain();
    it('adds an oscillator gain node and then resets oscillator gain nodes', () => {
        addOscillatorGainNode(mockGainNode, 440, 'osc1');
        resetOscillatorGainNodes();
        expect(getOscillatorGainNodes()).toMatchObject({});
    });
});


describe('stopOscillatorById', () => {
    let oscillatorId: OscillatorId;
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
        resetOscillatorNodes();
        jest.spyOn(audioContext, 'getAudioContext').mockImplementation(() => mockAudioContext);
        jest.spyOn(mockAudioContext, 'createOscillator').mockImplementation(() => mockOscillator);
    });

    afterAll(() => {
        jest.clearAllMocks();
        resetOscillatorNodes();
        resetOscillatorGainNodes();
    });

    it('stops osc1', () => {
        oscillatorId = 'osc1';
        startOscillatorsByFrequency(oscillatorFrequency, mockStudioService);
        stopOscillatorById(oscillatorId, mockStudioService);
        expect(mockOscillator.stop).toBeCalledTimes(1);
    });

    it('stops osc2', () => {
        oscillatorId = 'osc2';
        startOscillatorsByFrequency(oscillatorFrequency, mockStudioService);
        stopOscillatorById(oscillatorId, mockStudioService);
        expect(mockOscillator.stop).toBeCalledTimes(1);
    });

    it('stops oscSub', () => {
        oscillatorId = 'oscSub';
        startOscillatorsByFrequency(oscillatorFrequency, mockStudioService);
        stopOscillatorById(oscillatorId, mockStudioService);
        expect(mockOscillator.stop).toBeCalledTimes(1);
    });

    it('does not stop oscillator with invalid oscillatorId', () => {
        oscillatorId = 'invalidOscillatorId' as OscillatorId;
        startOscillatorsByFrequency(oscillatorFrequency, mockStudioService);
        stopOscillatorById(oscillatorId, mockStudioService);
        expect(mockOscillator.stop).not.toBeCalled();
    });

    it('does not stop osc1 if osc1 does not exist', () => {
        oscillatorId = 'osc1' as OscillatorId;
        stopOscillatorById(oscillatorId, mockStudioService);
        expect(mockOscillator.stop).not.toBeCalled();
    });

    it('does not stop osc2 if osc2 does not exist', () => {
        oscillatorId = 'osc2' as OscillatorId;
        stopOscillatorById(oscillatorId, mockStudioService);
        expect(mockOscillator.stop).not.toBeCalled();
    });

    it('does not stop oscSub if oscSub does not exist', () => {
        oscillatorId = 'oscSub' as OscillatorId;
        stopOscillatorById(oscillatorId, mockStudioService);
        expect(mockOscillator.stop).not.toBeCalled();
    });
});


describe('stopOscillators', () => {
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

    afterAll(() => {
        jest.clearAllMocks();
        resetOscillatorNodes();
        resetOscillatorGainNodes();
    });

    it('stops all oscillators', () => {
        startOscillatorsByFrequency(oscillatorFrequency, mockStudioService);
        stopOscillators(mockStudioService);
        expect(mockOscillator.stop).toBeCalledTimes(3);
    });
});


describe('stopOscillatorByFrequency', () => {
    const oscillatorFrequency440 = 440;
    const oscillatorFrequency220 = 220;
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
        resetOscillatorNodes();
        jest.spyOn(audioContext, 'getAudioContext').mockImplementation(() => mockAudioContext);
        jest.spyOn(mockAudioContext, 'createOscillator').mockImplementation(() => mockOscillator);
    });

    afterAll(() => {
        jest.clearAllMocks();
        resetOscillatorNodes();
        resetOscillatorGainNodes();
    });

    it('stops oscillators with frequency 220', () => {
        startOscillatorsByFrequency(oscillatorFrequency440, mockStudioService);
        startOscillatorsByFrequency(oscillatorFrequency220, mockStudioService);
        stopOscillatorByFrequency(oscillatorFrequency220, mockStudioService);
        expect(mockOscillator.stop).toBeCalledTimes(3); // 6 oscillators running, 3 should be stopped
    });

    it('does not stop oscillators when frequency does not exist', () => {
        startOscillatorsByFrequency(oscillatorFrequency440, mockStudioService);
        stopOscillatorByFrequency(100, mockStudioService);
        expect(mockOscillator.stop).not.toBeCalled();
    });
});
