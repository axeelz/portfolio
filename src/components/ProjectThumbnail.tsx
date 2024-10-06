import styled from "styled-components";
import type { Project } from "./Projects";

const ImageLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease-in-out, filter 0.3s ease-in-out;

  &:hover {
    filter: brightness(0.9);
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  border-radius: 0.25rem;
  user-select: none;
  filter: url(#backlight);
`;

export const SvgBacklightFilter = () => (
  <svg width="0" height="0">
    <filter id="backlight" width="300%" height="300%" x="-0.75" y="-0.75" colorInterpolationFilters="sRGB">
      <feOffset in="SourceGraphic" result="source-copy" />
      <feColorMatrix in="source-copy" type="saturate" values="1" result="saturated-copy" />
      <feColorMatrix
        in="saturated-copy"
        type="matrix"
        values="1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              33 33 33 101 -100"
        result="bright-colors"
      />
      <feMorphology in="bright-colors" operator="dilate" radius="1" result="spread" />
      <feGaussianBlur in="spread" stdDeviation="30" result="ambilight-light" />
      <feOffset in="SourceGraphic" result="source" />
      <feComposite in="source" in2="ambilight-light" operator="over" />
    </filter>
  </svg>
);

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
        <ProjectImage src={imageSrc} alt={name} loading="lazy" />
      </ImageLink>
    </>
  );
};

export default ProjectThumbnail;
