import { h } from 'preact';
import KeyboardKey from '../KeyboardKey/KeyboardKey';

interface BlackKeyProps {
    onClick: () => void;
    onMouseLeave: () => void;
    onMouseOver: () => void;
}

const BlackKey = ({ onClick, onMouseLeave, onMouseOver }: BlackKeyProps) => (
    <KeyboardKey
        className="key--black"
        onClick={onClick}
        onMouseLeave={onMouseLeave}
        onMouseOver={onMouseOver}
    />
);


export default BlackKey;
