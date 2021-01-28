import { h, Fragment } from 'preact';
import { MAX_VOLUME, MIN_VOLUME, VOLUME_STEPS } from '../../constants';


interface VolumeFaderProps {
    value: number,
    classSuffix?: string;
    onInput: (value: number) => void;
}

export const VolumeFader = ({
    value,
    onInput,
    classSuffix = '',
}: VolumeFaderProps) => (
    <Fragment>
        <input
            className={`volume-fader ${classSuffix ? `${classSuffix}-volume-fader` : ''}`}
            onInput={(event) => onInput(parseFloat(event.currentTarget.value))}
            list="volumes"
            max={MAX_VOLUME}
            min={MIN_VOLUME}
            name={`${classSuffix ? `${classSuffix}-volume` : 'volume'}`}
            step={VOLUME_STEPS}
            type="range"
            value={value}
        />
        <datalist id="volumes">
            <option value={MIN_VOLUME} label="Mute" />
            <option value={MAX_VOLUME} label="100%" />
        </datalist>
    </Fragment>
);
