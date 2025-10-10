import { useTranslation } from "react-i18next";
import Technologies from "./Technologies";
import { useQuery } from "@tanstack/react-query";
import { fetchPortfolioResponse, PortfolioResponse, QUERY_KEYS } from "../utils/fetch";
import { BodyContainer, SectionTitle } from "../styled/shared";
import MusicWidget from "./MusicWidget";
import LocationWidget from "./LocationWidget";
import Socials from "./Socials";
import DockWidget from "./DockWidget";

const About = () => {
  const { t } = useTranslation();
  const { data: portfolioResponse } = useQuery<PortfolioResponse>({
    queryKey: [QUERY_KEYS.portfolioResponse],
    queryFn: fetchPortfolioResponse,
    retry: false,
  });

  const tools = portfolioResponse?.tools?.map((tool) => tool.name) ?? [];
  const dockItems = portfolioResponse?.dock ?? [];

  return (
    <>
      <SectionTitle>{t("about.title")}</SectionTitle>

      {tools.length > 0 && (
        <BodyContainer>
          <span>{t("presentation.enjoyedRecently")}</span>
          <Technologies items={tools} />
        </BodyContainer>
      )}

      {dockItems.length > 0 && (
        <BodyContainer>
          <span>{t("about.appsInDock")}</span>
          <DockWidget items={dockItems} />
        </BodyContainer>
      )}

      <MusicWidget />
      <LocationWidget />
      <Socials />
    </>
  );
};

export default About;
