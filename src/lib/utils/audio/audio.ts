
export const getFrequencyByKeyNumber = (keyNumber: number) => {
    const frequencyA4 = 440;
    // https://en.wikipedia.org/wiki/Piano_key_frequencies
    const getFrequencyEquation = () => frequencyA4 * 2 ** ((keyNumber - 49) / 12);
    const roundedFrequency = Math.round(getFrequencyEquation() * 10000) / 10000;
    return roundedFrequency;
};


export const getFrequencyByOctaveOffset = (octaveOffset: number, frequency: number) => {
    let calculatedFrequency;
    const offset = 2 * octaveOffset;

    if (offset < 0) {
        calculatedFrequency = frequency / offset;
    } else if (offset > 0) {
        calculatedFrequency = frequency * offset;
    } else {
        calculatedFrequency = frequency;
    }
    return calculatedFrequency;
};
