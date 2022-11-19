import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { MAX_FILTER_GAIN, MIN_FILTER_GAIN, FILTER_GAIN_STEPS } from '../../../constants';
import { resetFilterGain, setFilterGain } from '../../../lib/studioService/studioServiceActions';
import { StudioServiceContext } from '../../../lib/studioService/StudioServiceStore';
import { Fader } from '../../Fader/Fader';


export const FilterGain = () => {
    const [studioService, dispatch] = useContext(StudioServiceContext);
    const { gain } = studioService.filter.settings;

    const handleOnMouseDown = (e: MouseEvent) => {
        if (e.buttons === 1 && (e.ctrlKey || e.metaKey)) {
            resetFilterGain(dispatch);
        }
    };

    return (
        <div className="filter-gain">
            Gain: &nbsp;
            <Fader
                classSuffix="filter-gain"
                maxValue={MAX_FILTER_GAIN}
                minValue={MIN_FILTER_GAIN}
                onInput={(value) => setFilterGain(value, dispatch)}
                onMouseDown={(e: MouseEvent) => handleOnMouseDown(e)}
                stepResolution={FILTER_GAIN_STEPS}
                value={gain}
            />
        </div>
    );
};
