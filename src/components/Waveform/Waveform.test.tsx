import { h } from 'preact';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Waveform } from './Waveform';

// eslint-disable-next-line import/newline-after-import
const wamock = require('web-audio-mock-api');
const audioContext = new wamock.AudioContext();

const baseProps = {
    analyserNode: audioContext.createAnalyser(),
};

describe('<Waveform />', () => {
    it('renders with basic props', () => {
        const wrapper = shallow(
            <Waveform
                {...baseProps}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
