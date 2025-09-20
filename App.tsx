import React, { useState, useEffect } from 'react';
import { usePitchDetector } from './hooks/usePitchDetector';
import { useReferenceTone } from './hooks/useReferenceTone';
import { Tuner } from './components/Tuner';
import { Controls } from './components/Controls';
import { ReferenceTones } from './components/ReferenceTones';
import { INSTRUMENTS } from './constants';
import { findClosestNote, getCents } from './utils/tuning';
import type { Instrument, Note } from './types';

const App = () => {
  const [isTunerActive, setIsTunerActive] = useState(false);
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument>(INSTRUMENTS[0]);
  const [detectedNote, setDetectedNote] = useState<{
    name: string;
    frequency: number;
    cents: number;
    targetNote: Note | null;
  } | null>(null);

  const { pitch, error, start, stop } = usePitchDetector();
  const { playTone, playingFrequency } = useReferenceTone();

  const handleToggleTuner = () => {
    if (isTunerActive) {
      stop();
      setIsTunerActive(false);
      setDetectedNote(null);
    } else {
      if (playingFrequency) {
        // This will call stopTone internally
        playTone(playingFrequency);
      }
      start();
      setIsTunerActive(true);
    }
  };

  const handleInstrumentChange = (instrumentName: string) => {
    const instrument = INSTRUMENTS.find(inst => inst.name === instrumentName);
    if (instrument) {
      setSelectedInstrument(instrument);
    }
  };

  useEffect(() => {
    if (pitch && pitch.clarity > 0.95) { // Only update for clear signals
      const currentTuning = selectedInstrument.tunings.Standard;
      const targetNote = findClosestNote(pitch.frequency, currentTuning);
      const cents = getCents(pitch.frequency, targetNote.frequency);
      setDetectedNote({
        name: targetNote.name.slice(0, -1), // Remove octave number for display
        frequency: pitch.frequency,
        cents,
        targetNote,
      });
    } else if (isTunerActive) {
        // Optionally clear the note if signal is lost
        // setDetectedNote(null);
    }
  }, [pitch, selectedInstrument, isTunerActive]);

  return (
    <div className="app" aria-live="polite">
        <Tuner
            detectedNote={detectedNote}
            instrumentTuning={selectedInstrument.tunings.Standard}
            isActive={isTunerActive}
        />
        {error && <p className="error-message" role="alert">{error}</p>}
        <Controls
            isActive={isTunerActive}
            onToggle={handleToggleTuner}
            instruments={INSTRUMENTS}
            selectedInstrument={selectedInstrument}
            onInstrumentChange={handleInstrumentChange}
        />
        <ReferenceTones
            tuning={selectedInstrument.tunings.Standard}
            onPlayTone={playTone}
            playingFrequency={playingFrequency}
            isDisabled={isTunerActive}
        />
    </div>
  );
};

export default App;