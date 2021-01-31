import { h } from 'preact';
import { MAX_VOLUME, MIN_VOLUME, VOLUME_STEPS } from '../../constants';
import { ValueUnitEnum } from '../../types/runtimeTypes';
import { Fader } from '../Fader/Fader';


interface VolumeFaderProps {
    value: number;
    classSuffix: string;
    onInput: (value: number) => void;
}

export const VolumeFader = ({
    value,
    onInput,
    classSuffix,
}: VolumeFaderProps) => (
    <Fader
        classSuffix={classSuffix}
        maxValue={MAX_VOLUME}
        minValue={MIN_VOLUME}
        onInput={onInput}
        stepResolution={VOLUME_STEPS}
        value={value}
        valueUnit={ValueUnitEnum.PERCENT}
    />
);
