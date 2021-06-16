import { h } from 'preact';
import { Attack } from './Attack/Attack';
import { Decay } from './Decay/Decay';
import { Release } from './Release/Release';
import { Sustain } from './Sustain/Sustain';


export const Envelope = () => (
    <div className="envelope">
        <div className="envelope__header">
            <div className="envelope__label">
                Envelope
            </div>
        </div>

        <div className="envelope__modifiers">
            <Attack />
            <Decay />
            <Sustain />
            <Release />
        </div>
    </div>
);
