import { useRef, useState, type DragEvent, type PointerEvent } from "react";

import usePlayOnceInView from "../../hooks/usePlayOnceInView";

const DRAG_THRESHOLD = 6;
const FLICK_DISTANCE = 90;
const FLICK_SPEED = 0.45;
const FLICK_MAX_AGE_MS = 100;
const EXIT_MS = 170;

const clearDrag = (card: HTMLElement) => {
  card.style.translate = "";
  card.style.rotate = "";
};

/** A stack of cards where the top one can be dragged or flicked to the back. */
export function usePile(count: number) {
  const [position, setPosition] = useState(0);
  const top = position % count;
  const stackRef = usePlayOnceInView<HTMLDivElement>(0.6);
  const leaving = useRef(false);
  const gesture = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    lastX: number;
    lastTime: number;
    speed: number;
    dragging: boolean;
  } | null>(null);

  const next = (direction = 1) => {
    const card = stackRef.current?.children[top];
    if (!(card instanceof HTMLElement) || leaving.current) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      clearDrag(card);
      setPosition((current) => current + 1);
      return;
    }

    leaving.current = true;
    card.style.translate = `${direction * card.offsetWidth * 0.92}px -14px`;
    card.style.rotate = `${direction * 11}deg`;

    window.setTimeout(() => {
      clearDrag(card);
      setPosition((current) => current + 1);
      leaving.current = false;
    }, EXIT_MS);
  };

  const onPointerDown = ({ pointerId, clientX, clientY, timeStamp }: PointerEvent<HTMLElement>) => {
    if (gesture.current?.dragging) return;
    gesture.current = {
      pointerId,
      startX: clientX,
      startY: clientY,
      lastX: clientX,
      lastTime: timeStamp,
      speed: 0,
      dragging: false,
    };
  };

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    const current = gesture.current;
    if (current?.pointerId !== event.pointerId) return;

    // The button was released outside the card, before the drag captured the pointer.
    if (event.buttons === 0) {
      endGesture(event);
      return;
    }

    const card = event.currentTarget;
    const deltaX = event.clientX - current.startX;

    if (!current.dragging) {
      if (Math.abs(deltaX) < DRAG_THRESHOLD) return;
      current.dragging = true;
      card.setPointerCapture(event.pointerId);
      card.dataset.dragging = "";
    }

    current.speed =
      (event.clientX - current.lastX) / Math.max(1, event.timeStamp - current.lastTime);
    current.lastX = event.clientX;
    current.lastTime = event.timeStamp;

    card.style.translate = `${deltaX}px ${(event.clientY - current.startY) * 0.35}px`;
    card.style.rotate = `${deltaX * 0.035}deg`;
  };

  const endGesture = (event: PointerEvent<HTMLElement>) => {
    const current = gesture.current;
    if (current?.pointerId !== event.pointerId) return;
    gesture.current = null;
    if (!current.dragging) return;

    const card = event.currentTarget;
    delete card.dataset.dragging;

    const deltaX = event.clientX - current.startX;
    const isMoving = event.timeStamp - current.lastTime < FLICK_MAX_AGE_MS;
    const flicked =
      Math.abs(deltaX) > FLICK_DISTANCE || (isMoving && Math.abs(current.speed) > FLICK_SPEED);

    if (event.type === "pointerup" && flicked) next(deltaX < 0 ? -1 : 1);
    else clearDrag(card);
  };

  return {
    top,
    next,
    stackRef,
    cardProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endGesture,
      onPointerCancel: endGesture,
      onDragStart: (event: DragEvent<HTMLElement>) => event.preventDefault(),
    },
  };
}
