import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { slideInBlurredLeft, slideOutBlurredLeft } from "../styled/animations";
import useSound from "use-sound";

const NavContainer = styled.nav`
  position: absolute;
  top: 50px;
  left: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.1rem;
  background-color: var(--card-background-color);
  padding: 1rem;
  border-radius: var(--card-border-radius);
  line-height: 2;
  z-index: 100;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  animation: ${slideInBlurredLeft} 0.6s cubic-bezier(0.23, 1, 0.32, 1) both;

  & > * {
    z-index: 100;
  }

  &.exiting {
    animation: ${slideOutBlurredLeft} 0.45s cubic-bezier(0.755, 0.05, 0.855, 0.06) both;
  }
`;

const ButtonItem = styled.button`
  width: 100%;
  text-align: left;
  color: var(--text-color);
  padding: 0.6rem;
  border-radius: 15px;
  border: none;
  font-size: inherit;
  background: inherit;
  font-family: var(--font-body);
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover,
  &:focus {
    background-color: var(--section-background-color);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const CollapsableNav = forwardRef<HTMLElement>((_, ref) => {
  const { t } = useTranslation();
  const [playSound] = useSound("/sounds/pop.mp3", { volume: 0.2 });

  return (
    <NavContainer ref={ref}>
      {["presentation", "projects", "contact"].map((item) => (
        <ButtonItem
          key={item}
          onClick={() => {
            playSound();
            document.getElementById(item)?.scrollIntoView({ behavior: "smooth" });
          }}>
          {t(`navbar.${item}`)}
        </ButtonItem>
      ))}
    </NavContainer>
  );
});

export default CollapsableNav;
