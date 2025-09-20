import { useState, useRef, useCallback, useEffect } from 'react';

export const useReferenceTone = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const [playingFrequency, setPlayingFrequency] = useState<number | null>(null);

  const stopTone = useCallback(() => {
    if (oscillatorRef.current && gainNodeRef.current && audioContextRef.current) {
      const currentTime = audioContextRef.current.currentTime;
      gainNodeRef.current.gain.cancelScheduledValues(currentTime);
      gainNodeRef.current.gain.linearRampToValueAtTime(gainNodeRef.current.gain.value, currentTime);
      gainNodeRef.current.gain.linearRampToValueAtTime(0, currentTime + 0.1); // Quick fade out
      oscillatorRef.current.stop(currentTime + 0.1);

      oscillatorRef.current = null;
      gainNodeRef.current = null;
      setPlayingFrequency(null);
    }
  }, []);

  const playTone = useCallback((frequency: number) => {
    if (playingFrequency === frequency) {
      stopTone();
      return;
    }

    if (playingFrequency !== null) {
      stopTone();
    }
    
    if (!audioContextRef.current) {
        try {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        } catch (e) {
            console.error("Web Audio API is not supported in this browser");
            return;
        }
    }

    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    const context = audioContextRef.current;
    const currentTime = context.currentTime;
    
    const oscillator = context.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, currentTime);

    const gainNode = context.createGain();
    gainNode.gain.setValueAtTime(0, currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, currentTime + 0.1); // Fade in

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    oscillator.start();

    oscillatorRef.current = oscillator;
    gainNodeRef.current = gainNode;
    setPlayingFrequency(frequency);
  }, [playingFrequency, stopTone]);

  useEffect(() => {
    return () => {
      stopTone();
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
          audioContextRef.current.close();
      }
    };
  }, [stopTone]);

  return { playTone, playingFrequency };
};