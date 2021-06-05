import * as audioContext from '../audioContext/audioContext';
import * as audio from '../utils/audio/audio';
import * as oscillators from './oscillators';
import {
    OscillatorId,
    OscillatorSettings,
    Oscillator,
    OscillatorDetuneSetting,
} from '../../types/types';
import {
    getOscillatorsNodes,
    resetOscillatorNodes,
    stopOscillatorById,
    startOscillators,
    stopOscillators,
    stopOscillatorByFrequency,
    setOscillatorGainNodeByOscillatorId,
    getOscillatorsConfigs,
    resetOscillatorConfigs,
    setOscillatorPanNodeByOscillatorId,
    setOscillatorSettingsByOscillatorId,
} from './oscillators';
import { OSC_1_INITIAL_SETTINGS, OSC_2_INITIAL_SETTINGS, OSC_SUB_INITIAL_SETTINGS } from '../../constants';


// eslint-disable-next-line import/newline-after-import
const wamock = require('web-audio-mock-api');
const mockAudioContext = new wamock.AudioContext();


describe('startOscillators', () => {
    const oscillatorFrequency = 440;
    const osc1 = 'osc1';
    const osc2 = 'osc2';
    const oscSub = 'oscSub';
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
    const updatedOscillatorSettings: OscillatorSettings = {
        enabled: false,
        octave: 1,
        pan: 0,
        type: 'sine',
        volume: 1,
    };

    beforeEach(() => {
        jest.spyOn(mockAudioContext, 'createOscillator').mockImplementation(() => mockOscillator);
        jest.spyOn(audioContext, 'getAudioContext').mockImplementation(() => mockAudioContext);
        jest.spyOn(audio, 'getFrequencyByOctaveOffset').mockImplementation(() => 440);
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
        resetOscillatorConfigs();
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('starts all oscillators', () => {
        const numberOfOscillators = 3;
        startOscillators(oscillatorFrequency);
        expect(audio.getFrequencyByOctaveOffset).toBeCalledTimes(numberOfOscillators);
        expect(mockAudioContext.createOscillator).toBeCalledTimes(numberOfOscillators);
        expect(mockOscillator.connect).toBeCalledTimes(numberOfOscillators);
        expect(mockOscillator.start).toBeCalledTimes(numberOfOscillators);
    });

    it('only starts osc1 when osc2 and oscSub are disabled', () => {
        const numberOfOscillators = 1;
        setOscillatorSettingsByOscillatorId(osc2, updatedOscillatorSettings);
        setOscillatorSettingsByOscillatorId(oscSub, updatedOscillatorSettings);
        startOscillators(oscillatorFrequency);
        expect(mockAudioContext.createOscillator).toBeCalledTimes(numberOfOscillators);
        expect(mockOscillator.connect).toBeCalledTimes(numberOfOscillators);
        expect(mockOscillator.start).toBeCalledTimes(numberOfOscillators);
    });

    it('only starts osc2 when osc1 and oscSub are disabled', () => {
        const numberOfOscillators = 1;
        setOscillatorSettingsByOscillatorId(osc1, updatedOscillatorSettings);
        setOscillatorSettingsByOscillatorId(oscSub, updatedOscillatorSettings);
        startOscillators(oscillatorFrequency);
        expect(mockAudioContext.createOscillator).toBeCalledTimes(numberOfOscillators);
        expect(mockOscillator.connect).toBeCalledTimes(numberOfOscillators);
        expect(mockOscillator.start).toBeCalledTimes(numberOfOscillators);
    });

    it('only starts oscSub when osc1 and osc2 are disabled', () => {
        const numberOfOscillators = 1;
        setOscillatorSettingsByOscillatorId(osc1, updatedOscillatorSettings);
        setOscillatorSettingsByOscillatorId(osc2, updatedOscillatorSettings);
        startOscillators(oscillatorFrequency);
        expect(mockAudioContext.createOscillator).toBeCalledTimes(numberOfOscillators);
        expect(mockOscillator.connect).toBeCalledTimes(numberOfOscillators);
        expect(mockOscillator.start).toBeCalledTimes(numberOfOscillators);
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
    });

    it('stops osc1', () => {
        oscillatorId = 'osc1';
        startOscillators(oscillatorFrequency);
        stopOscillatorById(oscillatorId);
        expect(mockOscillator.stop).toBeCalledTimes(1);
    });

    it('stops osc2', () => {
        oscillatorId = 'osc2';
        startOscillators(oscillatorFrequency);
        stopOscillatorById(oscillatorId);
        expect(mockOscillator.stop).toBeCalledTimes(1);
    });

    it('stops oscSub', () => {
        oscillatorId = 'oscSub';
        startOscillators(oscillatorFrequency);
        stopOscillatorById(oscillatorId);
        expect(mockOscillator.stop).toBeCalledTimes(1);
    });

    it('does not stop oscillator with invalid oscillatorId', () => {
        oscillatorId = 'invalidOscillatorId' as OscillatorId;
        startOscillators(oscillatorFrequency);
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
    });

    it('stops all oscillators', () => {
        startOscillators(oscillatorFrequency);
        stopOscillators();
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
    });

    it('stops oscillators with frequency 220', () => {
        startOscillators(oscillatorFrequency440);
        startOscillators(oscillatorFrequency220);
        stopOscillatorByFrequency(oscillatorFrequency220);
        expect(mockOscillator.stop).toBeCalledTimes(3); // 6 oscillators running, 3 should be stopped
    });

    it('does not stop oscillators when frequency does not exist', () => {
        startOscillators(oscillatorFrequency440);
        stopOscillatorByFrequency(100);
        expect(mockOscillator.stop).not.toBeCalled();
    });
});


describe('setOscillatorGainNodeByOscillatorId', () => {
    let oscillatorId: OscillatorId;
    let oscillatorSettings: {
        [key in OscillatorId]: Oscillator
    };
    const gainNode = mockAudioContext.createGain();

    beforeEach(() => {
        resetOscillatorConfigs();
    });

    it('sets gain node for osc1', () => {
        oscillatorId = 'osc1';
        setOscillatorGainNodeByOscillatorId(oscillatorId, gainNode);
        oscillatorSettings = getOscillatorsConfigs();
        expect(oscillatorSettings.osc1.gainNode).toMatchObject(gainNode);
        expect(oscillatorSettings.osc2.gainNode).toBe(undefined);
        expect(oscillatorSettings.oscSub.gainNode).toBe(undefined);
    });

    it('sets gain node for osc2', () => {
        oscillatorId = 'osc2';
        setOscillatorGainNodeByOscillatorId(oscillatorId, gainNode);
        oscillatorSettings = getOscillatorsConfigs();
        expect(oscillatorSettings.osc1.gainNode).toBe(undefined);
        expect(oscillatorSettings.osc2.gainNode).toMatchObject(gainNode);
        expect(oscillatorSettings.oscSub.gainNode).toBe(undefined);
    });

    it('sets gain node for oscSub', () => {
        oscillatorId = 'oscSub';
        setOscillatorGainNodeByOscillatorId(oscillatorId, gainNode);
        oscillatorSettings = getOscillatorsConfigs();
        expect(oscillatorSettings.osc1.gainNode).toBe(undefined);
        expect(oscillatorSettings.osc2.gainNode).toBe(undefined);
        expect(oscillatorSettings.oscSub.gainNode).toMatchObject(gainNode);
    });

    it('does not set gain node for invalid oscillatorId', () => {
        oscillatorId = 'invalidOscillatorId' as OscillatorId;
        setOscillatorGainNodeByOscillatorId(oscillatorId, gainNode);
        oscillatorSettings = getOscillatorsConfigs();
        expect(oscillatorSettings.osc1.gainNode).toBe(undefined);
        expect(oscillatorSettings.osc2.gainNode).toBe(undefined);
        expect(oscillatorSettings.oscSub.gainNode).toBe(undefined);
    });
});


describe('setOscillatorPanNodeByOscillatorId', () => {
    let oscillatorId: OscillatorId;
    let oscillatorSettings: {
        [key in OscillatorId]: Oscillator
    };
    const panNode = mockAudioContext.createStereoPanner();

    beforeEach(() => {
        resetOscillatorConfigs();
    });

    it('sets pan node for osc1', () => {
        oscillatorId = 'osc1';
        setOscillatorPanNodeByOscillatorId(oscillatorId, panNode);
        oscillatorSettings = getOscillatorsConfigs();
        expect(oscillatorSettings.osc1.panNode).toMatchObject(panNode);
        expect(oscillatorSettings.osc2.panNode).toBe(undefined);
        expect(oscillatorSettings.oscSub.panNode).toBe(undefined);
    });

    it('sets pan node for osc2', () => {
        oscillatorId = 'osc2';
        setOscillatorPanNodeByOscillatorId(oscillatorId, panNode);
        oscillatorSettings = getOscillatorsConfigs();
        expect(oscillatorSettings.osc1.panNode).toBe(undefined);
        expect(oscillatorSettings.osc2.panNode).toMatchObject(panNode);
        expect(oscillatorSettings.oscSub.panNode).toBe(undefined);
    });

    it('sets pan node for oscSub', () => {
        oscillatorId = 'oscSub';
        setOscillatorPanNodeByOscillatorId(oscillatorId, panNode);
        oscillatorSettings = getOscillatorsConfigs();
        expect(oscillatorSettings.osc1.panNode).toBe(undefined);
        expect(oscillatorSettings.osc2.panNode).toBe(undefined);
        expect(oscillatorSettings.oscSub.panNode).toMatchObject(panNode);
    });

    it('does not set pan node for invalid oscillatorId', () => {
        oscillatorId = 'invalidOscillatorId' as OscillatorId;
        setOscillatorPanNodeByOscillatorId(oscillatorId, panNode);
        oscillatorSettings = getOscillatorsConfigs();
        expect(oscillatorSettings.osc1.panNode).toBe(undefined);
        expect(oscillatorSettings.osc2.panNode).toBe(undefined);
        expect(oscillatorSettings.oscSub.panNode).toBe(undefined);
    });
});


describe('setOscillatorSettingsByOscillatorId', () => {
    let oscillatorId: OscillatorId;
    let defaultOscillatorSettings: OscillatorSettings | OscillatorSettings & OscillatorDetuneSetting;
    let newOscillatorSettings: OscillatorSettings | OscillatorSettings & OscillatorDetuneSetting;
    const updatedOscillatorSettings: OscillatorSettings = {
        enabled: true,
        octave: 1,
        pan: 0,
        type: 'sine',
        volume: 1,
    };

    beforeEach(() => {
        resetOscillatorConfigs();
    });

    it('sets settings for osc1', () => {
        oscillatorId = 'osc1';
        defaultOscillatorSettings = getOscillatorsConfigs().osc1.settings;
        setOscillatorSettingsByOscillatorId(oscillatorId, updatedOscillatorSettings);
        newOscillatorSettings = getOscillatorsConfigs().osc1.settings;
        expect(newOscillatorSettings).not.toMatchObject(defaultOscillatorSettings);
        expect(newOscillatorSettings).toMatchObject(updatedOscillatorSettings);
    });

    it('sets settings for osc2', () => {
        oscillatorId = 'osc2';
        defaultOscillatorSettings = getOscillatorsConfigs().osc2.settings;
        setOscillatorSettingsByOscillatorId(oscillatorId, updatedOscillatorSettings);
        newOscillatorSettings = getOscillatorsConfigs().osc2.settings;
        expect(newOscillatorSettings).not.toMatchObject(defaultOscillatorSettings);
        expect(newOscillatorSettings).toMatchObject(updatedOscillatorSettings);
    });

    it('sets settings for oscSub', () => {
        oscillatorId = 'oscSub';
        defaultOscillatorSettings = getOscillatorsConfigs().oscSub.settings;
        setOscillatorSettingsByOscillatorId(oscillatorId, updatedOscillatorSettings);
        newOscillatorSettings = getOscillatorsConfigs().oscSub.settings;
        expect(newOscillatorSettings).not.toMatchObject(defaultOscillatorSettings);
        expect(newOscillatorSettings).toMatchObject(updatedOscillatorSettings);
    });

    it('does not set settings for invalid oscillatorId', () => {
        oscillatorId = 'invalidOscillatorId' as OscillatorId;
        const defaultOsc1Settings = getOscillatorsConfigs().osc1.settings;
        const defaultOsc2Settings = getOscillatorsConfigs().osc2.settings;
        const defaultOscSubSettings = getOscillatorsConfigs().oscSub.settings;
        setOscillatorSettingsByOscillatorId(oscillatorId, updatedOscillatorSettings);

        expect(getOscillatorsConfigs().osc1.settings).toMatchObject(defaultOsc1Settings);
        expect(getOscillatorsConfigs().osc2.settings).toMatchObject(defaultOsc2Settings);
        expect(getOscillatorsConfigs().oscSub.settings).toMatchObject(defaultOscSubSettings);
    });
});


describe('getOscillatorsConfigs', () => {
    const gainNode = mockAudioContext.createGain();
    const panNode = mockAudioContext.createStereoPanner();
    const defaultOscillatorConfigs: {
        [key in OscillatorId]: Oscillator
    } = {
        osc1: {
            panNode: undefined,
            gainNode: undefined,
            settings: {
                ...OSC_1_INITIAL_SETTINGS,
            },
        },
        osc2: {
            panNode: undefined,
            gainNode: undefined,
            settings: {
                ...OSC_2_INITIAL_SETTINGS,
            },
        },
        oscSub: {
            panNode: undefined,
            gainNode: undefined,
            settings: {
                ...OSC_SUB_INITIAL_SETTINGS,
            },
        },
    };

    const updatedOscillatorConfigs: {
        [key in OscillatorId]: Oscillator
    } = {
        osc1: {
            panNode,
            gainNode,
            settings: {
                ...OSC_1_INITIAL_SETTINGS,
            },
        },
        osc2: {
            panNode,
            gainNode,
            settings: {
                ...OSC_2_INITIAL_SETTINGS,
            },
        },
        oscSub: {
            panNode,
            gainNode,
            settings: {
                ...OSC_SUB_INITIAL_SETTINGS,
            },
        },
    };

    beforeEach(() => {
        resetOscillatorConfigs();
    });

    it('returns default oscillator configs', () => {
        expect(getOscillatorsConfigs()).toMatchObject(defaultOscillatorConfigs);
    });

    it('returns updated oscillator configs', () => {
        setOscillatorGainNodeByOscillatorId('osc1', gainNode);
        setOscillatorGainNodeByOscillatorId('osc2', gainNode);
        setOscillatorGainNodeByOscillatorId('oscSub', gainNode);
        setOscillatorPanNodeByOscillatorId('osc1', panNode);
        setOscillatorPanNodeByOscillatorId('osc2', panNode);
        setOscillatorPanNodeByOscillatorId('oscSub', panNode);
        expect(getOscillatorsConfigs()).toMatchObject(updatedOscillatorConfigs);
    });
});


describe('resetOscillatorConfigs', () => {
    const gainNode = mockAudioContext.createGain();
    const panNode = mockAudioContext.createStereoPanner();
    const defaultOscillatorConfigs: {
        [key in OscillatorId]: Oscillator
    } = {
        osc1: {
            panNode: undefined,
            gainNode: undefined,
            settings: {
                ...OSC_1_INITIAL_SETTINGS,
            },
        },
        osc2: {
            panNode: undefined,
            gainNode: undefined,
            settings: {
                ...OSC_2_INITIAL_SETTINGS,
            },
        },
        oscSub: {
            panNode: undefined,
            gainNode: undefined,
            settings: {
                ...OSC_SUB_INITIAL_SETTINGS,
            },
        },
    };

    it('resets default oscillators configs to default', () => {
        resetOscillatorConfigs();
        expect(getOscillatorsConfigs()).toMatchObject(defaultOscillatorConfigs);
    });

    it('resets updated oscillator configs', () => {
        setOscillatorGainNodeByOscillatorId('osc1', gainNode);
        setOscillatorGainNodeByOscillatorId('osc2', gainNode);
        setOscillatorGainNodeByOscillatorId('oscSub', gainNode);
        setOscillatorPanNodeByOscillatorId('osc1', panNode);
        setOscillatorPanNodeByOscillatorId('osc2', panNode);
        setOscillatorPanNodeByOscillatorId('oscSub', panNode);
        resetOscillatorConfigs();
        expect(getOscillatorsConfigs()).toMatchObject(defaultOscillatorConfigs);
    });
});


describe('getOscillatorsNodes', () => {
    const mockOscillatorNode = {
        start: jest.fn().mockReturnThis(),
        stop: jest.fn().mockReturnThis(),
        connect: jest.fn().mockReturnThis(),
        disconnect: jest.fn().mockReturnThis(),
        detune: {
            value: 0,
        },
        frequency: {
            value: 220,
        },
        type: 'sine',
    };

    const defaultOscillatorNodes: {
        [frequency: string]: {
            [T: string]: OscillatorNode[];
        }
    } = {};

    const activeOscillatorNodes: {
        [frequency: string]: {
            [T: string]: OscillatorNode[];
        }
    } = {
        440: {
            osc1: [mockOscillatorNode as unknown as OscillatorNode],
            osc2: [mockOscillatorNode as unknown as OscillatorNode],
            oscSub: [mockOscillatorNode as unknown as OscillatorNode],
        },
    };

    beforeEach(() => {
        jest.resetAllMocks();
        jest.spyOn(oscillators, 'startOscillators').mockImplementation(() => {});
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('returns default oscillator nodes', () => {
        expect(getOscillatorsNodes()).toMatchObject(defaultOscillatorNodes);
    });

    it('returns active oscillator nodes', () => {
        const oscillatorFrequency = 440;
        startOscillators(oscillatorFrequency);
        expect(JSON.stringify(getOscillatorsNodes())).toBe(JSON.stringify(activeOscillatorNodes));
    });
});


describe('resetOscillatorNodes', () => {
    const mockOscillatorNode = {
        start: jest.fn().mockReturnThis(),
        stop: jest.fn().mockReturnThis(),
        connect: jest.fn().mockReturnThis(),
        disconnect: jest.fn().mockReturnThis(),
        detune: {
            value: 0,
        },
        frequency: {
            value: 220,
        },
        type: 'sine',
    };

    const defaultOscillatorNodes: {
        [frequency: string]: {
            [T: string]: OscillatorNode[];
        }
    } = {};

    const activeOscillatorNodes: {
        [frequency: string]: {
            [T: string]: OscillatorNode[];
        }
    } = {
        440: {
            osc1: [mockOscillatorNode as unknown as OscillatorNode],
            osc2: [mockOscillatorNode as unknown as OscillatorNode],
            oscSub: [mockOscillatorNode as unknown as OscillatorNode],
        },
    };

    it('starts oscillators, resets oscillators, and returns default oscillator nodes', () => {
        const oscillatorFrequency = 440;
        startOscillators(oscillatorFrequency);
        expect(JSON.stringify(getOscillatorsNodes())).toBe(JSON.stringify(activeOscillatorNodes));
        resetOscillatorNodes();
        expect(getOscillatorsNodes()).toMatchObject(defaultOscillatorNodes);
    });
});
