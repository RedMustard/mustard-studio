import { h } from 'preact';
import { KeyboardKey } from '../KeyboardKey/KeyboardKey';

interface BlackKeyProps {
    onMouseLeave: (e: MouseEvent) => void;
    onMouseOver: (e: MouseEvent) => void;
    onMouseDown: (e: MouseEvent) => void;
    onMouseUp: (e: MouseEvent) => void;
}

export const BlackKey = ({
    onMouseLeave,
    onMouseOver,
    onMouseDown,
    onMouseUp,
}: BlackKeyProps) => (
    <KeyboardKey
        className="keyboard-key--black"
        onMouseLeave={(e: MouseEvent) => onMouseLeave(e)}
        onMouseOver={(e: MouseEvent) => onMouseOver(e)}
        onMouseDown={(e: MouseEvent) => onMouseDown(e)}
        onMouseUp={(e: MouseEvent) => onMouseUp(e)}
    />
);
