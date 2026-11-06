import { ArrowDownIcon, ArrowRightIcon, PlusIcon } from "lucide-react";
import { styled } from "styled-system/jsx";

import type { FreelanceWork } from "../../utils/fetch";

import { copy } from "../../data/copy";
import { scrollToContact } from "../../utils/scroll";
import { playButtonClick } from "../../utils/sounds";
import { Button, ExternalLink, LinkRow, SectionTitle, Surface } from "../ui/shared";
import EcomerMap from "./EcomerMap";
import { usePile } from "./usePile";

const Layout = styled("div", {
  base: {
    display: "grid",
    gap: "1.5rem",
    lg: {
      gridTemplateColumns: "minmax(0, 0.8fr) minmax(0, 1fr)",
      gap: "3rem",
      alignItems: "center",
      padding: "1rem 0 1.5rem",
    },
  },
});

const Title = styled(SectionTitle, {
  base: { margin: "0 0 0.75rem 0" },
});

const Pitch = styled("p", {
  base: {
    color: "var(--text-secondary)",
    fontSize: "1.15rem",
    fontWeight: 500,
    lineHeight: 1.45,
    textWrap: "pretty",
    mdDown: { fontSize: "1rem" },
  },
});

const Actions = styled("div", {
  base: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "0.5rem 1rem",
    marginTop: "1.75rem",
  },
});

const ContactButton = styled(Button, {
  base: {
    flexGrow: 1,
    lg: { flexGrow: 0 },
  },
});

const NextButton = styled("button", {
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.45rem",
    minHeight: "3rem",
    padding: "0 0.5rem",
    border: "none",
    background: "transparent",
    color: "var(--text-secondary)",
    fontFamily: "var(--font-body)",
    fontSize: "0.95rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "color 160ms ease, transform 160ms var(--ease-out)",
    _canHover: { _hover: { color: "var(--text-color)" } },
    _active: { transform: "scale(0.96)" },
  },
});

const Count = styled("span", {
  base: {
    marginRight: "0.15rem",
    fontFamily: "var(--font-mono)",
    fontSize: "0.8rem",
    fontVariantNumeric: "tabular-nums",
  },
});

const Stack = styled("div", {
  base: {
    position: "relative",
    height: "430px",
    margin: "0 0.5rem",
    lg: { height: "460px", margin: 0 },
    "@media (prefers-reduced-motion: no-preference)": {
      "&[data-play] > [data-depth='0']": {
        animation: "pileNudge 620ms cubic-bezier(0.32, 0.72, 0, 1) 200ms",
      },
    },
  },
});

const Card = styled(Surface, {
  base: {
    position: "absolute",
    inset: "0 0 26px 0",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    cursor: "grab",
    touchAction: "pan-y",
    userSelect: "none",
    transition:
      "translate 520ms var(--ease-overshoot), rotate 520ms var(--ease-overshoot), transform 520ms var(--ease-overshoot), opacity 200ms ease",
    "&[data-depth='0']": { transform: "rotate(0deg)" },
    "&[data-depth='1']": { transform: "translate3d(14px, 12px, 0) rotate(2.6deg) scale(0.965)" },
    "&[data-depth='2'], &[data-depth='3']": {
      transform: "translate3d(-12px, 22px, 0) rotate(-3.8deg) scale(0.93)",
    },
    "&[data-depth='3']": { opacity: 0 },
    "&[data-dragging]": { cursor: "grabbing", transition: "none" },
    "@media (prefers-reduced-motion: reduce)": { transition: "none" },
  },
});

const Media = styled("div", {
  base: {
    position: "relative",
    flex: 1,
    minHeight: 0,
    overflow: "hidden",
    backgroundColor: "var(--section-background-color)",
  },
});

const Blueprint = styled(Media, {
  base: {
    display: "grid",
    placeItems: "center",
    color: "var(--text-color)",
    backgroundImage:
      "linear-gradient(var(--surface-outline-color) 1px, transparent 1px), linear-gradient(90deg, var(--surface-outline-color) 1px, transparent 1px)",
    backgroundSize: "28px 28px",
  },
});

const Windows = styled("div", {
  base: {
    position: "absolute",
    inset: "1.25rem 0 -2rem 1.25rem",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0.75rem",
  },
});

const SiteWindow = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    borderRadius: "12px",
    backgroundColor: "white",
    boxShadow: "0 0 0 1px rgb(0 0 0 / 0.1), 0 18px 40px -12px rgb(0 0 0 / 0.35)",
    "&:last-child": { marginRight: "-2rem", transform: "translateY(1.25rem)" },
    "& img": {
      display: "block",
      width: "100%",
      height: "auto",
    },
  },
});

const WindowBar = styled("div", {
  base: {
    display: "flex",
    flex: "none",
    alignItems: "center",
    gap: "4px",
    height: "24px",
    padding: "0 9px",
    backgroundColor: "#1b1b1f",
    color: "rgb(255 255 255 / 0.62)",
    fontFamily: "var(--font-mono)",
    fontSize: "10px",
    lineHeight: 1,
    whiteSpace: "nowrap",
    "& i": {
      flex: "none",
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      backgroundColor: "rgb(255 255 255 / 0.2)",
    },
    "& span": { marginLeft: "7px" },
  },
});

const Body = styled("div", {
  base: {
    display: "flex",
    flex: "none",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "0.35rem",
    padding: "1.1rem 1.4rem 0.9rem",
    "& h3": {
      margin: 0,
      fontFamily: "var(--font-title)",
      fontSize: "1.25rem",
      fontWeight: 700,
    },
    "& p": {
      color: "var(--text-secondary)",
      fontSize: "0.92rem",
      fontWeight: 500,
      lineHeight: 1.45,
      textWrap: "pretty",
    },
  },
});

const StretchedButton = styled("button", {
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: 0,
    border: "none",
    background: "transparent",
    color: "inherit",
    font: "inherit",
    cursor: "pointer",
    transition: "transform 160ms var(--ease-out)",
    _active: { transform: "scale(0.96)" },
    _after: { content: '""', position: "absolute", inset: 0 },
  },
});

const goToContact = () => {
  void playButtonClick();
  scrollToContact();
};

const Freelance = ({ clients }: { clients: FreelanceWork[] }) => {
  const count = clients.length + 1;
  const { top, next, stackRef, cardProps } = usePile(count);

  const depthProps = (index: number) => {
    const depth = (index - top + count) % count;
    return {
      "data-depth": Math.min(depth, 3),
      inert: depth !== 0,
      style: { zIndex: count - depth },
    };
  };

  return (
    <Layout>
      <div>
        <Title>{copy.freelance.title}</Title>
        <Pitch>{copy.freelance.pitch}</Pitch>
        <Actions>
          <ContactButton onClick={goToContact}>
            {copy.freelance.getInTouch}
            <ArrowDownIcon size={16} strokeWidth={2.5} aria-hidden />
          </ContactButton>
          <NextButton
            onClick={() => {
              void playButtonClick();
              next();
            }}
          >
            <Count>
              {top + 1}/{count}
            </Count>
            {copy.freelance.next}
            <ArrowRightIcon size={15} strokeWidth={2.5} aria-hidden />
          </NextButton>
        </Actions>
      </div>

      <Stack ref={stackRef}>
        {clients.map(({ id, name, description, links }, index) => (
          <Card as="article" key={id} {...depthProps(index)} {...cardProps}>
            <Media>
              {id === "sayari" ? (
                <EcomerMap />
              ) : (
                <Windows>
                  {links.map(
                    ({ label, image }) =>
                      image && (
                        <SiteWindow key={label}>
                          <WindowBar aria-hidden>
                            <i />
                            <i />
                            <i />
                            <span>{label}</span>
                          </WindowBar>
                          <img
                            src={image}
                            alt={`The ${label} website`}
                            width={800}
                            height={938}
                            loading="lazy"
                          />
                        </SiteWindow>
                      ),
                  )}
                </Windows>
              )}
            </Media>
            <Body>
              <h3>{name}</h3>
              <p>{description}</p>
              <LinkRow>
                {links.map(({ label, url }) => (
                  <ExternalLink key={url} href={url}>
                    {label}
                  </ExternalLink>
                ))}
              </LinkRow>
            </Body>
          </Card>
        ))}

        <Card as="article" {...depthProps(clients.length)} {...cardProps}>
          <Blueprint aria-hidden>
            <PlusIcon size={44} strokeWidth={1.25} />
          </Blueprint>
          <Body>
            <h3>
              <StretchedButton onClick={goToContact}>
                {copy.freelance.yourProject}
                <ArrowDownIcon size={16} strokeWidth={2.5} aria-hidden />
              </StretchedButton>
            </h3>
            <p>{copy.freelance.yourProjectDescription}</p>
          </Body>
        </Card>
      </Stack>
    </Layout>
  );
};

export default Freelance;
