import { h } from 'preact';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MasterVolume } from './MasterVolume';

const wamock = require('web-audio-mock-api');

const audioContext = new wamock.AudioContext();

describe('<MasterVolume />', () => {
    const baseProps = {
        audioContext,
    };

    it('renders with basic props', () => {
        const wrapper = shallow(
            <MasterVolume
                {...baseProps}
            />,
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
