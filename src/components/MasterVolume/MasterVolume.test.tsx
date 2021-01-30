import { h } from 'preact';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MasterVolume } from './MasterVolume';
import { setMasterVolume } from '../../lib/studioService/studioServiceActions';


// eslint-disable-next-line import/newline-after-import
const wamock = require('web-audio-mock-api');
const audioContext = new wamock.AudioContext();

jest.mock('../../lib/studioService/studioServiceActions');


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

    it('calls setMasterVolume when volume changed', () => {
        const wrapper = mount(
            <MasterVolume
                {...baseProps}
            />,
        );
        wrapper.find('input').simulate('input');
        expect(setMasterVolume).toBeCalled();
    });
});
