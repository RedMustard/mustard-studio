import {
    DispatchFunction,
    OscillatorDetuneSetting,
    OscillatorId,
    OscillatorSettings,
    StudioService,
} from '../../types/types';
import { stopOscillatorById } from '../oscillators/oscillators';
import { logger } from '../utils/logger/logger';
import { getInitialState } from './StudioServiceStore';

export const setMasterVolume = (volume: number, dispatch: DispatchFunction) => {
    dispatch({ type: 'SET_MASTER_VOLUME', payload: volume });
    logger.info(`Master volume set with value ${volume * 100}%`);
};

export const setMasterGainNode = (gainNode: GainNode, dispatch: DispatchFunction) => {
    dispatch({ type: 'SET_MASTER_GAIN', payload: gainNode });
    logger.info('Master gain node added', gainNode);
};

export const setMasterPanNode = (panNode: StereoPannerNode, dispatch: DispatchFunction) => {
    dispatch({ type: 'SET_MASTER_PAN_NODE', payload: panNode });
    logger.info('Master pan node added', panNode);
};

export const setMasterPanPosition = (position: number, dispatch: DispatchFunction) => {
    dispatch({ type: 'SET_MASTER_PAN_POSITION', payload: position });
    logger.info('Master pan position set with value ', position);
};

export const resetMasterVolume = (dispatch: DispatchFunction) => {
    const initialState: StudioService = getInitialState();
    const initialVolume = initialState.master.settings.volume;
    dispatch({ type: 'SET_MASTER_VOLUME', payload: initialVolume });
    logger.info('Master volume reset to value', initialVolume);
};

export const resetMasterPanPosition = (dispatch: DispatchFunction) => {
    const initialState: StudioService = getInitialState();
    const initialPanPosition = initialState.master.settings.pan;
    dispatch({ type: 'SET_MASTER_PAN_POSITION', payload: initialPanPosition });
    logger.info('Master pan position reset to value', initialPanPosition);
};

export const setEnvelopeAttack = (attack: number, dispatch: DispatchFunction) => {
    dispatch({ type: 'SET_ENVELOPE_ATTACK', payload: attack });
    logger.info('Envelope attack value set with value ', attack);
};

export const setEnvelopeSustain = (sustain: number, dispatch: DispatchFunction) => {
    dispatch({ type: 'SET_ENVELOPE_SUSTAIN', payload: sustain });
    logger.info('Envelope sustain value set with value ', sustain);
};

export const setEnvelopeDecay = (decay: number, dispatch: DispatchFunction) => {
    dispatch({ type: 'SET_ENVELOPE_DECAY', payload: decay });
    logger.info('Envelope decay value set with value ', decay);
};

export const setEnvelopeRelease = (release: number, dispatch: DispatchFunction) => {
    dispatch({ type: 'SET_ENVELOPE_RELEASE', payload: release });
    logger.info('Envelope release value set with value ', release);
};

export const resetEnvelopeAttack = (dispatch: DispatchFunction) => {
    const initialState: StudioService = getInitialState();
    const initialEnvelopeAttack = initialState.envelope.attack;
    dispatch({ type: 'SET_ENVELOPE_ATTACK', payload: initialEnvelopeAttack });
    logger.info('Envelope attack reset to value ', initialEnvelopeAttack);
};

export const resetEnvelopeSustain = (dispatch: DispatchFunction) => {
    const initialState: StudioService = getInitialState();
    const initialEnvelopeSustain = initialState.envelope.sustain;
    dispatch({ type: 'SET_ENVELOPE_SUSTAIN', payload: initialEnvelopeSustain });
    logger.info('Envelope sustain reset to value ', initialEnvelopeSustain);
};

export const resetEnvelopeDecay = (dispatch: DispatchFunction) => {
    const initialState: StudioService = getInitialState();
    const initialEnvelopeDecay = initialState.envelope.decay;
    dispatch({ type: 'SET_ENVELOPE_DECAY', payload: initialEnvelopeDecay });
    logger.info('Envelope decay reset to value ', initialEnvelopeDecay);
};

export const resetEnvelopeRelease = (dispatch: DispatchFunction) => {
    const initialState: StudioService = getInitialState();
    const initialEnvelopeRelease = initialState.envelope.release;
    dispatch({ type: 'SET_ENVELOPE_RELEASE', payload: initialEnvelopeRelease });
    logger.info('Envelope release reset to value ', initialEnvelopeRelease);
};

export const setFilterNode = (filterNode: BiquadFilterNode, dispatch: DispatchFunction) => {
    dispatch({ type: 'SET_FILTER_NODE', payload: filterNode });
    logger.info('Filter node added', filterNode);
};

export const setFilterEnabled = (isEnabled: boolean, dispatch: DispatchFunction) => {
    dispatch({ type: 'SET_FILTER_ENABLED', payload: isEnabled });
    logger.info('Filter isEnabled: ', isEnabled);
};

export const setFilterFrequency = (frequency: number, dispatch: DispatchFunction) => {
    dispatch({ type: 'SET_FILTER_FREQUENCY', payload: frequency });
    logger.info('Filter frequency set with value ', frequency);
};

export const setFilterType = (type: BiquadFilterType, dispatch: DispatchFunction) => {
    dispatch({ type: 'SET_FILTER_TYPE', payload: type });
    logger.info('Filter type set with value ', type);
};

export const setFilterQ = (q: number, dispatch: DispatchFunction) => {
    dispatch({ type: 'SET_FILTER_Q', payload: q });
    logger.info('Filter q set with value ', q);
};

export const setFilterGain = (gain: number, dispatch: DispatchFunction) => {
    dispatch({ type: 'SET_FILTER_GAIN', payload: gain });
    logger.info('Filter gain set with value ', gain);
};

export const setFilterDetune = (detune: number, dispatch: DispatchFunction) => {
    dispatch({ type: 'SET_FILTER_DETUNE', payload: detune });
    logger.info('Filter detune set with value ', detune);
};

export const resetFilterFrequency = (dispatch: DispatchFunction) => {
    const initialState: StudioService = getInitialState();
    const initialFilterFrequency = initialState.filter.settings.frequency;
    dispatch({ type: 'SET_FILTER_FREQUENCY', payload: initialFilterFrequency });
    logger.info('Filter frequency reset to value ', initialFilterFrequency);
};

export const resetFilterQ = (dispatch: DispatchFunction) => {
    const initialState: StudioService = getInitialState();
    const initialFilterQ = initialState.filter.settings.q;
    dispatch({ type: 'SET_FILTER_Q', payload: initialFilterQ });
    logger.info('Filter Q reset to value ', initialFilterQ);
};

export const resetFilterGain = (dispatch: DispatchFunction) => {
    const initialState: StudioService = getInitialState();
    const initialFilterGain = initialState.filter.settings.gain;
    dispatch({ type: 'SET_FILTER_GAIN', payload: initialFilterGain });
    logger.info('Filter gain reset to value ', initialFilterGain);
};

export const resetFilterDetune = (dispatch: DispatchFunction) => {
    const initialState: StudioService = getInitialState();
    const initialFilterDetune = initialState.filter.settings.detune;
    dispatch({ type: 'SET_FILTER_DETUNE', payload: initialFilterDetune });
    logger.info('Filter detune reset to value ', initialFilterDetune);
};

export const setOscillatorVolume = (
    volume: number,
    oscillatorId: OscillatorId,
    dispatch: DispatchFunction,
) => {
    switch (oscillatorId) {
        case 'osc1':
            dispatch({ type: 'SET_OSC_1_VOLUME', payload: volume });
            logger.info(`Oscillator 1 volume set with value ${volume * 100}%`);
            break;
        case 'osc2':
            dispatch({ type: 'SET_OSC_2_VOLUME', payload: volume });
            logger.info(`Oscillator 2 volume set with value ${volume * 100}%`);
            break;
        case 'oscSub':
            dispatch({ type: 'SET_OSC_SUB_VOLUME', payload: volume });
            logger.info(`Oscillator 2 volume set with value ${volume * 100}%`);
            break;
        default:
            logger.info('setOscillatorVolume unknown oscillatorId provided, no oscillator volume set. Received: ', oscillatorId);
            break;
    }
};

export const setOscillatorAnalyserNode = (
    analyserNode: AnalyserNode,
    oscillatorId: OscillatorId,
    dispatch: DispatchFunction,
) => {
    switch (oscillatorId) {
        case 'osc1':
            dispatch({ type: 'SET_OSC_1_ANALYSER', payload: analyserNode });
            logger.info('Oscillator 1 analyser node added', analyserNode);
            break;
        case 'osc2':
            dispatch({ type: 'SET_OSC_2_ANALYSER', payload: analyserNode });
            logger.info('Oscillator 2 analyser node added', analyserNode);
            break;
        case 'oscSub':
            dispatch({ type: 'SET_OSC_SUB_ANALYSER', payload: analyserNode });
            logger.info('Oscillator Sub analyser node added', analyserNode);
            break;
        default:
            logger.info('setOscillatorGainNode unknown oscillatorId provided, no oscillator analyser node set. Received: ', oscillatorId);
            break;
    }
};

export const setOscillatorGainNode = (
    gainNode: GainNode,
    oscillatorId: OscillatorId,
    dispatch: DispatchFunction,
) => {
    switch (oscillatorId) {
        case 'osc1':
            dispatch({ type: 'SET_OSC_1_GAIN', payload: gainNode });
            logger.info('Oscillator 1 gain node added', gainNode);
            break;
        case 'osc2':
            dispatch({ type: 'SET_OSC_2_GAIN', payload: gainNode });
            logger.info('Oscillator 2 gain node added', gainNode);
            break;
        case 'oscSub':
            dispatch({ type: 'SET_OSC_SUB_GAIN', payload: gainNode });
            logger.info('Oscillator Sub gain node added', gainNode);
            break;
        default:
            logger.info('setOscillatorGainNode unknown oscillatorId provided, no oscillator gain node set. Received: ', oscillatorId);
            break;
    }
};

export const setOscillatorEnabled = (
    isEnabled: boolean,
    oscillatorId: OscillatorId,
    dispatch: DispatchFunction,
    studioService: StudioService,
) => {
    switch (oscillatorId) {
        case 'osc1':
            dispatch({ type: 'SET_OSC_1_ENABLED', payload: isEnabled });
            stopOscillatorById('osc1', studioService);
            logger.info('Oscillator 1 isEnabled: ', isEnabled);
            break;
        case 'osc2':
            dispatch({ type: 'SET_OSC_2_ENABLED', payload: isEnabled });
            stopOscillatorById('osc2', studioService);
            logger.info('Oscillator 2 isEnabled: ', isEnabled);
            break;
        case 'oscSub':
            dispatch({ type: 'SET_OSC_SUB_ENABLED', payload: isEnabled });
            stopOscillatorById('oscSub', studioService);
            logger.info('Oscillator Sub isEnabled: ', isEnabled);
            break;
        default:
            logger.info('setOscillatorEnabled unknown oscillatorId provided, no oscillator set. Received: ', oscillatorId);
            break;
    }
};

export const setOscillatorType = (
    oscillatorType: OscillatorType,
    oscillatorId: OscillatorId,
    dispatch: DispatchFunction,
) => {
    switch (oscillatorId) {
        case 'osc1':
            dispatch({ type: 'SET_OSC_1_TYPE', payload: oscillatorType });
            logger.info(`Oscillator 1 type set to ${oscillatorType}`);
            break;
        case 'osc2':
            dispatch({ type: 'SET_OSC_2_TYPE', payload: oscillatorType });
            logger.info(`Oscillator 2 type set to ${oscillatorType}`);
            break;
        case 'oscSub':
            dispatch({ type: 'SET_OSC_SUB_TYPE', payload: oscillatorType });
            logger.info(`Oscillator Sub type set to ${oscillatorType}`);
            break;
        default:
            logger.info('setOscillatorType unknown oscillatorId provided, no oscillator type set. Received: ', oscillatorId);
            break;
    }
};

export const setOscillatorDetune = (
    detune: number,
    oscillatorId: OscillatorId,
    dispatch: DispatchFunction,
) => {
    switch (oscillatorId) {
        case 'osc1':
            dispatch({ type: 'SET_OSC_1_DETUNE', payload: detune });
            logger.info(`Oscillator 1 detune set to ${detune}`);
            break;
        case 'osc2':
            dispatch({ type: 'SET_OSC_2_DETUNE', payload: detune });
            logger.info(`Oscillator 2 detune set to ${detune}`);
            break;
        default:
            logger.info('setOscillatorDetune unknown oscillatorId provided, no oscillator detune set. Received: ', oscillatorId);
            break;
    }
};

export const setOscillatorPanNode = (
    panNode: StereoPannerNode,
    oscillatorId: OscillatorId,
    dispatch: DispatchFunction,
) => {
    switch (oscillatorId) {
        case 'osc1':
            dispatch({ type: 'SET_OSC_1_PAN_NODE', payload: panNode });
            logger.info('Oscillator 1 pan node added', panNode);
            break;
        case 'osc2':
            dispatch({ type: 'SET_OSC_2_PAN_NODE', payload: panNode });
            logger.info('Oscillator 2 pan node added', panNode);
            break;
        case 'oscSub':
            dispatch({ type: 'SET_OSC_SUB_PAN_NODE', payload: panNode });
            logger.info('Oscillator Sub pan node added', panNode);
            break;
        default:
            logger.info('setOscillatorPanNode unknown oscillatorId provided, no oscillator pan node set. Received: ', oscillatorId);
            break;
    }
};

export const setOscillatorPanPosition = (
    position: number,
    oscillatorId: OscillatorId,
    dispatch: DispatchFunction,
) => {
    switch (oscillatorId) {
        case 'osc1':
            dispatch({ type: 'SET_OSC_1_PAN_POSITION', payload: position });
            logger.info('Oscillator 1 pan position set with value ', position);
            break;
        case 'osc2':
            dispatch({ type: 'SET_OSC_2_PAN_POSITION', payload: position });
            logger.info('Oscillator 2 pan position set with value ', position);
            break;
        case 'oscSub':
            dispatch({ type: 'SET_OSC_SUB_PAN_POSITION', payload: position });
            logger.info('Oscillator Sub pan position set with value ', position);
            break;
        default:
            logger.info('setOscillatorPanPosition unknown oscillatorId provided, no oscillator pan position set. Received: ', oscillatorId);
            break;
    }
};

export const setOscillatorOctave = (
    octave: number,
    oscillatorId: OscillatorId,
    dispatch: DispatchFunction,
) => {
    switch (oscillatorId) {
        case 'osc1':
            dispatch({ type: 'SET_OSC_1_OCTAVE', payload: octave });
            logger.info('Oscillator 1 octave set with value ', octave);
            break;
        case 'osc2':
            dispatch({ type: 'SET_OSC_2_OCTAVE', payload: octave });
            logger.info('Oscillator 2 octave set with value ', octave);
            break;
        case 'oscSub':
            dispatch({ type: 'SET_OSC_SUB_OCTAVE', payload: octave });
            logger.info('Oscillator Sub octave set with value ', octave);
            break;
        default:
            logger.info('setOscillatorOctave unknown oscillatorId provided, no oscillator octave set. Received: ', oscillatorId);
            break;
    }
};

export const resetOscillatorVolume = (oscillatorId: OscillatorId, dispatch: DispatchFunction) => {
    const initialState: StudioService = getInitialState();
    let initialVolume: number;

    switch (oscillatorId) {
        case 'osc1':
            initialVolume = initialState.oscillators.osc1.settings.volume;
            dispatch({ type: 'SET_OSC_1_VOLUME', payload: initialVolume });
            logger.info('Oscillator 1 volume reset to value', initialVolume);
            break;
        case 'osc2':
            initialVolume = initialState.oscillators.osc2.settings.volume;
            dispatch({ type: 'SET_OSC_2_VOLUME', payload: initialVolume });
            logger.info('Oscillator 2 reset to value', initialVolume);
            break;
        case 'oscSub':
            initialVolume = initialState.oscillators.oscSub.settings.volume;
            dispatch({ type: 'SET_OSC_SUB_VOLUME', payload: initialVolume });
            logger.info('Oscillator Sub reset to value', initialVolume);
            break;
        default:
            logger.info('resetOscillatorVolume unknown oscillatorId provided, oscillator volume not reset. Received: ', oscillatorId);
            break;
    }
};

export const resetOscillatorDetune = (oscillatorId: OscillatorId, dispatch: DispatchFunction) => {
    const initialState: StudioService = getInitialState();
    let initialDetune: number;

    switch (oscillatorId) {
        case 'osc1':
            initialDetune = (initialState.oscillators.osc1.settings as OscillatorSettings & OscillatorDetuneSetting).detune;
            dispatch({ type: 'SET_OSC_1_DETUNE', payload: initialDetune });
            logger.info(`Oscillator 1 detune reset to value ${initialDetune}`);
            break;
        case 'osc2':
            initialDetune = (initialState.oscillators.osc2.settings as OscillatorSettings & OscillatorDetuneSetting).detune;
            dispatch({ type: 'SET_OSC_2_DETUNE', payload: initialDetune });
            logger.info(`Oscillator 2 detune reset to value ${initialDetune}`);
            break;
        default:
            logger.info('resetOscillatorDetune unknown oscillatorId provided, oscillator detune not reset. Received: ', oscillatorId);
            break;
    }
};

export const resetOscillatorPanPosition = (oscillatorId: OscillatorId, dispatch: DispatchFunction) => {
    const initialState: StudioService = getInitialState();
    let initialPanPosition: number;

    switch (oscillatorId) {
        case 'osc1':
            initialPanPosition = initialState.oscillators.osc1.settings.pan;
            dispatch({ type: 'SET_OSC_1_PAN_POSITION', payload: initialPanPosition });
            logger.info('Oscillator 1 pan position reset to value', initialPanPosition);
            break;
        case 'osc2':
            initialPanPosition = initialState.oscillators.osc2.settings.pan;
            dispatch({ type: 'SET_OSC_2_PAN_POSITION', payload: initialPanPosition });
            logger.info('Oscillator 2 pan position reset to value', initialPanPosition);
            break;
        case 'oscSub':
            initialPanPosition = initialState.oscillators.oscSub.settings.pan;
            dispatch({ type: 'SET_OSC_SUB_PAN_POSITION', payload: initialPanPosition });
            logger.info('Oscillator Sub pan position reset to value', initialPanPosition);
            break;
        default:
            logger.info('resetOscillatorPanPosition unknown oscillatorId provided, oscillator pan position not reset. Received: ', oscillatorId);
            break;
    }
};

export const resetOscillatorOctave = (oscillatorId: OscillatorId, dispatch: DispatchFunction) => {
    const initialState: StudioService = getInitialState();
    let initialOctave: number;

    switch (oscillatorId) {
        case 'osc1':
            initialOctave = initialState.oscillators.osc1.settings.octave;
            dispatch({ type: 'SET_OSC_1_OCTAVE', payload: initialOctave });
            logger.info('Oscillator 1 octave reset to value', initialOctave);
            break;
        case 'osc2':
            initialOctave = initialState.oscillators.osc1.settings.octave;
            dispatch({ type: 'SET_OSC_2_OCTAVE', payload: initialOctave });
            logger.info('Oscillator 2 octave reset to value', initialOctave);
            break;
        case 'oscSub':
            initialOctave = initialState.oscillators.osc1.settings.octave;
            dispatch({ type: 'SET_OSC_SUB_OCTAVE', payload: initialOctave });
            logger.info('Oscillator Sub octave reset to value', initialOctave);
            break;
        default:
            logger.info('resetOscillatorOctave unknown oscillatorId provided, oscillator octave not reset. Received: ', oscillatorId);
            break;
    }
};
