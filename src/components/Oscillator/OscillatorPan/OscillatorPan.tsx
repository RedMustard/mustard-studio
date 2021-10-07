import { h } from 'preact';
import { useContext, useEffect } from 'preact/hooks';
import { MAX_PAN, MIN_PAN, PAN_STEPS } from '../../../constants';
import { resetOscillatorPanPosition, setOscillatorPanNode, setOscillatorPanPosition } from '../../../lib/studioService/studioServiceActions';
import { StudioServiceContext } from '../../../lib/studioService/StudioServiceStore';
import { ValueUnitEnum } from '../../../types/runtimeTypes';
import { OscillatorId } from '../../../types/types';
import { Fader } from '../../Fader/Fader';

interface OscillatorPanProps {
    audioContext: AudioContext;
    oscillatorId: OscillatorId;
}

export const OscillatorPan = ({ audioContext, oscillatorId }: OscillatorPanProps) => {
    const [studioService, dispatch] = useContext(StudioServiceContext);
    const { oscillators, master } = studioService;
    const oscillatorPanPosition = oscillators[oscillatorId].settings.pan;
    const oscillatorGainNode = oscillators[oscillatorId].gainNode;
    const masterGainNode = master.gainNode;
    let oscillatorPanNode = oscillators[oscillatorId].panNode;

    const handleOnMouseDown = (e: MouseEvent) => {
        if (e.buttons === 1 && (e.ctrlKey || e.metaKey)) {
            resetOscillatorPanPosition(oscillatorId, dispatch);
        }
    };

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
                onMouseDown={(e: MouseEvent) => handleOnMouseDown(e)}
                maxValue={MAX_PAN}
                minValue={MIN_PAN}
                stepResolution={PAN_STEPS}
                valueUnit={ValueUnitEnum.PAN}
            />
        </div>
    );
};
