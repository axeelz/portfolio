import styled from "styled-components";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "./Tooltip";
import { GithubTooltip } from "./GithubTooltip";
import { GITHUB_USERNAME, useHasHover } from "../utils";
import { CopyIcon, ExternalLinkIcon, GithubIcon, LinkedinIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchGithubData, QUERY_KEYS, type GithubUser } from "../utils/fetch";

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

const Socials = () => {
  const { t } = useTranslation();

  const [copied, setCopied] = useState(false);
  const copyText = copied ? `${t("contact.copied")} 🎉` : t("contact.copy");

  const hasHover = useHasHover();

  const { data: githubData } = useQuery<GithubUser>({
    queryKey: [QUERY_KEYS.githubUser, GITHUB_USERNAME],
    queryFn: () => fetchGithubData(GITHUB_USERNAME),
    retry: false,
  });

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("axelzareb@gmail.com");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
    setCopied(true);
  };

  return (
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
      <Tooltip link content={<GithubTooltip user={githubData ?? null} />} side="top">
        <SocialButtonWithIcon as="a" href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" $social="github">
          <GithubIcon />
          GitHub
        </SocialButtonWithIcon>
      </Tooltip>
      <SocialButtonWithIcon as="a" href="https://txt.axlz.me/" target="_blank">
        <ExternalLinkIcon />
        txt.axlz.me
      </SocialButtonWithIcon>
    </SocialsContainer>
  );
};

export default Socials;
