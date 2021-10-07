import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { ENVELOPE_STEPS, MAX_ENVELOPE, MIN_ENVELOPE } from '../../../constants';
import { setEnvelopeAttack, resetEnvelopeAttack } from '../../../lib/studioService/studioServiceActions';
import { StudioServiceContext } from '../../../lib/studioService/StudioServiceStore';
import { ValueUnitEnum } from '../../../types/runtimeTypes';
import { Fader } from '../../Fader/Fader';


export const Attack = () => {
    const [studioService, dispatch] = useContext(StudioServiceContext);
    const { envelope } = studioService;
    const envelopeAttack = envelope.attack;

    const handleOnMouseDown = (e: MouseEvent) => {
        if (e.buttons === 1 && (e.ctrlKey || e.metaKey)) {
            resetEnvelopeAttack(dispatch);
        }
    };

    return (
        <div className="envelope-attack">
            Attack: &nbsp;
            <Fader
                classSuffix="envelope-attack"
                value={envelopeAttack}
                onInput={(value) => setEnvelopeAttack(value, dispatch)}
                onMouseDown={(e: MouseEvent) => handleOnMouseDown(e)}
                maxValue={MAX_ENVELOPE}
                minValue={MIN_ENVELOPE}
                stepResolution={ENVELOPE_STEPS}
                valueUnit={ValueUnitEnum.SECONDS}
            />
        </div>
    );
};
