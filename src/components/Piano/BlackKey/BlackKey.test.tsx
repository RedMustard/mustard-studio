import { h } from 'preact';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { BlackKey } from './BlackKey';


const baseProps = {
    onMouseDown: jest.fn(),
    onMouseUp: jest.fn(),
    onMouseOver: jest.fn(),
    onMouseLeave: jest.fn(),
};

describe('<BlackKey />', () => {
    it('renders with basic props', () => {
        const wrapper = shallow(
            <BlackKey
                {...baseProps}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('fires onMouseDown', () => {
        const wrapper = mount(
            <BlackKey
                {...baseProps}
            />,
        );
        wrapper.find('div').simulate('mousedown');
        expect(baseProps.onMouseDown).toBeCalled();
    });

    it('fires onMouseUp', () => {
        const wrapper = mount(
            <BlackKey
                {...baseProps}
            />,
        );
        wrapper.find('div').simulate('mouseup');
        expect(baseProps.onMouseUp).toBeCalled();
    });

    it('fires onMouseOver', () => {
        const wrapper = mount(
            <BlackKey
                {...baseProps}
            />,
        );
        wrapper.find('div').simulate('mouseover');
        expect(baseProps.onMouseDown).toBeCalled();
    });

    it('fires onMouseLeave', () => {
        const wrapper = mount(
            <BlackKey
                {...baseProps}
            />,
        );
        wrapper.find('div').simulate('mouseleave');
        expect(baseProps.onMouseDown).toBeCalled();
    });
});
