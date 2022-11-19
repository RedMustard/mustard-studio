import { Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useContext } from 'preact/hooks';

import { Piano } from '../../components/Piano/Piano';
import { MasterVolume } from '../../components/MasterVolume/MasterVolume';
import { MasterPan } from '../../components/MasterPan/MasterPan';
import { Oscillator } from '../../components/Oscillator/Oscillator';
import { getAudioContext, setAudioContext } from '../../lib/audioContext/audioContext';
import { setMidiStudioService } from '../../lib/inputDevices/midi/midi';
import { Envelope } from '../../components/Envelope/Envelope';
import { StudioServiceContext } from '../../lib/studioService/StudioServiceStore';
import { setKeyboardStudioService } from '../../lib/inputDevices/keyboard/keyboard';
import { Filter } from '../../components/Filter/Filter';

const Studio: FunctionalComponent = () => {
    let audioContext = getAudioContext();
    const [studioService] = useContext(StudioServiceContext);

    if (!audioContext) {
        setAudioContext();
        audioContext = getAudioContext();
    }

    useEffect(() => {
        setKeyboardStudioService(studioService);
        setMidiStudioService(studioService);
    }, [studioService]);

    return (
        <div className="studio">
            <Fragment>
                <div className="oscillators">
                    <Oscillator oscillatorId="osc1" audioContext={audioContext} />
                    <Oscillator oscillatorId="osc2" audioContext={audioContext} />
                    <Oscillator oscillatorId="oscSub" audioContext={audioContext} />
                    <Filter audioContext={audioContext} />
                </div>
                <Envelope />
                <MasterVolume audioContext={audioContext} />
                <MasterPan audioContext={audioContext} />
                <Piano />
            </Fragment>
        </div>
    );
};

export default Studio;
