import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { ENVELOPE_STEPS, MAX_ENVELOPE, MIN_ENVELOPE } from '../../../constants';
import { setEnvelopeDecay, resetEnvelopeDecay } from '../../../lib/studioService/studioServiceActions';
import { StudioServiceContext } from '../../../lib/studioService/StudioServiceStore';
import { ValueUnitEnum } from '../../../types/runtimeTypes';
import { Fader } from '../../Fader/Fader';


export const Decay = () => {
    const [studioService, dispatch] = useContext(StudioServiceContext);
    const { envelope } = studioService;
    const envelopeDecay = envelope.decay;

    const handleOnMouseDown = (e: MouseEvent) => {
        if (e.buttons === 1 && (e.ctrlKey || e.metaKey)) {
            resetEnvelopeDecay(dispatch);
        }
    };

    return (
        <div className="envelope-decay">
            Decay: &nbsp;
            <Fader
                classSuffix="envelope-decay"
                value={envelopeDecay}
                onInput={(value) => setEnvelopeDecay(value, dispatch)}
                onMouseDown={(e: MouseEvent) => handleOnMouseDown(e)}
                maxValue={MAX_ENVELOPE}
                minValue={MIN_ENVELOPE}
                stepResolution={ENVELOPE_STEPS}
                valueUnit={ValueUnitEnum.SECONDS}
            />
        </div>
    );
};
