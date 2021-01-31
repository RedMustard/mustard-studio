import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { getNoteFrequencyByKeyNumber } from '../../lib/utils/audio/audio';
import { BlackKey } from './BlackKey/BlackKey';
import { WhiteKey } from './WhiteKey/WhiteKey';
import { KeyboardKeyColor } from '../../types/types';
import { logger } from '../../lib/utils/logger/logger';
import { StudioServiceContext } from '../../lib/studioService/StudioServiceStore';

interface KeyboardProps {
    audioContext: AudioContext;
}


export const Keyboard = ({ audioContext }: KeyboardProps) => {
    let osc1: OscillatorNode;
    let osc2: OscillatorNode;
    const [studioService] = useContext(StudioServiceContext);
    const { settings, gainNodes } = studioService;

    const osc1GainNode = gainNodes.osc1;
    const osc1Enabled = settings.osc1.enabled;
    const osc1Type = settings.osc1.type;
    const osc1Detune = settings.osc1.detune;

    const osc2GainNode = gainNodes.osc2;
    const osc2Enabled = settings.osc2.enabled;
    const osc2Type = settings.osc2.type;
    const osc2Detune = settings.osc2.detune;

    const handleOnMouseDownAndOver = (keyNumber: number) => {
        if (osc1Enabled) {
            osc1 = audioContext.createOscillator();
            osc1.type = osc1Type;
            osc1.detune.value = osc1Detune;
            osc1.frequency.value = getNoteFrequencyByKeyNumber(keyNumber);
            osc1.connect(osc1GainNode);
            osc1.start();
        }

        if (osc2Enabled) {
            osc2 = audioContext.createOscillator();
            osc2.type = osc2Type;
            osc2.detune.value = osc2Detune;
            osc2.frequency.value = getNoteFrequencyByKeyNumber(keyNumber);
            osc2.connect(osc2GainNode);
            osc2.start();
        }
    };

    const handleOnMouseUpAndLeave = () => {
        if (osc1) {
            osc1.stop();
            osc1.disconnect();
        }

        if (osc2) {
            osc2.stop();
            osc2.disconnect();
        }
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

    // Todo: test
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
