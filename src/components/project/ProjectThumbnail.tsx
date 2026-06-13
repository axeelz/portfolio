import { styled } from "styled-system/jsx";

import type { Project } from "../../data/portfolio";

import { createImageGlowStyle, ImageGlowFrame, squircle } from "../ui/shared";

const ImageLink = styled("a", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.2s cubic-bezier(0.23, 1, 0.32, 1), filter 0.3s ease",
    isolation: "isolate",
    "@media (hover: hover) and (pointer: fine)": {
      _hover: {
        filter: "brightness(0.9)",
        transform: "scale(1.02)",
      },
    },
    _active: {
      transform: "scale(0.98)",
    },
  },
});

const ProjectImageFrame = styled("div", {
  base: {
    width: "100%",
    position: "relative",
    isolation: "isolate",
    borderRadius: "inherit",
  },
});

const ProjectImage = styled("div", {
  base: {
    width: "100%",
    aspectRatio: "16/9",
    backgroundSize: "cover",
    backgroundPosition: "center",
    ...squircle("md"),
    boxShadow: "inset 0 0 0 1px var(--image-outline-color)",
    position: "relative",
    zIndex: 1,
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
  const glowStyle = createImageGlowStyle(imageSrc, 0.7);
  const img = (
    <ProjectImageFrame>
      <ImageGlowFrame aria-hidden="true" style={glowStyle} />
      <ProjectImage role="img" aria-label={name} style={{ backgroundImage: `url(${imageSrc})` }} />
    </ProjectImageFrame>
  );

  return href ? (
    <ImageLink href={href} target="_blank" tabIndex={-1}>
      {img}
    </ImageLink>
  ) : (
    img
  );
};

export default ProjectThumbnail;
