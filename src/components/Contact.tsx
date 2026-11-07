import { useState, useSyncExternalStore } from "react";
import { styled } from "styled-system/jsx";

import { copy } from "../data/copy";
import { SECTION_IDS } from "../data/sections";
import { GITHUB_USERNAME } from "../utils/fetch";
import { playButtonClick } from "../utils/sounds";
import ParisTime from "./ParisTime";
import { Block, BlockLabel, FitBox, fitText, reveal, stackedSheet, TextLinks } from "./ui/shared";
import { TooltipHost, TooltipLabel } from "./ui/Tooltip";
import ViewCount from "./ViewCount";

const Sheet = styled("section", {
  base: {
    ...stackedSheet,
    "--text-color": "var(--contact-text)",
    "--text-secondary": "var(--contact-secondary)",
    "--border-color": "var(--contact-border)",
    "--sheet-color": "var(--contact-background)",
    "--link-size": "clamp(1.5rem, 3vw, 2.5rem)",
    zIndex: 3,
    display: "grid",
    gap: "clamp(2.5rem, 5vw, 4rem)",
    paddingBottom: "5.5rem",
    backgroundColor: "var(--contact-background)",
    color: "var(--text-color)",
  },
});

const TitleBox = styled(FitBox, { base: reveal });

const Title = styled("h2", {
  base: { ...fitText, "--fit": "6.13" },
});

const Pitch = styled("p", {
  base: {
    maxWidth: "27ch",
    marginTop: "calc(-1 * clamp(0.75rem, 2vw, 1.5rem))",
    fontSize: "var(--text-lead)",
    letterSpacing: "-0.01em",
    lineHeight: 1.3,
  },
});

const Links = styled("div", {
  base: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "2rem 3rem",
  },
});

const MailButton = styled("button", {
  base: {
    ...reveal,
    display: "grid",
    justifyItems: "start",
    gap: "1rem",
    padding: 0,
    border: "none",
    background: "none",
    color: "inherit",
    cursor: "pointer",
    font: "inherit",
    textAlign: "left",
    transition: "scale 160ms var(--ease-out)",
    _active: { scale: 0.99 },
  },
});

const MailLabel = styled(BlockLabel, {
  base: {
    "@media (prefers-reduced-motion: no-preference)": {
      "&[data-copied]": { animation: "fadeIn 300ms ease-out" },
    },
  },
});

const Email = styled("span", {
  base: {
    minHeight: "1.3em",
    fontFamily: "var(--font-title)",
    fontSize: "var(--link-size)",
    fontWeight: 700,
    letterSpacing: "-0.02em",
    lineHeight: 1.3,
  },
});

const Avatar = styled("img", {
  base: { marginLeft: "-0.25rem", borderRadius: "50%" },
});

const Colophon = styled("div", {
  base: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "0.25rem 2rem",
    color: "var(--text-secondary)",
    fontSize: "0.875rem",
  },
});

// Assembled at runtime and rendered only on the client, so it stays out of the prerendered HTML.
const getEmail = () => ["hello", "axlz.me"].join("@");
const subscribeToNothing = () => () => undefined;

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const email = useSyncExternalStore(subscribeToNothing, getEmail, () => null);

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
    <Sheet id={SECTION_IDS.CONTACT} tabIndex={-1}>
      <TitleBox>
        <Title>{copy.contact.title}</Title>
      </TitleBox>
      <Pitch>{copy.contact.pitch}</Pitch>

      <Links>
        <MailButton onClick={() => void handleCopy()}>
          <MailLabel as="span" role="status" data-copied={copied || undefined}>
            {copied ? copy.contact.copied : copy.contact.copyEmail}
          </MailLabel>
          <Email>{email}</Email>
        </MailButton>

        <Block>
          <BlockLabel>{copy.contact.elsewhere}</BlockLabel>
          <TextLinks>
            <li>
              <a href="https://www.linkedin.com/in/axelzareb/" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <TooltipHost>
                <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer">
                  GitHub
                </a>
                <TooltipLabel>
                  <Avatar
                    src={`https://github.com/${GITHUB_USERNAME}.png?size=40`}
                    alt=""
                    width={18}
                    height={18}
                    loading="lazy"
                  />
                  {GITHUB_USERNAME}
                </TooltipLabel>
              </TooltipHost>
            </li>
          </TextLinks>
        </Block>
      </Links>

      <Colophon>
        <span>
          <ParisTime /> in Paris
        </span>
        <ViewCount />
      </Colophon>
    </Sheet>
  );
};

export default Contact;
