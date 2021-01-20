import { FunctionalComponent, h } from 'preact';
import Keyboard from '../../components/Keyboard/Keyboard';
import { StudioServiceStore } from '../../lib/StudioService/StudioServiceStore';

const Studio: FunctionalComponent = () => (
    <StudioServiceStore>
        <div class="studio">
            <h1>Studio</h1>
            <p>This is the Studio component.</p>
            <Keyboard keyCount={25} />
        </div>
    </StudioServiceStore>
);

export default Studio;
