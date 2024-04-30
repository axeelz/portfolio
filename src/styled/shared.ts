import styled from "styled-components";

export const SectionTitle = styled.h2`
  font-family: var(--font-title);
  text-align: center;
  font-size: calc(1.325rem + 0.9vw);
  margin: 2rem 0;
`;

export const Button = styled.button`
  font-family: var(--font-body);
  line-height: 1;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
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
  transition: transform 0.2s ease-in-out, font-size 0.2s ease-in-out, opacity 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-size: 2rem;
  opacity: 0.65;

  &:hover {
    opacity: 1;
  }

  &:active {
    transform: scale(0.9);
    transition: transform 0.1s ease-in-out;
  }
`;
