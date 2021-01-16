import { h } from 'preact';
import KeyboardKey from '../KeyboardKey/KeyboardKey';

interface WhiteKeyProps {
    onClick: h.JSX.MouseEventHandler<HTMLDivElement>;
}

const WhiteKey = ({ onClick }: WhiteKeyProps) => (
    <KeyboardKey
        className="key--white"
        onClick={onClick}
    />
    // <button
    //     class="key key--white"
    //     onClick={onClick}
    //     type="button"
    //     label="white-key"
    // />
);


export default WhiteKey;
