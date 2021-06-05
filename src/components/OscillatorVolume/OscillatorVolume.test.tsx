import { h } from 'preact';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { OscillatorVolume } from './OscillatorVolume';
import { resetOscillatorVolume, setOscillatorGainNode, setOscillatorVolume } from '../../lib/studioService/studioServiceActions';
import { OscillatorId } from '../../types/types';
import { getInitialState, StudioServiceContext } from '../../lib/studioService/StudioServiceStore';


jest.mock('../../lib/studioService/studioServiceActions');

// eslint-disable-next-line import/newline-after-import
const wamock = require('web-audio-mock-api');
const audioContext = new wamock.AudioContext();
const baseProps = {
    audioContext,
    oscillatorId: 'osc1' as OscillatorId,
};
const mockGainNode = {
    connect: jest.fn().mockReturnThis(),
    gain: {
        value: 1.0,
    },
};
const initialState = {
    ...getInitialState(),
    master: {
        gainNode: mockGainNode,
    },
    oscillators: {
        osc1: {
            gainNode: mockGainNode,
            settings: {
                volume: 0.25,
            },
        },
    },
};

describe('<OscillatorVolume />', () => {
    beforeEach(() => {
        jest.spyOn(audioContext, 'createGain').mockImplementation(() => mockGainNode);
    });
    it('renders with basic props', () => {
        const wrapper = shallow(
            <OscillatorVolume
                {...baseProps}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('sets oscillatorGainNode.gain.value and calls connect when oscillatorGainNode exists', () => {
        mount(
            <StudioServiceContext.Provider value={[initialState, jest.fn()]}>
                <OscillatorVolume
                    {...baseProps}
                />
            </StudioServiceContext.Provider>,
        );
        expect(mockGainNode.connect).toBeCalled();
        expect(mockGainNode.gain.value).toBe(initialState.oscillators.osc1.settings.volume);
    });

    it('calls setOscillatorGainNode when oscillatorGainNode undefined', () => {
        shallow(
            <OscillatorVolume
                {...baseProps}
            />,
        );
        expect(audioContext.createGain).toBeCalled();
        expect(setOscillatorGainNode).toBeCalled();
    });

    it('calls setOscillatorVolume when volume changed', () => {
        const wrapper = mount(
            <OscillatorVolume
                {...baseProps}
            />,
        );
        wrapper.find('input').simulate('input');
        expect(setOscillatorVolume).toBeCalled();
    });

    it('calls resetOscillatorVolume when ctrl clicked', () => {
        const wrapper = mount(
            <OscillatorVolume
                {...baseProps}
            />,
        );
        wrapper.find('input').simulate('mousedown', { buttons: 1, ctrlKey: true });
        expect(resetOscillatorVolume).toBeCalled();
    });

    it('calls resetOscillatorVolume when cmd clicked', () => {
        const wrapper = mount(
            <OscillatorVolume
                {...baseProps}
            />,
        );
        wrapper.find('input').simulate('mousedown', { buttons: 1, metaKey: true });
        expect(resetOscillatorVolume).toBeCalled();
    });

    it('does not call resetOscillatorVolume when not ctrl or cmd clicked', () => {
        const wrapper = mount(
            <OscillatorVolume
                {...baseProps}
            />,
        );
        wrapper.find('input').simulate('mousedown', { buttons: 1 });
        expect(resetOscillatorVolume).toBeCalled();
    });
});
