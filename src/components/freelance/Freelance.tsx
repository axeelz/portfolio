import type { MouseEvent } from "react";

import { styled } from "styled-system/jsx";

import type { FreelanceWork } from "../../utils/fetch";

import { copy } from "../../data/copy";
import { SECTION_IDS } from "../../data/sections";
import { scrollToSection } from "../../utils/scroll";
import { playButtonClick } from "../../utils/sounds";
import Cta from "../ui/Cta";
import {
  Card,
  CardBody,
  CardDescription,
  CardGrid,
  CardMedia,
  CardTitle,
  ExternalLink,
  Lead,
  LinkRow,
  SectionHead,
  SectionTitle,
} from "../ui/shared";
import EcomerMap from "./EcomerMap";

const Windows = styled("div", {
  base: {
    position: "absolute",
    inset: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "4%",
    padding: "6% 10% 0",
  },
});

const SiteWindow = styled("div", {
  base: {
    flex: 1,
    minWidth: 0,
    height: "130%",
    overflow: "hidden",
    borderRadius: "var(--radius-sm) var(--radius-sm) 0 0",
    backgroundColor: "var(--sheet-color)",
    boxShadow: "var(--surface-shadow)",
    "&:first-child": { rotate: "-2deg" },
    "&:last-child": { rotate: "2deg", marginTop: "4%" },
    "& img": { width: "100%", height: "auto" },
  },
});

const WindowBar = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "3px",
    height: "20px",
    paddingLeft: "8px",
    color: "var(--text-secondary)",
    fontSize: "0.625rem",
    fontWeight: 500,
    lineHeight: 1,
    whiteSpace: "nowrap",
    "& i": {
      flexShrink: 0,
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      backgroundColor: "var(--border-color)",
    },
    "& span": { marginLeft: "6px" },
  },
});

const goToContact = (event: MouseEvent) => {
  event.preventDefault();
  void playButtonClick();
  scrollToSection(SECTION_IDS.CONTACT);
};

const Freelance = ({ clients }: { clients: FreelanceWork[] }) => (
  <>
    <SectionHead>
      <SectionTitle>{copy.freelance.title}</SectionTitle>
      <Lead>{copy.freelance.pitch}</Lead>
    </SectionHead>

    <CardGrid>
      {clients.map(({ id, name, description, links }) => (
        <Card key={id}>
          <CardMedia>
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
          </CardMedia>
          <CardBody>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{description}</CardDescription>
            <LinkRow>
              {links.map(({ label, url }) => (
                <ExternalLink key={url} href={url}>
                  {label}
                </ExternalLink>
              ))}
            </LinkRow>
          </CardBody>
        </Card>
      ))}
    </CardGrid>

    <Cta
      href={`#${SECTION_IDS.CONTACT}`}
      onClick={goToContact}
      title={copy.freelance.yourProject}
      description={copy.freelance.yourProjectDescription}
    />
  </>
);

export default Freelance;
