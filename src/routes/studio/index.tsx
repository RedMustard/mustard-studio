import { FunctionalComponent, h } from 'preact';

import { Keyboard } from '../../components/Keyboard/Keyboard';
import { MasterVolume } from '../../components/MasterVolume/MasterVolume';
import { MasterPan } from '../../components/MasterPan/MasterPan';
import { Oscillator } from '../../components/Oscillator/Oscillator';
import { getAudioContext, setAudioContext } from '../../lib/audioContext/audioContext';

const Studio: FunctionalComponent = () => {
    let audioContext = getAudioContext();

    if (!audioContext) {
        setAudioContext();
        audioContext = getAudioContext();
    }

    return (
        <div class="studio">
            <Oscillator oscillatorId="osc1" audioContext={audioContext} />
            <Oscillator oscillatorId="osc2" audioContext={audioContext} />
            <Oscillator oscillatorId="oscSub" audioContext={audioContext} />
            <MasterVolume audioContext={audioContext} />
            <MasterPan audioContext={audioContext} />
            <Keyboard />
        </div>
    );
};

export default Studio;
