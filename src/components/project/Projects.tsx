import { copy } from "../../data/copy";
import { portfolioData } from "../../data/portfolio";
import { GITHUB_USERNAME } from "../../utils/fetch";
import Cta from "../ui/Cta";
import { CardGrid, SectionHead, SectionTitle } from "../ui/shared";
import ProjectCard from "./ProjectCard";

const FEATURED_COUNT = 2;
const featured = portfolioData.projects.slice(0, FEATURED_COUNT);
const others = portfolioData.projects.slice(FEATURED_COUNT);

const Projects = () => (
  <>
    <SectionHead>
      <SectionTitle>{copy.projects.title}</SectionTitle>
    </SectionHead>

    <CardGrid>
      {featured.map((project) => (
        <ProjectCard key={project.name} project={project} />
      ))}
    </CardGrid>

    <CardGrid size="compact">
      {others.map((project) => (
        <ProjectCard key={project.name} project={project} size="compact" />
      ))}
    </CardGrid>

    <Cta
      href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
      target="_blank"
      rel="noreferrer"
      direction="external"
      title={copy.projects.more}
      description={copy.projects.moreDescription}
    />
  </>
);

export default Projects;
