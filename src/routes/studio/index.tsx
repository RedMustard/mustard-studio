import { FunctionalComponent, h } from 'preact';
import { useEffect } from 'preact/hooks';

import { Piano } from '../../components/Piano/Piano';
import { MasterVolume } from '../../components/MasterVolume/MasterVolume';
import { MasterPan } from '../../components/MasterPan/MasterPan';
import { Oscillator } from '../../components/Oscillator/Oscillator';
import { getAudioContext, setAudioContext } from '../../lib/audioContext/audioContext';
import { setMidiAccess } from '../../lib/inputDevices/midi/midi';
import { setKeyboardAccess } from '../../lib/inputDevices/keyboard/keyboard';

const Studio: FunctionalComponent = () => {
    let audioContext = getAudioContext();


    if (!audioContext) {
        setAudioContext();
        audioContext = getAudioContext();
    }

    useEffect(() => {
        setMidiAccess();
        setKeyboardAccess();
    }, []);

    return (
        <div className="studio">
            <div className="oscillators">
                <Oscillator oscillatorId="osc1" audioContext={audioContext} />
                <Oscillator oscillatorId="osc2" audioContext={audioContext} />
                <Oscillator oscillatorId="oscSub" audioContext={audioContext} />
            </div>
            <MasterVolume audioContext={audioContext} />
            <MasterPan audioContext={audioContext} />
            <Piano />
        </div>
    );
};

export default Studio;
