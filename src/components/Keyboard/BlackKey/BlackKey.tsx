import { h } from 'preact';
import KeyboardKey from '../KeyboardKey/KeyboardKey';

interface BlackKeyProps {
    onClick: h.JSX.MouseEventHandler<HTMLDivElement>;
}

const BlackKey = ({ onClick }: BlackKeyProps) => (
    <KeyboardKey
        className="key--black"
        onClick={onClick}
    />
    // <button
    //     class="key key--black"
    //     onClick={onClick}
    //     type="button"
    //     label="black-key"
    // />
);


export default BlackKey;
