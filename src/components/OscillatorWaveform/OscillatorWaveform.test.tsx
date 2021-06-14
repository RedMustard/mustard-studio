import { h } from 'preact';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { OscillatorWaveform } from './OscillatorWaveform';
import { OscillatorId } from '../../types/types';
import { getInitialState, StudioServiceContext } from '../../lib/studioService/StudioServiceStore';
import { setOscillatorAnalyserNode } from '../../lib/studioService/studioServiceActions';


jest.mock('../../lib/studioService/studioServiceActions');

// eslint-disable-next-line import/newline-after-import
const wamock = require('web-audio-mock-api');
const audioContext = new wamock.AudioContext();
const baseProps = {
    audioContext,
    oscillatorId: 'osc1' as OscillatorId,
};
const mockAnalyserNode = {
    connect: jest.fn().mockReturnThis(),
    getByteTimeDomainData: jest.fn().mockReturnThis(),
    fftSize: 0,
};
const initialState = {
    ...getInitialState(),
    oscillators: {
        osc1: {
            analyserNode: mockAnalyserNode,
        },
    },
};

describe('<OscillatorWaveform />', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.spyOn(audioContext, 'createAnalyser').mockImplementation(() => mockAnalyserNode);
    });

    it('renders with basic props', () => {
        const wrapper = shallow(
            <OscillatorWaveform
                {...baseProps}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('calls setOscillatorAnalyserNode when oscillatorAnalyserNode undefined', () => {
        shallow(
            <OscillatorWaveform
                {...baseProps}
            />,
        );
        expect(audioContext.createAnalyser).toBeCalled();
        expect(setOscillatorAnalyserNode).toBeCalled();
        expect(mockAnalyserNode.fftSize).toBe(2048);
    });

    it('does not call setOscillatorAnalyserNode when oscillatorAnalyserNode exists', () => {
        shallow(
            <StudioServiceContext.Provider value={[initialState, jest.fn()]}>
                <OscillatorWaveform
                    {...baseProps}
                />
            </StudioServiceContext.Provider>,
        );
        expect(audioContext.createAnalyser).not.toBeCalled();
        expect(setOscillatorAnalyserNode).not.toBeCalled();
    });

    it('renders when oscillatorAnalyserNode exists', () => {
        const wrapper = shallow(
            <StudioServiceContext.Provider value={[initialState, jest.fn()]}>
                <OscillatorWaveform
                    {...baseProps}
                />
            </StudioServiceContext.Provider>,
        );
        expect(wrapper).toMatchSnapshot();
    });
});
