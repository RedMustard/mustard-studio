import { h } from 'preact';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { VolumeFader } from './VolumeFader';


describe('<VolumeFader />', () => {
    const baseProps = {
        value: 1.0,
        onChange: jest.fn(),
    };

    it('renders with basic props', () => {
        const wrapper = shallow(
            <VolumeFader
                {...baseProps}
            />,
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders with custom class suffix', () => {
        const wrapper = shallow(
            <VolumeFader
                {...baseProps}
                classSuffix="foo"
            />,
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('calls onChange when changed', () => {
        const wrapper = mount(
            <VolumeFader
                {...baseProps}
            />,
        );

        wrapper.find('.volume-fader').simulate('input');

        expect(baseProps.onChange).toBeCalled();
    });
});
