import { h } from 'preact';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Sustain } from './Sustain';
import { resetEnvelopeSustain, setEnvelopeSustain } from '../../../lib/studioService/studioServiceActions';


jest.mock('../../../lib/studioService/studioServiceActions');


describe('<Sustain />', () => {
    it('renders with basic props', () => {
        const wrapper = shallow(
            <Sustain />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('calls setEnvelopeSustain when sustain changed', () => {
        const wrapper = mount(
            <Sustain />,
        );
        wrapper.find('input').simulate('input');
        expect(setEnvelopeSustain).toBeCalled();
    });

    it('calls resetEnvelopeSustain when ctrl clicked', () => {
        const wrapper = mount(
            <Sustain />,
        );
        wrapper.find('input').simulate('mousedown', { buttons: 1, ctrlKey: true });
        expect(resetEnvelopeSustain).toBeCalled();
    });

    it('calls resetEnvelopeSustain when cmd clicked', () => {
        const wrapper = mount(
            <Sustain />,
        );
        wrapper.find('input').simulate('mousedown', { buttons: 1, metaKey: true });
        expect(resetEnvelopeSustain).toBeCalled();
    });

    it('does not call resetEnvelopeSustain when not ctrl or cmd clicked', () => {
        const wrapper = mount(
            <Sustain />,
        );
        wrapper.find('input').simulate('mousedown', { buttons: 1 });
        expect(resetEnvelopeSustain).toBeCalled();
    });
});
