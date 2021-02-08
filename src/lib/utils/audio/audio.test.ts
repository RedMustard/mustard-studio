import { getFrequencyByKeyNumber, getFrequencyByOctaveOffset } from './audio';

describe('getFrequencyByKeyNumber', () => {
    it('returns 440 for key 49 (A4)', () => {
        expect(getFrequencyByKeyNumber(49)).toBe(440);
    });
    it('returns 3520.00 for key 85 (A7)', () => {
        expect(getFrequencyByKeyNumber(85)).toBe(3520);
    });
    it('returns 51.9131 for key 12 (G#1) and rounds to the 4th decimal place', () => {
        expect(getFrequencyByKeyNumber(12)).toBe(51.9131);
    });
});

describe('getFrequencyByOctaveOffset', () => {
    let octaveOffset: number;
    let frequency: number;

    it('returns 220 for one octave below 440', () => {
        octaveOffset = -1;
        frequency = 440;
        expect(getFrequencyByOctaveOffset(octaveOffset, frequency)).toBe(220);
    });

    it('returns 880 for one octave above 440', () => {
        octaveOffset = 1;
        frequency = 440;
        expect(getFrequencyByOctaveOffset(octaveOffset, frequency)).toBe(880);
    });

    it('returns 440 for no octave offset from 440', () => {
        octaveOffset = 0;
        frequency = 440;
        expect(getFrequencyByOctaveOffset(octaveOffset, frequency)).toBe(440);
    });
});
