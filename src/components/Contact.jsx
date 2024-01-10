import styled from "styled-components";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { SectionTitle } from "../styled/shared";
import { Divider } from "../styled/shared";
import { FaCopy } from "react-icons/fa";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale-subtle.css";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const SocialsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const SocialButton = styled.button`
  background-color: var(--section-background-color);
  color: var(--text-color);
  padding: 12px 20px;
  border-radius: 20px;
  font-family: inherit;
  font-size: inherit;
  border: none;

  /* As link */
  text-decoration: none;

  &:hover {
    background-color: var(--card-background-color);
    cursor: pointer;
  }
`;

const SocialButtonWithIcon = styled(SocialButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover svg {
    color: ${(props) => `var(--${props.social}-color)`};
  }
`;

const Contact = () => {
  const { t } = useTranslation();

  const [copied, setCopied] = useState(false);
  const copyText = copied ? "Copié 🎉" : "Copier l'adresse mail";

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);

  const handleCopy = () => {
    navigator.clipboard.writeText("axelzareb@gmail.com");
    setCopied(true);
  };

  return (
    <>
      <SectionTitle>{t("contact.title")}</SectionTitle>
      <Divider />
      <SocialsContainer>
        <Tippy content={copyText} placement="top" hideOnClick={false} animation="scale-subtle">
          <SocialButtonWithIcon onClick={handleCopy}>
            <FaCopy /> axelzareb&#64;gmail&#46;com
          </SocialButtonWithIcon>
        </Tippy>
        <SocialButtonWithIcon as="a" href="https://www.linkedin.com/in/axelzareb/" target="_blank" social="linkedin">
          <BsLinkedin />
          LinkedIn
        </SocialButtonWithIcon>
        <SocialButtonWithIcon as="a" href="https://github.com/axeelz" target="_blank" social="github">
          <BsGithub />
          GitHub
        </SocialButtonWithIcon>
      </SocialsContainer>
    </>
  );
};

export default Contact;
