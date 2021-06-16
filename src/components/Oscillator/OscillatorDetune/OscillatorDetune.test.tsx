import { h } from 'preact';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { OscillatorDetune } from './OscillatorDetune';
import { resetOscillatorDetune, setOscillatorDetune } from '../../../lib/studioService/studioServiceActions';
import { OscillatorId } from '../../../types/types';


jest.mock('../../../lib/studioService/studioServiceActions');

// eslint-disable-next-line import/newline-after-import
const wamock = require('web-audio-mock-api');
const audioContext = new wamock.AudioContext();
const baseProps = {
    audioContext,
    oscillatorId: 'osc1' as OscillatorId,
};

describe('<OscillatorDetune />', () => {
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

    it('calls resetOscillatorDetune when ctrl clicked', () => {
        const wrapper = mount(
            <OscillatorDetune
                {...baseProps}
            />,
        );
        wrapper.find('input').simulate('mousedown', { buttons: 1, ctrlKey: true });
        expect(resetOscillatorDetune).toBeCalled();
    });

    it('calls resetOscillatorDetune when cmd clicked', () => {
        const wrapper = mount(
            <OscillatorDetune
                {...baseProps}
            />,
        );
        wrapper.find('input').simulate('mousedown', { buttons: 1, metaKey: true });
        expect(resetOscillatorDetune).toBeCalled();
    });

    it('does not call resetOscillatorDetune when not ctrl or cmd clicked', () => {
        const wrapper = mount(
            <OscillatorDetune
                {...baseProps}
            />,
        );
        wrapper.find('input').simulate('mousedown', { buttons: 1 });
        expect(resetOscillatorDetune).toBeCalled();
    });
});
