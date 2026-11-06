import type { Project } from "../../data/portfolio";

import { copy } from "../../data/copy";
import { ExternalLink, LinkRow } from "../ui/shared";

const ProjectLinks = ({ links: { url, source } }: Pick<Project, "links">) => (
  <LinkRow>
    {url && <ExternalLink href={url}>{copy.projects.card.website}</ExternalLink>}
    {source && <ExternalLink href={source}>{copy.projects.card.source}</ExternalLink>}
  </LinkRow>
);

export default ProjectLinks;
