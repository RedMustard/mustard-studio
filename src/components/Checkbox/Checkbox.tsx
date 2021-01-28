import { h } from 'preact';


interface CheckboxProps {
    onInput: (isChecked: boolean) => void;
    isChecked: boolean;
}

export const Checkbox = ({ onInput, isChecked }: CheckboxProps) => (
    <div className="checkbox">
        <input
            className="checkbox__input"
            id="sid-opt-in"
            name="sid-opt-in"
            type="checkbox"
            checked={isChecked}
            onInput={(e) => {
                onInput(e.currentTarget.checked);
            }}
        />
        <span className="checkbox__input-like" />
    </div>
);
