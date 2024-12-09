import { keyframes } from "styled-components";

// Section animations

export const fadeBgColor = keyframes`
  from {
    background-color: var(--background-color);
  }
  to {
    background-color: var(--section-background-color);
  }
`;

export const fadeUp = keyframes`
  from {
    opacity: 0.1;
    transform: translate3d(0, 100px, 0);
    filter: blur(4px);
  }
  to {
    opacity: 1;
    transform: translateZ(0);
    filter: blur(0);
  }
`;

// Presentation animations

export const trackingInExpand = keyframes`
  0% {
    letter-spacing: -0.5em;
    opacity: 0.1;
    filter: blur(4px);
  }
  40% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
    letter-spacing: -0.025em;
    filter: blur(0);
  }
`;

export const showAfter = keyframes`
  from {
    opacity: 0.1;
  }
  to {
    opacity: 1;
  }
`;

// Navbar animations

export const fadeIn = keyframes`
  from {
    opacity: 0.1;
    transform: translateY(-1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// CollapsableNav animations

export const slideInBlurredLeft = keyframes`
  from {
    -webkit-transform: translateX(-1000px) scaleX(2.5) scaleY(0.2);
    transform: translateX(-1000px) scaleX(2.5) scaleY(0.2);
    -webkit-transform-origin: 100% 50%;
    transform-origin: 100% 50%;
    -webkit-filter: blur(40px);
    filter: blur(40px);
    opacity: 0;
  }
  to {
    -webkit-transform: translateX(0) scaleY(1) scaleX(1);
    transform: translateX(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-filter: blur(0);
    filter: blur(0);
    opacity: 1;
  }
`;

export const slideOutBlurredLeft = keyframes`
  from {
    -webkit-transform: translateX(0) scaleY(1) scaleX(1);
    transform: translateX(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-filter: blur(0);
    filter: blur(0);
    opacity: 1;
  }
  to {
    -webkit-transform: translateX(-1000px) scaleX(2) scaleY(0.2);
    transform: translateX(-1000px) scaleX(2) scaleY(0.2);
    -webkit-transform-origin: 100% 50%;
    transform-origin: 100% 50%;
    -webkit-filter: blur(40px);
    filter: blur(40px);
    opacity: 0;
  }
`;

// MusicWidget animations

export const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

// Tooltip animations

export const scaleInSubtle = keyframes`
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

export const scaleOutSubtle = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0.8);
    opacity: 0;
  }
`;
