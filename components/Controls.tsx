import React from 'react';
import type { Instrument } from '../types';

interface ControlsProps {
  isActive: boolean;
  onToggle: () => void;
  instruments: Instrument[];
  selectedInstrument: Instrument;
  onInstrumentChange: (name: string) => void;
}

export const Controls: React.FC<ControlsProps> = ({
  isActive,
  onToggle,
  instruments,
  selectedInstrument,
  onInstrumentChange,
}) => {
  return (
    <div className="controls">
      <button 
        onClick={onToggle} 
        className={`control-button ${isActive ? 'stop' : ''}`}
        aria-pressed={isActive}
      >
        {isActive ? 'Stop Tuner' : 'Start Tuner'}
      </button>
      <select
        className="instrument-select"
        value={selectedInstrument.name}
        onChange={(e) => onInstrumentChange(e.target.value)}
        disabled={isActive}
        aria-label="Select Instrument"
      >
        {instruments.map((inst) => (
          <option key={inst.name} value={inst.name}>
            {inst.name}
          </option>
        ))}
      </select>
    </div>
  );
};
