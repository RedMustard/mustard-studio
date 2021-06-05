export enum OscillatorTypeEnum {
    SINE = 'sine',
    SAWTOOTH = 'sawtooth',
    TRIANGLE = 'triangle',
    SQUARE = 'square',
    CUSTOM = 'custom',
}
export const OscillatorTypes = Object.values(OscillatorTypeEnum) as OscillatorType[];


export enum ValueUnitEnum {
    PERCENT = 'percent',
    CENT = 'cent',
    PAN = 'pan',
}

export enum OscillatorIdEnum {
    OSC_1 = 'osc1',
    OSC_2 = 'osc2',
    OSC_SUB = 'oscSub',
}
