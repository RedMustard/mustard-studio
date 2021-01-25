import { handleChangeMasterVolume, setMasterGainNode } from './studioServiceActions';

describe('handleChangeMasterVolume', () => {
    it('calls dispatch', () => {
        const dispatch = jest.fn();
        const value = 1.0;

        handleChangeMasterVolume(value, dispatch);

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
