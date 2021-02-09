import { h } from 'preact';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Fader } from './Fader';
import { ValueUnitEnum } from '../../types/runtimeTypes';


const baseProps = {
    classSuffix: 'foo',
    maxValue: 1,
    minValue: 0,
    onInput: jest.fn(),
    onMouseDown: jest.fn(),
    stepResolution: 0.1,
    value: 0.5,
    valueUnit: ValueUnitEnum.CENT,
};

describe('<FaderKey />', () => {
    it('renders with basic props', () => {
        const wrapper = shallow(
            <Fader
                {...baseProps}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders with mousedown', () => {
        const wrapper = shallow(
            <Fader
                {...baseProps}
            />,
        );
        wrapper.find('input').simulate('mousedown');
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders with mousedown and mouseup', () => {
        const wrapper = shallow(
            <Fader
                {...baseProps}
            />,
        );
        wrapper.find('input').simulate('mousedown');
        wrapper.find('input').simulate('mouseup');
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders with PERCENT valueUnit', () => {
        const wrapper = shallow(
            <Fader
                {...baseProps}
                valueUnit={ValueUnitEnum.PERCENT}
            />,
        );
        wrapper.find('input').simulate('mousedown');
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders with PAN valueUnit onMouseDown', () => {
        const wrapper = shallow(
            <Fader
                {...baseProps}
                valueUnit={ValueUnitEnum.PAN}
            />,
        );
        wrapper.find('input').simulate('mousedown');
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('fires onInput', () => {
        const wrapper = mount(
            <Fader
                {...baseProps}
            />,
        );
        wrapper.find('input').simulate('input');
        expect(baseProps.onInput).toBeCalled();
    });

    it('fires onMouseDown', () => {
        const wrapper = mount(
            <Fader
                {...baseProps}
            />,
        );
        wrapper.find('input').simulate('mousedown');
        expect(baseProps.onMouseDown).toBeCalled();
    });
});
