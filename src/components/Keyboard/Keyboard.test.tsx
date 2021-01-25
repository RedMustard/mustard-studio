import { h } from 'preact';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Keyboard } from './Keyboard';

const wamock = require('web-audio-mock-api');

const audioContext = new wamock.AudioContext();
const gainNode = audioContext.createGain();

describe('<KeyboardKey />', () => {
    const baseProps = {
        audioContext,
        gainNode,
    };

    it('renders with basic props', () => {
        const wrapper = shallow(
            <Keyboard
                {...baseProps}
            />,
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
