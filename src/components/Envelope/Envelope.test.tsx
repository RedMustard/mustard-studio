import { h } from 'preact';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Envelope } from './Envelope';


describe('<Envelope />', () => {
    it('renders with basic props', () => {
        const wrapper = shallow(
            <Envelope />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
