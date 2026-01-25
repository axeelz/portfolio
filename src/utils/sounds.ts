import * as Tone from "tone";

let navClickSynth: Tone.Synth | null = null;
let buttonClickSynth: Tone.Synth | null = null;
let themeSwitchSynth: Tone.Synth | null = null;
let languageSwitchSynth: Tone.Synth | null = null;

const ensureAudioContext = async () => {
  if (Tone.getContext().state !== "running") {
    await Tone.start();
  }
};

const createSynth = (config: {
  type: "sine" | "triangle";
  attack: number;
  decay: number;
  sustain: number;
  release: number;
}): Tone.Synth => {
  return new Tone.Synth({
    oscillator: {
      type: config.type,
    },
    envelope: {
      attack: config.attack,
      decay: config.decay,
      sustain: config.sustain,
      release: config.release,
    },
  }).toDestination();
};

const initNavClickSynth = () => {
  if (!navClickSynth) {
    navClickSynth = createSynth({
      type: "sine",
      attack: 0.001,
      decay: 0.03,
      sustain: 0,
      release: 0.02,
    });
  }
  return navClickSynth;
};

const initButtonClickSynth = () => {
  if (!buttonClickSynth) {
    buttonClickSynth = createSynth({
      type: "sine",
      attack: 0.001,
      decay: 0.03,
      sustain: 0,
      release: 0.02,
    });
  }
  return buttonClickSynth;
};

const initThemeSwitchSynth = () => {
  if (!themeSwitchSynth) {
    themeSwitchSynth = createSynth({
      type: "sine",
      attack: 0.001,
      decay: 0.02,
      sustain: 0,
      release: 0.01,
    });
  }
  return themeSwitchSynth;
};

const initLanguageSwitchSynth = () => {
  if (!languageSwitchSynth) {
    languageSwitchSynth = createSynth({
      type: "sine",
      attack: 0.001,
      decay: 0.02,
      sustain: 0,
      release: 0.01,
    });
  }
  return languageSwitchSynth;
};

export const playNavClick = async () => {
  try {
    await ensureAudioContext();
    const synth = initNavClickSynth();
    synth.triggerAttackRelease("G5", "32n", undefined, 0.25);
  } catch (error) {
    console.warn("Failed to play nav click sound:", error);
  }
};

export const playButtonClick = async () => {
  try {
    await ensureAudioContext();
    const synth = initButtonClickSynth();
    synth.triggerAttackRelease("G5", "32n", undefined, 0.2);
  } catch (error) {
    console.warn("Failed to play button click sound:", error);
  }
};

export const playThemeSwitch = async () => {
  try {
    await ensureAudioContext();
    const synth = initThemeSwitchSynth();
    synth.triggerAttackRelease("G6", "64n", undefined, 0.15);
  } catch (error) {
    console.warn("Failed to play theme switch sound:", error);
  }
};

export const playLanguageSwitch = async () => {
  try {
    await ensureAudioContext();
    const synth = initLanguageSwitchSynth();
    synth.triggerAttackRelease("A6", "64n", undefined, 0.15);
  } catch (error) {
    console.warn("Failed to play language switch sound:", error);
  }
};
