import { h } from 'preact';
import { getNoteFrequencyByKeyNumber } from '../../lib/utils/audio';
import { BlackKey } from './BlackKey/BlackKey';
import { WhiteKey } from './WhiteKey/WhiteKey';
import { KeyboardKeyCount, KeyboardKeyColor } from '../../types/types';

interface KeyboardProps {
    audioContext: AudioContext;
    gainNode: GainNode;
}


export const Keyboard = ({ audioContext, gainNode }: KeyboardProps) => {
    let osc: OscillatorNode;
    let osc2: OscillatorNode;

    const whiteKey = (keyNumber: number) => (
        <WhiteKey
            onMouseDown={(e: MouseEvent) => {
                if (e.buttons === 1) {
                    osc = audioContext.createOscillator();
                    osc.frequency.value = getNoteFrequencyByKeyNumber(keyNumber);
                    osc.type = 'triangle';
                    osc.connect(gainNode);
                    osc.start();

                    osc2 = audioContext.createOscillator();
                    osc2.frequency.value = getNoteFrequencyByKeyNumber(keyNumber);
                    osc2.type = 'square';
                    osc2.connect(gainNode);
                    osc2.start();
                    console.log('kn', keyNumber);
                }
            }}
            onMouseOver={(e: MouseEvent) => {
                if (e.buttons === 1) {
                    osc = audioContext.createOscillator();
                    osc.frequency.value = getNoteFrequencyByKeyNumber(keyNumber);
                    osc.type = 'triangle';
                    osc.connect(gainNode);
                    osc.start();

                    osc2 = audioContext.createOscillator();
                    osc2.frequency.value = getNoteFrequencyByKeyNumber(keyNumber);
                    osc2.type = 'square';
                    osc2.connect(gainNode);
                    osc2.start();
                    console.log('kn', keyNumber);
                }
            }}
            onMouseUp={() => {
                osc.stop();
                osc.disconnect();
                osc2.stop();
                osc2.disconnect();
            }}
            onMouseLeave={(e: MouseEvent) => {
                if (e.buttons === 1) {
                    osc.stop();
                    osc.disconnect();
                    osc2.stop();
                    osc2.disconnect();
                }
            }}
        />
    );

    const blackKey = (keyNumber: number) => (
        <BlackKey
            onMouseDown={(e: MouseEvent) => {
                if (e.buttons === 1) {
                    osc = audioContext.createOscillator();
                    osc.frequency.value = getNoteFrequencyByKeyNumber(keyNumber);
                    osc.type = 'triangle';
                    osc.connect(gainNode);
                    osc.start();

                    osc2 = audioContext.createOscillator();
                    osc2.frequency.value = getNoteFrequencyByKeyNumber(keyNumber);
                    osc2.type = 'square';
                    osc2.connect(gainNode);
                    osc2.start();
                    console.log('kn', keyNumber);
                }
            }}
            onMouseOver={(e: MouseEvent) => {
                if (e.buttons === 1) {
                    osc = audioContext.createOscillator();
                    osc.frequency.value = getNoteFrequencyByKeyNumber(keyNumber);
                    osc.type = 'triangle';
                    osc.connect(gainNode);
                    osc.start();

                    osc2 = audioContext.createOscillator();
                    osc2.frequency.value = getNoteFrequencyByKeyNumber(keyNumber);
                    osc2.type = 'square';
                    osc2.connect(gainNode);
                    osc2.start();
                    console.log('kn', keyNumber);
                }
            }}
            onMouseUp={() => {
                osc.stop();
                osc.disconnect();
                osc2.stop();
                osc2.disconnect();
            }}
            onMouseLeave={(e: MouseEvent) => {
                if (e.buttons === 1) {
                    osc.stop();
                    osc.disconnect();
                    osc2.stop();
                    osc2.disconnect();
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
