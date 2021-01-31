import { h } from 'preact';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Checkbox } from './Checkbox';


const baseProps = {
    isChecked: false,
    onInput: jest.fn(),
};

describe('<Checkbox />', () => {
    it('renders with basic props', () => {
        const wrapper = shallow(
            <Checkbox
                {...baseProps}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders checked', () => {
        const wrapper = shallow(
            <Checkbox
                {...baseProps}
                isChecked
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('calls onInput when changed', () => {
        const wrapper = mount(
            <Checkbox
                {...baseProps}
            />,
        );
        wrapper.find('.checkbox__input').simulate('input');
        expect(baseProps.onInput).toBeCalled();
    });
});
