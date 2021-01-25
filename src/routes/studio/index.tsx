import { FunctionalComponent, h } from 'preact';

import { Keyboard } from '../../components/Keyboard/Keyboard';
import { MasterVolume } from '../../components/MasterVolume/MasterVolume';

const Studio: FunctionalComponent = () => {
    const audioContext = new AudioContext();


    return (
        <div class="studio">
            <MasterVolume audioContext={audioContext} />
            <Keyboard audioContext={audioContext} />
        </div>
    );
};

export default Studio;
