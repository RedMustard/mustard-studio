import { h } from 'preact';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Attack } from './Attack';
import { resetEnvelopeAttack, setEnvelopeAttack } from '../../../lib/studioService/studioServiceActions';


jest.mock('../../../lib/studioService/studioServiceActions');


describe('<Attack />', () => {
    it('renders with basic props', () => {
        const wrapper = shallow(
            <Attack />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('calls setEnvelopeAttack when attack changed', () => {
        const wrapper = mount(
            <Attack />,
        );
        wrapper.find('input').simulate('input');
        expect(setEnvelopeAttack).toBeCalled();
    });

    it('calls resetEnvelopeAttack when ctrl clicked', () => {
        const wrapper = mount(
            <Attack />,
        );
        wrapper.find('input').simulate('mousedown', { buttons: 1, ctrlKey: true });
        expect(resetEnvelopeAttack).toBeCalled();
    });

    it('calls resetEnvelopeAttack when cmd clicked', () => {
        const wrapper = mount(
            <Attack />,
        );
        wrapper.find('input').simulate('mousedown', { buttons: 1, metaKey: true });
        expect(resetEnvelopeAttack).toBeCalled();
    });

    it('does not call resetEnvelopeAttack when not ctrl or cmd clicked', () => {
        const wrapper = mount(
            <Attack />,
        );
        wrapper.find('input').simulate('mousedown', { buttons: 1 });
        expect(resetEnvelopeAttack).toBeCalled();
    });
});
