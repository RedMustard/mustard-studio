import { h } from 'preact';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Piano } from './Piano';
import { startOscillatorsByFrequency, stopOscillators } from '../../lib/oscillators/oscillators';
import { getFrequencyByKeyNumber } from '../../lib/utils/audio/audio';

jest.mock('../../lib/studioService/studioServiceActions');
jest.mock('../../lib/oscillators/oscillators');
jest.mock('../../lib/utils/audio/audio');

describe('<Piano />', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders with basic props', () => {
        const wrapper = shallow(
            <Piano />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('gets note frequency and starts oscillators on white key mousedown', () => {
        const wrapper = mount(
            <Piano />,
        );
        wrapper.find('.piano-key.piano-key--white').first().simulate('mousedown', { buttons: 1 });
        expect(startOscillatorsByFrequency).toBeCalledTimes(1);
        expect(getFrequencyByKeyNumber).toBeCalledTimes(1);
    });

    it('gets note frequency and starts oscillators on white key mouseover after mousedown', () => {
        const wrapper = mount(
            <Piano />,
        );
        wrapper.find('.piano-key.piano-key--white').first().simulate('mousedown', { buttons: 1 });
        wrapper.find('.piano-key.piano-key--white').last().simulate('mouseover', { buttons: 1 });
        expect(startOscillatorsByFrequency).toBeCalledTimes(2);
        expect(getFrequencyByKeyNumber).toBeCalledTimes(2);
    });

    it('stops oscillators on white key mouseup after mousedown', () => {
        const wrapper = mount(
            <Piano />,
        );
        wrapper.find('.piano-key.piano-key--white').first().simulate('mousedown', { buttons: 1 });
        wrapper.find('.piano-key.piano-key--white').first().simulate('mouseup', { buttons: 1 });
        expect(stopOscillators).toBeCalledTimes(1);
    });

    it('stops oscillators on white key mouseleave after mousedown', () => {
        const wrapper = mount(
            <Piano />,
        );
        wrapper.find('.piano-key.piano-key--white').first().simulate('mousedown', { buttons: 1 });
        wrapper.find('.piano-key.piano-key--white').first().simulate('mouseleave', { buttons: 1 });
        expect(stopOscillators).toBeCalledTimes(1);
    });

    it('stops oscillators on white key mouseup after mousedown when button 1 is not pressed', () => {
        const wrapper = mount(
            <Piano />,
        );
        wrapper.find('.piano-key.piano-key--white').first().simulate('mousedown', { buttons: 2 });
        wrapper.find('.piano-key.piano-key--white').first().simulate('mouseup', { buttons: 2 });
        expect(stopOscillators).toBeCalledTimes(1);
    });

    it('does not get note frequency or start oscillators on mousedown on white key when button 1 is not pressed', () => {
        const wrapper = mount(
            <Piano />,
        );
        wrapper.find('.piano-key.piano-key--white').first().simulate('mousedown', { buttons: 2 });
        expect(startOscillatorsByFrequency).not.toBeCalled();
        expect(getFrequencyByKeyNumber).not.toBeCalled();
    });

    it('does not get note frequency or start oscillators on white key mouseover after mousedown when button 1 is not pressed', () => {
        const wrapper = mount(
            <Piano />,
        );
        wrapper.find('.piano-key.piano-key--white').first().simulate('mousedown', { buttons: 2 });
        wrapper.find('.piano-key.piano-key--white').last().simulate('mouseover', { buttons: 2 });
        expect(startOscillatorsByFrequency).not.toBeCalled();
        expect(getFrequencyByKeyNumber).not.toBeCalled();
    });

    it('does not stop oscillators on white key mouseleave after mousedown when button 1 is not pressed', () => {
        const wrapper = mount(
            <Piano />,
        );
        wrapper.find('.piano-key.piano-key--white').first().simulate('mousedown', { buttons: 2 });
        wrapper.find('.piano-key.piano-key--white').first().simulate('mouseleave', { buttons: 2 });
        expect(stopOscillators).not.toBeCalled();
    });

    it('gets note frequency and starts oscillators on black key mousedown', () => {
        const wrapper = mount(
            <Piano />,
        );
        wrapper.find('.piano-key.piano-key--black').first().simulate('mousedown', { buttons: 1 });
        expect(startOscillatorsByFrequency).toBeCalledTimes(1);
        expect(getFrequencyByKeyNumber).toBeCalledTimes(1);
    });

    it('gets note frequency and starts oscillators on black key mouseover after mousedown', () => {
        const wrapper = mount(
            <Piano />,
        );
        wrapper.find('.piano-key.piano-key--black').first().simulate('mousedown', { buttons: 1 });
        wrapper.find('.piano-key.piano-key--black').last().simulate('mouseover', { buttons: 1 });
        expect(startOscillatorsByFrequency).toBeCalledTimes(1 * 2);
        expect(getFrequencyByKeyNumber).toBeCalledTimes(2);
    });

    it('stops oscillators on black key mouseup after mousedown', () => {
        const wrapper = mount(
            <Piano />,
        );
        wrapper.find('.piano-key.piano-key--black').first().simulate('mousedown', { buttons: 1 });
        wrapper.find('.piano-key.piano-key--black').first().simulate('mouseup', { buttons: 1 });
        expect(stopOscillators).toBeCalledTimes(1);
    });

    it('stops oscillators on black key mouseleave after mousedown', () => {
        const wrapper = mount(
            <Piano />,
        );
        wrapper.find('.piano-key.piano-key--black').first().simulate('mousedown', { buttons: 1 });
        wrapper.find('.piano-key.piano-key--black').first().simulate('mouseleave', { buttons: 1 });
        expect(stopOscillators).toBeCalledTimes(1);
    });

    it('stops oscillators on black key mouseup after mousedown when button 1 is not pressed', () => {
        const wrapper = mount(
            <Piano />,
        );
        wrapper.find('.piano-key.piano-key--black').first().simulate('mousedown', { buttons: 2 });
        wrapper.find('.piano-key.piano-key--black').first().simulate('mouseup', { buttons: 2 });
        expect(stopOscillators).toBeCalledTimes(1);
    });

    it('does not get note frequency or start oscillators on mousedown on black key when button 1 is not pressed', () => {
        const wrapper = mount(
            <Piano />,
        );
        wrapper.find('.piano-key.piano-key--black').first().simulate('mousedown', { buttons: 2 });
        expect(startOscillatorsByFrequency).not.toBeCalled();
        expect(getFrequencyByKeyNumber).not.toBeCalled();
    });

    it('does not get note frequency or start oscillators on black key mouseover after mousedown when button 1 is not pressed', () => {
        const wrapper = mount(
            <Piano />,
        );
        wrapper.find('.piano-key.piano-key--black').first().simulate('mousedown', { buttons: 2 });
        wrapper.find('.piano-key.piano-key--black').last().simulate('mouseover', { buttons: 2 });
        expect(startOscillatorsByFrequency).not.toBeCalled();
        expect(getFrequencyByKeyNumber).not.toBeCalled();
    });

    it('does not stop oscillators on black key mouseleave after mousedown when button 1 is not pressed', () => {
        const wrapper = mount(
            <Piano />,
        );
        wrapper.find('.piano-key.piano-key--black').first().simulate('mousedown', { buttons: 2 });
        wrapper.find('.piano-key.piano-key--black').first().simulate('mouseleave', { buttons: 2 });
        expect(stopOscillators).not.toBeCalled();
    });
});
