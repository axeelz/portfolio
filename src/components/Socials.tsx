import { useQuery } from "@tanstack/react-query";
import { CopyIcon, GithubIcon, LinkedinIcon } from "lucide-react";
import { useState } from "react";
import { styled } from "styled-system/jsx";

import { copy } from "../data/copy";
import useMediaQuery from "../hooks/useMediaQuery";
import { GITHUB_USERNAME, fetchGithubData, QUERY_KEYS, type GithubUser } from "../utils/fetch";
import { GithubTooltip } from "./ui/GithubTooltip";
import { Tooltip } from "./ui/Tooltip";

const socialBase = {
  backgroundColor: "var(--section-background-color)",
  color: "var(--text-color)",
  padding: "12px 20px",
  borderRadius: "var(--radius-lg)",
  fontFamily: "inherit",
  fontSize: "inherit",
  fontWeight: 500,
  border: "none",
  cursor: "pointer",
  textDecoration: "none",
  "@media (hover: hover)": {
    _hover: { backgroundColor: "var(--card-background-color)" },
  },
  "@media (hover: none)": {
    _active: { backgroundColor: "var(--card-background-color)" },
  },
} as const;

const SocialsContainer = styled("div", {
  base: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    flexWrap: "wrap",
    marginTop: "2rem",
  },
});

const SocialButton = styled("button", {
  base: socialBase,
});

const SocialLink = styled("a", {
  base: socialBase,
});

const iconLayout = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
} as const;

const SocialButtonWithIcon = styled(SocialButton, {
  base: iconLayout,
});

const SocialLinkWithIcon = styled(SocialLink, {
  base: iconLayout,
  variants: {
    social: {
      linkedin: {
        _hover: { "& svg": { color: "var(--linkedin-color)" } },
      },
      github: {
        _hover: { "& svg": { color: "var(--github-color)" } },
      },
    },
  },
});

const Socials = () => {
  const [copied, setCopied] = useState(false);
  const copyText = copied ? `${copy.contact.copied} 🎉` : copy.contact.copyEmail;

  const hasHover = useMediaQuery("(hover: hover)", true);

  const { data: githubData } = useQuery<GithubUser>({
    queryKey: [QUERY_KEYS.githubUser, GITHUB_USERNAME],
    queryFn: () => fetchGithubData(GITHUB_USERNAME),
    retry: false,
    staleTime: 3_600_000,
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("axelzareb@gmail.com");
    } catch (error) {
      console.error("Failed to copy text:", error);
      return;
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SocialsContainer>
      <Tooltip
        key={hasHover ? "copy-hover-tooltip" : "copy-touch-tooltip"}
        content={copyText}
        side="top"
        {...(!hasHover && { open: copied, forceAnimation: true })}
      >
        <SocialButtonWithIcon onClick={handleCopy}>
          <CopyIcon /> axelzareb&#64;gmail&#46;com
        </SocialButtonWithIcon>
      </Tooltip>
      <SocialLinkWithIcon
        href="https://www.linkedin.com/in/axelzareb/"
        target="_blank"
        social="linkedin"
      >
        <LinkedinIcon />
        LinkedIn
      </SocialLinkWithIcon>
      <Tooltip link content={<GithubTooltip user={githubData ?? null} />} side="top">
        <SocialLinkWithIcon
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          social="github"
        >
          <GithubIcon />
          GitHub
        </SocialLinkWithIcon>
      </Tooltip>
    </SocialsContainer>
  );
};

export default Socials;
