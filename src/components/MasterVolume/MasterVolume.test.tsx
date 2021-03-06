import { h } from 'preact';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MasterVolume } from './MasterVolume';
import { resetMasterVolume, setMasterGainNode, setMasterVolume } from '../../lib/studioService/studioServiceActions';
import { getInitialState, StudioServiceContext } from '../../lib/studioService/StudioServiceStore';


jest.mock('../../lib/studioService/studioServiceActions');

// eslint-disable-next-line import/newline-after-import
const wamock = require('web-audio-mock-api');
const audioContext = new wamock.AudioContext();
const baseProps = {
    audioContext,
};
const mockGainNode = {
    gain: {
        value: 1.0,
    },
};
const initialState = {
    ...getInitialState(),
    master: {
        settings: {
            volume: 0.25,
        },
        gainNode: mockGainNode,
    },
};

describe('<MasterVolume />', () => {
    it('renders with basic props', () => {
        const wrapper = shallow(
            <MasterVolume
                {...baseProps}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('calls setMasterVolume when volume changed', () => {
        const wrapper = mount(
            <MasterVolume
                {...baseProps}
            />,
        );
        wrapper.find('input').simulate('input');
        expect(setMasterVolume).toBeCalled();
    });

    it('calls setMasterGainNode when masterGainNode undefined', () => {
        shallow(
            <MasterVolume
                {...baseProps}
            />,
        );
        expect(setMasterGainNode).toBeCalled();
    });

    it('sets masterGainNode.gain.value when masterGainNode exists', () => {
        mount(
            <StudioServiceContext.Provider value={[initialState, jest.fn()]}>
                <MasterVolume
                    {...baseProps}
                />
            </StudioServiceContext.Provider>,
        );
        expect(mockGainNode.gain.value).toBe(initialState.master.settings.volume);
    });

    it('calls resetMasterVolume when ctrl clicked', () => {
        const wrapper = mount(
            <MasterVolume
                {...baseProps}
            />,
        );
        wrapper.find('input').simulate('mousedown', { buttons: 1, ctrlKey: true });
        expect(resetMasterVolume).toBeCalled();
    });

    it('calls resetMasterVolume when cmd clicked', () => {
        const wrapper = mount(
            <MasterVolume
                {...baseProps}
            />,
        );
        wrapper.find('input').simulate('mousedown', { buttons: 1, metaKey: true });
        expect(resetMasterVolume).toBeCalled();
    });

    it('does not call resetMasterVolume when not ctrl or cmd clicked', () => {
        const wrapper = mount(
            <MasterVolume
                {...baseProps}
            />,
        );
        wrapper.find('input').simulate('mousedown', { buttons: 1 });
        expect(resetMasterVolume).toBeCalled();
    });
});
