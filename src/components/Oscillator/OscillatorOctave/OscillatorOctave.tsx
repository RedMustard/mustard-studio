import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { MAX_OSC_OCTAVE, MIN_OSC_OCTAVE, OCTAVE_STEPS } from '../../../constants';
import { resetOscillatorOctave, setOscillatorOctave } from '../../../lib/studioService/studioServiceActions';
import { StudioServiceContext } from '../../../lib/studioService/StudioServiceStore';
import { ValueUnitEnum } from '../../../types/runtimeTypes';
import { OscillatorId } from '../../../types/types';
import { Fader } from '../../Fader/Fader';

interface OscillatorOctaveProps {
    oscillatorId: OscillatorId;
}

export const OscillatorOctave = ({ oscillatorId }: OscillatorOctaveProps) => {
    const [studioService, dispatch] = useContext(StudioServiceContext);
    const { oscillators } = studioService;
    const oscillatorOctave = oscillators[oscillatorId].settings.octave;

    const handleOnMouseDown = (e: MouseEvent) => {
        if (e.buttons === 1 && (e.ctrlKey || e.metaKey)) {
            resetOscillatorOctave(oscillatorId, dispatch);
        }
    };

    return (
        <div className="oscillator-octave">
            Octave: &nbsp;
            <Fader
                classSuffix="oscillator-octave"
                value={oscillatorOctave}
                onInput={(value) => setOscillatorOctave(value, oscillatorId, dispatch)}
                onMouseDown={(e: MouseEvent) => handleOnMouseDown(e)}
                maxValue={MAX_OSC_OCTAVE}
                minValue={MIN_OSC_OCTAVE}
                stepResolution={OCTAVE_STEPS}
                valueUnit={ValueUnitEnum.CENT}
            />
        </div>
    );
};
