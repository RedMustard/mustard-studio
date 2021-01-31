import { h } from 'preact';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { KeyboardKey } from './KeyboardKey';


const baseProps = {
    onMouseDown: jest.fn(),
    onMouseUp: jest.fn(),
    onMouseOver: jest.fn(),
    onMouseLeave: jest.fn(),
};

describe('<KeyboardKey />', () => {
    it('renders with basic props', () => {
        const wrapper = shallow(
            <KeyboardKey
                {...baseProps}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders with custom class', () => {
        const wrapper = shallow(
            <KeyboardKey
                className="custom-class"
                {...baseProps}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders active after onMouseOver', () => {
        const wrapper = shallow(
            <KeyboardKey
                {...baseProps}
            />,
        );
        wrapper.find('div').simulate('mouseover');
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(baseProps.onMouseOver).toBeCalled();
    });

    it('renders active after onMouseDown', () => {
        const wrapper = shallow(
            <KeyboardKey
                {...baseProps}
            />,
        );
        wrapper.find('div').simulate('mousedown');
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(baseProps.onMouseOver).toBeCalled();
        expect(baseProps.onMouseDown).toBeCalled();
    });

    it('renders inactive after onMouseOver and onMouseLeave', () => {
        const wrapper = shallow(
            <KeyboardKey
                {...baseProps}
            />,
        );
        wrapper.find('div').simulate('mouseover');
        wrapper.find('div').simulate('mouseleave');
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(baseProps.onMouseOver).toBeCalled();
        expect(baseProps.onMouseLeave).toBeCalled();
    });

    it('renders inactive after onMouseDown and onMouseUp', () => {
        const wrapper = shallow(
            <KeyboardKey
                {...baseProps}
            />,
        );
        wrapper.find('div').simulate('mousedown');
        wrapper.find('div').simulate('mouseup');
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(baseProps.onMouseOver).toBeCalled();
        expect(baseProps.onMouseDown).toBeCalled();
        expect(baseProps.onMouseUp).toBeCalled();
    });
});
