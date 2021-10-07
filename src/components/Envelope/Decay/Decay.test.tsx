import { h } from 'preact';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Decay } from './Decay';
import { resetEnvelopeDecay, setEnvelopeDecay } from '../../../lib/studioService/studioServiceActions';


jest.mock('../../../lib/studioService/studioServiceActions');


describe('<Decay />', () => {
    it('renders with basic props', () => {
        const wrapper = shallow(
            <Decay />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('calls setEnvelopeDecay when decay changed', () => {
        const wrapper = mount(
            <Decay />,
        );
        wrapper.find('input').simulate('input');
        expect(setEnvelopeDecay).toBeCalled();
    });

    it('calls resetEnvelopeDecay when ctrl clicked', () => {
        const wrapper = mount(
            <Decay />,
        );
        wrapper.find('input').simulate('mousedown', { buttons: 1, ctrlKey: true });
        expect(resetEnvelopeDecay).toBeCalled();
    });

    it('calls resetEnvelopeDecay when cmd clicked', () => {
        const wrapper = mount(
            <Decay />,
        );
        wrapper.find('input').simulate('mousedown', { buttons: 1, metaKey: true });
        expect(resetEnvelopeDecay).toBeCalled();
    });

    it('does not call resetEnvelopeDecay when not ctrl or cmd clicked', () => {
        const wrapper = mount(
            <Decay />,
        );
        wrapper.find('input').simulate('mousedown', { buttons: 1 });
        expect(resetEnvelopeDecay).toBeCalled();
    });
});
