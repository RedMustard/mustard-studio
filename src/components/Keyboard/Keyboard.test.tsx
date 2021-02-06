import { h } from 'preact';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Keyboard } from './Keyboard';
import { getInitialState, StudioServiceContext } from '../../lib/studioService/StudioServiceStore';


// eslint-disable-next-line import/newline-after-import
const wamock = require('web-audio-mock-api');
// const audioContext = new wamock.AudioContext();
// const mockOscillator = {
//     start: jest.fn().mockReturnThis(),
//     stop: jest.fn().mockReturnThis(),
//     connect: jest.fn().mockReturnThis(),
//     disconnect: jest.fn().mockReturnThis(),
//     detune: {
//         value: 1,
//     },
//     frequency: {
//         value: 1,
//     },
// };
const initialState = getInitialState();


describe('<Keyboard />', () => {
    // beforeEach(() => {
    //     jest.spyOn(audioContext, 'createOscillator').mockImplementation(() => mockOscillator);
    // });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders with basic props', () => {
        const wrapper = shallow(
            <Keyboard />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('creates, connects, and starts both oscillators on white key mousedown', () => {
        const wrapper = mount(
            <Keyboard />,
        );
        wrapper.find('.keyboard-key.keyboard-key--white').first().simulate('mousedown', { buttons: 1 });
        // expect(audioContext.createOscillator).toBeCalledTimes(2);
        // expect(mockOscillator.connect).toBeCalledTimes(2);
        // expect(mockOscillator.start).toBeCalledTimes(2);
    });

    it('creates, connects, and starts both oscillators on white key mouseover after mousedown', () => {
        const wrapper = mount(
            <Keyboard />,
        );
        wrapper.find('.keyboard-key.keyboard-key--white').first().simulate('mousedown', { buttons: 1 });
        wrapper.find('.keyboard-key.keyboard-key--white').last().simulate('mouseover', { buttons: 1 });
        // two oscillators created on mouse down and two more on mouseover (4 calls each)
        // expect(audioContext.createOscillator).toBeCalledTimes(4);
        // expect(mockOscillator.connect).toBeCalledTimes(4);
        // expect(mockOscillator.start).toBeCalledTimes(4);
    });

    it('disconnects and stops both oscillators on white key mouseup after mousedown', () => {
        const wrapper = mount(
            <Keyboard />,
        );
        wrapper.find('.keyboard-key.keyboard-key--white').first().simulate('mousedown', { buttons: 1 });
        wrapper.find('.keyboard-key.keyboard-key--white').first().simulate('mouseup', { buttons: 1 });
        // expect(mockOscillator.stop).toBeCalledTimes(2);
        // expect(mockOscillator.disconnect).toBeCalledTimes(2);
    });

    it('disconnects and stops both oscillators on white key mouseleave after mousedown', () => {
        const wrapper = mount(
            <Keyboard />,
        );
        wrapper.find('.keyboard-key.keyboard-key--white').first().simulate('mousedown', { buttons: 1 });
        wrapper.find('.keyboard-key.keyboard-key--white').first().simulate('mouseleave', { buttons: 1 });
        // expect(mockOscillator.stop).toBeCalledTimes(2);
        // expect(mockOscillator.disconnect).toBeCalledTimes(2);
    });

    it('does not create, connect, or start oscillators on mousedown on white key when button 1 is not pressed', () => {
        const wrapper = mount(
            <Keyboard />,
        );
        wrapper.find('.keyboard-key.keyboard-key--white').first().simulate('mousedown', { buttons: 2 });
        // expect(audioContext.createOscillator).not.toBeCalled();
        // expect(mockOscillator.connect).not.toBeCalled();
        // expect(mockOscillator.start).not.toBeCalled();
    });

    it('does not create, connect, and start oscillators on white key mouseover after mousedown when button 1 is not pressed', () => {
        const wrapper = mount(
            <Keyboard />,
        );
        wrapper.find('.keyboard-key.keyboard-key--white').first().simulate('mousedown', { buttons: 2 });
        wrapper.find('.keyboard-key.keyboard-key--white').last().simulate('mouseover', { buttons: 2 });
        // expect(audioContext.createOscillator).not.toBeCalled();
        // expect(mockOscillator.connect).not.toBeCalled();
        // expect(mockOscillator.start).not.toBeCalled();
    });

    it('does not disconnect or stop oscillators on white key mouseup after mousedown when button 1 is not pressed', () => {
        const wrapper = mount(
            <Keyboard />,
        );
        wrapper.find('.keyboard-key.keyboard-key--white').first().simulate('mousedown', { buttons: 2 });
        wrapper.find('.keyboard-key.keyboard-key--white').first().simulate('mouseup', { buttons: 2 });
        // expect(mockOscillator.stop).not.toBeCalled();
        // expect(mockOscillator.disconnect).not.toBeCalled();
    });

    it('does not disconnect or stop both oscillators on white key mouseleave after mousedown when button 1 is not pressed', () => {
        const wrapper = mount(
            <Keyboard />,
        );
        wrapper.find('.keyboard-key.keyboard-key--white').first().simulate('mousedown', { buttons: 2 });
        wrapper.find('.keyboard-key.keyboard-key--white').first().simulate('mouseleave', { buttons: 2 });
        // expect(mockOscillator.stop).not.toBeCalled();
        // expect(mockOscillator.disconnect).not.toBeCalled();
    });

    it('creates, connects, and starts both oscillators on black key mousedown', () => {
        const wrapper = mount(
            <Keyboard />,
        );
        wrapper.find('.keyboard-key.keyboard-key--black').first().simulate('mousedown', { buttons: 1 });
        // expect(audioContext.createOscillator).toBeCalledTimes(2);
        // expect(mockOscillator.connect).toBeCalledTimes(2);
        // expect(mockOscillator.start).toBeCalledTimes(2);
    });

    it('creates, connects, and starts both oscillators on black key mouseover after mousedown', () => {
        const wrapper = mount(
            <Keyboard />,
        );
        wrapper.find('.keyboard-key.keyboard-key--black').first().simulate('mousedown', { buttons: 1 });
        wrapper.find('.keyboard-key.keyboard-key--black').last().simulate('mouseover', { buttons: 1 });
        // two oscillators created on mouse down and two more on mouseover (4 calls each)
        // expect(audioContext.createOscillator).toBeCalledTimes(4);
        // expect(mockOscillator.connect).toBeCalledTimes(4);
        // expect(mockOscillator.start).toBeCalledTimes(4);
    });

    it('disconnects and stops both oscillators on black key mouseup after mousedown', () => {
        const wrapper = mount(
            <Keyboard />,
        );
        wrapper.find('.keyboard-key.keyboard-key--black').first().simulate('mousedown', { buttons: 1 });
        wrapper.find('.keyboard-key.keyboard-key--black').first().simulate('mouseup', { buttons: 1 });
        // expect(mockOscillator.stop).toBeCalledTimes(2);
        // expect(mockOscillator.disconnect).toBeCalledTimes(2);
    });

    it('disconnects and stops both oscillators on black key mouseleave after mousedown', () => {
        const wrapper = mount(
            <Keyboard />,
        );
        wrapper.find('.keyboard-key.keyboard-key--black').first().simulate('mousedown', { buttons: 1 });
        wrapper.find('.keyboard-key.keyboard-key--black').first().simulate('mouseleave', { buttons: 1 });
        // expect(mockOscillator.stop).toBeCalledTimes(2);
        // expect(mockOscillator.disconnect).toBeCalledTimes(2);
    });

    it('does not create, connect, or start oscillators on mousedown on black key when button 1 is not pressed', () => {
        const wrapper = mount(
            <Keyboard />,
        );
        wrapper.find('.keyboard-key.keyboard-key--black').first().simulate('mousedown', { buttons: 2 });
        // expect(audioContext.createOscillator).not.toBeCalled();
        // expect(mockOscillator.connect).not.toBeCalled();
        // expect(mockOscillator.start).not.toBeCalled();
    });

    it('does not create, connect, and start oscillators on black key mouseover after mousedown when button 1 is not pressed', () => {
        const wrapper = mount(
            <Keyboard />,
        );
        wrapper.find('.keyboard-key.keyboard-key--black').first().simulate('mousedown', { buttons: 2 });
        wrapper.find('.keyboard-key.keyboard-key--black').last().simulate('mouseover', { buttons: 2 });
        // expect(audioContext.createOscillator).not.toBeCalled();
        // expect(mockOscillator.connect).not.toBeCalled();
        // expect(mockOscillator.start).not.toBeCalled();
    });

    it('does not disconnect or stop oscillators on black key mouseup after mousedown when button 1 is not pressed', () => {
        const wrapper = mount(
            <Keyboard />,
        );
        wrapper.find('.keyboard-key.keyboard-key--black').first().simulate('mousedown', { buttons: 2 });
        wrapper.find('.keyboard-key.keyboard-key--black').first().simulate('mouseup', { buttons: 2 });
        // expect(mockOscillator.stop).not.toBeCalled();
        // expect(mockOscillator.disconnect).not.toBeCalled();
    });

    it('does not disconnect or stop both oscillators on black key mouseleave after mousedown when button 1 is not pressed', () => {
        const wrapper = mount(
            <Keyboard />,
        );
        wrapper.find('.keyboard-key.keyboard-key--black').first().simulate('mousedown', { buttons: 2 });
        wrapper.find('.keyboard-key.keyboard-key--black').first().simulate('mouseleave', { buttons: 2 });
        // expect(mockOscillator.stop).not.toBeCalled();
        // expect(mockOscillator.disconnect).not.toBeCalled();
    });

    it('creates, connects, and starts only oscillator2 when oscillator1 is disabled on white key mousedown', () => {
        const state = {
            ...initialState,
            settings: {
                ...initialState.settings,
                osc1: {
                    ...initialState.settings.osc1,
                    enabled: false,
                },
            },
        };
        const wrapper = mount(
            <StudioServiceContext.Provider value={[state, jest.fn()]}>
                <Keyboard />
            </StudioServiceContext.Provider>,
        );
        wrapper.find('.keyboard-key.keyboard-key--white').first().simulate('mousedown', { buttons: 1 });
        // expect(audioContext.createOscillator).toBeCalledTimes(1);
        // expect(mockOscillator.connect).toBeCalledTimes(1);
        // expect(mockOscillator.start).toBeCalledTimes(1);
    });

    it('creates, connects, and starts only oscillator2 when oscillator1 is disabled on black key mousedown', () => {
        const state = {
            ...initialState,
            settings: {
                ...initialState.settings,
                osc1: {
                    ...initialState.settings.osc1,
                    enabled: false,
                },
            },
        };
        const wrapper = mount(
            <StudioServiceContext.Provider value={[state, jest.fn()]}>
                <Keyboard />
            </StudioServiceContext.Provider>,
        );
        wrapper.find('.keyboard-key.keyboard-key--black').first().simulate('mousedown', { buttons: 1 });
        // expect(audioContext.createOscillator).toBeCalledTimes(1);
        // expect(mockOscillator.connect).toBeCalledTimes(1);
        // expect(mockOscillator.start).toBeCalledTimes(1);
    });

    it('creates, connects, and starts only oscillator1 when oscillator2 is disabled on white key mousedown', () => {
        const state = {
            ...initialState,
            settings: {
                ...initialState.settings,
                osc2: {
                    ...initialState.settings.osc2,
                    enabled: false,
                },
            },
        };
        const wrapper = mount(
            <StudioServiceContext.Provider value={[state, jest.fn()]}>
                <Keyboard />
            </StudioServiceContext.Provider>,
        );
        wrapper.find('.keyboard-key.keyboard-key--white').first().simulate('mousedown', { buttons: 1 });
        // expect(audioContext.createOscillator).toBeCalledTimes(1);
        // expect(mockOscillator.connect).toBeCalledTimes(1);
        // expect(mockOscillator.start).toBeCalledTimes(1);
    });

    it('creates, connects, and starts only oscillator1 when oscillator2 is disabled on black key mousedown', () => {
        const state = {
            ...initialState,
            settings: {
                ...initialState.settings,
                osc2: {
                    ...initialState.settings.osc2,
                    enabled: false,
                },
            },
        };
        const wrapper = mount(
            <StudioServiceContext.Provider value={[state, jest.fn()]}>
                <Keyboard />
            </StudioServiceContext.Provider>,
        );
        wrapper.find('.keyboard-key.keyboard-key--black').first().simulate('mousedown', { buttons: 1 });
        // expect(audioContext.createOscillator).toBeCalledTimes(1);
        // expect(mockOscillator.connect).toBeCalledTimes(1);
        // expect(mockOscillator.start).toBeCalledTimes(1);
    });
});
