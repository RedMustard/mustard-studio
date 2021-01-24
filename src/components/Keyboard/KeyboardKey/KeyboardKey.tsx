import { h } from 'preact';
import { useState } from 'preact/hooks';

interface KeyboardKeyProps {
    onMouseLeave: (e: MouseEvent) => void;
    onMouseOver: (e: MouseEvent) => void;
    onMouseDown: (e: MouseEvent) => void;
    onMouseUp: (e: MouseEvent) => void;
    className?: string;
}

export const KeyboardKey = ({
    onMouseLeave,
    onMouseOver,
    onMouseDown,
    onMouseUp,
    className = '',
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
            class={`keyboard-key ${className} ${isPressed ? 'keyboard-key--active' : ''}`}
            label="keyboard-key"
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
