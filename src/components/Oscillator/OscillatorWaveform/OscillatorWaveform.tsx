import { h } from 'preact';
import { useContext, useEffect } from 'preact/hooks';
import { setOscillatorAnalyserNode } from '../../../lib/studioService/studioServiceActions';
import { StudioServiceContext } from '../../../lib/studioService/StudioServiceStore';
import { OscillatorId } from '../../../types/types';
import { Waveform } from '../../Waveform/Waveform';

interface OscillatorWaveformProps {
    oscillatorId: OscillatorId;
    audioContext: AudioContext;
}

export const OscillatorWaveform = ({ oscillatorId, audioContext }: OscillatorWaveformProps) => {
    const [studioService, dispatch] = useContext(StudioServiceContext);
    const { oscillators } = studioService;
    let oscillatorAnalyserNode = oscillators[oscillatorId].analyserNode;

    useEffect(() => {
        if (!oscillatorAnalyserNode) {
            oscillatorAnalyserNode = audioContext.createAnalyser();
            oscillatorAnalyserNode.fftSize = 2048;
            setOscillatorAnalyserNode(oscillatorAnalyserNode, oscillatorId, dispatch);
        }
    }, [oscillatorAnalyserNode]);

    return (
        <div className="oscillator-waveform">
            { oscillatorAnalyserNode
                ? (
                    <Waveform
                        analyserNode={oscillatorAnalyserNode}
                    />
                )
                : null
            }
        </div>
    );
};
