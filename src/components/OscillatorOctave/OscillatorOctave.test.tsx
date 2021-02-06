import { h } from 'preact';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { OscillatorOctave } from './OscillatorOctave';
import { setOscillatorPanPosition, setOscillatorPanNode } from '../../lib/studioService/studioServiceActions';
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
    settings: {
        osc1: {
            pan: 0.5,
        },
    },
    panNodes: {
        osc1: mockPanNode,
    },
    gainNodes: {
        osc1: mockGainNode,
    },
};

describe('<OscillatorOctave />', () => {
    beforeEach(() => {
        jest.spyOn(audioContext, 'createStereoPanner').mockImplementation(() => mockPanNode);
    });

    it('renders with basic props', () => {
        const wrapper = shallow(
            <OscillatorOctave
                {...baseProps}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('calls setOscillatorPanNode if oscillatorPanNode does not exist', () => {
        shallow(
            <OscillatorOctave
                {...baseProps}
            />,
        );
        expect(audioContext.createStereoPanner).toBeCalled();
        expect(setOscillatorPanNode).toBeCalled();
    });

    it('calls setOscillatorPanPosition when pan changed', () => {
        const wrapper = mount(
            <OscillatorOctave
                {...baseProps}
            />,
        );
        wrapper.find('input').simulate('input');
        expect(setOscillatorPanPosition).toBeCalled();
    });

    it('sets mockPanNode.pan.value, connects mockPanNode to master gain node if OscillatorPanNode exists', () => {
        mount(
            <StudioServiceContext.Provider value={[initialState, jest.fn()]}>
                <OscillatorOctave
                    {...baseProps}
                />
            </StudioServiceContext.Provider>,
        );
        expect(mockGainNode.connect).toBeCalled();
        expect(mockPanNode.connect).toBeCalled();
        expect(mockPanNode.pan.value).toBe(initialState.settings.osc1.pan);
    });
});
