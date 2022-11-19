import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { MAX_DETUNE, MIN_DETUNE, DETUNE_STEPS } from '../../../constants';
import { resetFilterDetune, setFilterDetune } from '../../../lib/studioService/studioServiceActions';
import { StudioServiceContext } from '../../../lib/studioService/StudioServiceStore';
import { Fader } from '../../Fader/Fader';


export const FilterDetune = () => {
    const [studioService, dispatch] = useContext(StudioServiceContext);
    const { detune } = studioService.filter.settings;

    const handleOnMouseDown = (e: MouseEvent) => {
        if (e.buttons === 1 && (e.ctrlKey || e.metaKey)) {
            resetFilterDetune(dispatch);
        }
    };

    return (
        <div className="filter-detune">
            Detune: &nbsp;
            <Fader
                classSuffix="filter-detune"
                maxValue={MAX_DETUNE}
                minValue={MIN_DETUNE}
                onInput={(value) => setFilterDetune(value, dispatch)}
                onMouseDown={(e: MouseEvent) => handleOnMouseDown(e)}
                stepResolution={DETUNE_STEPS}
                value={detune}
            />
        </div>
    );
};
