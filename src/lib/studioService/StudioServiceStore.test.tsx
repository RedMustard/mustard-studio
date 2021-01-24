import { h } from 'preact';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { StudioServiceStore } from './StudioServiceStore';

describe('<StudioServiceStore />', () => {
    it('renders with basic props', () => {
        const wrapper = shallow(
            <StudioServiceStore />,
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
