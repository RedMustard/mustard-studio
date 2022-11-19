export enum OscillatorTypeEnum {
    SINE = 'sine',
    SAWTOOTH = 'sawtooth',
    TRIANGLE = 'triangle',
    SQUARE = 'square',
    CUSTOM = 'custom',
}
export const OscillatorTypes = Object.values(OscillatorTypeEnum) as OscillatorType[];

export enum FilterTypeEnum {
    LOWPASS = 'lowpass',
    HIGHPASS = 'highpass',
    BANDPASS = 'bandpass',
    LOWSHELF = 'lowshelf',
    HIGHSHELF = 'highshelf',
    PEAKING = 'peaking',
    NOTCH = 'notch',
    ALLPASS = 'allpass',
}
export const FilterTypes = Object.values(FilterTypeEnum) as BiquadFilterType[];


export enum ValueUnitEnum {
    PERCENT = 'percent',
    CENT = 'cent',
    PAN = 'pan',
    SECONDS = 'seconds',
}

export enum OscillatorIdEnum {
    OSC_1 = 'osc1',
    OSC_2 = 'osc2',
    OSC_SUB = 'oscSub',
}
