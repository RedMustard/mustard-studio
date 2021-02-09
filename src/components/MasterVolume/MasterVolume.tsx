import { h } from 'preact';
import { useContext, useEffect } from 'preact/hooks';
import { resetMasterVolume, setMasterGainNode, setMasterVolume } from '../../lib/studioService/studioServiceActions';
import { StudioServiceContext } from '../../lib/studioService/StudioServiceStore';
import { VolumeFader } from '../VolumeFader/VolumeFader';

interface MasterVolumeProps {
    audioContext: AudioContext;
}

export const MasterVolume = ({ audioContext }: MasterVolumeProps) => {
    const [studioService, dispatch] = useContext(StudioServiceContext);
    const masterVolume = studioService.settings.master.volume;
    let masterGainNode = studioService.gainNodes.master;

    const handleOnMouseDown = (e: MouseEvent) => {
        if (e.buttons === 1 && (e.ctrlKey || e.metaKey)) {
            resetMasterVolume(dispatch);
        }
    };

    useEffect(() => {
        if (!masterGainNode) {
            masterGainNode = audioContext.createGain();
            masterGainNode.connect(audioContext.destination);
            setMasterGainNode(masterGainNode, dispatch);
        } else {
            masterGainNode.gain.value = masterVolume;
        }
    }, [masterGainNode, masterVolume]);

    return (
        <div className="master-volume">
            M Vol: &nbsp;
            <VolumeFader
                classSuffix="master-volume"
                value={masterVolume}
                onInput={(value) => setMasterVolume(value, dispatch)}
                onMouseDown={(e: MouseEvent) => handleOnMouseDown(e)}
            />
        </div>
    );
};
