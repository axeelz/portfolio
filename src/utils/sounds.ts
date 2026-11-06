const G5 = 783.99;
const G6 = 1567.98;
const ATTACK = 0.001;

let context: AudioContext | undefined;

const playTone = async (frequency: number, decay: number, volume: number) => {
  try {
    context ??= new AudioContext();
    if (context.state !== "running") await context.resume();

    const start = context.currentTime;
    const end = start + ATTACK + decay;
    const gain = new GainNode(context, { gain: 0 });
    gain.gain.linearRampToValueAtTime(volume, start + ATTACK);
    gain.gain.exponentialRampToValueAtTime(0.0001, end);

    const oscillator = new OscillatorNode(context, { frequency });
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(start);
    oscillator.stop(end);
  } catch (error) {
    console.warn("Failed to play sound:", error);
  }
};

export const playNavClick = () => playTone(G5, 0.03, 0.25);
export const playButtonClick = () => playTone(G5, 0.03, 0.2);
export const playThemeSwitch = () => playTone(G6, 0.02, 0.15);
