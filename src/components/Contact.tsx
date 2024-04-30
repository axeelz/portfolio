import styled from "styled-components";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { SectionTitle } from "../styled/shared";
import { FaCopy } from "react-icons/fa";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale-subtle.css";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IoLocationSharp } from "react-icons/io5";

/* Socials */

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

/* Location widget */

const LocationContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  font-weight: 500;
  margin-bottom: 2rem;
  padding: 1rem 2rem;
  border-radius: var(--card-border-radius);
  background-color: var(--card-background-color);
  border: 2px solid var(--border-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);

  @media (max-width: 768px) {
    gap: 1rem;
    padding: 1rem;
  }
`;

const IconContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 1.5rem;
  }
`;

const LocalTimeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CityName = styled.span`
  font-weight: 700;
`;

const Description = styled.div`
  color: var(--text-secondary);
`;

const Time = styled.span`
  font-weight: 600;
`;

/* GitHub tooltip */

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
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);

  // Get my GitHub data to display in the tooltip
  useEffect(() => {
    fetch("https://api.github.com/users/axeelz")
      .then((res) => res.json())
      .then((data) => setGithubData(data));
  }, []);

  // Update time in real-time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("axelzareb@gmail.com");
    setCopied(true);
  };

  return (
    <>
      <SectionTitle>{t("contact.title")}</SectionTitle>
      <LocationContainer>
        <IconContainer>
          <IoLocationSharp />
        </IconContainer>
        <LocalTimeContainer>
          <CityName>Paris, France</CityName>
          <Description>
            {t("contact.currently")}{" "}
            <Time>
              {currentTime.toLocaleString([], {
                timeZone: "Europe/Paris",
                hour: "numeric",
                minute: "numeric",
              })}
            </Time>{" "}
            {t("contact.forMe")}
          </Description>
        </LocalTimeContainer>
      </LocationContainer>
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
