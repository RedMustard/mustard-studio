import { h } from 'preact';
import { useState } from 'preact/hooks';

interface KeyboardKeyProps {
    className: string;
    onClick: h.JSX.MouseEventHandler<HTMLDivElement>;
    onMouseDown: h.JSX.TargetedEvent<HTMLDivElement, Event>;
}

const KeyboardKey = ({ className, onClick, onMouseDown }: KeyboardKeyProps) => {
    const [isPressed, setIsPressed] = useState(false);

    const handleOnMouseEnter = (e: h.JSX.TargetedEvent<HTMLDivElement, Event>) => {
        setIsPressed(true);
        // onMouseDown(e.target.va);
    };
    const handleOnMouseLeave = (e: h.JSX.TargetedEvent<HTMLDivElement, Event>) => {
        setIsPressed(false);
        // onMouseDown(e.target.va);
    };

    return (
        <div
            class={`key ${className} ${isPressed ? 'key--active' : ''}`}
            label="white-key"
            onClick={onClick}
            onKeyDown={() => {}}
            onMouseEnter={(e: h.JSX.TargetedEvent<HTMLDivElement, Event>) => handleOnMouseEnter(e)}
            onMouseLeave={(e: h.JSX.TargetedEvent<HTMLDivElement, Event>) => handleOnMouseLeave(e)}
            role="button"
            tabIndex={0}
            type="button"
        />
    );
};


export default KeyboardKey;
