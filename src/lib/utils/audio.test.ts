import { getNoteFrequencyByKeyNumber } from './audio';

describe('getNoteFrequencyByKeyNumber', () => {
    it('returns 440 for key 49 (A4)', () => {
        expect(getNoteFrequencyByKeyNumber(49)).toBe(440);
    });
    it('returns 3520.00 for key 85 (A7)', () => {
        expect(getNoteFrequencyByKeyNumber(85)).toBe(3520);
    });
    it('returns 51.9131 for key 12 (G#1) and rounds to the 4th decimal place', () => {
        expect(getNoteFrequencyByKeyNumber(12)).toBe(51.9131);
    });
});
