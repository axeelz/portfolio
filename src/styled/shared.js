import styled from "styled-components";

export const SectionTitle = styled.h2`
  font-family: var(--font-title);
  text-align: center;
  font-size: calc(1.325rem + 0.9vw);
  margin: 2rem 0;
`;

export const Divider = styled.hr`
  margin: 1rem auto 2rem auto;
  background-color: var(--text-color);
  opacity: 0.1;
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
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
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
