import type { Note } from './types';

/**
 * Finds the closest note in a given tuning to a detected frequency.
 * @param frequency The frequency detected from the microphone.
 * @param tuning An array of Note objects representing the instrument's tuning.
 * @returns The closest Note object.
 */
export const findClosestNote = (frequency: number, tuning: Note[]): Note => {
  return tuning.reduce((prev, curr) => {
    return Math.abs(curr.frequency - frequency) < Math.abs(prev.frequency - frequency) ? curr : prev;
  });
};

/**
 * Calculates the difference between two frequencies in cents.
 * @param detectedFrequency The frequency detected from the microphone.
 * @param targetFrequency The target frequency of the closest note.
 * @returns The difference in cents.
 */
export const getCents = (detectedFrequency: number, targetFrequency: number): number => {
  return 1200 * Math.log2(detectedFrequency / targetFrequency);
};
