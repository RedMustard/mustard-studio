import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { MAX_Q, MIN_Q, Q_STEPS } from '../../../constants';
import { resetFilterQ, setFilterQ } from '../../../lib/studioService/studioServiceActions';
import { StudioServiceContext } from '../../../lib/studioService/StudioServiceStore';
import { Fader } from '../../Fader/Fader';


export const FilterQ = () => {
    const [studioService, dispatch] = useContext(StudioServiceContext);
    const { q } = studioService.filter.settings;

    const handleOnMouseDown = (e: MouseEvent) => {
        if (e.buttons === 1 && (e.ctrlKey || e.metaKey)) {
            resetFilterQ(dispatch);
        }
    };

    return (
        <div className="filter-q">
            Q: &nbsp;
            <Fader
                classSuffix="filter-q"
                maxValue={MAX_Q}
                minValue={MIN_Q}
                onInput={(value) => setFilterQ(value, dispatch)}
                onMouseDown={(e: MouseEvent) => handleOnMouseDown(e)}
                stepResolution={10}
                value={q}
            />
        </div>
    );
};
