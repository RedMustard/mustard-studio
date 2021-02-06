import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { setOscillatorEnabled, setOscillatorType } from '../../lib/studioService/studioServiceActions';
import { StudioServiceContext } from '../../lib/studioService/StudioServiceStore';
import { OscillatorTypes } from '../../types/runtimeTypes';
import { OscillatorId } from '../../types/types';
import { Checkbox } from '../Checkbox/Checkbox';
import { OscillatorDetune } from '../OscillatorDetune/OscillatorDetune';
import { OscillatorPan } from '../OscillatorPan/OscillatorPan';
import { OscillatorVolume } from '../OscillatorVolume/OscillatorVolume';
import { OscillatorOctave } from '../OscillatorOctave/OscillatorOctave';


interface OscillatorProps {
    audioContext: AudioContext;
    oscillatorId: OscillatorId;
}

export const Oscillator = ({ audioContext, oscillatorId }: OscillatorProps) => {
    const [studioService, dispatch] = useContext(StudioServiceContext);
    const oscillatorSettings = studioService.settings[oscillatorId];
    const oscillatorType = oscillatorSettings.type;
    const oscillatorEnabled = oscillatorSettings.enabled;

    return (
        <div className="oscillator">
            <div className="oscillator__header">
                <div className="oscillator__label">
                    {oscillatorId}
                </div>

                {/* Todo: Replace with LED Button component */}
                <Checkbox
                    onInput={(isChecked) => {
                        setOscillatorEnabled(isChecked, oscillatorId, dispatch);
                    }}
                    isChecked={oscillatorEnabled}
                />
            </div>
            <div className="oscillator__modifiers">
                {/* Todo: Replace with styled dropdown component */}
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

                <OscillatorVolume
                    audioContext={audioContext}
                    oscillatorId={oscillatorId}
                />

                {
                    oscillatorSettings.hasOwnProperty('detune')
                        ? (
                            <OscillatorDetune
                                oscillatorId={oscillatorId}
                            />
                        )
                        : null
                }

                <OscillatorPan
                    audioContext={audioContext}
                    oscillatorId={oscillatorId}
                />

                <OscillatorOctave
                    oscillatorId={oscillatorId}
                />
            </div>
        </div>
    );
};
