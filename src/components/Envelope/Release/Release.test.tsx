import { h } from 'preact';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Release } from './Release';
import { resetEnvelopeRelease, setEnvelopeRelease } from '../../../lib/studioService/studioServiceActions';


jest.mock('../../../lib/studioService/studioServiceActions');


describe('<Release />', () => {
    it('renders with basic props', () => {
        const wrapper = shallow(
            <Release />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('calls setEnvelopeRelease when release changed', () => {
        const wrapper = mount(
            <Release />,
        );
        wrapper.find('input').simulate('input');
        expect(setEnvelopeRelease).toBeCalled();
    });

    it('calls resetEnvelopeRelease when ctrl clicked', () => {
        const wrapper = mount(
            <Release />,
        );
        wrapper.find('input').simulate('mousedown', { buttons: 1, ctrlKey: true });
        expect(resetEnvelopeRelease).toBeCalled();
    });

    it('calls resetEnvelopeRelease when cmd clicked', () => {
        const wrapper = mount(
            <Release />,
        );
        wrapper.find('input').simulate('mousedown', { buttons: 1, metaKey: true });
        expect(resetEnvelopeRelease).toBeCalled();
    });

    it('does not call resetEnvelopeRelease when not ctrl or cmd clicked', () => {
        const wrapper = mount(
            <Release />,
        );
        wrapper.find('input').simulate('mousedown', { buttons: 1 });
        expect(resetEnvelopeRelease).toBeCalled();
    });
});
