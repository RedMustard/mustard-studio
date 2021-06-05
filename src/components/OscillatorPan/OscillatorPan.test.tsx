import { h } from 'preact';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { OscillatorPan } from './OscillatorPan';
import { setOscillatorPanPosition, setOscillatorPanNode, resetOscillatorPanPosition } from '../../lib/studioService/studioServiceActions';
import { getInitialState, StudioServiceContext } from '../../lib/studioService/StudioServiceStore';
import { OscillatorId } from '../../types/types';


jest.mock('../../lib/studioService/studioServiceActions');

// eslint-disable-next-line import/newline-after-import
const wamock = require('web-audio-mock-api');
const audioContext = new wamock.AudioContext();
const baseProps = {
    audioContext,
    oscillatorId: 'osc1' as OscillatorId,
};
const mockPanNode = {
    connect: jest.fn().mockReturnThis(),
    pan: {
        value: 1.0,
    },
};
const mockGainNode = {
    connect: jest.fn().mockReturnThis(),
    gain: {
        value: 1.0,
    },
};
const initialState = {
    ...getInitialState(),
    oscillators: {
        osc1: {
            panNode: mockPanNode,
            gainNode: mockGainNode,
            settings: {
                pan: 0.5,
            },
        },
    },
};

describe('<OscillatorPan />', () => {
    beforeEach(() => {
        jest.spyOn(audioContext, 'createStereoPanner').mockImplementation(() => mockPanNode);
    });

    it('renders with basic props', () => {
        const wrapper = shallow(
            <OscillatorPan
                {...baseProps}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('calls setOscillatorPanNode if oscillatorPanNode does not exist', () => {
        shallow(
            <OscillatorPan
                {...baseProps}
            />,
        );
        expect(audioContext.createStereoPanner).toBeCalled();
        expect(setOscillatorPanNode).toBeCalled();
    });

    it('calls setOscillatorPanPosition when pan changed', () => {
        const wrapper = mount(
            <OscillatorPan
                {...baseProps}
            />,
        );
        wrapper.find('input').simulate('input');
        expect(setOscillatorPanPosition).toBeCalled();
    });

    it('sets mockPanNode.pan.value, connects mockPanNode to master gain node if OscillatorPanNode exists', () => {
        mount(
            <StudioServiceContext.Provider value={[initialState, jest.fn()]}>
                <OscillatorPan
                    {...baseProps}
                />
            </StudioServiceContext.Provider>,
        );
        expect(mockGainNode.connect).toBeCalled();
        expect(mockPanNode.connect).toBeCalled();
        expect(mockPanNode.pan.value).toBe(initialState.oscillators.osc1.settings.pan);
    });

    it('calls resetOscillatorPanPosition when ctrl clicked', () => {
        const wrapper = mount(
            <OscillatorPan
                {...baseProps}
            />,
        );
        wrapper.find('input').simulate('mousedown', { buttons: 1, ctrlKey: true });
        expect(resetOscillatorPanPosition).toBeCalled();
    });

    it('calls resetOscillatorPanPosition when cmd clicked', () => {
        const wrapper = mount(
            <OscillatorPan
                {...baseProps}
            />,
        );
        wrapper.find('input').simulate('mousedown', { buttons: 1, metaKey: true });
        expect(resetOscillatorPanPosition).toBeCalled();
    });

    it('does not call resetOscillatorPanPosition when not ctrl or cmd clicked', () => {
        const wrapper = mount(
            <OscillatorPan
                {...baseProps}
            />,
        );
        wrapper.find('input').simulate('mousedown', { buttons: 1 });
        expect(resetOscillatorPanPosition).toBeCalled();
    });
});
