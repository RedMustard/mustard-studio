import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { MAX_OCTAVE, MIN_OCTAVE, OCTAVE_STEPS } from '../../constants';
import { setOscillatorOctave } from '../../lib/studioService/studioServiceActions';
import { StudioServiceContext } from '../../lib/studioService/StudioServiceStore';
import { ValueUnitEnum } from '../../types/runtimeTypes';
import { OscillatorId } from '../../types/types';
import { Fader } from '../Fader/Fader';

interface OscillatorOctaveProps {
    oscillatorId: OscillatorId;
}

export const OscillatorOctave = ({ oscillatorId }: OscillatorOctaveProps) => {
    const [studioService, dispatch] = useContext(StudioServiceContext);
    const { settings } = studioService;
    const oscillatorOctave = settings[oscillatorId].octave;

    return (
        <div className="oscillator-octave">
            Octave: &nbsp;
            <Fader
                classSuffix="oscillator-octave"
                value={oscillatorOctave}
                onInput={(value) => setOscillatorOctave(value, oscillatorId, dispatch)}
                maxValue={MAX_OCTAVE}
                minValue={MIN_OCTAVE}
                stepResolution={OCTAVE_STEPS}
                valueUnit={ValueUnitEnum.CENT}
            />
        </div>
    );
};
