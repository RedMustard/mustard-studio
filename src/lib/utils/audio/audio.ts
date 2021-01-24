
export const getNoteFrequencyByKeyNumber = (keyNumber: number) => {
    const frequencyA4 = 440;
    // https://en.wikipedia.org/wiki/Piano_key_frequencies
    const getFrequencyEquation = () => frequencyA4 * 2 ** ((keyNumber - 49) / 12);
    const roundedFrequency = Math.round(getFrequencyEquation() * 10000) / 10000;
    return roundedFrequency;
};
