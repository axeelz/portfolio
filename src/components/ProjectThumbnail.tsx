import styled from "styled-components";

import type { Project } from "./Projects";

const ImageLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    transform 0.2s ease-in-out,
    filter 0.3s ease-in-out;
  isolation: isolate;
  
  &:hover {
    filter: brightness(0.9);
    transform: scale(1.02);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const ProjectImage = styled.div<{ $src: string }>`
  width: 100%;
  aspect-ratio: 16/9;
  background-image: url(${({ $src }) => $src});
  background-size: cover;
  background-position: center;
  border-radius: var(--radius-sm);
  position: relative;

  &::after {
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    position: absolute;
    background: inherit;
    will-change: filter, transform;
    filter: blur(20px) saturate(1.5);
    transform: scale(1.03);
    z-index: -1;
  }
`;

interface ProjectThumbnailProps {
  image: Project["image"];
  name: Project["name"];
  links: Project["links"];
}

const ProjectThumbnail = ({ image, name, links }: ProjectThumbnailProps) => {
  const { url, source } = links;
  const imageSrc = image.startsWith("http") ? image : "/img/" + image;

  return (
    <>
      <ImageLink href={url ?? source} target="_blank" tabIndex={-1}>
        <ProjectImage role="img" aria-label={name} $src={imageSrc} />
      </ImageLink>
    </>
  );
};

export default ProjectThumbnail;
