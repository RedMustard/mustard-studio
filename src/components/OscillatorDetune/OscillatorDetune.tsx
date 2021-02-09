import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { resetOscillatorDetune, setOscillatorDetune } from '../../lib/studioService/studioServiceActions';
import { StudioServiceContext } from '../../lib/studioService/StudioServiceStore';
import { OscillatorId } from '../../types/types';
import { DetuneFader } from '../DetuneFader/DetuneFader';

interface OscillatorDetuneProps {
    oscillatorId: OscillatorId;
}

export const OscillatorDetune = ({ oscillatorId }: OscillatorDetuneProps) => {
    const [studioService, dispatch] = useContext(StudioServiceContext);
    const oscillatorSettings = studioService.settings[oscillatorId as 'osc1' | 'osc2'];
    const oscillatorDetune = oscillatorSettings.detune;

    const handleOnMouseDown = (e: MouseEvent) => {
        if (e.buttons === 1 && (e.ctrlKey || e.metaKey)) {
            resetOscillatorDetune(oscillatorId, dispatch);
        }
    };

    return (
        <div className="oscillator-detune">
            Detune: &nbsp;
            <DetuneFader
                classSuffix="oscillator-detune"
                value={oscillatorDetune}
                onInput={(value) => setOscillatorDetune(value, oscillatorId, dispatch)}
                onMouseDown={(e: MouseEvent) => handleOnMouseDown(e)}
            />
        </div>
    );
};
