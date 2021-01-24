import { h } from 'preact';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Keyboard } from './Keyboard';


window.AudioContext = jest.fn();
const audioContext = new window.AudioContext();

describe('<KeyboardKey />', () => {
    const baseProps = {
        audioContext,
        gainNode: jest.fn(),
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
