import styled, { css } from "styled-components";

import { showAfter } from "./animations";

export const squircle = (size: "sm" | "md" | "lg") => css`
  border-radius: var(--radius-${size});
  @supports (corner-shape: squircle) {
    corner-shape: squircle;
    border-radius: var(--squircle-${size});
  }
`;

export const SectionTitle = styled.h2`
  font-family: var(--font-body);
  text-align: center;
  font-size: calc(1.325rem + 0.9vw);
  margin: 1rem 0 2rem 0;
`;

export const Button = styled.button`
  font-family: var(--font-body);
  line-height: 1;
  border: none;
  ${squircle("md")}
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  user-select: none;
  
  /* As a link */
  text-decoration: none;
  text-align: center;
  display: inline-block;
  
  &:hover {
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(1.01);
    transition: transform 0.1s ease-in-out;
  }
`;

export const IconBtn = styled.button`
  padding: 8px;
  background-color: transparent;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  transition:
    transform 0.2s ease-in-out,
    font-size 0.2s ease-in-out,
    opacity 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  font-size: 2rem;
  opacity: 0.65;

  @media (hover: hover) {
    &:hover {
      opacity: 1;
    }
  }

  &:active {
    transform: scale(0.9);
    transition: transform 0.1s ease-in-out;
  }
`;

export const WidgetContainer = styled.div`
  font-weight: 500;
  ${squircle("lg")}
  background-color: var(--card-background-color);
  border: 2px solid var(--border-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
`;

export const BodyContainer = styled.div`
  font-weight: 500;
  font-size: 1.15rem;
  animation: ${showAfter} 1s ease-in-out;

  border: var(--border-color) 2px solid;
  padding: 1rem;
  margin-bottom: 1rem;
  ${squircle("lg")}

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  & > span {
    color: var(--text-secondary);
    font-weight: 600;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    display: block;

    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
  }

  & a {
    text-decoration: underline;
    text-underline-offset: 4px;
    color: var(--text-color);
    margin: 0 0.1rem;
    padding: 5px;
    border-radius: var(--radius-sm);
    transition: all 0.2s;

    @media (min-width: 768px) {
      &:hover {
        background-color: var(--card-background-color);
        text-decoration: none;
      }
    }

    @media (max-width: 768px) {
      padding: 0;
    }
  }
`;
