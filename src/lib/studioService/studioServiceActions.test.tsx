import { mockStudioService } from '../../tests/__mocks__/studioServiceMock';
import { OscillatorId } from '../../types/types';
import { stopOscillatorById } from '../oscillators/oscillators';
import {
    setMasterVolume,
    setMasterGainNode,
    setOscillatorEnabled,
    setOscillatorType,
    setOscillatorVolume,
    setOscillatorGainNode,
    setOscillatorDetune,
    setMasterPanNode,
    setMasterPanPosition,
    setOscillatorPanNode,
    setOscillatorPanPosition,
    setOscillatorOctave,
    resetOscillatorVolume,
    resetOscillatorDetune,
    resetOscillatorPanPosition,
    resetOscillatorOctave,
    resetMasterVolume,
    resetMasterPanPosition,
    setOscillatorAnalyserNode,
    setEnvelopeAttack,
    setEnvelopeSustain,
    setEnvelopeDecay,
    setEnvelopeRelease,
    resetEnvelopeAttack,
    resetEnvelopeSustain,
    resetEnvelopeRelease,
    resetEnvelopeDecay,
} from './studioServiceActions';


// eslint-disable-next-line import/newline-after-import
const wamock = require('web-audio-mock-api');
const audioContext = new wamock.AudioContext();
jest.mock('../../lib/oscillators/oscillators');


describe('setMasterVolume', () => {
    it('calls dispatch', () => {
        const dispatch = jest.fn();
        const value = 1.0;
        setMasterVolume(value, dispatch);
        expect(dispatch).toBeCalled();
    });
});


describe('setMasterGainNode', () => {
    it('calls dispatch', () => {
        const dispatch = jest.fn();
        const gainNode: GainNode = audioContext.createGain();
        setMasterGainNode(gainNode, dispatch);
        expect(dispatch).toBeCalled();
    });
});


describe('setMasterPanNode', () => {
    it('calls dispatch', () => {
        const dispatch = jest.fn();
        const panNode: StereoPannerNode = audioContext.createStereoPanner();
        setMasterPanNode(panNode, dispatch);
        expect(dispatch).toBeCalled();
    });
});

describe('setMasterPanPosition', () => {
    it('calls dispatch', () => {
        const dispatch = jest.fn();
        const panPosition: number = 0.5;
        setMasterPanPosition(panPosition, dispatch);
        expect(dispatch).toBeCalled();
    });
});


describe('resetMasterVolume', () => {
    it('calls dispatch', () => {
        const dispatch = jest.fn();
        resetMasterVolume(dispatch);
        expect(dispatch).toBeCalled();
    });
});


describe('resetMasterPanPosition', () => {
    it('calls dispatch', () => {
        const dispatch = jest.fn();
        resetMasterPanPosition(dispatch);
        expect(dispatch).toBeCalled();
    });
});


describe('setEnvelopeAttack', () => {
    it('calls dispatch', () => {
        const dispatch = jest.fn();
        const value: number = 0.5;
        setEnvelopeAttack(value, dispatch);
        expect(dispatch).toBeCalled();
    });
});


describe('setEnvelopeSustain', () => {
    it('calls dispatch', () => {
        const dispatch = jest.fn();
        const value: number = 0.5;
        setEnvelopeSustain(value, dispatch);
        expect(dispatch).toBeCalled();
    });
});


describe('setEnvelopeDecay', () => {
    it('calls dispatch', () => {
        const dispatch = jest.fn();
        const value: number = 0.5;
        setEnvelopeDecay(value, dispatch);
        expect(dispatch).toBeCalled();
    });
});


describe('setEnvelopeRelease', () => {
    it('calls dispatch', () => {
        const dispatch = jest.fn();
        const value: number = 0.5;
        setEnvelopeRelease(value, dispatch);
        expect(dispatch).toBeCalled();
    });
});


describe('resetEnvelopeAttack', () => {
    it('calls dispatch', () => {
        const dispatch = jest.fn();
        resetEnvelopeAttack(dispatch);
        expect(dispatch).toBeCalled();
    });
});


describe('resetEnvelopeSustain', () => {
    it('calls dispatch', () => {
        const dispatch = jest.fn();
        resetEnvelopeSustain(dispatch);
        expect(dispatch).toBeCalled();
    });
});


describe('resetEnvelopeDecay', () => {
    it('calls dispatch', () => {
        const dispatch = jest.fn();
        resetEnvelopeDecay(dispatch);
        expect(dispatch).toBeCalled();
    });
});


describe('resetEnvelopeRelease', () => {
    it('calls dispatch', () => {
        const dispatch = jest.fn();
        resetEnvelopeRelease(dispatch);
        expect(dispatch).toBeCalled();
    });
});


describe('setOscillatorVolume', () => {
    it('calls dispatch for oscillator 1', () => {
        const dispatch = jest.fn();
        const value = 1.0;
        const oscillatorId: OscillatorId = 'osc1';
        setOscillatorVolume(value, oscillatorId, dispatch);
        expect(dispatch).toBeCalled();
    });

    it('calls dispatch for oscillator 2', () => {
        const dispatch = jest.fn();
        const value = 1.0;
        const oscillatorId: OscillatorId = 'osc2';
        setOscillatorVolume(value, oscillatorId, dispatch);
        expect(dispatch).toBeCalled();
    });

    it('calls dispatch for oscillator sub', () => {
        const dispatch = jest.fn();
        const value = 1.0;
        const oscillatorId: OscillatorId = 'oscSub';
        setOscillatorVolume(value, oscillatorId, dispatch);
        expect(dispatch).toBeCalled();
    });

    it('does not call dispatch for unknown oscillatorId', () => {
        const dispatch = jest.fn();
        const value = 1.0;
        const oscillatorId = 'foo' as OscillatorId;
        setOscillatorVolume(value, oscillatorId, dispatch);
        expect(dispatch).not.toBeCalled();
    });
});


describe('setOscillatorAnalyserNode', () => {
    it('calls dispatch for oscillator 1', () => {
        const dispatch = jest.fn();
        const analyserNode: AnalyserNode = audioContext.createAnalyser();
        const oscillatorId: OscillatorId = 'osc1';
        setOscillatorAnalyserNode(analyserNode, oscillatorId, dispatch);
        expect(dispatch).toBeCalled();
    });

    it('calls dispatch for oscillator 2', () => {
        const dispatch = jest.fn();
        const analyserNode: AnalyserNode = audioContext.createAnalyser();
        const oscillatorId: OscillatorId = 'osc2';
        setOscillatorAnalyserNode(analyserNode, oscillatorId, dispatch);
        expect(dispatch).toBeCalled();
    });

    it('calls dispatch for oscillator sub', () => {
        const dispatch = jest.fn();
        const analyserNode: AnalyserNode = audioContext.createAnalyser();
        const oscillatorId: OscillatorId = 'oscSub';
        setOscillatorAnalyserNode(analyserNode, oscillatorId, dispatch);
        expect(dispatch).toBeCalled();
    });

    it('does not call dispatch for unknown oscillatorId', () => {
        const dispatch = jest.fn();
        const analyserNode: AnalyserNode = audioContext.createAnalyser();
        const oscillatorId = 'foo' as OscillatorId;
        setOscillatorAnalyserNode(analyserNode, oscillatorId, dispatch);
        expect(dispatch).not.toBeCalled();
    });
});

describe('setOscillatorGainNode', () => {
    it('calls dispatch for oscillator 1', () => {
        const dispatch = jest.fn();
        const gainNode: GainNode = audioContext.createGain();
        const oscillatorId: OscillatorId = 'osc1';
        setOscillatorGainNode(gainNode, oscillatorId, dispatch);
        expect(dispatch).toBeCalled();
    });

    it('calls dispatch for oscillator 2', () => {
        const dispatch = jest.fn();
        const gainNode: GainNode = audioContext.createGain();
        const oscillatorId: OscillatorId = 'osc2';
        setOscillatorGainNode(gainNode, oscillatorId, dispatch);
        expect(dispatch).toBeCalled();
    });

    it('calls dispatch for oscillator sub', () => {
        const dispatch = jest.fn();
        const gainNode: GainNode = audioContext.createGain();
        const oscillatorId: OscillatorId = 'oscSub';
        setOscillatorGainNode(gainNode, oscillatorId, dispatch);
        expect(dispatch).toBeCalled();
    });

    it('does not call dispatch for unknown oscillatorId', () => {
        const dispatch = jest.fn();
        const gainNode: GainNode = audioContext.createGain();
        const oscillatorId = 'foo' as OscillatorId;
        setOscillatorGainNode(gainNode, oscillatorId, dispatch);
        expect(dispatch).not.toBeCalled();
    });
});


describe('setOscillatorEnabled', () => {
    it('calls dispatch and stopOscillatorById for osc1', () => {
        const dispatch = jest.fn();
        const oscillatorId: OscillatorId = 'osc1';
        const isEnabled = true;
        setOscillatorEnabled(isEnabled, oscillatorId, dispatch, mockStudioService);
        expect(dispatch).toBeCalled();
        expect(stopOscillatorById).toBeCalled();
    });

    it('calls dispatch and stopOscillatorById for osc2', () => {
        const dispatch = jest.fn();
        const oscillatorId: OscillatorId = 'osc2';
        const isEnabled = true;
        setOscillatorEnabled(isEnabled, oscillatorId, dispatch, mockStudioService);
        expect(dispatch).toBeCalled();
        expect(stopOscillatorById).toBeCalled();
    });

    it('calls dispatch and stopOscillatorById for oscSub', () => {
        const dispatch = jest.fn();
        const oscillatorId: OscillatorId = 'oscSub';
        const isEnabled = true;
        setOscillatorEnabled(isEnabled, oscillatorId, dispatch, mockStudioService);
        expect(dispatch).toBeCalled();
        expect(stopOscillatorById).toBeCalled();
    });

    it('does not call dispatch for unknown oscillatorId', () => {
        const dispatch = jest.fn();
        const oscillatorId = 'foo' as OscillatorId;
        const isEnabled = true;
        setOscillatorEnabled(isEnabled, oscillatorId, dispatch, mockStudioService);
        expect(dispatch).not.toBeCalled();
    });
});


describe('setOscillatorType', () => {
    it('calls dispatch for osc1', () => {
        const dispatch = jest.fn();
        const oscillatorType: OscillatorType = 'sawtooth';
        const oscillatorId: OscillatorId = 'osc1';
        setOscillatorType(oscillatorType, oscillatorId, dispatch);
        expect(dispatch).toBeCalled();
    });

    it('calls dispatch for osc2', () => {
        const dispatch = jest.fn();
        const oscillatorType: OscillatorType = 'sawtooth';
        const oscillatorId: OscillatorId = 'osc2';
        setOscillatorType(oscillatorType, oscillatorId, dispatch);
        expect(dispatch).toBeCalled();
    });

    it('calls dispatch for oscSub', () => {
        const dispatch = jest.fn();
        const oscillatorType: OscillatorType = 'sawtooth';
        const oscillatorId: OscillatorId = 'oscSub';
        setOscillatorType(oscillatorType, oscillatorId, dispatch);
        expect(dispatch).toBeCalled();
    });

    it('does not call dispatch for unknown oscillatorId', () => {
        const dispatch = jest.fn();
        const oscillatorType: OscillatorType = 'sawtooth';
        const oscillatorId: OscillatorId = 'foo' as OscillatorId;

        setOscillatorType(oscillatorType, oscillatorId, dispatch);
        expect(dispatch).not.toBeCalled();
    });
});


describe('setOscillatorDetune', () => {
    it('calls dispatch for osc1', () => {
        const dispatch = jest.fn();
        const detuneValue = 400;
        const oscillatorId: OscillatorId = 'osc1';
        setOscillatorDetune(detuneValue, oscillatorId, dispatch);
        expect(dispatch).toBeCalled();
    });

    it('calls dispatch for osc2', () => {
        const dispatch = jest.fn();
        const detuneValue = 400;
        const oscillatorId: OscillatorId = 'osc2';
        setOscillatorDetune(detuneValue, oscillatorId, dispatch);
        expect(dispatch).toBeCalled();
    });

    it('does not call dispatch for unknown oscillatorId', () => {
        const dispatch = jest.fn();
        const detuneValue = 400;
        const oscillatorId: OscillatorId = 'foo' as OscillatorId;
        setOscillatorDetune(detuneValue, oscillatorId, dispatch);
        expect(dispatch).not.toBeCalled();
    });
});


describe('setOscillatorPanNode', () => {
    it('calls dispatch for osc1', () => {
        const dispatch = jest.fn();
        const panNode: StereoPannerNode = audioContext.createStereoPanner();
        const oscillatorId: OscillatorId = 'osc1';
        setOscillatorPanNode(panNode, oscillatorId, dispatch);
        expect(dispatch).toBeCalled();
    });

    it('calls dispatch for osc2', () => {
        const dispatch = jest.fn();
        const panNode: StereoPannerNode = audioContext.createStereoPanner();
        const oscillatorId: OscillatorId = 'osc2';
        setOscillatorPanNode(panNode, oscillatorId, dispatch);
        expect(dispatch).toBeCalled();
    });

    it('calls dispatch for oscSub', () => {
        const dispatch = jest.fn();
        const panNode: StereoPannerNode = audioContext.createStereoPanner();
        const oscillatorId: OscillatorId = 'oscSub';
        setOscillatorPanNode(panNode, oscillatorId, dispatch);
        expect(dispatch).toBeCalled();
    });

    it('does not call dispatch for unknown oscillatorId', () => {
        const dispatch = jest.fn();
        const panNode: StereoPannerNode = audioContext.createStereoPanner();
        const oscillatorId: OscillatorId = 'foo' as OscillatorId;
        setOscillatorPanNode(panNode, oscillatorId, dispatch);
        expect(dispatch).not.toBeCalled();
    });
});


describe('setOscillatorPanPosition', () => {
    it('calls dispatch for osc1', () => {
        const dispatch = jest.fn();
        const panPosition = 0.8;
        const oscillatorId: OscillatorId = 'osc1';
        setOscillatorPanPosition(panPosition, oscillatorId, dispatch);
        expect(dispatch).toBeCalled();
    });

    it('calls dispatch for osc2', () => {
        const dispatch = jest.fn();
        const panPosition = 0.8;
        const oscillatorId: OscillatorId = 'osc2';
        setOscillatorPanPosition(panPosition, oscillatorId, dispatch);
        expect(dispatch).toBeCalled();
    });

    it('calls dispatch for oscSub', () => {
        const dispatch = jest.fn();
        const panPosition = 0.8;
        const oscillatorId: OscillatorId = 'oscSub';
        setOscillatorPanPosition(panPosition, oscillatorId, dispatch);
        expect(dispatch).toBeCalled();
    });

    it('does not call dispatch for unknown oscillatorId', () => {
        const dispatch = jest.fn();
        const panPosition = 0.8;
        const oscillatorId: OscillatorId = 'foo' as OscillatorId;
        setOscillatorPanPosition(panPosition, oscillatorId, dispatch);
        expect(dispatch).not.toBeCalled();
    });
});


describe('setOscillatorOctave', () => {
    it('calls dispatch for osc1', () => {
        const dispatch = jest.fn();
        const octave = 2;
        const oscillatorId: OscillatorId = 'osc1';
        setOscillatorOctave(octave, oscillatorId, dispatch);
        expect(dispatch).toBeCalled();
    });

    it('calls dispatch for osc2', () => {
        const dispatch = jest.fn();
        const octave = 2;
        const oscillatorId: OscillatorId = 'osc2';
        setOscillatorOctave(octave, oscillatorId, dispatch);
        expect(dispatch).toBeCalled();
    });

    it('calls dispatch for oscSub', () => {
        const dispatch = jest.fn();
        const octave = 2;
        const oscillatorId: OscillatorId = 'oscSub';
        setOscillatorOctave(octave, oscillatorId, dispatch);
        expect(dispatch).toBeCalled();
    });

    it('does not call dispatch for unknown oscillatorId', () => {
        const dispatch = jest.fn();
        const octave = 2;
        const oscillatorId: OscillatorId = 'foo' as OscillatorId;
        setOscillatorOctave(octave, oscillatorId, dispatch);
        expect(dispatch).not.toBeCalled();
    });
});


describe('resetOscillatorVolume', () => {
    it('calls dispatch for oscillator 1', () => {
        const dispatch = jest.fn();
        const oscillatorId: OscillatorId = 'osc1';
        resetOscillatorVolume(oscillatorId, dispatch);
        expect(dispatch).toBeCalled();
    });

    it('calls dispatch for oscillator 2', () => {
        const dispatch = jest.fn();
        const oscillatorId: OscillatorId = 'osc2';
        resetOscillatorVolume(oscillatorId, dispatch);
        expect(dispatch).toBeCalled();
    });

    it('calls dispatch for oscillator sub', () => {
        const dispatch = jest.fn();
        const oscillatorId: OscillatorId = 'oscSub';
        resetOscillatorVolume(oscillatorId, dispatch);
        expect(dispatch).toBeCalled();
    });

    it('does not call dispatch for unknown oscillatorId', () => {
        const dispatch = jest.fn();
        const oscillatorId = 'foo' as OscillatorId;
        resetOscillatorVolume(oscillatorId, dispatch);
        expect(dispatch).not.toBeCalled();
    });
});


describe('resetOscillatorDetune', () => {
    it('calls dispatch for osc1', () => {
        const dispatch = jest.fn();
        const oscillatorId: OscillatorId = 'osc1';
        resetOscillatorDetune(oscillatorId, dispatch);
        expect(dispatch).toBeCalled();
    });

    it('calls dispatch for osc2', () => {
        const dispatch = jest.fn();
        const oscillatorId: OscillatorId = 'osc2';
        resetOscillatorDetune(oscillatorId, dispatch);
        expect(dispatch).toBeCalled();
    });

    it('does not call dispatch for unknown oscillatorId', () => {
        const dispatch = jest.fn();
        const oscillatorId: OscillatorId = 'foo' as OscillatorId;
        resetOscillatorDetune(oscillatorId, dispatch);
        expect(dispatch).not.toBeCalled();
    });
});


describe('resetOscillatorPanPosition', () => {
    it('calls dispatch for osc1', () => {
        const dispatch = jest.fn();
        const oscillatorId: OscillatorId = 'osc1';
        resetOscillatorPanPosition(oscillatorId, dispatch);
        expect(dispatch).toBeCalled();
    });

    it('calls dispatch for osc2', () => {
        const dispatch = jest.fn();
        const oscillatorId: OscillatorId = 'osc2';
        resetOscillatorPanPosition(oscillatorId, dispatch);
        expect(dispatch).toBeCalled();
    });

    it('calls dispatch for oscSub', () => {
        const dispatch = jest.fn();
        const oscillatorId: OscillatorId = 'oscSub';
        resetOscillatorPanPosition(oscillatorId, dispatch);
        expect(dispatch).toBeCalled();
    });

    it('does not call dispatch for unknown oscillatorId', () => {
        const dispatch = jest.fn();
        const oscillatorId: OscillatorId = 'foo' as OscillatorId;
        resetOscillatorPanPosition(oscillatorId, dispatch);
        expect(dispatch).not.toBeCalled();
    });
});


describe('resetOscillatorOctave', () => {
    it('calls dispatch for osc1', () => {
        const dispatch = jest.fn();
        const oscillatorId: OscillatorId = 'osc1';
        resetOscillatorOctave(oscillatorId, dispatch);
        expect(dispatch).toBeCalled();
    });

    it('calls dispatch for osc2', () => {
        const dispatch = jest.fn();
        const oscillatorId: OscillatorId = 'osc2';
        resetOscillatorOctave(oscillatorId, dispatch);
        expect(dispatch).toBeCalled();
    });

    it('calls dispatch for oscSub', () => {
        const dispatch = jest.fn();
        const oscillatorId: OscillatorId = 'oscSub';
        resetOscillatorOctave(oscillatorId, dispatch);
        expect(dispatch).toBeCalled();
    });

    it('does not call dispatch for unknown oscillatorId', () => {
        const dispatch = jest.fn();
        const oscillatorId: OscillatorId = 'foo' as OscillatorId;
        resetOscillatorOctave(oscillatorId, dispatch);
        expect(dispatch).not.toBeCalled();
    });
});
