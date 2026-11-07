import { useEffect, useRef, type RefObject } from "react";
import { styled } from "styled-system/jsx";

import { skyMoment } from "../utils/sun";

const PIXEL_SIZE = 4;
const TWINKLE_MS = 340;
const MINUTE_MS = 60_000;
const DENSITY = 0.03;
const TOP_ROW = 13;
const CLOUD_TICKS_PER_PIXEL = 8;
const CLOUD_SCALE = 2;
const CLOUD_MARGIN = 22 * CLOUD_SCALE;
const COLUMNS_PER_CLOUD = 80;

const CLOUD_SPRITES = [
  [
    ".....####........",
    "...########.###..",
    "..##############.",
    "#################",
    ".###############.",
  ],
  ["...###......", ".########...", "############", ".##########."],
  [
    "........####..........",
    "...####.#######.......",
    "..#################...",
    ".####################.",
    "######################",
    ".####################.",
  ],
];

const CLOUD_COLORS = {
  dawn: "#ecc6d3",
  day: "#d9dae9",
  dusk: "#edd0b3",
  night: "#c9cbe6",
};

/** Bright and dim colours of the stars. */
const STAR_COLORS = {
  dawn: ["#ffb3c7", "#a85f7c"],
  day: ["#c9cde6", "#4a4e6e"],
  dusk: ["#ffb870", "#b0763f"],
  night: ["#ffffff", "#454b78"],
};

const Canvas = styled("canvas", {
  base: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
    width: "100%",
    imageRendering: "pixelated",
    pointerEvents: "none",
    "@media (prefers-reduced-motion: no-preference)": {
      animation: "fadeIn 1100ms ease-out both",
    },
  },
});

const hash = (x: number, y: number) => {
  const value = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return value - Math.floor(value);
};

const placeClouds = (columns: number, rows: number) =>
  Array.from({ length: Math.ceil(columns / COLUMNS_PER_CLOUD) }, (_, index) => ({
    x: Math.floor((index + hash(index, 1)) * COLUMNS_PER_CLOUD),
    y: TOP_ROW + Math.floor(hash(index, 2) * Math.max(1, rows - TOP_ROW - 6 * CLOUD_SCALE)),
    sprite: CLOUD_SPRITES[index % CLOUD_SPRITES.length],
  }));

const placeStars = (columns: number, rows: number) => {
  const stars = [];
  for (let y = TOP_ROW; y < rows - 2; y += 2) {
    for (let x = 1; x < columns - 1; x += 2) {
      const seed = hash(x * 1.3, y * 2.1);
      if (seed < DENSITY * (1 - y / (rows * 1.25))) {
        stars.push({
          x,
          y,
          isBig: hash(x, y) > 0.9,
          phase: hash(y, x) * Math.PI * 2,
          twinkles: hash(x + 3, y) > 0.7,
        });
      }
    }
  }
  return stars;
};

/** A pixel sky above `until`: clouds in light mode, stars in dark mode, tinted by the time in Paris. */
const Sky = ({ until }: { until: RefObject<HTMLElement | null> }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const hero = canvas?.parentElement;
    if (!canvas || !context || !hero) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stars: ReturnType<typeof placeStars> = [];
    let clouds: ReturnType<typeof placeClouds> = [];
    let tick = 0;

    const paintStars = ([bright, dim]: string[]) => {
      for (const { x, y, isBig, phase, twinkles } of stars) {
        if (isBig) {
          context.fillStyle = dim;
          context.fillRect(x - 1, y, 3, 1);
          context.fillRect(x, y - 1, 1, 3);
        }

        const isLit = !twinkles || Math.sin(tick * 0.9 + phase) > -0.2;
        context.fillStyle = isLit ? bright : dim;
        context.fillRect(x, y, 1, 1);
      }
    };

    const paintClouds = (color: string) => {
      const drift = Math.floor(tick / CLOUD_TICKS_PER_PIXEL);
      const span = canvas.width + CLOUD_MARGIN;
      context.fillStyle = color;

      for (const { x, y, sprite } of clouds) {
        const left = ((x + drift) % span) - CLOUD_MARGIN;
        sprite.forEach((row, rowIndex) => {
          Array.from(row).forEach((pixel, column) => {
            if (pixel !== "#") return;
            context.fillRect(
              left + column * CLOUD_SCALE,
              y + rowIndex * CLOUD_SCALE,
              CLOUD_SCALE,
              CLOUD_SCALE,
            );
          });
        });
      }
    };

    const paint = () => {
      const moment = skyMoment(new Date());

      context.clearRect(0, 0, canvas.width, canvas.height);
      if (document.documentElement.classList.contains("dark")) paintStars(STAR_COLORS[moment]);
      else paintClouds(CLOUD_COLORS[moment]);
    };

    const layout = () => {
      canvas.width = Math.ceil(hero.offsetWidth / PIXEL_SIZE);
      canvas.height = Math.ceil(((until.current?.offsetTop ?? 0) - 8) / PIXEL_SIZE);
      canvas.style.height = `${canvas.height * PIXEL_SIZE}px`;
      stars = placeStars(canvas.width, canvas.height);
      clouds = placeClouds(canvas.width, canvas.height);
      paint();
    };

    const resizeObserver = new ResizeObserver(layout);
    resizeObserver.observe(hero);
    // A font swap can rewrap the bio and move it up without resizing the hero.
    if (until.current) resizeObserver.observe(until.current);

    const themeObserver = new MutationObserver(paint);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const interval = window.setInterval(
      () => {
        if (document.hidden || window.scrollY >= hero.offsetHeight) return;
        if (!reducedMotion) tick += 1;
        paint();
      },
      reducedMotion ? MINUTE_MS : TWINKLE_MS,
    );

    return () => {
      resizeObserver.disconnect();
      themeObserver.disconnect();
      window.clearInterval(interval);
    };
  }, [until]);

  return <Canvas ref={canvasRef} aria-hidden />;
};

export default Sky;
