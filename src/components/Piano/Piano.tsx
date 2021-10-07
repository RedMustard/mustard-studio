import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { getFrequencyByKeyNumber } from '../../lib/utils/audio/audio';
import { BlackKey } from './BlackKey/BlackKey';
import { WhiteKey } from './WhiteKey/WhiteKey';
import { PianoKeyColor } from '../../types/types';
import { logger } from '../../lib/utils/logger/logger';
import { stopOscillators, startOscillatorsByFrequency } from '../../lib/oscillators/oscillators';
import { PIANO_OCTAVE_KEY_COUNT } from '../../constants';
import { StudioServiceContext } from '../../lib/studioService/StudioServiceStore';


export const Piano = () => {
    const [studioService] = useContext(StudioServiceContext);

    const handleOnMouseDownAndOver = (keyNumber: number) => {
        const frequency = getFrequencyByKeyNumber(keyNumber);
        startOscillatorsByFrequency(frequency, studioService);
    };

    const handleOnMouseUpAndLeave = () => {
        stopOscillators(studioService);
    };

    const whiteKey = (keyNumber: number) => (
        <WhiteKey
            onMouseDown={(e: MouseEvent) => {
                if (e.buttons === 1) {
                    handleOnMouseDownAndOver(keyNumber);
                    logger.info('Piano key pressed', keyNumber);
                }
            }}
            onMouseOver={(e: MouseEvent) => {
                if (e.buttons === 1) {
                    handleOnMouseDownAndOver(keyNumber);
                    logger.info('Piano key pressed', keyNumber);
                }
            }}
            onMouseUp={() => {
                handleOnMouseUpAndLeave();
            }}
            onMouseLeave={(e: MouseEvent) => {
                if (e.buttons === 1) {
                    handleOnMouseUpAndLeave();
                }
            }}
        />
    );

    const blackKey = (keyNumber: number) => (
        <BlackKey
            onMouseDown={(e: MouseEvent) => {
                if (e.buttons === 1) {
                    handleOnMouseDownAndOver(keyNumber);
                    logger.info('Piano key pressed', keyNumber);
                }
            }}
            onMouseOver={(e: MouseEvent) => {
                if (e.buttons === 1) {
                    handleOnMouseDownAndOver(keyNumber);
                    logger.info('Piano key pressed', keyNumber);
                }
            }}
            onMouseUp={() => {
                handleOnMouseUpAndLeave();
            }}
            onMouseLeave={(e: MouseEvent) => {
                if (e.buttons === 1) {
                    handleOnMouseUpAndLeave();
                }
            }}
        />
    );

    const getKeysByOctaveCount = (octaveCount: number, startingKey: number) => {
        const octaveKeyPattern: PianoKeyColor[] = ['white', 'black', 'white', 'black', 'white', 'white', 'black', 'white', 'black', 'white', 'black', 'white'];
        const keys: h.JSX.Element[] = [];

        for (let i = 0; i < octaveCount; i++) {
            octaveKeyPattern.forEach((key: PianoKeyColor, index: number) => {
                const keyNumber = index + (i * PIANO_OCTAVE_KEY_COUNT) + startingKey;
                if (key === 'white') {
                    keys.push(whiteKey(keyNumber));
                } else if (key === 'black') {
                    keys.push(blackKey(keyNumber));
                }
            });
        }
        return keys;
    };

    return (
        <div class="piano">
            {whiteKey(1)}
            {blackKey(2)}
            {whiteKey(3)}
            {getKeysByOctaveCount(7, 4)}
            {whiteKey(88)}
        </div>
    );
};
