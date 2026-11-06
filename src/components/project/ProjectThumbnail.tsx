import { styled } from "styled-system/jsx";

import type { Project } from "../../data/portfolio";

import { squircle } from "../ui/shared";

const Glow = styled("img", {
  base: {
    position: "absolute",
    inset: "2%",
    width: "96%",
    height: "96%",
    objectFit: "cover",
    filter: "blur(28px) saturate(1.8)",
    transform: "scale(1.08)",
    opacity: 0,
    transition: "opacity 300ms var(--ease-out)",
    pointerEvents: "none",
    "@media (prefers-reduced-motion: reduce)": { transition: "none" },
  },
});

const ImageLink = styled("a", {
  base: {
    position: "relative",
    display: "block",
    isolation: "isolate",
    transition: "transform 200ms var(--ease-out)",
    _canHover: {
      _hover: {
        transform: "translateY(-2px)",
        "& > img:first-child": { opacity: 0.5 },
      },
    },
    _active: { transform: "scale(0.98)" },
  },
});

const ProjectImage = styled("img", {
  base: {
    position: "relative",
    display: "block",
    width: "100%",
    height: "auto",
    aspectRatio: "16/9",
    objectFit: "cover",
    ...squircle("md"),
    outline: "1px solid var(--image-outline-color)",
    outlineOffset: "-1px",
  },
});

interface ProjectThumbnailProps {
  image: Project["image"];
  name: Project["name"];
  links: Project["links"];
}

const ProjectThumbnail = ({ image, name, links }: ProjectThumbnailProps) => {
  const { url, source } = links;
  const href = url ?? source;
  const imageSrc = image.startsWith("http") ? image : "/img/" + image;
  const img = <ProjectImage src={imageSrc} alt={name} loading="lazy" />;

  return href ? (
    <ImageLink href={href} target="_blank" rel="noreferrer" tabIndex={-1}>
      <Glow src={imageSrc} alt="" loading="lazy" />
      {img}
    </ImageLink>
  ) : (
    img
  );
};

export default ProjectThumbnail;
