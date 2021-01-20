import { h } from 'preact';
import { useState } from 'preact/hooks';

// Todo: define correct types for event handlers
interface KeyboardKeyProps {
    className: string;
    onClick: () => void;
    onMouseLeave: () => void;
    onMouseOver: () => void;
}

const KeyboardKey = ({
    className,
    onClick,
    onMouseLeave,
    onMouseOver,
}: KeyboardKeyProps) => {
    const [isPressed, setIsPressed] = useState(false);

    const handleOnMouseLeave = () => {
        setIsPressed(false);
        onMouseLeave();
    };
    const handleOnMouseOver = () => {
        setIsPressed(false);
        onMouseOver();
    };

    return (
        <div
            class={`key ${className} ${isPressed ? 'key--active' : ''}`}
            label="white-key"
            onClick={onClick}
            onKeyDown={() => {}}
            onMouseLeave={handleOnMouseLeave}
            onMouseOver={handleOnMouseOver}
            onFocus={() => {}}
            role="button"
            tabIndex={0}
            type="button"
        />
    );
};


export default KeyboardKey;
