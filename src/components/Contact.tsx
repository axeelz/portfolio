import styled from "styled-components";
import { SectionTitle } from "../styled/shared";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import MusicWidget from "./MusicWidget";
import LocationWidget from "./LocationWidget";
import { Tooltip } from "./Tooltip";
import { GithubTooltip } from "./GithubTooltip";
import { type GithubUser, GITHUB_USERNAME, useHasHover, fetchGithubData } from "../utils";
import { CopyIcon, GithubIcon, LinkedinIcon } from "lucide-react";

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
  cursor: pointer;

  /* As link */
  text-decoration: none;

  @media (hover: hover) {
    &:hover {
      background-color: var(--card-background-color);
    }
  }

  @media (hover: none) {
    &:active {
      background-color: var(--card-background-color);
    }
  }
`;

const SocialButtonWithIcon = styled(SocialButton)<{ $social?: "linkedin" | "github" }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover svg {
    color: ${(props) => `var(--${props.$social}-color)`};
  }
`;

const Contact = () => {
  const { t } = useTranslation();

  const [copied, setCopied] = useState<boolean>(false);
  const copyText = copied ? `${t("contact.copied")} 🎉` : t("contact.copy");

  const [githubData, setGithubData] = useState<GithubUser | null>(null);

  const hasHover = useHasHover();

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);

  useEffect(() => {
    fetchGithubData()
      .then((data: GithubUser) => setGithubData(data))
      .catch(() => console.warn("Error fetching Github data, fallback to username"));
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("axelzareb@gmail.com");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
    setCopied(true);
  };

  return (
    <>
      <SectionTitle>{t("contact.title")}</SectionTitle>
      <LocationWidget />
      <MusicWidget />
      <SocialsContainer>
        <Tooltip content={copyText} side="top" {...(!hasHover && { open: copied, forceAnimation: true })}>
          <SocialButtonWithIcon onClick={handleCopy}>
            <CopyIcon /> axelzareb&#64;gmail&#46;com
          </SocialButtonWithIcon>
        </Tooltip>
        <SocialButtonWithIcon as="a" href="https://www.linkedin.com/in/axelzareb/" target="_blank" $social="linkedin">
          <LinkedinIcon />
          LinkedIn
        </SocialButtonWithIcon>
        <Tooltip link content={<GithubTooltip user={githubData} />} side="top">
          <SocialButtonWithIcon as="a" href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" $social="github">
            <GithubIcon />
            GitHub
          </SocialButtonWithIcon>
        </Tooltip>
      </SocialsContainer>
    </>
  );
};

export default Contact;
