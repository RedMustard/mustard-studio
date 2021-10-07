import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { ENVELOPE_STEPS, MAX_ENVELOPE, MIN_ENVELOPE } from '../../../constants';
import { setEnvelopeRelease, resetEnvelopeRelease } from '../../../lib/studioService/studioServiceActions';
import { StudioServiceContext } from '../../../lib/studioService/StudioServiceStore';
import { ValueUnitEnum } from '../../../types/runtimeTypes';
import { Fader } from '../../Fader/Fader';


export const Release = () => {
    const [studioService, dispatch] = useContext(StudioServiceContext);
    const { envelope } = studioService;
    const envelopeRelease = envelope.release;

    const handleOnMouseDown = (e: MouseEvent) => {
        if (e.buttons === 1 && (e.ctrlKey || e.metaKey)) {
            resetEnvelopeRelease(dispatch);
        }
    };

    return (
        <div className="envelope-release">
            Release: &nbsp;
            <Fader
                classSuffix="envelope-release"
                value={envelopeRelease}
                onInput={(value) => setEnvelopeRelease(value, dispatch)}
                onMouseDown={(e: MouseEvent) => handleOnMouseDown(e)}
                maxValue={MAX_ENVELOPE}
                minValue={MIN_ENVELOPE}
                stepResolution={ENVELOPE_STEPS}
                valueUnit={ValueUnitEnum.SECONDS}
            />
        </div>
    );
};
