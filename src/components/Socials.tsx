import { useQuery } from "@tanstack/react-query";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { styled } from "styled-system/jsx";

import { copy } from "../data/copy";
import { GITHUB_USERNAME, fetchGithubData, QUERY_KEYS, type GithubUser } from "../utils/fetch";
import { CONTACT_ID } from "../utils/scroll";
import { playButtonClick } from "../utils/sounds";
import { GithubIcon, LinkedinIcon } from "./icons/BrandIcons";
import { GithubTooltip } from "./ui/GithubTooltip";
import { squircle } from "./ui/shared";
import { Tooltip } from "./ui/Tooltip";

const socialBase = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  minHeight: "3rem",
  backgroundColor: "transparent",
  color: "var(--text-color)",
  padding: "0 1.25rem",
  fontFamily: "inherit",
  fontSize: "inherit",
  fontWeight: 500,
  border: "1px solid var(--border-color)",
  ...squircle("md"),
  cursor: "pointer",
  textDecoration: "none",
  userSelect: "none",
  transition: "background-color 160ms ease, transform 160ms var(--ease-out)",
  _canHover: { _hover: { backgroundColor: "var(--card-background-color)" } },
  _active: { transform: "scale(0.96)" },
};

const SocialsContainer = styled("div", {
  base: {
    display: "flex",
    justifyContent: "center",
    gap: "0.75rem",
    flexWrap: "wrap",
    marginTop: "2rem",
    "& > *": { transition: "opacity 280ms ease" },
    "&[data-spotlight] > *:not(:first-child)": { opacity: 0.32 },
    "&[data-spotlight] > :first-child": {
      animation: "contactSpotlight 1.5s var(--ease-out) both",
      "@media (prefers-reduced-motion: reduce)": {
        animation: "none",
        boxShadow: "0 0 0 2px var(--text-color)",
      },
    },
  },
});

const SocialButton = styled("button", {
  base: socialBase,
});

const SocialLink = styled("a", {
  base: {
    ...socialBase,
    "& svg": { transition: "color 160ms ease" },
  },
  variants: {
    social: {
      linkedin: { _canHover: { _hover: { "& svg": { color: "var(--linkedin-color)" } } } },
      github: { _canHover: { _hover: { "& svg": { color: "var(--github-color)" } } } },
    },
  },
});

const swap = {
  gridArea: "1 / 1",
  transition:
    "opacity 200ms var(--ease-out), scale 200ms var(--ease-out), filter 200ms var(--ease-out)",
  "&[data-hidden]": { opacity: 0, scale: 0.25, filter: "blur(4px)" },
  "@media (prefers-reduced-motion: reduce)": { transition: "none" },
} as const;

const Swap = styled("span", {
  base: { display: "inline-grid", placeItems: "center" },
});

const SwapItem = styled("span", {
  base: { ...swap, display: "inline-flex" },
});

const SwapLabel = styled("span", {
  base: {
    ...swap,
    "&[data-hidden]": { opacity: 0, filter: "blur(4px)" },
  },
});

// Assembled at runtime and rendered only on the client, so it stays out of the prerendered HTML.
const getEmail = () => ["axelzareb", "gmail.com"].join("@");
const subscribeToNothing = () => () => undefined;

const Socials = () => {
  const [copied, setCopied] = useState(false);
  const email = useSyncExternalStore(subscribeToNothing, getEmail, () => null);

  const { data: githubData } = useQuery<GithubUser>({
    queryKey: [QUERY_KEYS.githubUser, GITHUB_USERNAME],
    queryFn: () => fetchGithubData(GITHUB_USERNAME),
    retry: false,
    staleTime: 3_600_000,
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getEmail());
    } catch (error) {
      console.error("Failed to copy text:", error);
      return;
    }

    void playButtonClick();
    void window.umami?.track("copy-email");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SocialsContainer id={CONTACT_ID}>
      <SocialButton onClick={handleCopy}>
        <Swap>
          <SwapItem data-hidden={copied || undefined}>
            <CopyIcon aria-hidden />
          </SwapItem>
          <SwapItem data-hidden={!copied || undefined}>
            <CheckIcon aria-hidden />
          </SwapItem>
        </Swap>
        <Swap>
          <SwapLabel data-hidden={copied || undefined}>{email ?? copy.contact.copyEmail}</SwapLabel>
          <SwapLabel role="status" data-hidden={!copied || undefined}>
            {copied && copy.contact.copied}
          </SwapLabel>
        </Swap>
      </SocialButton>
      <SocialLink
        href="https://www.linkedin.com/in/axelzareb/"
        social="linkedin"
        target="_blank"
        rel="noreferrer"
      >
        <LinkedinIcon />
        LinkedIn
      </SocialLink>
      <Tooltip link content={<GithubTooltip user={githubData ?? null} />} side="top">
        <SocialLink
          href={`https://github.com/${GITHUB_USERNAME}`}
          social="github"
          target="_blank"
          rel="noreferrer"
        >
          <GithubIcon />
          GitHub
        </SocialLink>
      </Tooltip>
    </SocialsContainer>
  );
};

export default Socials;
