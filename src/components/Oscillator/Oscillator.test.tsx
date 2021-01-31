import { h } from 'preact';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Oscillator } from './Oscillator';
import { OscillatorId } from '../../types/types';
import { setOscillatorEnabled, setOscillatorType } from '../../lib/studioService/studioServiceActions';


// eslint-disable-next-line import/newline-after-import
const wamock = require('web-audio-mock-api');
const audioContext = new wamock.AudioContext();

jest.mock('../../lib/studioService/studioServiceActions');

const baseProps = {
    audioContext,
    oscillatorId: 'osc1' as OscillatorId,
};

describe('<Oscillator />', () => {
    it('renders with basic props', () => {
        const wrapper = shallow(
            <Oscillator
                {...baseProps}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('calls setOscillatorEnabled when power checkbox pressed', () => {
        const wrapper = mount(
            <Oscillator
                {...baseProps}
            />,
        );
        wrapper.find('.checkbox__input').simulate('input');
        expect(setOscillatorEnabled).toBeCalled();
    });

    it('calls setOscillatorType when oscillator type is selected', () => {
        const wrapper = mount(
            <Oscillator
                {...baseProps}
            />,
        );
        wrapper.find('.oscillator__wave-type').simulate('input');
        expect(setOscillatorType).toBeCalled();
    });
});
