import { h } from 'preact';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { AudioContext } from 'standardized-audio-context-mock';
import { Keyboard } from './Keyboard';


const audioContext = new AudioContext();
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
