import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { setOscillatorEnabled, setOscillatorType } from '../../lib/studioService/studioServiceActions';
import { StudioServiceContext } from '../../lib/studioService/StudioServiceStore';
import { OscillatorTypeEnum, OscillatorTypes } from '../../types/runtimeTypes';
import { OscillatorId } from '../../types/types';
import { Checkbox } from '../Checkbox/Checkbox';


interface OscillatorProps {
    audioContext: AudioContext;
    oscillatorId: OscillatorId;
}

export const Oscillator = ({ audioContext, oscillatorId }: OscillatorProps) => {
    const [studioService, dispatch] = useContext(StudioServiceContext);
    const oscillator = studioService.oscillatorNodes[oscillatorId];
    const oscillatorType = oscillator.type;
    const oscillatorEnabled = oscillator.enabled;

    return (
        <div className="oscillator">
            <div className="oscillator__header">
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
            <div className="oscillator__modifiers">
                <select
                    className="oscillator__wave-type"
                    onInput={(event) => {
                        setOscillatorType(event.currentTarget.value as OscillatorType, oscillatorId, dispatch);
                    }}
                    value={oscillatorType}
                >
                    {
                        OscillatorTypes.map((type) => (
                            <option value={type}>{type}</option>

                        ))
                    }
                </select>
            </div>
        </div>
    );
};
