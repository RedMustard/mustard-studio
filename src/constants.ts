import { Envelope, OscillatorDetuneSetting, OscillatorSettings } from './types/types';

// Volume Faders
export const MAX_VOLUME = 1.0;
export const MIN_VOLUME = 0.0;
export const VOLUME_STEPS = 0.01;

// Detune Faders
export const MAX_DETUNE = 1200;
export const MIN_DETUNE = -1200;
export const DETUNE_STEPS = 100;

// Pan Faders
export const MAX_PAN = 1;
export const MIN_PAN = -1;
export const PAN_STEPS = 0.01;

// Enveloper Faders
export const MAX_ENVELOPE = 2;
export const MIN_ENVELOPE = 0;
export const ENVELOPE_STEPS = 0.1;

// Oscillator Octave Fader
export const MAX_OSC_OCTAVE = 8;
export const MIN_OSC_OCTAVE = -8;
export const OCTAVE_STEPS = 1;

// Waveform
export const WAVEFORM_BACKGROUND_COLOR = '#202024';
export const WAVEFORM_LINE_COLOR = '#75cf00';
export const WAVEFORM_LINE_WIDTH = 3.5;

// Piano
export const MAX_PIANO_OCTAVE = 7;
export const MIN_PIANO_OCTAVE = 0;
export const PIANO_OCTAVE_KEY_COUNT = 12;

// MIDI
export const MIDI_NOTE_OFFSET = 20;

// Master
export const MASTER_INITIAL_SETTINGS = {
    volume: 0.1,
    pan: 0,
};

// Oscillators
export const OSC_1_INITIAL_SETTINGS: OscillatorSettings & OscillatorDetuneSetting = {
    detune: 0,
    enabled: true,
    octave: 0,
    pan: 0,
    type: 'sine',
    volume: 0.5,
};

export const OSC_2_INITIAL_SETTINGS: OscillatorSettings & OscillatorDetuneSetting = {
    detune: 0,
    enabled: true,
    octave: 0,
    pan: 0,
    type: 'sine',
    volume: 0.5,
};

export const OSC_SUB_INITIAL_SETTINGS: OscillatorSettings = {
    enabled: true,
    octave: -1,
    pan: 0,
    type: 'sine',
    volume: 0.5,
};

// Envelope
export const ENVELOPE_INITIAL_SETTINGS: Envelope = {
    attack: 0.1,
    decay: 0.5,
    sustain: 1.0,
    release: 0.1,
};
