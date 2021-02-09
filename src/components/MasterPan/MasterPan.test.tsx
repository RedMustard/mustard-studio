import { h } from 'preact';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MasterPan } from './MasterPan';
import { setMasterPanPosition, setMasterPanNode, resetMasterPanPosition } from '../../lib/studioService/studioServiceActions';
import { getInitialState, StudioServiceContext } from '../../lib/studioService/StudioServiceStore';


jest.mock('../../lib/studioService/studioServiceActions');

// eslint-disable-next-line import/newline-after-import
const wamock = require('web-audio-mock-api');
const audioContext = new wamock.AudioContext();
const baseProps = {
    audioContext,
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
        master: {
            pan: 0.5,
        },
    },
    panNodes: {
        master: mockPanNode,
    },
    gainNodes: {
        master: mockGainNode,
    },
};

describe('<MasterPan />', () => {
    beforeEach(() => {
        jest.spyOn(audioContext, 'createStereoPanner').mockImplementation(() => mockPanNode);
    });
    it('renders with basic props', () => {
        const wrapper = shallow(
            <MasterPan
                {...baseProps}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('calls setMasterPanNode if masterPanNode does not exist', () => {
        shallow(
            <MasterPan
                {...baseProps}
            />,
        );
        expect(audioContext.createStereoPanner).toBeCalled();
        expect(setMasterPanNode).toBeCalled();
    });

    it('calls setMasterPanPosition when pan changed', () => {
        const wrapper = mount(
            <MasterPan
                {...baseProps}
            />,
        );
        wrapper.find('input').simulate('input');
        expect(setMasterPanPosition).toBeCalled();
    });

    it('sets mockPanNode.pan.value and connects to master gain node if masterPanNode exists', () => {
        mount(
            <StudioServiceContext.Provider value={[initialState, jest.fn()]}>
                <MasterPan
                    {...baseProps}
                />
            </StudioServiceContext.Provider>,
        );
        expect(mockGainNode.connect).toBeCalled();
        expect(mockPanNode.connect).toBeCalled();
        expect(mockPanNode.pan.value).toBe(initialState.settings.master.pan);
    });

    it('calls resetMasterPanPosition when ctrl clicked', () => {
        const wrapper = mount(
            <MasterPan
                {...baseProps}
            />,
        );
        wrapper.find('input').simulate('mousedown', { buttons: 1, ctrlKey: true });
        expect(resetMasterPanPosition).toBeCalled();
    });

    it('calls resetMasterPanPosition when cmd clicked', () => {
        const wrapper = mount(
            <MasterPan
                {...baseProps}
            />,
        );
        wrapper.find('input').simulate('mousedown', { buttons: 1, metaKey: true });
        expect(resetMasterPanPosition).toBeCalled();
    });

    it('does not call resetMasterPanPosition when not ctrl or cmd clicked', () => {
        const wrapper = mount(
            <MasterPan
                {...baseProps}
            />,
        );
        wrapper.find('input').simulate('mousedown', { buttons: 1 });
        expect(resetMasterPanPosition).toBeCalled();
    });
});
