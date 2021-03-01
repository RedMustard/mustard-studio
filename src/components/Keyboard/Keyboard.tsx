import { h } from 'preact';
// import { useContext } from 'preact/hooks';
import { getFrequencyByKeyNumber } from '../../lib/utils/audio/audio';
import { BlackKey } from './BlackKey/BlackKey';
import { WhiteKey } from './WhiteKey/WhiteKey';
import { KeyboardKeyColor } from '../../types/types';
import { logger } from '../../lib/utils/logger/logger';
// import { StudioServiceContext } from '../../lib/studioService/StudioServiceStore';
import { startOscillators, stopOscillators } from '../../lib/oscillators/oscillators';


export const Keyboard = () => {
    // const [studioService] = useContext(StudioServiceContext);

    const handleOnMouseDownAndOver = (keyNumber: number) => {
        const frequency = getFrequencyByKeyNumber(keyNumber);
        startOscillators(frequency);
    };

    const handleOnMouseUpAndLeave = () => {
        stopOscillators();
    };

    const whiteKey = (keyNumber: number) => (
        <WhiteKey
            onMouseDown={(e: MouseEvent) => {
                if (e.buttons === 1) {
                    handleOnMouseDownAndOver(keyNumber);
                    logger.info('Key pressed', keyNumber);
                }
            }}
            onMouseOver={(e: MouseEvent) => {
                if (e.buttons === 1) {
                    handleOnMouseDownAndOver(keyNumber);
                    logger.info('Key pressed', keyNumber);
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
                    logger.info('Key pressed', keyNumber);
                }
            }}
            onMouseOver={(e: MouseEvent) => {
                if (e.buttons === 1) {
                    handleOnMouseDownAndOver(keyNumber);
                    logger.info('Key pressed', keyNumber);
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
        const octaveKeyPattern: KeyboardKeyColor[] = ['white', 'black', 'white', 'black', 'white', 'white', 'black', 'white', 'black', 'white', 'black', 'white'];
        const keys: h.JSX.Element[] = [];

        for (let i = 0; i < octaveCount; i++) {
            octaveKeyPattern.forEach((key: KeyboardKeyColor, index: number) => {
                const octaveSteps = 12;
                const keyNumber = index + (i * octaveSteps) + startingKey;
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
        <div class="keyboard">
            {whiteKey(1)}
            {blackKey(2)}
            {whiteKey(3)}
            {getKeysByOctaveCount(7, 4)}
            {whiteKey(88)}
        </div>
    );
};
