import { OscillatorId } from '../../types/types';
import {
    setMasterVolume,
    setMasterGainNode,
    setOscillatorEnabled,
    setOscillatorType,
    setOscillatorVolume,
    setOscillatorGainNode,
    setOscillatorDetune,
} from './studioServiceActions';


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
        const gainNode: GainNode = undefined;

        setMasterGainNode(gainNode, dispatch);
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
    it('does not call dispatch for unknown oscillatorId', () => {
        const dispatch = jest.fn();
        const value = 1.0;
        const oscillatorId = 'foo' as OscillatorId;

        setOscillatorVolume(value, oscillatorId, dispatch);
        expect(dispatch).not.toBeCalled();
    });
});


describe('setOscillatorGainNode', () => {
    it('calls dispatch for oscillator 1', () => {
        const dispatch = jest.fn();
        const gainNode: GainNode = undefined;
        const oscillatorId: OscillatorId = 'osc1';

        setOscillatorGainNode(gainNode, oscillatorId, dispatch);
        expect(dispatch).toBeCalled();
    });
    it('calls dispatch for oscillator 2', () => {
        const dispatch = jest.fn();
        const gainNode: GainNode = undefined;
        const oscillatorId: OscillatorId = 'osc2';

        setOscillatorGainNode(gainNode, oscillatorId, dispatch);
        expect(dispatch).toBeCalled();
    });
    it('does not call dispatch for unknown oscillatorId', () => {
        const dispatch = jest.fn();
        const gainNode: GainNode = undefined;
        const oscillatorId = 'foo' as OscillatorId;

        setOscillatorGainNode(gainNode, oscillatorId, dispatch);
        expect(dispatch).not.toBeCalled();
    });
});


describe('setOscillatorEnabled', () => {
    it('calls dispatch for osc1', () => {
        const dispatch = jest.fn();
        const oscillatorId: OscillatorId = 'osc1';
        const isEnabled = true;

        setOscillatorEnabled(isEnabled, oscillatorId, dispatch);
        expect(dispatch).toBeCalled();
    });

    it('calls dispatch for osc2', () => {
        const dispatch = jest.fn();
        const oscillatorId: OscillatorId = 'osc2';
        const isEnabled = true;

        setOscillatorEnabled(isEnabled, oscillatorId, dispatch);
        expect(dispatch).toBeCalled();
    });

    it('does not call dispatch for unknown oscillatorId', () => {
        const dispatch = jest.fn();
        const oscillatorId = 'foo' as OscillatorId;
        const isEnabled = true;

        setOscillatorEnabled(isEnabled, oscillatorId, dispatch);
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
