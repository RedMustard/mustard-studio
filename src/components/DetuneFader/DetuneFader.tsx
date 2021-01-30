import { h } from 'preact';
import { MAX_DETUNE, MIN_DETUNE, DETUNE_STEPS } from '../../constants';
import { ValueUnitEnum } from '../../types/runtimeTypes';
import { Fader } from '../Fader/Fader';


interface DetuneFaderProps {
    value: number;
    classSuffix: string;
    onInput: (value: number) => void;
}

export const DetuneFader = ({
    value,
    onInput,
    classSuffix,
}: DetuneFaderProps) => (
    <Fader
        classSuffix={classSuffix}
        maxValue={MAX_DETUNE}
        minValue={MIN_DETUNE}
        onInput={onInput}
        stepResolution={DETUNE_STEPS}
        value={value}
        valueUnit={ValueUnitEnum.CENT}
    />
);
