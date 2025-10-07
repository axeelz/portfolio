import { useTranslation } from "react-i18next";
import Technologies from "./Technologies";
import { useQuery } from "@tanstack/react-query";
import { fetchPortfolioTools, QUERY_KEYS, type PortfolioTool } from "../utils/fetch";
import { BodyContainer, SectionTitle } from "../styled/shared";
import MusicWidget from "./MusicWidget";
import LocationWidget from "./LocationWidget";
import Socials from "./Socials";

const About = () => {
  const { t } = useTranslation();
  const { data: recentTools, isPending } = useQuery<PortfolioTool[]>({
    queryKey: [QUERY_KEYS.portfolioTools],
    queryFn: fetchPortfolioTools,
    retry: false,
  });
  const tools = isPending ? ["..."] : recentTools?.map((tool) => tool.name) ?? [];

  return (
    <>
      <SectionTitle>{t("about.title")}</SectionTitle>
      <BodyContainer>
        <span>{t("presentation.enjoyedRecently")}</span>
        <Technologies items={tools} />
      </BodyContainer>
      <MusicWidget />
      <LocationWidget />
      <Socials />
    </>
  );
};

export default About;
