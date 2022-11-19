import { Fragment, h } from 'preact';
import { useContext, useEffect } from 'preact/hooks';
import { setFilterEnabled, setFilterNode, setFilterType } from '../../lib/studioService/studioServiceActions';
import { StudioServiceContext } from '../../lib/studioService/StudioServiceStore';
import { logger } from '../../lib/utils/logger/logger';
import { FilterTypes } from '../../types/runtimeTypes';
import { Checkbox } from '../Checkbox/Checkbox';
import { FilterDetune } from './FilterDetune/FilterDetune';
import { FilterFrequency } from './FilterFrequency/FilterFrequency';
import { FilterGain } from './FilterGain/FilterGain';
import { FilterQ } from './FilterQ/FilterQ';
import { FilterWaveform } from './FilterWaveform/FilterWaveform';

interface FilterProps {
    audioContext: AudioContext;
}

export const Filter = ({ audioContext }: FilterProps) => {
    const [studioService, dispatch] = useContext(StudioServiceContext);
    const filterEnabled = studioService.filter.settings.enabled;
    const {
        type,
        q,
        detune,
        frequency,
        gain,
    } = studioService.filter.settings;
    let { filterNode } = studioService.filter;

    useEffect(() => {
        if (!filterNode) {
            filterNode = audioContext.createBiquadFilter();
            setFilterNode(filterNode, dispatch);
        } else {
            filterNode.type = type;
            filterNode.frequency.value = frequency;
            filterNode.gain.value = gain;
            filterNode.Q.value = q;
            filterNode.detune.value = detune;
        }
    }, [filterNode, type, q, detune, frequency, gain]);

    return (
        <div className="filter">
            <div className="filter__header">
                <div className="filter__label">Filter</div>
                {/* Todo: Replace with LED Button component */}
                <Checkbox
                    onInput={(isChecked) => {
                        setFilterEnabled(isChecked, dispatch);
                    }}
                    isChecked={filterEnabled}
                />
            </div>

            <div className="filter__graph">
                <FilterWaveform audioContext={audioContext} />
            </div>

            <div className="filter__modifiers">
                {/* Todo: Replace with styled dropdown component */}
                <select
                    className="filter__wave-type"
                    onInput={(event) => {
                        setFilterType(event.currentTarget.value as BiquadFilterType, dispatch);
                    }}
                    value={type}
                >
                    {
                        FilterTypes.map((filterType) => (
                            <option value={filterType}>{filterType}</option>

                        ))
                    }
                </select>

                <FilterFrequency />
                <FilterQ />
                <FilterGain />
                <FilterDetune />
            </div>
        </div>
    );
};
