import { h } from 'preact';
import { useState } from 'preact/hooks';

interface KeyboardKeyProps {
    className: string;
    onMouseLeave: (e: MouseEvent) => void;
    onMouseOver: (e: MouseEvent) => void;
    onMouseDown: (e: MouseEvent) => void;
    onMouseUp: (e: MouseEvent) => void;
}

const KeyboardKey = ({
    className,
    onMouseLeave,
    onMouseOver,
    onMouseDown,
    onMouseUp,
}: KeyboardKeyProps) => {
    const [isPressed, setIsPressed] = useState(false);

    const handleOnMouseLeave = (e: MouseEvent) => {
        setIsPressed(false);
        onMouseLeave(e);
    };
    const handleOnMouseOver = (e: MouseEvent) => {
        setIsPressed(true);
        onMouseOver(e);
    };
    const handleOnMouseUp = (e: MouseEvent) => {
        setIsPressed(false);
        onMouseUp(e);
    };
    const handleOnMouseDown = (e: MouseEvent) => {
        setIsPressed(true);
        onMouseDown(e);
    };

    return (
        <div
            class={`key ${className} ${isPressed ? 'key--active' : ''}`}
            label="white-key"
            onKeyDown={() => {}}
            onMouseDown={(e: MouseEvent) => handleOnMouseDown(e)}
            onMouseUp={(e: MouseEvent) => handleOnMouseUp(e)}
            onMouseLeave={(e: MouseEvent) => handleOnMouseLeave(e)}
            onMouseOver={(e: MouseEvent) => handleOnMouseOver(e)}
            onFocus={() => { /* Todo: Accessibility */ }}
            role="button"
            tabIndex={0}
            type="button"
        />
    );
};


export default KeyboardKey;
