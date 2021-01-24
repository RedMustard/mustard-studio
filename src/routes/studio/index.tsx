import { FunctionalComponent, h } from 'preact';
import { useContext } from 'preact/hooks';
import { Keyboard } from '../../components/Keyboard/Keyboard';
import { MAX_VOLUME, MIN_VOLUME, VOLUME_STEPS } from '../../constants';
import { StudioServiceContext, StudioServiceStore } from '../../lib/studioService/StudioServiceStore';
import { StudioService } from '../../types/types';

const Studio: FunctionalComponent = () => {
    const [studioService, dispatch]: [StudioService, Function] = useContext(StudioServiceContext);
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const masterGainNode = audioContext.createGain();
    masterGainNode.gain.value = studioService.volume.master;
    masterGainNode.connect(audioContext.destination);

    // Todo: test
    const handleChangeVolume = (value: any) => {
        // Todo: Centralize dispatches
        dispatch({ type: 'SET_MASTER_VOLUME', payload: parseFloat(value) });
        console.log(`Master volume changed to ${parseFloat(value) * 100}%`);
    };

    return (
        <StudioServiceStore>
            <div class="studio">
                {/* Todo: Replace with volume component */}
                <input
                    onInput={(event) => handleChangeVolume(event.currentTarget.value)}
                    list="volumes"
                    max={MAX_VOLUME}
                    min={MIN_VOLUME}
                    name="volume"
                    step={VOLUME_STEPS}
                    type="range"
                    value={studioService.volume.master}
                />
                <datalist id="volumes">
                    <option value={MIN_VOLUME} label="Mute" />
                    <option value={MAX_VOLUME} label="100%" />
                </datalist>
                <Keyboard audioContext={audioContext} gainNode={masterGainNode} />
            </div>
        </StudioServiceStore>
    );
};

export default Studio;
