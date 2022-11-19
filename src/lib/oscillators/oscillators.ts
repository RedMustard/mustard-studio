import {
    OscillatorDetuneSetting,
    OscillatorId,
    StudioService,
} from '../../types/types';
import { getAudioContext } from '../audioContext/audioContext';
import { getFrequencyByOctaveOffset } from '../utils/audio/audio';
import { logger } from '../utils/logger/logger';

let oscillatorNodes: {
    [frequency: string]: {
        [oscillatorId: string]: OscillatorNode[];
    }
} = {};

let oscillatorGainNodes: {
    [frequency: string]: {
        [oscillatorId: string]: GainNode;
    }
} = {};

export const addOscillatorNode = (oscillatorNode: OscillatorNode, frequency: number, oscillatorId: OscillatorId) => {
    if (!oscillatorNodes[frequency]) {
        oscillatorNodes[frequency] = {
            [oscillatorId]: [oscillatorNode],
        };
    } else if (!oscillatorNodes[frequency][oscillatorId]) {
        oscillatorNodes[frequency][oscillatorId] = [oscillatorNode];
    } else {
        oscillatorNodes[frequency][oscillatorId].push(oscillatorNode);
    }
    logger.info('Added oscillator nodes for frequency', frequency);
};

export const addOscillatorGainNode = (gainNode: GainNode, frequency: number, oscillatorId: OscillatorId) => {
    if (!oscillatorGainNodes[frequency]) {
        oscillatorGainNodes[frequency] = {
            [oscillatorId]: gainNode,
        };
    } else {
        oscillatorGainNodes[frequency][oscillatorId] = gainNode;
    }
    logger.info('Added gain nodes for frequency', frequency);
};

const enableEnvelopeADS = (
    audioContext: AudioContext,
    gainNode: GainNode,
    attack: number,
    decay: number,
    sustain: number,
) => {
    const { currentTime } = audioContext;
    gainNode.gain.cancelScheduledValues(0);
    gainNode.gain.setValueAtTime(0, currentTime);
    gainNode.gain.linearRampToValueAtTime(1, currentTime + attack);
    gainNode.gain.linearRampToValueAtTime(sustain, currentTime + attack + decay);
};

const enableEnvelopeRelease = (
    audioContext: AudioContext,
    gainNode: GainNode,
    release: number,
    oscillator: OscillatorNode,
) => {
    const { currentTime } = audioContext;
    gainNode.gain.cancelScheduledValues(0);
    gainNode.gain.setValueAtTime(gainNode.gain.value, currentTime);
    gainNode.gain.linearRampToValueAtTime(0, currentTime + release);
    oscillator.stop(currentTime + release);
};

export const getOscillatorNodes = () => oscillatorNodes;

export const getOscillatorGainNodes = () => oscillatorGainNodes;

export const getOscillatorGainNodesByFrequency = (frequency: number) => oscillatorGainNodes[frequency];

export const resetOscillatorNodes = () => {
    oscillatorNodes = {};
};

export const resetOscillatorGainNodes = () => {
    oscillatorGainNodes = {};
};

export const startOscillatorsByFrequency = (oscillatorFrequency: number, studioService: StudioService) => {
    const audioContext = getAudioContext();
    const filterEnabled = studioService.filter.settings.enabled;
    // const { filterNode } = studioService.filter;
    const envelopeAttack = studioService.envelope.attack;
    const envelopeDecay = studioService.envelope.decay;
    const envelopeSustain = studioService.envelope.sustain;

    (Object.keys(studioService.oscillators) as OscillatorId[]).forEach((oscillatorId) => {
        const oscSettings = studioService.oscillators[oscillatorId].settings;
        const oscEnabled = oscSettings.enabled;
        const oscType = oscSettings.type;
        const oscOctave = oscSettings.octave;
        const oscMasterGainNode = studioService.oscillators[oscillatorId].gainNode;
        const oscAnalyserNode = studioService.oscillators[oscillatorId].analyserNode;
        const frequencyGainNode = audioContext.createGain();
        const calculatedFrequency = getFrequencyByOctaveOffset(oscOctave, oscillatorFrequency);

        if (oscEnabled) {
            const oscillator = audioContext.createOscillator();
            oscillator.type = oscType;
            oscillator.frequency.value = calculatedFrequency;
            addOscillatorNode(oscillator, oscillatorFrequency, oscillatorId);
            addOscillatorGainNode(frequencyGainNode, oscillatorFrequency, oscillatorId);

            if (oscSettings.hasOwnProperty('detune')) {
                oscillator.detune.value = (oscSettings as OscillatorDetuneSetting).detune;
            }
            frequencyGainNode.gain.cancelScheduledValues(0);
            // TODO: Check if osc linked to envelope, if not don't call enableEnv and connect osc to analyser
            enableEnvelopeADS(audioContext, frequencyGainNode, envelopeAttack, envelopeDecay, envelopeSustain);

            oscillator.connect(oscAnalyserNode);
            // frequencyGainNode.connect(oscAnalyserNode);
            if (filterEnabled) {
                const fn = audioContext.createBiquadFilter();
                fn.type = studioService.filter.settings.type;
                fn.frequency.value = studioService.filter.settings.frequency;
                fn.Q.value = studioService.filter.settings.q;
                fn.detune.value = studioService.filter.settings.detune;
                fn.gain.value = studioService.filter.settings.gain;
                // fn.Q.value = 500;
                // oscMasterGainNode.connect(filterNode);
                oscAnalyserNode.connect(fn);
                fn.connect(frequencyGainNode);
                // oscAnalyserNode.connect(frequencyGainNode);
                // filterNode.connect(frequencyGainNode);
            } else {
                oscAnalyserNode.connect(frequencyGainNode);
            }
            // oscAnalyserNode.connect(frequencyGainNode);
            frequencyGainNode.connect(oscMasterGainNode);
            // filterNode.connect(oscMasterGainNode);
            // oscMasterGainNode.connect(oscAnalyserNode);

            oscillator.start();
            logger.info(`Starting oscillator ${oscillatorId} with frequency`, calculatedFrequency);
        }
    });
};

export const stopOscillatorByFrequency = (frequency: number, studioService: StudioService) => {
    const audioContext = getAudioContext();
    const frequencyGainNode = getOscillatorGainNodesByFrequency(frequency);
    const envelopeRelease = studioService.envelope.release;

    logger.info('Stopping all oscillators for frequency', frequency);
    if (oscillatorNodes[frequency]) {
        (Object.keys(oscillatorNodes[frequency]) as OscillatorId[]).forEach((oscillatorId: OscillatorId) => {
            oscillatorNodes[frequency][oscillatorId].forEach((oscillator) => {
                enableEnvelopeRelease(audioContext, frequencyGainNode[oscillatorId], envelopeRelease, oscillator);
                // TODO: Check if osc linked to envelope, if not call stop directly
                // oscillator.stop();
            });
        });
        delete oscillatorNodes[frequency];
    }
};

export const stopOscillatorById = (oscillatorId: OscillatorId, studioService: StudioService) => {
    const audioContext = getAudioContext();
    const envelopeRelease = studioService.envelope.release;
    const gainNodes = getOscillatorGainNodes();

    logger.info('Stopping all oscillators for oscillatorId', oscillatorId);
    (Object.keys(oscillatorNodes)).forEach((frequency) => {
        if (oscillatorNodes[frequency][oscillatorId]) {
            oscillatorNodes[frequency][oscillatorId].forEach((oscillator) => {
                enableEnvelopeRelease(audioContext, gainNodes[frequency][oscillatorId], envelopeRelease, oscillator);
                // TODO: Check if osc linked to envelope, if not call stop directly
                // oscillator.stop();
            });
            delete oscillatorNodes[frequency][oscillatorId];
        }
    });
};

export const stopOscillators = (studioService: StudioService) => {
    const audioContext = getAudioContext();
    const envelopeRelease = studioService.envelope.release;
    const gainNodes = getOscillatorGainNodes();

    logger.info('Stopping all oscillators');
    (Object.keys(oscillatorNodes)).forEach((frequency) => {
        (Object.keys(oscillatorNodes[frequency]) as OscillatorId[]).forEach((oscillatorId: OscillatorId) => {
            oscillatorNodes[frequency][oscillatorId].forEach((oscillator) => {
                enableEnvelopeRelease(audioContext, gainNodes[frequency][oscillatorId], envelopeRelease, oscillator);
                // TODO: Check if osc linked to envelope, if not call stop directly
                // oscillator.stop();
            });
        });
    });
    resetOscillatorNodes();
};
