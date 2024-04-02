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
  font-weight: 500;
  border: none;

  /* As link */
  text-decoration: none;

  &:hover {
    background-color: var(--card-background-color);
    cursor: pointer;
  }
`;

const SocialButtonWithIcon = styled(SocialButton)<{ social?: "linkedin" | "github" }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover svg {
    color: ${(props) => `var(--${props.social}-color)`};
  }
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-weight: 500;
  text-align: center;
  margin-top: -1rem;
  margin-bottom: 2rem;
`;

const GithubInfo = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  & img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
`;

const Contact = () => {
  const { t } = useTranslation();

  const [copied, setCopied] = useState<boolean>(false);
  const copyText = copied ? "Copié 🎉" : "Copier l'adresse mail";

  const [githubData, setGithubData] = useState<any>(null);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);

  useEffect(() => {
    // Get my GitHub data to display in the tooltip
    fetch("https://api.github.com/users/axeelz")
      .then((res) => res.json())
      .then((data) => setGithubData(data));
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("axelzareb@gmail.com");
    setCopied(true);
  };

  return (
    <>
      <SectionTitle>{t("contact.title")}</SectionTitle>
      <Subtitle>
        {t("contact.currently")}{" "}
        <strong>
          {new Date().toLocaleString([], {
            timeZone: "Europe/Paris",
            hour: "numeric",
            minute: "numeric",
          })}
        </strong>{" "}
        {t("contact.forMe")} :)
      </Subtitle>
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
        <Tippy
          content={
            <GithubInfo>
              {(githubData?.avatar_url && (
                <>
                  <img src={githubData.avatar_url} alt="Avatar" />
                  <div>
                    <strong>{githubData.name}</strong>
                  </div>
                </>
              )) || <span>axeelz</span>}
            </GithubInfo>
          }
          placement="top"
          hideOnClick={false}
          animation="scale-subtle">
          <SocialButtonWithIcon as="a" href="https://github.com/axeelz" target="_blank" social="github">
            <BsGithub />
            GitHub
          </SocialButtonWithIcon>
        </Tippy>
      </SocialsContainer>
    </>
  );
};

export default Contact;
