import { useState, useRef, useCallback, useEffect } from 'react';

// Pitch detection algorithm (simplified McLeod Pitch Method)
const getPitch = (buffer: Float32Array, sampleRate: number): { frequency: number; clarity: number } | null => {
  const bufferSize = buffer.length;
  let maxSamples = Math.floor(bufferSize / 2);
  let bestCorrelation = 0;
  let bestPeriod = -1;
  let clarity = 0;

  for (let period = 80; period < maxSamples; period++) {
    let correlation = 0;
    for (let i = 0; i < maxSamples; i++) {
      correlation += Math.abs(buffer[i] - buffer[i + period]);
    }
    correlation = 1 - correlation / maxSamples;
    if (correlation > bestCorrelation) {
      bestCorrelation = correlation;
      bestPeriod = period;
    }
  }

  if (bestCorrelation > 0.9) { // Confidence threshold
    const frequency = sampleRate / bestPeriod;
    clarity = bestCorrelation;
    return { frequency, clarity };
  }

  return null;
};


export const usePitchDetector = () => {
  const [pitch, setPitch] = useState<{ frequency: number; clarity: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserNodeRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number>(0);
  const bufferRef = useRef<Float32Array | null>(null);


  const updatePitch = useCallback(() => {
    if (analyserNodeRef.current && bufferRef.current) {
      analyserNodeRef.current.getFloatTimeDomainData(bufferRef.current);
      const pitchData = getPitch(bufferRef.current, audioContextRef.current!.sampleRate);
      if (pitchData) {
        setPitch(pitchData);
      }
    }
    animationFrameRef.current = requestAnimationFrame(updatePitch);
  }, []);

  const start = useCallback(async () => {
    try {
      if (audioContextRef.current) {
        audioContextRef.current.resume();
        return;
      }
      
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const context = new window.AudioContext();
      audioContextRef.current = context;

      const source = context.createMediaStreamSource(stream);
      const analyser = context.createAnalyser();
      analyser.fftSize = 2048;
      source.connect(analyser);

      analyserNodeRef.current = analyser;
      bufferRef.current = new Float32Array(analyser.fftSize);

      animationFrameRef.current = requestAnimationFrame(updatePitch);

    } catch (err) {
      console.error('Error accessing microphone:', err);
      setError('Microphone access denied. Please enable it in your browser settings.');
    }
  }, [updatePitch]);

  const stop = useCallback(() => {
    cancelAnimationFrame(animationFrameRef.current);
    setPitch(null);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  }, []);
  
  useEffect(() => {
    // Cleanup on unmount
    return () => stop();
  }, [stop]);

  return { pitch, error, start, stop };
};
