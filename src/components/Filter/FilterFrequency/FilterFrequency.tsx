import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { FREQUENCY_STEPS, MAX_FREQUENCY, MIN_FREQUENCY } from '../../../constants';
import { resetFilterFrequency, setFilterFrequency } from '../../../lib/studioService/studioServiceActions';
import { StudioServiceContext } from '../../../lib/studioService/StudioServiceStore';
import { Fader } from '../../Fader/Fader';


export const FilterFrequency = () => {
    const [studioService, dispatch] = useContext(StudioServiceContext);
    const { frequency } = studioService.filter.settings;

    const handleOnMouseDown = (e: MouseEvent) => {
        if (e.buttons === 1 && (e.ctrlKey || e.metaKey)) {
            resetFilterFrequency(dispatch);
        }
    };

    return (
        <div className="filter-frequency">
            Frequency: &nbsp;
            <Fader
                classSuffix="filter-frequency"
                maxValue={MAX_FREQUENCY}
                minValue={MIN_FREQUENCY}
                onInput={(value) => setFilterFrequency(value, dispatch)}
                onMouseDown={(e: MouseEvent) => handleOnMouseDown(e)}
                stepResolution={FREQUENCY_STEPS}
                value={frequency}
            />
        </div>
    );
};
