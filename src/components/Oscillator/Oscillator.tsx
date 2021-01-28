import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { setOscillatorEnabled } from '../../lib/studioService/studioServiceActions';
import { StudioServiceContext } from '../../lib/studioService/StudioServiceStore';
import { OscillatorId } from '../../types/types';
import { Checkbox } from '../Checkbox/Checkbox';


interface OscillatorProps {
    audioContext: AudioContext;
    oscillatorId: OscillatorId;
}

export const Oscillator = ({ audioContext, oscillatorId }: OscillatorProps) => {
    const [studioService, dispatch] = useContext(StudioServiceContext);
    const oscillator = studioService.oscillatorNodes[oscillatorId];
    // const oscillatorType = oscillator.type; // TODO: Uncomment for MS-58
    const oscillatorEnabled = oscillator.enabled;

    return (
        <div className="oscillator">
            <div className="oscillator__label">
                {oscillatorId}
            </div>

            <Checkbox
                onInput={(isChecked) => {
                    setOscillatorEnabled(isChecked, oscillatorId, dispatch);
                }}
                isChecked={oscillatorEnabled}
            />
        </div>
    );
};
