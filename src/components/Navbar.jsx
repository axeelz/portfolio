import styled from "styled-components";
import { IoLanguage } from "react-icons/io5";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale-subtle.css";
import ToggleDarkMode from "./ToggleDarkMode";
import { useTranslation } from "react-i18next";
import useKeyPress from "../hooks/useKeyPress";
import CollapsableNav from "./CollapsableNav";
import { useState, useRef } from "react";
import useSound from "use-sound";
import { fadeIn } from "../styled/animations";

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
  margin-bottom: 1rem;
`;

const IconBtn = styled.button`
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
    font-size: 1.75rem;
    transition: transform 0.1s ease-in-out;
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

const Navbar = ({ isDark, setIsDark }) => {
  const { t, i18n } = useTranslation();

  const switchLanguage = () => {
    i18n.changeLanguage(i18n.language === "fr" ? "en" : "fr");
  };

  useKeyPress("l", () => {
    switchLanguage();
  });

  const [collapsableOpen, setCollapsableOpen] = useState(false);
  const collapsableRef = useRef(null);
  const [playOpen] = useSound("/sounds/whoosh-open.mp3", { volume: 0.2 });
  const [playClose] = useSound("/sounds/whoosh-close.mp3", { volume: 0.1 });

  const handleCollapsableClose = () => {
    if (collapsableOpen) {
      collapsableRef.current.classList.add("exiting");
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
          <Tippy
            content={
              <span>
                {`${t("navbar.switchTo")} ${i18n.language === "fr" ? "English" : "français"}`} <Kbd>L</Kbd>
              </span>
            }
            animation="scale-subtle"
            placement="bottom"
            key={i18n.language}>
            <IconBtn aria-label={t("navbar.switchLang")} onClick={switchLanguage}>
              <IoLanguage />
            </IconBtn>
          </Tippy>
          <Tippy
            content={
              <span>
                {t("navbar.switchTheme")} <Kbd>M</Kbd>
              </span>
            }
            animation="scale-subtle"
            placement="bottom"
            key={isDark}>
            <ToggleDarkMode isDark={isDark} setIsDark={setIsDark} IconBtn={IconBtn} />
          </Tippy>
        </ButtonsContainer>
      </NavbarContainer>
    </>
  );
};

export default Navbar;
