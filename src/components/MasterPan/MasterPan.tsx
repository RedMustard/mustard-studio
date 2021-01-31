import { h } from 'preact';
import { useContext, useEffect } from 'preact/hooks';
import { MAX_PAN, MIN_PAN, PAN_STEPS } from '../../constants';
import { setMasterPanNode, setMasterPanPosition } from '../../lib/studioService/studioServiceActions';
import { StudioServiceContext } from '../../lib/studioService/StudioServiceStore';
import { ValueUnitEnum } from '../../types/runtimeTypes';
import { Fader } from '../Fader/Fader';

interface MasterPanProps {
    audioContext: AudioContext;
}

export const MasterPan = ({ audioContext }: MasterPanProps) => {
    const [studioService, dispatch] = useContext(StudioServiceContext);
    const masterPanPosition = studioService.settings.master.pan;
    const masterGainNode = studioService.gainNodes.master;
    let masterPanNode = studioService.panNodes.master;

    useEffect(() => {
        if (!masterPanNode) {
            masterPanNode = audioContext.createStereoPanner();
            setMasterPanNode(masterPanNode, dispatch);
        } else {
            masterPanNode.pan.value = masterPanPosition;
            masterPanNode.connect(audioContext.destination);
            masterGainNode.connect(masterPanNode);
        }
    }, [masterPanNode, masterPanPosition, masterGainNode]);

    return (
        <div className="master-pan">
            M Pan: &nbsp;
            <Fader
                classSuffix="master-pan"
                value={masterPanPosition}
                onInput={(value) => setMasterPanPosition(value, dispatch)}
                maxValue={MAX_PAN}
                minValue={MIN_PAN}
                stepResolution={PAN_STEPS}
                valueUnit={ValueUnitEnum.PAN}
            />
        </div>
    );
};
