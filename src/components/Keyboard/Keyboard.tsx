import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { StudioServiceContext, Audio } from '../../lib/StudioService/StudioServiceStore';
import { KeyboardKeyCount, KeyboardKeyColor, StudioService } from '../../types/types';
import BlackKey from './BlackKey/BlackKey';
import WhiteKey from './WhiteKey/WhiteKey';

interface KeyboardProps {
    keyCount: KeyboardKeyCount;
}


const Keyboard = ({ keyCount }: KeyboardProps) => {
    const [studioService, dispatch]: [StudioService, Function] = useContext(StudioServiceContext);
    const [audioContext]: [AudioContext, Function] = useContext(Audio);

    const masterGainNode = audioContext.createGain();
    masterGainNode.gain.value = studioService.volume.master;
    masterGainNode.connect(audioContext.destination);


    const getKeysByOctaveCount = (octaveCount: number) => {
        // Todo: Maybe convert to object containing key and keyColor
        const octaveKeyPattern: KeyboardKeyColor[] = ['white', 'black', 'white', 'black', 'white', 'white', 'black', 'white', 'black', 'white', 'black', 'white'];
        const keys: h.JSX.Element[] = [];

        // Todo: Create actual frequencies per key
        for (let i = 0; i < octaveCount; i++) {
            let osc: OscillatorNode;
            const whiteKey = (
                <WhiteKey
                    onClick={() => {}}
                    onMouseOver={() => {
                        osc = audioContext.createOscillator();
                        osc.frequency.value = Math.floor(Math.random() * Math.floor(4186));
                        osc.connect(masterGainNode);
                        osc.start();
                    }}
                    onMouseLeave={() => {
                        osc.stop();
                        osc.disconnect();
                    }}
                />
            );
            const blackKey = (
                <BlackKey
                    onClick={() => {}}
                    onMouseOver={() => {
                        osc = audioContext.createOscillator();
                        osc.frequency.value = Math.floor(Math.random() * Math.floor(4186));
                        osc.connect(masterGainNode);
                        osc.start();
                    }}
                    onMouseLeave={() => {
                        osc.stop();
                        osc.disconnect();
                    }}
                />
            );

            octaveKeyPattern.forEach((key: KeyboardKeyColor) => {
                if (key === 'white') {
                    keys.push(whiteKey);
                } else if (key === 'black') {
                    keys.push(blackKey);
                }
            });
        }

        return keys;
    };

    const renderKeybedByKeyCount = (keys: KeyboardKeyCount) => {
        const keybed: h.JSX.Element[] = [];
        let osc: OscillatorNode;

        const whiteKey = (
            <WhiteKey
                onClick={() => {}}
                onMouseOver={() => {
                    osc = audioContext.createOscillator();
                    osc.frequency.value = Math.floor(Math.random() * Math.floor(4186));
                    osc.connect(masterGainNode);
                    osc.start();
                }}
                onMouseLeave={() => {
                    osc.stop();
                    osc.disconnect();
                }}
            />
        );
        const blackKey = (
            <BlackKey
                onClick={() => {}}
                onMouseOver={() => {
                    osc = audioContext.createOscillator();
                    osc.frequency.value = Math.floor(Math.random() * Math.floor(4186));
                    osc.connect(masterGainNode);
                    osc.start();
                }}
                onMouseLeave={() => {
                    osc.stop();
                    osc.disconnect();
                }}
            />
        );

        switch (keys) {
            case 88:
                //  A, B#, B, 7 Octaves, C
                keybed.push(
                    whiteKey,
                    blackKey,
                    whiteKey,
                );
                getKeysByOctaveCount(7).forEach((key) => {
                    keybed.push(key);
                });
                keybed.push(whiteKey);
                break;

            case 61:
                //  5 Octaves, C
                getKeysByOctaveCount(5).forEach((key) => {
                    keybed.push(key);
                });
                keybed.push(whiteKey);
                break;

            case 49:
                //  4 Octaves, C
                getKeysByOctaveCount(4).forEach((key) => {
                    keybed.push(key);
                });
                keybed.push(whiteKey);
                break;

            case 37:
                //  3 Octaves, C
                getKeysByOctaveCount(3).forEach((key) => {
                    keybed.push(key);
                });
                keybed.push(whiteKey);
                break;

            case 25:
                //  2 Octaves, C
                getKeysByOctaveCount(2).forEach((key) => {
                    keybed.push(key);
                });
                keybed.push(whiteKey);
                break;

            default:
                break;
        }

        return keybed;
    };

    const handleChangeVolume = (value: any) => {
        dispatch({ type: 'SET_MASTER_VOLUME', payload: parseFloat(value) });
        // masterGainNode.gain.value = parseFloat(value);
        console.log(`Master volume changed to ${parseFloat(value) * 100}%`);
    };

    return (
        <div class="keyboard">
            {renderKeybedByKeyCount(keyCount)}
            {/* Todo: Move values to constants once volume components are made */}
            <input
                onInput={(event) => handleChangeVolume(event.currentTarget.value)}
                list="volumes"
                max="1.0"
                min="0.0"
                name="volume"
                step="0.01"
                type="range"
                value={studioService.volume.master}
            />
            <datalist id="volumes">
                <option value="0.0" label="Mute" />
                <option value="1.0" label="100%" />
            </datalist>
        </div>
    );
};


export default Keyboard;
