import { h } from 'preact';
import { useContext, useEffect } from 'preact/hooks';
import { setMasterGainNode, handleChangeMasterVolume, setOscillatorEnabled } from '../../lib/studioService/studioServiceActions';
import { StudioServiceContext } from '../../lib/studioService/StudioServiceStore';
import { OscillatorId } from '../../types/types';

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
        <div className="oscillator" style={{ color: '#fff' }}>
            {oscillatorId}
            &nbsp; Power:

            <br />

            On:
            <input
                type="radio"
                name={`${oscillatorId}-enabled`}
                value="true"
                onChange={(e: InputEvent) => {
                    setOscillatorEnabled(true, oscillatorId, dispatch);
                }}
                checked={oscillatorEnabled}
            />

            Off:
            <input
                type="radio"
                name={`${oscillatorId}-enabled`}
                value="false"
                onChange={(e: InputEvent) => {
                    setOscillatorEnabled(false, oscillatorId, dispatch);
                }}
                checked={!oscillatorEnabled}
            />
        </div>
    );
};
