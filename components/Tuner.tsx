import React from 'react';
import type { Note } from '../types';

interface TunerProps {
  isActive: boolean;
  detectedNote: {
    name: string;
    cents: number;
    targetNote: Note | null;
  } | null;
  instrumentTuning: Note[];
}

const getStatusInfo = (cents: number): { text: string; color: string } => {
  if (Math.abs(cents) <= 5) {
    return { text: 'In Tune', color: 'var(--green)' };
  }
  if (cents < -5 && cents > -20) {
    return { text: 'Tune Up', color: 'var(--orange)' };
  }
  if (cents > 5 && cents < 20) {
    return { text: 'Tune Down', color: 'var(--orange)' };
  }
  if (cents <= -20) {
    return { text: 'Tune Up', color: 'var(--red)' };
  }
  return { text: 'Tune Down', color: 'var(--red)' };
};

export const Tuner: React.FC<TunerProps> = ({ isActive, detectedNote, instrumentTuning }) => {
  const noteName = detectedNote?.name ?? '--';
  const cents = detectedNote?.cents ?? 0;
  
  const rotation = Math.max(-45, Math.min(45, cents * 0.9));
  const statusInfo = getStatusInfo(cents);
  const displayColor = isActive && detectedNote ? statusInfo.color : 'var(--text-color)';

  return (
    <div className="tuner" aria-labelledby="tuner-heading">
      <div className="string-rail" role="group" aria-label="Instrument strings">
        {instrumentTuning.map(note => (
          <span
            key={note.stringNum}
            className={`string-indicator ${detectedNote?.targetNote?.stringNum === note.stringNum ? 'active' : ''}`}
            aria-current={detectedNote?.targetNote?.stringNum === note.stringNum}
          >
            {note.name.slice(0, -1)}
          </span>
        ))}
      </div>

      <div className="meter-container">
        <div className="meter-bg"></div>
        <div
          className="meter-needle"
          style={{ transform: `rotate(${rotation}deg)`, backgroundColor: displayColor }}
          aria-hidden="true"
        ></div>
      </div>
      
      <div className="note-display">
        <div id="tuner-heading" className="note-name" style={{ color: displayColor }}>
          {isActive ? noteName : '...'}
        </div>
        <div className="tuning-status" style={{ color: displayColor }}>
          {isActive && detectedNote ? statusInfo.text : 'Start to tune'}
        </div>
        <div className="note-details" aria-label={`Deviation: ${cents.toFixed(1)} cents`}>
          {isActive && detectedNote ? `${cents.toFixed(1)} cents` : ''}
        </div>
      </div>
    </div>
  );
};
