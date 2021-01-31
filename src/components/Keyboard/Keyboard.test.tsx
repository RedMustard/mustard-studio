import { h } from 'preact';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Keyboard } from './Keyboard';

const wamock = require('web-audio-mock-api');


describe('<Keyboard />', () => {
    const audioContext = new wamock.AudioContext();
    const baseProps = {
        audioContext,
    };
    const mockOscillator = {
        start: jest.fn().mockReturnThis(),
        stop: jest.fn().mockReturnThis(),
        connect: jest.fn().mockReturnThis(),
        disconnect: jest.fn().mockReturnThis(),
        detune: {
            value: 1,
        },
        frequency: {
            value: 1,
        },
    };

    beforeEach(() => {
        jest.spyOn(audioContext, 'createOscillator').mockImplementation(() => mockOscillator);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders with basic props', () => {
        const wrapper = shallow(
            <Keyboard
                {...baseProps}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('connects and starts both oscillators on white key mousedown', () => {
        const wrapper = mount(
            <Keyboard
                {...baseProps}
            />,
        );
        wrapper.find('.keyboard-key.keyboard-key--white').first().simulate('mousedown', { buttons: 1 });
        expect(audioContext.createOscillator).toBeCalledTimes(2);
        expect(mockOscillator.connect).toBeCalledTimes(2);
        expect(mockOscillator.start).toBeCalledTimes(2);
    });

    it('connects and starts both oscillators on white key mouseover after mousedown', () => {
        const wrapper = mount(
            <Keyboard
                {...baseProps}
            />,
        );
        wrapper.find('.keyboard-key.keyboard-key--white').first().simulate('mousedown', { buttons: 1 });
        wrapper.find('.keyboard-key.keyboard-key--white').last().simulate('mouseover', { buttons: 1 });
        // two oscillators created on mouse down and two more on mouseover (4 calls each)
        expect(audioContext.createOscillator).toBeCalledTimes(4);
        expect(mockOscillator.connect).toBeCalledTimes(4);
        expect(mockOscillator.start).toBeCalledTimes(4);
    });

    it('disconnects and stops both oscillators on white key mouseup after mousedown', () => {
        const wrapper = mount(
            <Keyboard
                {...baseProps}
            />,
        );
        wrapper.find('.keyboard-key.keyboard-key--white').first().simulate('mousedown', { buttons: 1 });
        wrapper.find('.keyboard-key.keyboard-key--white').first().simulate('mouseup', { buttons: 1 });
        expect(mockOscillator.stop).toBeCalledTimes(2);
        expect(mockOscillator.disconnect).toBeCalledTimes(2);
    });

    it('disconnects and stops both oscillators on white key mouseleave after mousedown', () => {
        const wrapper = mount(
            <Keyboard
                {...baseProps}
            />,
        );
        wrapper.find('.keyboard-key.keyboard-key--white').first().simulate('mousedown', { buttons: 1 });
        wrapper.find('.keyboard-key.keyboard-key--white').first().simulate('mouseleave', { buttons: 1 });
        expect(mockOscillator.stop).toBeCalledTimes(2);
        expect(mockOscillator.disconnect).toBeCalledTimes(2);
    });

    it('connects and starts both oscillators on black key mousedown', () => {
        const wrapper = mount(
            <Keyboard
                {...baseProps}
            />,
        );
        wrapper.find('.keyboard-key.keyboard-key--black').first().simulate('mousedown', { buttons: 1 });
        expect(audioContext.createOscillator).toBeCalledTimes(2);
        expect(mockOscillator.connect).toBeCalledTimes(2);
        expect(mockOscillator.start).toBeCalledTimes(2);
    });

    it('connects and starts both oscillators on black key mouseover after mousedown', () => {
        const wrapper = mount(
            <Keyboard
                {...baseProps}
            />,
        );
        wrapper.find('.keyboard-key.keyboard-key--black').first().simulate('mousedown', { buttons: 1 });
        wrapper.find('.keyboard-key.keyboard-key--black').last().simulate('mouseover', { buttons: 1 });
        // two oscillators created on mouse down and two more on mouseover (4 calls each)
        expect(audioContext.createOscillator).toBeCalledTimes(4);
        expect(mockOscillator.connect).toBeCalledTimes(4);
        expect(mockOscillator.start).toBeCalledTimes(4);
    });

    it('disconnects and stops both oscillators on black key mouseup after mousedown', () => {
        const wrapper = mount(
            <Keyboard
                {...baseProps}
            />,
        );
        wrapper.find('.keyboard-key.keyboard-key--black').first().simulate('mousedown', { buttons: 1 });
        wrapper.find('.keyboard-key.keyboard-key--black').first().simulate('mouseup', { buttons: 1 });
        expect(mockOscillator.stop).toBeCalledTimes(2);
        expect(mockOscillator.disconnect).toBeCalledTimes(2);
    });

    it('disconnects and stops both oscillators on black key mouseleave after mousedown', () => {
        const wrapper = mount(
            <Keyboard
                {...baseProps}
            />,
        );
        wrapper.find('.keyboard-key.keyboard-key--black').first().simulate('mousedown', { buttons: 1 });
        wrapper.find('.keyboard-key.keyboard-key--black').first().simulate('mouseleave', { buttons: 1 });
        expect(mockOscillator.stop).toBeCalledTimes(2);
        expect(mockOscillator.disconnect).toBeCalledTimes(2);
    });
});
