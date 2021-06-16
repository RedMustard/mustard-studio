import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { ENVELOPE_STEPS, MAX_ENVELOPE, MIN_ENVELOPE } from '../../../constants';
import { setEnvelopeSustain, resetEnvelopeSustain } from '../../../lib/studioService/studioServiceActions';
import { StudioServiceContext } from '../../../lib/studioService/StudioServiceStore';
import { ValueUnitEnum } from '../../../types/runtimeTypes';
import { Fader } from '../../Fader/Fader';


export const Sustain = () => {
    const [studioService, dispatch] = useContext(StudioServiceContext);
    const { envelope } = studioService;
    const envelopeSustain = envelope.sustain;

    const handleOnMouseDown = (e: MouseEvent) => {
        if (e.buttons === 1 && (e.ctrlKey || e.metaKey)) {
            resetEnvelopeSustain(dispatch);
        }
    };

    return (
        <div className="envelope-sustain">
            Sustain: &nbsp;
            <Fader
                classSuffix="envelope-sustain"
                value={envelopeSustain}
                onInput={(value) => setEnvelopeSustain(value, dispatch)}
                onMouseDown={(e: MouseEvent) => handleOnMouseDown(e)}
                maxValue={MAX_ENVELOPE}
                minValue={MIN_ENVELOPE}
                stepResolution={ENVELOPE_STEPS}
                valueUnit={ValueUnitEnum.CENT}
            />
        </div>
    );
};
