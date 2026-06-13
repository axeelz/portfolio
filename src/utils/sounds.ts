import type * as Tone from "tone";

type ToneModule = typeof import("tone");
type SynthConfig = {
  type: "sine" | "triangle";
  attack: number;
  decay: number;
  sustain: number;
  release: number;
};

let tonePromise: Promise<ToneModule> | null = null;
const getTone = () => (tonePromise ??= import("tone"));

const clickConfig: SynthConfig = {
  type: "sine",
  attack: 0.001,
  decay: 0.03,
  sustain: 0,
  release: 0.02,
};

const configs = {
  navClick: clickConfig,
  buttonClick: clickConfig,
  themeSwitch: { type: "sine", attack: 0.001, decay: 0.02, sustain: 0, release: 0.01 },
} satisfies Record<string, SynthConfig>;

const synths: Partial<Record<keyof typeof configs, Tone.Synth>> = {};

const ensureAudioContext = async (tone: ToneModule) => {
  if (tone.getContext().state !== "running") await tone.start();
};

const getSynth = (tone: ToneModule, key: keyof typeof configs): Tone.Synth => {
  if (!synths[key]) {
    const c = configs[key];
    synths[key] = new tone.Synth({
      oscillator: { type: c.type },
      envelope: { attack: c.attack, decay: c.decay, sustain: c.sustain, release: c.release },
    }).toDestination();
  }
  return synths[key]!;
};

const playSound = async (
  key: keyof typeof configs,
  note: string,
  duration: string,
  velocity: number,
  errorMessage: string,
) => {
  try {
    const tone = await getTone();
    await ensureAudioContext(tone);
    getSynth(tone, key).triggerAttackRelease(note, duration, undefined, velocity);
  } catch (error) {
    console.warn(errorMessage, error);
  }
};

export const playNavClick = () =>
  playSound("navClick", "G5", "32n", 0.25, "Failed to play nav click sound:");

export const playButtonClick = async () => {
  await playSound("buttonClick", "G5", "32n", 0.2, "Failed to play button click sound:");
};

export const playThemeSwitch = async () => {
  await playSound("themeSwitch", "G6", "64n", 0.15, "Failed to play theme switch sound:");
};
