export enum OscillatorTypeEnum {
    SINE = 'sine',
    SAWTOOTH = 'sawtooth',
    TRIANGLE = 'triangle',
    SQUARE = 'square',
    CUSTOM = 'custom',
}
export const OscillatorTypes = Object.values(OscillatorTypeEnum) as OscillatorType[];
