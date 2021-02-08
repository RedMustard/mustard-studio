import { h } from 'preact';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { OscillatorOctave } from './OscillatorOctave';
import { setOscillatorOctave } from '../../lib/studioService/studioServiceActions';
import { OscillatorId } from '../../types/types';


jest.mock('../../lib/studioService/studioServiceActions');

// eslint-disable-next-line import/newline-after-import
const wamock = require('web-audio-mock-api');
const audioContext = new wamock.AudioContext();
const baseProps = {
    audioContext,
    oscillatorId: 'osc1' as OscillatorId,
};

describe('<OscillatorOctave />', () => {
    it('renders with basic props', () => {
        const wrapper = shallow(
            <OscillatorOctave
                {...baseProps}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('calls setOscillatorOctave when pan changed', () => {
        const wrapper = mount(
            <OscillatorOctave
                {...baseProps}
            />,
        );
        wrapper.find('input').simulate('input');
        expect(setOscillatorOctave).toBeCalled();
    });
});
