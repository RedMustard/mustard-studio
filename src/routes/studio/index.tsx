import { FunctionalComponent, h } from 'preact';
import Keyboard from '../../components/Keyboard/Keyboard';

const Studio: FunctionalComponent = () => (
    <div class="studio">
        <h1>Studio</h1>
        <p>This is the Studio component.</p>
        <Keyboard keyCount={25} />
    </div>
);

export default Studio;
