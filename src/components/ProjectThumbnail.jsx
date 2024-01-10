import styled from "styled-components";

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
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  user-select: none;
`;

const ProjectThumbnail = ({ image, name, links }) => {
  const { url, source } = links;
  const imageSrc = image.startsWith("http") ? image : "/img/" + image;

  return (
    <>
      <ImageLink href={url ?? source} target="_blank" tabIndex="-1">
        <ProjectImage src={imageSrc} alt={name} loading="lazy" />
      </ImageLink>
    </>
  );
};

export default ProjectThumbnail;
