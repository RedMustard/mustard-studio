import { h } from 'preact';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { DetuneFader } from './DetuneFader';


const baseProps = {
    value: 1.0,
    onInput: jest.fn(),
    classSuffix: 'foo',
};

describe('<DetuneFader />', () => {
    it('renders with basic props', () => {
        const wrapper = shallow(
            <DetuneFader
                {...baseProps}
            />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('calls onInput when changed', () => {
        const wrapper = mount(
            <DetuneFader
                {...baseProps}
            />,
        );
        wrapper.find('input').simulate('input');
        expect(baseProps.onInput).toBeCalled();
    });
});
