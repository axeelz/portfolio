import styled from "styled-components";
import { IoLanguage } from "react-icons/io5";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import ToggleDarkMode from "./ToggleDarkMode";
import { useTranslation } from "react-i18next";
import useKeyPress from "../hooks/useKeyPress";
import CollapsableNav from "./CollapsableNav";
import { useState, useRef, Dispatch, SetStateAction } from "react";
import useSound from "use-sound";
import { fadeIn } from "../styled/animations";
import { IconBtn } from "../styled/shared";
import { Tooltip } from "./Tooltip";

const NavbarContainer = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  height: 5rem;
  top: 0;
  z-index: 100;
  background-color: var(--navbar-color);
  padding: 1rem;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  margin-bottom: 1rem;
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
  border-radius: 4px;
  padding: 0.1em 0.5em;
  margin: 0 0.2em;
  box-shadow: 0 1px 0px rgba(0, 0, 0, 0.2), 0 0 0 2px #fff inset;
  background-color: #f7f7f7;
  color: black;
  display: inline-block;

  @media (hover: none) {
    display: none;
  }
`;

interface NavbarProps {
  isDark: boolean;
  setIsDark: Dispatch<SetStateAction<boolean>>;
}

const Navbar = ({ isDark, setIsDark }: NavbarProps) => {
  const { t, i18n } = useTranslation();

  const switchLanguage = () => {
    i18n.changeLanguage(i18n.languages[0] === "fr" ? "en" : "fr");
  };

  useKeyPress("l", () => {
    switchLanguage();
  });

  const [collapsableOpen, setCollapsableOpen] = useState<boolean>(false);
  const collapsableRef = useRef<HTMLElement | null>(null);
  const [playOpen] = useSound("/sounds/whoosh-open.mp3", { volume: 0.1 });
  const [playClose] = useSound("/sounds/whoosh-close.mp3", { volume: 0.1 });

  const handleCollapsableClose = () => {
    if (collapsableOpen) {
      if (collapsableRef.current) collapsableRef.current.classList.add("exiting");
      setTimeout(() => {
        playClose();
      }, 100);
      setTimeout(() => {
        if (collapsableRef.current) {
          collapsableRef.current.classList.remove("exiting");
        } else {
          console.warn("Chill, stop spamming the button!");
        }
        setCollapsableOpen(false);
      }, 500);
    } else {
      setCollapsableOpen(true);
      playOpen();
    }
  };

  return (
    <>
      <NavbarContainer>
        <ButtonsContainer>
          <IconBtn aria-label="Collapsable menu" onClick={handleCollapsableClose}>
            {collapsableOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </IconBtn>
          {collapsableOpen && <CollapsableNav ref={collapsableRef} />}
        </ButtonsContainer>
        <ButtonsContainer>
          <Tooltip
            content={
              <span>
                {`${t("navbar.switchTo")} ${i18n.languages[0] === "fr" ? "English" : "français"}`} <Kbd>L</Kbd>
              </span>
            }>
            <IconBtn aria-label={t("navbar.switchLang") || ""} onClick={switchLanguage}>
              <IoLanguage />
            </IconBtn>
          </Tooltip>
          <Tooltip
            content={
              <span>
                {t("navbar.switchTheme")} <Kbd>M</Kbd>
              </span>
            }>
            <ToggleDarkMode isDark={isDark} setIsDark={setIsDark} />
          </Tooltip>
        </ButtonsContainer>
      </NavbarContainer>
    </>
  );
};

export default Navbar;
