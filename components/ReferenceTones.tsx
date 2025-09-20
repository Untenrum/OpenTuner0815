import React from 'react';
import type { Note } from '../types';

interface ReferenceTonesProps {
  tuning: Note[];
  onPlayTone: (frequency: number) => void;
  playingFrequency: number | null;
  isDisabled: boolean;
}

export const ReferenceTones: React.FC<ReferenceTonesProps> = ({
  tuning,
  onPlayTone,
  playingFrequency,
  isDisabled,
}) => {
  return (
    <div className="reference-tones" aria-label="Reference Tones">
      <h2 className="reference-tones-title">Reference Tones</h2>
      <div className="reference-tones-controls">
        {tuning.map(note => (
          <button
            key={note.stringNum}
            className={`tone-button ${playingFrequency === note.frequency ? 'playing' : ''}`}
            onClick={() => onPlayTone(note.frequency)}
            disabled={isDisabled}
            aria-pressed={playingFrequency === note.frequency}
          >
            {note.name.slice(0, -1)}
          </button>
        ))}
      </div>
    </div>
  );
};