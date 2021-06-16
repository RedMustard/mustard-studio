import { h } from 'preact';
import { useRef, useEffect } from 'preact/hooks';
import { WAVEFORM_BACKGROUND_COLOR, WAVEFORM_LINE_COLOR, WAVEFORM_LINE_WIDTH } from '../../constants';


interface WaveformProps {
    analyserNode: AnalyserNode;
}

export const Waveform = ({ analyserNode }: WaveformProps) => {
    const canvasRef = useRef(null);
    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // Source: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API#creating_a_waveformoscilloscope
    const drawWaveform = () => {
        const canvasWidth = canvasRef.current.width;
        const canvasHeight = canvasRef.current.height;
        const canvasContext = canvasRef.current.getContext('2d');
        const sliceWidth = (canvasWidth * 5.0) / bufferLength;

        analyserNode.getByteTimeDomainData(dataArray);

        canvasContext.fillStyle = WAVEFORM_BACKGROUND_COLOR;
        canvasContext.strokeStyle = WAVEFORM_LINE_COLOR;
        canvasContext.lineWidth = WAVEFORM_LINE_WIDTH;
        canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
        canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);
        canvasContext.lineTo(canvasWidth, canvasHeight / 2);
        canvasContext.stroke();
        canvasContext.beginPath();

        let xCoord = 0;

        for (let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 128.0;
            const yCoord = (v * canvasHeight) / 2;

            if (i === 0) {
                canvasContext.moveTo(xCoord, yCoord);
            } else {
                canvasContext.lineTo(xCoord, yCoord);
            }
            xCoord += sliceWidth;
        }

        requestAnimationFrame(drawWaveform);
    };

    useEffect(() => {
        drawWaveform();
    }, []);

    return (
        <div className="waveform">
            <canvas
                className="waveform__canvas"
                ref={canvasRef}
            />
        </div>
    );
};
