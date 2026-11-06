import { useEffect, useRef } from "react";

import { ECOMER_MAP } from "../../data/ecomerMap";

const REVEAL_SECONDS = 1.7;
const COLS = ECOMER_MAP[0].length;
const ROWS = ECOMER_MAP.length;

type Grade = "A" | "C" | "D" | "E";
const isGrade = (kind: string): kind is Grade => "ACDE".includes(kind);

/** Draws only while something changes, so an idle map costs nothing. */
const EcomerMap = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, lens: 0, targetLens: 0 };

    let dots: { x: number; y: number; kind: string; delay: number }[] = [];
    let width = 0;
    let height = 0;
    let cell = 0;
    let frame = 0;
    let visible = false;
    let revealStart = reducedMotion ? -Infinity : Infinity;
    let palette = { text: "", A: "", C: "", D: "", E: "" };

    const readPalette = () => {
      const style = getComputedStyle(canvas);
      palette = {
        text: style.getPropertyValue("--text-color"),
        A: style.getPropertyValue("--grade-a"),
        C: style.getPropertyValue("--grade-c"),
        D: style.getPropertyValue("--grade-d"),
        E: style.getPropertyValue("--grade-e"),
      };
    };

    const layout = () => {
      const pixelRatio = Math.min(2, window.devicePixelRatio);
      ({ width, height } = canvas.getBoundingClientRect());
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      cell = Math.max(width / COLS, height / ROWS);
      const offsetX = (width - COLS * cell) / 2;
      const offsetY = (height - ROWS * cell) / 2;

      dots = ECOMER_MAP.flatMap((row, rowIndex) =>
        Array.from(row, (kind, colIndex) => {
          const x = offsetX + (colIndex + 0.5) * cell;
          const y = offsetY + (rowIndex + 0.5) * cell;
          const jitter = ((colIndex * 12.9898 + rowIndex * 78.233) % 1) * 0.14;
          return { x, y, kind, delay: (x / width) * 0.75 + (y / height) * 0.15 + jitter };
        }),
      ).filter(({ x, y }) => x > -cell && x < width + cell && y > -cell && y < height + cell);
    };

    const circle = (x: number, y: number, radius: number, color: string, alpha: number) => {
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const draw = (now: number) => {
      pointer.x += (pointer.targetX - pointer.x) * 0.2;
      pointer.y += (pointer.targetY - pointer.y) * 0.2;
      pointer.lens += (pointer.targetLens - pointer.lens) * 0.14;

      const elapsed = (now - revealStart) / 1000;
      const pointerSettling =
        Math.abs(pointer.targetLens - pointer.lens) > 0.005 ||
        (pointer.lens > 0.01 &&
          Math.hypot(pointer.targetX - pointer.x, pointer.targetY - pointer.y) > 0.4);
      const revealing = revealStart !== Infinity && elapsed < REVEAL_SECONDS;

      ctx.clearRect(0, 0, width, height);
      const spread = 2 * (cell * 4.2) ** 2;

      for (const { x, y, kind, delay } of dots) {
        const distance = (x - pointer.x) ** 2 + (y - pointer.y) ** 2;
        const lens = pointer.lens * Math.exp(-distance / spread);

        if (!isGrade(kind)) {
          const isSea = kind === "s";
          const radius = (isSea ? 0.2 : 0.15) * cell * (1 + lens * 0.9);
          circle(x, y, radius, palette.text, (isSea ? 0.17 : 0.075) + lens * 0.22);
          continue;
        }

        const local = Math.min(1, Math.max(0, (elapsed - delay) / 0.42));
        const progress = 1 - (1 - local) ** 3;
        const radius = 0.31 * cell * (1 + lens * 0.75 + Math.sin(Math.PI * progress) * 0.55);

        if (progress < 1) circle(x, y, radius, palette.text, (0.3 + lens * 0.25) * (1 - progress));
        if (progress > 0) circle(x, y, radius, palette[kind], progress);
      }
      ctx.globalAlpha = 1;

      frame = visible && (revealing || pointerSettling) ? requestAnimationFrame(draw) : 0;
    };

    const requestDraw = () => {
      frame ||= requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(() => {
      layout();
      requestDraw();
    });
    resizeObserver.observe(canvas);

    const viewObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && revealStart === Infinity) revealStart = performance.now();
        requestDraw();
      },
      { threshold: 0.35 },
    );
    viewObserver.observe(canvas);

    const themeObserver = new MutationObserver(() => {
      readPalette();
      requestDraw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion) return;
      pointer.targetX = event.offsetX;
      pointer.targetY = event.offsetY;
      if (pointer.lens < 0.01) {
        pointer.x = pointer.targetX;
        pointer.y = pointer.targetY;
      }
      pointer.targetLens = 1;
      requestDraw();
    };
    const onPointerLeave = () => {
      pointer.targetLens = 0;
      requestDraw();
    };

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("pointercancel", onPointerLeave);
    readPalette();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      viewObserver.disconnect();
      themeObserver.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("pointercancel", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Map of European waters where each fishing zone is coloured by its stock grade"
      style={{ display: "block", width: "100%", height: "100%", touchAction: "pan-y" }}
    />
  );
};

export default EcomerMap;
