import { h } from 'preact';
import { PianoKey } from '../PianoKey/PianoKey';

interface WhiteKeyProps {
    onMouseLeave: (e: MouseEvent) => void;
    onMouseOver: (e: MouseEvent) => void;
    onMouseDown: (e: MouseEvent) => void;
    onMouseUp: (e: MouseEvent) => void;
}

export const WhiteKey = ({
    onMouseLeave,
    onMouseOver,
    onMouseDown,
    onMouseUp,
}: WhiteKeyProps) => (
    <PianoKey
        className="piano-key--white"
        onMouseLeave={(e: MouseEvent) => onMouseLeave(e)}
        onMouseOver={(e: MouseEvent) => onMouseOver(e)}
        onMouseDown={(e: MouseEvent) => onMouseDown(e)}
        onMouseUp={(e: MouseEvent) => onMouseUp(e)}
    />
);
