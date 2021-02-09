import { h } from 'preact';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { VolumeFader } from './VolumeFader';


const baseProps = {
    value: 1.0,
    onInput: jest.fn(),
    onMouseDown: jest.fn(),
    classSuffix: 'foo',
};

describe('<VolumeFader />', () => {
    it('renders with basic props', () => {
        const wrapper = shallow(
            <VolumeFader
                {...baseProps}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('calls onInput when changed', () => {
        const wrapper = mount(
            <VolumeFader
                {...baseProps}
            />,
        );
        wrapper.find('input').simulate('input');
        expect(baseProps.onInput).toBeCalled();
    });

    it('calls onMouseDown when clicked', () => {
        const wrapper = mount(
            <VolumeFader
                {...baseProps}
            />,
        );
        wrapper.find('input').simulate('mousedown');
        expect(baseProps.onInput).toBeCalled();
    });
});
