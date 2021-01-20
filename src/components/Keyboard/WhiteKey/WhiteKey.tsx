import { h } from 'preact';
import KeyboardKey from '../KeyboardKey/KeyboardKey';

interface WhiteKeyProps {
    onClick: () => void;
    onMouseLeave: () => void;
    onMouseOver: () => void;
}

const WhiteKey = ({ onClick, onMouseLeave, onMouseOver }: WhiteKeyProps) => (
    <KeyboardKey
        className="key--white"
        onClick={onClick}
        onMouseLeave={onMouseLeave}
        onMouseOver={onMouseOver}
    />
);


export default WhiteKey;
