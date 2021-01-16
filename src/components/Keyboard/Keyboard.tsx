import { FunctionalComponent, h } from 'preact';
import { KeyboardKeyCount, KeyColor } from '../../types/types';
import BlackKey from './BlackKey/BlackKey';
import WhiteKey from './WhiteKey/WhiteKey';

interface KeyboardProps {
    keyCount: KeyboardKeyCount;
}


const Keyboard = ({ keyCount }: KeyboardProps) => {
    const getKeysByOctaveCount = (octaveCount: number) => {
        const octaveKeyPattern: KeyColor[] = ['white', 'black', 'white', 'black', 'white', 'white', 'black', 'white', 'black', 'white', 'black', 'white'];
        const keys: h.JSX.Element[] = [];

        for (let i = 0; i < octaveCount; i++) {
            octaveKeyPattern.forEach((key: KeyColor) => {
                if (key === 'white') {
                    keys.push(<WhiteKey onClick={() => {}} />);
                } else if (key === 'black') {
                    keys.push(<BlackKey onClick={() => {}} />);
                }
            });
        }

        return keys;
    };

    const renderKeybedByKeyCount = (keys: KeyboardKeyCount) => {
        const keybed: h.JSX.Element[] = [];

        switch (keys) {
            case 88:
                //  A, B#, B, 7 Octaves, C
                keybed.push(<WhiteKey onClick={() => {}} />, <BlackKey onClick={() => {}} />, <WhiteKey onClick={() => {}} />);
                getKeysByOctaveCount(7).forEach((key) => {
                    keybed.push(key);
                });
                keybed.push(<WhiteKey onClick={() => {}} />);
                break;

            case 61:
                //  5 Octaves, C
                getKeysByOctaveCount(5).forEach((key) => {
                    keybed.push(key);
                });
                keybed.push(<WhiteKey onClick={() => {}} />);
                break;

            case 49:
                //  4 Octaves, C
                getKeysByOctaveCount(4).forEach((key) => {
                    keybed.push(key);
                });
                keybed.push(<WhiteKey onClick={() => {}} />);
                break;

            case 37:
                //  3 Octaves, C
                getKeysByOctaveCount(3).forEach((key) => {
                    keybed.push(key);
                });
                keybed.push(<WhiteKey onClick={() => {}} />);
                break;

            case 25:
                //  2 Octaves, C
                getKeysByOctaveCount(2).forEach((key) => {
                    keybed.push(key);
                });
                keybed.push(<WhiteKey onClick={() => {}} />);
                break;

            default:
                break;
        }

        return keybed;
    };

    return (
        <div class="keyboard">
            {renderKeybedByKeyCount(keyCount)}
        </div>
    );
};


export default Keyboard;
