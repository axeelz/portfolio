import { ArrowUpRightIcon } from "lucide-react";
import { styled } from "styled-system/jsx";

import type { Project } from "../../data/portfolio";

import { copy } from "../../data/copy";
import { Card, CardBody, CardDescription, CardMedia, CardTitle, ExternalLink } from "../ui/shared";
import ProjectStats from "./ProjectStats";

const Thumbnail = styled("img", {
  base: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 500ms var(--ease-out)",
    "@media (prefers-reduced-motion: reduce)": { transition: "none" },
  },
});

/** The title link covers the whole card; the card reacts to it through :has. */
const HoverCard = styled(Card, {
  base: {
    _canHover: {
      "&:has(a[data-card-link]:hover) img": { transform: "scale(1.03)" },
      "&:has(a[data-card-link]:hover) [data-visit] svg": { transform: "translate(2px, -2px)" },
    },
  },
});

const CardLink = styled("a", {
  base: {
    color: "inherit",
    textDecoration: "none",
    _after: { content: '""', position: "absolute", inset: 0 },
  },
});

const Visit = styled("span", {
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.25rem",
    fontWeight: 500,
    textDecoration: "underline",
    textDecorationColor: "var(--border-color)",
    textDecorationThickness: "1px",
    textUnderlineOffset: "0.2em",
    "& svg": {
      transition: "transform 250ms var(--ease-out)",
      "@media (prefers-reduced-motion: reduce)": { transition: "none" },
    },
  },
});

const SourceLink = styled(ExternalLink, {
  base: { position: "relative", zIndex: 1 },
});

interface ProjectCardProps {
  project: Project;
  size?: "compact";
}

const ProjectCard = ({ project, size }: ProjectCardProps) => {
  const { name, image, description, links, stats } = project;

  return (
    <HoverCard>
      <CardMedia>
        <Thumbnail src={`/img/${image}`} alt="" loading="lazy" />
      </CardMedia>
      <CardBody>
        <CardTitle size={size}>
          <CardLink
            data-card-link
            href={links.url ?? links.source}
            target="_blank"
            rel="noreferrer"
          >
            {name}
          </CardLink>
        </CardTitle>
        <CardDescription size={size}>{description}</CardDescription>
        {stats && <ProjectStats stats={stats} />}
        {!size && (
          <Visit data-visit aria-hidden>
            {copy.projects.visit}
            <ArrowUpRightIcon size={14} strokeWidth={2.25} />
          </Visit>
        )}
        {links.source && links.url && (
          <SourceLink href={links.source}>{copy.projects.source}</SourceLink>
        )}
      </CardBody>
    </HoverCard>
  );
};

export default ProjectCard;
