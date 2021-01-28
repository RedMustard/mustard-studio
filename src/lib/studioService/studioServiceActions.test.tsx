import { OscillatorId } from '../../types/types';
import { setMasterVolume, setMasterGainNode, setOscillatorEnabled } from './studioServiceActions';

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
        const oscillatorId = 'osc3' as OscillatorId;
        const isEnabled = true;

        setOscillatorEnabled(isEnabled, oscillatorId, dispatch);

        expect(dispatch).not.toBeCalled();
    });
});
