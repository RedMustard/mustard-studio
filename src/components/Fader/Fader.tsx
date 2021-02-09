import { h } from 'preact';
import { useState } from 'preact/hooks';
import { ValueUnitEnum } from '../../types/runtimeTypes';
import { ValueUnit } from '../../types/types';


interface FaderProps {
    classSuffix: string;
    maxValue: number;
    minValue: number;
    onInput: (value: number) => void;
    onMouseDown: (e: MouseEvent) => void;
    stepResolution: number;
    value: number;
    valueUnit: ValueUnit;
}

export const Fader = ({
    classSuffix,
    maxValue,
    minValue,
    onInput,
    onMouseDown,
    stepResolution,
    value,
    valueUnit,
}: FaderProps) => {
    const [showValue, setShowValue] = useState(false);

    const getPrettifiedValue = () => {
        switch (valueUnit) {
            case ValueUnitEnum.PERCENT:
                return `${Math.floor(value * 100)}%`;
            case ValueUnitEnum.PAN:
                return Math.floor(value * 10);
            case ValueUnitEnum.CENT:
            default:
                return value;
        }
    };

    return (
        <div className={`fader  ${classSuffix}__fader`}>
            {
                showValue
                    ? (<span className="fader__value">{getPrettifiedValue()}</span>)
                    : null
            }
            <input
                title={getPrettifiedValue().toString()}
                onInput={(event) => onInput(parseFloat(event.currentTarget.value))}
                onMouseDown={(e: MouseEvent) => {
                    onMouseDown(e);
                    setShowValue(true);
                }}
                onMouseUp={() => setShowValue(false)}
                list={`${classSuffix}-fader`}
                max={maxValue}
                min={minValue}
                name={`${classSuffix}-fader`}
                step={stepResolution}
                type="range"
                value={value}
            />
            <datalist id={`${classSuffix}-fader`}>
                <option value={maxValue} label="Mute" />
                <option value={minValue} label="100%" />
            </datalist>
        </div>
    );
};
