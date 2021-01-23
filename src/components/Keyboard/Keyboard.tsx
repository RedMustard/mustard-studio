import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { MAX_VOLUME, MIN_VOLUME, VOLUME_STEPS } from '../../constants';
import { StudioServiceContext, Audio } from '../../lib/StudioService/StudioServiceStore';
import { getNoteFrequencyByKeyNumber } from '../../lib/utils/audio';
import { BlackKey } from './BlackKey/BlackKey';
import { WhiteKey } from './WhiteKey/WhiteKey';
import {
    KeyboardKeyCount,
    KeyboardKeyColor,
    StudioService,
} from '../../types/types';

interface KeyboardProps {
    keyCount: KeyboardKeyCount;
}


export const Keyboard = ({ keyCount }: KeyboardProps) => {
    let osc: OscillatorNode;
    let osc2: OscillatorNode;
    const [studioService, dispatch]: [StudioService, Function] = useContext(StudioServiceContext);
    const [audioContext]: [AudioContext, Function] = useContext(Audio);
    const masterGainNode = audioContext.createGain();
    masterGainNode.gain.value = studioService.volume.master;
    masterGainNode.connect(audioContext.destination);

    const whiteKey = (keyNumber: number) => (
        <WhiteKey
            onMouseDown={(e: MouseEvent) => {
                if (e.buttons === 1) {
                    osc = audioContext.createOscillator();
                    osc.frequency.value = getNoteFrequencyByKeyNumber(keyNumber);
                    osc.type = 'triangle';
                    osc.connect(masterGainNode);
                    osc.start();
                    osc2 = audioContext.createOscillator();
                    osc2.frequency.value = getNoteFrequencyByKeyNumber(keyNumber);
                    osc2.type = 'square';
                    osc2.connect(masterGainNode);
                    osc2.start();
                    console.log('kn', keyNumber);
                }
            }}
            onMouseOver={(e: MouseEvent) => {
                if (e.buttons === 1) {
                    osc = audioContext.createOscillator();
                    osc.frequency.value = getNoteFrequencyByKeyNumber(keyNumber);
                    osc.type = 'triangle';
                    osc.connect(masterGainNode);
                    osc.start();
                    osc2 = audioContext.createOscillator();
                    osc2.frequency.value = getNoteFrequencyByKeyNumber(keyNumber);
                    osc2.type = 'square';
                    osc2.connect(masterGainNode);
                    osc2.start();
                    console.log('kn', keyNumber);
                }
            }}
            onMouseUp={(e: MouseEvent) => {
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
                    osc.connect(masterGainNode);
                    osc.start();
                    osc2 = audioContext.createOscillator();
                    osc2.frequency.value = getNoteFrequencyByKeyNumber(keyNumber);
                    osc2.type = 'square';
                    osc2.connect(masterGainNode);
                    osc2.start();
                    console.log('kn', keyNumber);
                }
            }}
            onMouseOver={(e: MouseEvent) => {
                if (e.buttons === 1) {
                    osc = audioContext.createOscillator();
                    osc.frequency.value = getNoteFrequencyByKeyNumber(keyNumber);
                    osc.type = 'triangle';
                    osc.connect(masterGainNode);
                    osc.start();
                    osc2 = audioContext.createOscillator();
                    osc2.frequency.value = getNoteFrequencyByKeyNumber(keyNumber);
                    osc2.type = 'square';
                    osc2.connect(masterGainNode);
                    osc2.start();
                    console.log('kn', keyNumber);
                }
            }}
            onMouseUp={(e: MouseEvent) => {
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
        // Todo: Maybe convert to object containing key and keyColor
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

    // Todo: test
    const renderKeybedByKeyCount = (keys: KeyboardKeyCount) => {
        const keybed: h.JSX.Element[] = [];
        let octaveCount: number;
        let startingKey: number;

        switch (keys) {
            case 88:
                //  Full-length piano (A, B#, B, 7 Octaves, C)
                octaveCount = 7;
                startingKey = 4;
                keybed.push(
                    whiteKey(1),
                    blackKey(2),
                    whiteKey(3),
                );
                getKeysByOctaveCount(octaveCount, startingKey).forEach((key) => {
                    keybed.push(key);
                });
                keybed.push(whiteKey(88));
                break;

            case 61:
                //  5 Octaves, C
                break;

            case 49:
                //  4 Octaves, C
                break;

            case 37:
                //  3 Octaves, C
                break;

            case 25:
                //  2 Octaves, C
                break;

            default:
                break;
        }

        return keybed;
    };

    // Todo: test
    const handleChangeVolume = (value: any) => {
        // Todo: Centralize dispatches
        dispatch({ type: 'SET_MASTER_VOLUME', payload: parseFloat(value) });
        console.log(`Master volume changed to ${parseFloat(value) * 100}%`);
    };

    return (
        <div class="keyboard">
            {renderKeybedByKeyCount(keyCount)}
            {/* Todo: Replace with volume component */}
            <input
                onInput={(event) => handleChangeVolume(event.currentTarget.value)}
                list="volumes"
                max={MAX_VOLUME}
                min={MIN_VOLUME}
                name="volume"
                step={VOLUME_STEPS}
                type="range"
                value={studioService.volume.master}
            />
            <datalist id="volumes">
                <option value={MIN_VOLUME} label="Mute" />
                <option value={MAX_VOLUME} label="100%" />
            </datalist>
        </div>
    );
};
