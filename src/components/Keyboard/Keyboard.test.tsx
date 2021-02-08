import { h } from 'preact';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Keyboard } from './Keyboard';
import { startOscillators, stopOscillators } from '../../lib/oscillators/oscillators';
import { getFrequencyByKeyNumber } from '../../lib/utils/audio/audio';

jest.mock('../../lib/studioService/studioServiceActions');
jest.mock('../../lib/oscillators/oscillators');
jest.mock('../../lib/utils/audio/audio');

describe('<Keyboard />', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders with basic props', () => {
        const wrapper = shallow(
            <Keyboard />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('gets note frequency and starts oscillators on white key mousedown', () => {
        const wrapper = mount(
            <Keyboard />,
        );
        wrapper.find('.keyboard-key.keyboard-key--white').first().simulate('mousedown', { buttons: 1 });
        expect(startOscillators).toBeCalledTimes(1);
        expect(getFrequencyByKeyNumber).toBeCalledTimes(1);
    });

    it('gets note frequency and starts oscillators on white key mouseover after mousedown', () => {
        const wrapper = mount(
            <Keyboard />,
        );
        wrapper.find('.keyboard-key.keyboard-key--white').first().simulate('mousedown', { buttons: 1 });
        wrapper.find('.keyboard-key.keyboard-key--white').last().simulate('mouseover', { buttons: 1 });
        expect(startOscillators).toBeCalledTimes(2);
        expect(getFrequencyByKeyNumber).toBeCalledTimes(2);
    });

    it('stops oscillators on white key mouseup after mousedown', () => {
        const wrapper = mount(
            <Keyboard />,
        );
        wrapper.find('.keyboard-key.keyboard-key--white').first().simulate('mousedown', { buttons: 1 });
        wrapper.find('.keyboard-key.keyboard-key--white').first().simulate('mouseup', { buttons: 1 });
        expect(stopOscillators).toBeCalledTimes(1);
    });

    it('stops oscillators on white key mouseleave after mousedown', () => {
        const wrapper = mount(
            <Keyboard />,
        );
        wrapper.find('.keyboard-key.keyboard-key--white').first().simulate('mousedown', { buttons: 1 });
        wrapper.find('.keyboard-key.keyboard-key--white').first().simulate('mouseleave', { buttons: 1 });
        expect(stopOscillators).toBeCalledTimes(1);
    });

    it('stops oscillators on white key mouseup after mousedown when button 1 is not pressed', () => {
        const wrapper = mount(
            <Keyboard />,
        );
        wrapper.find('.keyboard-key.keyboard-key--white').first().simulate('mousedown', { buttons: 2 });
        wrapper.find('.keyboard-key.keyboard-key--white').first().simulate('mouseup', { buttons: 2 });
        expect(stopOscillators).toBeCalledTimes(1);
    });

    it('does not get note frequency or start oscillators on mousedown on white key when button 1 is not pressed', () => {
        const wrapper = mount(
            <Keyboard />,
        );
        wrapper.find('.keyboard-key.keyboard-key--white').first().simulate('mousedown', { buttons: 2 });
        expect(startOscillators).not.toBeCalled();
        expect(getFrequencyByKeyNumber).not.toBeCalled();
    });

    it('does not get note frequency or start oscillators on white key mouseover after mousedown when button 1 is not pressed', () => {
        const wrapper = mount(
            <Keyboard />,
        );
        wrapper.find('.keyboard-key.keyboard-key--white').first().simulate('mousedown', { buttons: 2 });
        wrapper.find('.keyboard-key.keyboard-key--white').last().simulate('mouseover', { buttons: 2 });
        expect(startOscillators).not.toBeCalled();
        expect(getFrequencyByKeyNumber).not.toBeCalled();
    });

    it('does not stop oscillators on white key mouseleave after mousedown when button 1 is not pressed', () => {
        const wrapper = mount(
            <Keyboard />,
        );
        wrapper.find('.keyboard-key.keyboard-key--white').first().simulate('mousedown', { buttons: 2 });
        wrapper.find('.keyboard-key.keyboard-key--white').first().simulate('mouseleave', { buttons: 2 });
        expect(stopOscillators).not.toBeCalled();
    });

    it('gets note frequency and starts oscillators on black key mousedown', () => {
        const wrapper = mount(
            <Keyboard />,
        );
        wrapper.find('.keyboard-key.keyboard-key--black').first().simulate('mousedown', { buttons: 1 });
        expect(startOscillators).toBeCalledTimes(1);
        expect(getFrequencyByKeyNumber).toBeCalledTimes(1);
    });

    it('gets note frequency and starts oscillators on black key mouseover after mousedown', () => {
        const wrapper = mount(
            <Keyboard />,
        );
        wrapper.find('.keyboard-key.keyboard-key--black').first().simulate('mousedown', { buttons: 1 });
        wrapper.find('.keyboard-key.keyboard-key--black').last().simulate('mouseover', { buttons: 1 });
        expect(startOscillators).toBeCalledTimes(1 * 2);
        expect(getFrequencyByKeyNumber).toBeCalledTimes(2);
    });

    it('stops oscillators on black key mouseup after mousedown', () => {
        const wrapper = mount(
            <Keyboard />,
        );
        wrapper.find('.keyboard-key.keyboard-key--black').first().simulate('mousedown', { buttons: 1 });
        wrapper.find('.keyboard-key.keyboard-key--black').first().simulate('mouseup', { buttons: 1 });
        expect(stopOscillators).toBeCalledTimes(1);
    });

    it('stops oscillators on black key mouseleave after mousedown', () => {
        const wrapper = mount(
            <Keyboard />,
        );
        wrapper.find('.keyboard-key.keyboard-key--black').first().simulate('mousedown', { buttons: 1 });
        wrapper.find('.keyboard-key.keyboard-key--black').first().simulate('mouseleave', { buttons: 1 });
        expect(stopOscillators).toBeCalledTimes(1);
    });

    it('stops oscillators on black key mouseup after mousedown when button 1 is not pressed', () => {
        const wrapper = mount(
            <Keyboard />,
        );
        wrapper.find('.keyboard-key.keyboard-key--black').first().simulate('mousedown', { buttons: 2 });
        wrapper.find('.keyboard-key.keyboard-key--black').first().simulate('mouseup', { buttons: 2 });
        expect(stopOscillators).toBeCalledTimes(1);
    });

    it('does not get note frequency or start oscillators on mousedown on black key when button 1 is not pressed', () => {
        const wrapper = mount(
            <Keyboard />,
        );
        wrapper.find('.keyboard-key.keyboard-key--black').first().simulate('mousedown', { buttons: 2 });
        expect(startOscillators).not.toBeCalled();
        expect(getFrequencyByKeyNumber).not.toBeCalled();
    });

    it('does not get note frequency or start oscillators on black key mouseover after mousedown when button 1 is not pressed', () => {
        const wrapper = mount(
            <Keyboard />,
        );
        wrapper.find('.keyboard-key.keyboard-key--black').first().simulate('mousedown', { buttons: 2 });
        wrapper.find('.keyboard-key.keyboard-key--black').last().simulate('mouseover', { buttons: 2 });
        expect(startOscillators).not.toBeCalled();
        expect(getFrequencyByKeyNumber).not.toBeCalled();
    });

    it('does not stop oscillators on black key mouseleave after mousedown when button 1 is not pressed', () => {
        const wrapper = mount(
            <Keyboard />,
        );
        wrapper.find('.keyboard-key.keyboard-key--black').first().simulate('mousedown', { buttons: 2 });
        wrapper.find('.keyboard-key.keyboard-key--black').first().simulate('mouseleave', { buttons: 2 });
        expect(stopOscillators).not.toBeCalled();
    });


    // it('creates, connects, and starts only oscillator2 when oscillator1 is disabled on white key mousedown', () => {
    //     const state = {
    //         ...initialState,
    //         settings: {
    //             ...initialState.settings,
    //             osc1: {
    //                 ...initialState.settings.osc1,
    //                 enabled: false,
    //             },
    //         },
    //     };
    //     const wrapper = mount(
    //         <StudioServiceContext.Provider value={[state, jest.fn()]}>
    //             <Keyboard />
    //         </StudioServiceContext.Provider>,
    //     );
    //     wrapper.find('.keyboard-key.keyboard-key--white').first().simulate('mousedown', { buttons: 1 });
    //     // expect(audioContext.createOscillator).toBeCalledTimes(1);
    //     // expect(mockOscillator.connect).toBeCalledTimes(1);
    //     // expect(mockOscillator.start).toBeCalledTimes(1);
    // });

    // it('creates, connects, and starts only oscillator2 when oscillator1 is disabled on black key mousedown', () => {
    //     const state = {
    //         ...initialState,
    //         settings: {
    //             ...initialState.settings,
    //             osc1: {
    //                 ...initialState.settings.osc1,
    //                 enabled: false,
    //             },
    //         },
    //     };
    //     const wrapper = mount(
    //         <StudioServiceContext.Provider value={[state, jest.fn()]}>
    //             <Keyboard />
    //         </StudioServiceContext.Provider>,
    //     );
    //     wrapper.find('.keyboard-key.keyboard-key--black').first().simulate('mousedown', { buttons: 1 });
    //     // expect(audioContext.createOscillator).toBeCalledTimes(1);
    //     // expect(mockOscillator.connect).toBeCalledTimes(1);
    //     // expect(mockOscillator.start).toBeCalledTimes(1);
    // });

    // it('creates, connects, and starts only oscillator1 when oscillator2 is disabled on white key mousedown', () => {
    //     const state = {
    //         ...initialState,
    //         settings: {
    //             ...initialState.settings,
    //             osc2: {
    //                 ...initialState.settings.osc2,
    //                 enabled: false,
    //             },
    //         },
    //     };
    //     const wrapper = mount(
    //         <StudioServiceContext.Provider value={[state, jest.fn()]}>
    //             <Keyboard />
    //         </StudioServiceContext.Provider>,
    //     );
    //     wrapper.find('.keyboard-key.keyboard-key--white').first().simulate('mousedown', { buttons: 1 });
    //     // expect(audioContext.createOscillator).toBeCalledTimes(1);
    //     // expect(mockOscillator.connect).toBeCalledTimes(1);
    //     // expect(mockOscillator.start).toBeCalledTimes(1);
    // });

    // it('creates, connects, and starts only oscillator1 when oscillator2 is disabled on black key mousedown', () => {
    //     const state = {
    //         ...initialState,
    //         settings: {
    //             ...initialState.settings,
    //             osc2: {
    //                 ...initialState.settings.osc2,
    //                 enabled: false,
    //             },
    //         },
    //     };
    //     const wrapper = mount(
    //         <StudioServiceContext.Provider value={[state, jest.fn()]}>
    //             <Keyboard />
    //         </StudioServiceContext.Provider>,
    //     );
    //     wrapper.find('.keyboard-key.keyboard-key--black').first().simulate('mousedown', { buttons: 1 });
    //     // expect(audioContext.createOscillator).toBeCalledTimes(1);
    //     // expect(mockOscillator.connect).toBeCalledTimes(1);
    //     // expect(mockOscillator.start).toBeCalledTimes(1);
    // });
});
