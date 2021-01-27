import { FunctionalComponent, h } from 'preact';

import { Keyboard } from '../../components/Keyboard/Keyboard';
import { MasterVolume } from '../../components/MasterVolume/MasterVolume';
import { Oscillator } from '../../components/Oscillator/OscillatorComponent';

const Studio: FunctionalComponent = () => {
    const audioContext = new AudioContext();


    return (
        <div class="studio">
            <Oscillator oscillatorId="osc1" audioContext={audioContext} />
            <Oscillator oscillatorId="osc2" audioContext={audioContext} />
            <MasterVolume audioContext={audioContext} />
            <Keyboard audioContext={audioContext} />
        </div>
    );
};

export default Studio;
