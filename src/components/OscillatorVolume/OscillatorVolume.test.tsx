import { h } from 'preact';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { OscillatorVolume } from './OscillatorVolume';
import { setOscillatorVolume } from '../../lib/studioService/studioServiceActions';
import { OscillatorId } from '../../types/types';


// eslint-disable-next-line import/newline-after-import
const wamock = require('web-audio-mock-api');
const audioContext = new wamock.AudioContext();

jest.mock('../../lib/studioService/studioServiceActions');


describe('<OscillatorVolume />', () => {
    const baseProps = {
        audioContext,
        oscillatorId: 'osc1' as OscillatorId,
    };

    it('renders with basic props', () => {
        const wrapper = shallow(
            <OscillatorVolume
                {...baseProps}
            />,
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('calls setOscillatorVolume when volume changed', () => {
        const wrapper = mount(
            <OscillatorVolume
                {...baseProps}
            />,
        );

        wrapper.find('.volume-fader').simulate('input');
        expect(setOscillatorVolume).toBeCalled();
    });
});
