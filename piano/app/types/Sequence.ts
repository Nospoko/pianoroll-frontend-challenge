export type Sequence = {
  duration: number; // Duration of the note in seconds
  end: number; // Time at which the note should end (e.g., in seconds)
  pitch: number; // Time at which the note should start (e.g., in seconds)
  start: number; // Pitch of the note (e.g., musical note name or frequency)
  velocity: number; // Velocity or intensity of the note (typically a value between 0 and 1)
};
