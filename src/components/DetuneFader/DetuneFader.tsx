import { h } from 'preact';
import { MAX_DETUNE, MIN_DETUNE, DETUNE_STEPS } from '../../constants';
import { ValueUnitEnum } from '../../types/runtimeTypes';
import { Fader } from '../Fader/Fader';


interface DetuneFaderProps {
    value: number;
    classSuffix: string;
    onInput: (value: number) => void;
    onMouseDown: (e: MouseEvent) => void;
}

export const DetuneFader = ({
    value,
    onInput,
    onMouseDown,
    classSuffix,
}: DetuneFaderProps) => (
    <Fader
        classSuffix={classSuffix}
        maxValue={MAX_DETUNE}
        minValue={MIN_DETUNE}
        onInput={onInput}
        onMouseDown={onMouseDown}
        stepResolution={DETUNE_STEPS}
        value={value}
        valueUnit={ValueUnitEnum.CENT}
    />
);
