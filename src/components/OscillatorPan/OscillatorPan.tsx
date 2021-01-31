import { h } from 'preact';
import { useContext, useEffect } from 'preact/hooks';
import { MAX_PAN, MIN_PAN, PAN_STEPS } from '../../constants';
import { setOscillatorPanNode, setOscillatorPanPosition } from '../../lib/studioService/studioServiceActions';
import { StudioServiceContext } from '../../lib/studioService/StudioServiceStore';
import { ValueUnitEnum } from '../../types/runtimeTypes';
import { OscillatorId } from '../../types/types';
import { Fader } from '../Fader/Fader';

interface OscillatorPanProps {
    audioContext: AudioContext;
    oscillatorId: OscillatorId;
}

export const OscillatorPan = ({ audioContext, oscillatorId }: OscillatorPanProps) => {
    const [studioService, dispatch] = useContext(StudioServiceContext);
    const { settings, gainNodes, panNodes } = studioService;
    const oscillatorPanPosition = settings[oscillatorId].pan;
    const oscillatorGainNode = gainNodes[oscillatorId];
    const masterGainNode = gainNodes.master;
    let oscillatorPanNode = panNodes[oscillatorId];

    useEffect(() => {
        if (!oscillatorPanNode) {
            oscillatorPanNode = audioContext.createStereoPanner();
            setOscillatorPanNode(oscillatorPanNode, oscillatorId, dispatch);
        } else {
            oscillatorPanNode.pan.value = oscillatorPanPosition;
            oscillatorPanNode.connect(masterGainNode);
            oscillatorGainNode.connect(oscillatorPanNode);
        }
    }, [oscillatorPanNode, oscillatorPanPosition, oscillatorGainNode, masterGainNode]);

    return (
        <div className="oscillator-pan">
            Pan: &nbsp;
            <Fader
                classSuffix="oscillator-pan"
                value={oscillatorPanPosition}
                onInput={(value) => setOscillatorPanPosition(value, oscillatorId, dispatch)}
                maxValue={MAX_PAN}
                minValue={MIN_PAN}
                stepResolution={PAN_STEPS}
                valueUnit={ValueUnitEnum.PAN}
            />
        </div>
    );
};
