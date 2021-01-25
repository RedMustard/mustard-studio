import { h } from 'preact';
import { useContext, useEffect } from 'preact/hooks';
import { setMasterGainNode, handleChangeMasterVolume } from '../../lib/studioService/studioServiceActions';
import { StudioServiceContext } from '../../lib/studioService/StudioServiceStore';
import { VolumeFader } from '../VolumeFader/VolumeFader';

interface MasterVolumeProps {
    audioContext: AudioContext;
}

export const MasterVolume = ({ audioContext }: MasterVolumeProps) => {
    const [studioService, dispatch] = useContext(StudioServiceContext);
    const masterVolume = studioService.volume.master;
    let masterGainNode = studioService.gainNodes.master;

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
            M: &nbsp;
            <VolumeFader
                classSuffix="master"
                value={masterVolume}
                onChange={(value) => handleChangeMasterVolume(value, dispatch)}
            />
        </div>
    );
};
