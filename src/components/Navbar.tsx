import { LanguagesIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import useKeyPress from "../hooks/useKeyPress";
import { fadeIn } from "../styled/animations";
import { IconBtn } from "../styled/shared";
import { playLanguageSwitch } from "../utils/sounds";
import ToggleDarkMode from "./ToggleDarkMode";
import { Tooltip } from "./Tooltip";

const NavbarContainer = styled.nav`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: var(--navbar-color);
  padding: 1rem;

  & .lucide {
    width: 24px;
    height: 24px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 100%;
  opacity: 0;
  animation: ${fadeIn} 0.3s ease-in-out 0.2s forwards;
`;

const Kbd = styled.kbd`
  font-family: system-ui;
  border: 1px solid #ccc;
  border-radius: var(--radius-sm);
  padding: 0.1em 0.5em;
  margin: 0 0.2em;
  box-shadow:
    0 1px 0px rgba(0, 0, 0, 0.2),
    0 0 0 2px #fff inset;
  background-color: #f7f7f7;
  color: black;
  display: inline-block;

  @media (hover: none) {
    display: none;
  }
`;

const Navbar = () => {
  const { t, i18n } = useTranslation();

  const switchLanguage = () => {
    playLanguageSwitch();
    i18n.changeLanguage(i18n.languages[0] === "fr" ? "en" : "fr");
  };

  useKeyPress("l", () => {
    switchLanguage();
  });

  return (
    <NavbarContainer>
      <ButtonsContainer>
        <Tooltip
          content={
            <span>
              {`${t("navbar.switchTo")} ${i18n.languages[0] === "fr" ? "English" : "français"}`}{" "}
              <Kbd>L</Kbd>
            </span>
          }
        >
          <IconBtn aria-label={t("navbar.switchLang") || ""} onClick={switchLanguage}>
            <LanguagesIcon />
          </IconBtn>
        </Tooltip>
        <Tooltip
          content={
            <span>
              {t("navbar.switchTheme")} <Kbd>M</Kbd>
            </span>
          }
        >
          <ToggleDarkMode />
        </Tooltip>
      </ButtonsContainer>
    </NavbarContainer>
  );
};

export default Navbar;
