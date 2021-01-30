import { h } from 'preact';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { OscillatorDetune } from './OscillatorDetune';
import { setOscillatorDetune } from '../../lib/studioService/studioServiceActions';
import { OscillatorId } from '../../types/types';


// eslint-disable-next-line import/newline-after-import
const wamock = require('web-audio-mock-api');
const audioContext = new wamock.AudioContext();

jest.mock('../../lib/studioService/studioServiceActions');


describe('<OscillatorDetune />', () => {
    const baseProps = {
        audioContext,
        oscillatorId: 'osc1' as OscillatorId,
    };

    it('renders with basic props', () => {
        const wrapper = shallow(
            <OscillatorDetune
                {...baseProps}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('calls setOscillatorDetune when volume changed', () => {
        const wrapper = mount(
            <OscillatorDetune
                {...baseProps}
            />,
        );
        wrapper.find('input').simulate('input');
        expect(setOscillatorDetune).toBeCalled();
    });
});
