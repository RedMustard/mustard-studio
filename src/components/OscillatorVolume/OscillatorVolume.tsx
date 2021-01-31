import { h } from 'preact';
import { useContext, useEffect } from 'preact/hooks';
import { setOscillatorGainNode, setOscillatorVolume } from '../../lib/studioService/studioServiceActions';
import { StudioServiceContext } from '../../lib/studioService/StudioServiceStore';
import { OscillatorId } from '../../types/types';
import { VolumeFader } from '../VolumeFader/VolumeFader';

interface OscillatorVolumeProps {
    audioContext: AudioContext;
    oscillatorId: OscillatorId;
}

export const OscillatorVolume = ({ audioContext, oscillatorId }: OscillatorVolumeProps) => {
    const [studioService, dispatch] = useContext(StudioServiceContext);
    const oscillatorVolume = studioService.settings[oscillatorId].volume;
    const masterGainNode = studioService.gainNodes.master;
    let oscillatorGainNode = studioService.gainNodes[oscillatorId];

    useEffect(() => {
        if (!oscillatorGainNode) {
            oscillatorGainNode = audioContext.createGain();
            setOscillatorGainNode(oscillatorGainNode, oscillatorId, dispatch);
        } else {
            oscillatorGainNode.gain.value = oscillatorVolume;
            oscillatorGainNode.connect(masterGainNode);
        }
    }, [oscillatorGainNode, oscillatorVolume, masterGainNode]);

    return (
        <div className="oscillator-volume">
            Vol: &nbsp;
            <VolumeFader
                classSuffix="oscillator-volume"
                value={oscillatorVolume}
                onInput={(value) => setOscillatorVolume(value, oscillatorId, dispatch)}
            />
        </div>
    );
};
