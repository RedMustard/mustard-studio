import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { setOscillatorDetune } from '../../lib/studioService/studioServiceActions';
import { StudioServiceContext } from '../../lib/studioService/StudioServiceStore';
import { OscillatorId } from '../../types/types';
import { DetuneFader } from '../DetuneFader/DetuneFader';

interface OscillatorDetuneProps {
    oscillatorId: OscillatorId;
}

export const OscillatorDetune = ({ oscillatorId }: OscillatorDetuneProps) => {
    const [studioService, dispatch] = useContext(StudioServiceContext);
    const oscillatorNode = studioService.settings[oscillatorId];
    const oscillatorDetune = oscillatorNode.detune; // fix

    return (
        <div className="oscillator-detune">
            Detune: &nbsp;
            <DetuneFader
                classSuffix="oscillator-detune"
                value={oscillatorDetune}
                onInput={(value) => setOscillatorDetune(value, oscillatorId, dispatch)}
            />
        </div>
    );
};
