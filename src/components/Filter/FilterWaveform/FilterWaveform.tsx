import { h } from 'preact';
import { useContext, useEffect, useRef } from 'preact/hooks';
import { WAVEFORM_BACKGROUND_COLOR, WAVEFORM_LINE_COLOR, WAVEFORM_LINE_WIDTH } from '../../../constants';

interface FilterWaveformProps {
    audioContext: AudioContext;
}

export const FilterWaveform = ({ audioContext }: FilterWaveformProps) => {
    // const [studioService, dispatch] = useContext(StudioServiceContext);
    // const { oscillators } = studioService;
    const canvasRef = useRef(null);

    const drawWaveform = () => {
        const canvasWidth = canvasRef.current.width;
        const canvasHeight = canvasRef.current.height;
        const canvasContext = canvasRef.current.getContext('2d');
        // const sliceWidth = (canvasWidth * 5.0) / bufferLength;

        canvasContext.fillStyle = WAVEFORM_BACKGROUND_COLOR;
        canvasContext.strokeStyle = WAVEFORM_LINE_COLOR;
        canvasContext.lineWidth = WAVEFORM_LINE_WIDTH;
        canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
        canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);
        canvasContext.lineTo(canvasWidth, canvasHeight / 2);
        canvasContext.stroke();
        canvasContext.beginPath();

        // let xCoord = 0;

        // for (let i = 0; i < bufferLength; i++) {
        //     const v = dataArray[i] / 128.0;
        //     const yCoord = (v * canvasHeight) / 2;

        //     if (i === 0) {
        //         canvasContext.moveTo(xCoord, yCoord);
        //     } else {
        //         canvasContext.lineTo(xCoord, yCoord);
        //     }
        //     xCoord += sliceWidth;
        // }

        requestAnimationFrame(drawWaveform);
    };

    useEffect(() => {
        drawWaveform();
    }, []);

    return (
        <div className="filter-waveform">
            <canvas
                className="filter-waveform__canvas"
                ref={canvasRef}
            />
        </div>
    );
};
