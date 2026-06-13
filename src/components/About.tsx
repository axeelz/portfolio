import { styled } from "styled-system/jsx";

import { BodyContainer, SectionTitle } from "../components/ui/shared";
import { copy } from "../data/copy";
import usePortfolioResponse from "../hooks/usePortfolioResponse";
import Socials from "./Socials";
import Technologies from "./Technologies";
import DockWidget from "./widgets/DockWidget";
import HostsWidget from "./widgets/HostsWidget";
import LocationWidget from "./widgets/LocationWidget";
import MusicWidget from "./widgets/MusicWidget";

const WidgetsStack = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
});

const About = () => {
  const { data: portfolioResponse } = usePortfolioResponse();

  const hosts = portfolioResponse?.hosts ?? [];
  const tools = portfolioResponse?.tools?.map((tool) => tool.name) ?? [];
  const dockItems = portfolioResponse?.dock ?? [];

  return (
    <>
      <SectionTitle>{copy.about.title}</SectionTitle>

      <WidgetsStack>
        <LocationWidget />
        <MusicWidget />

        {tools.length > 0 && (
          <BodyContainer>
            <span>{copy.presentation.enjoyedRecently}</span>
            <Technologies items={tools} />
          </BodyContainer>
        )}

        {hosts.length > 0 && (
          <BodyContainer>
            <span>{copy.about.domains}</span>
            <HostsWidget hosts={hosts} />
          </BodyContainer>
        )}

        {dockItems.length > 0 && (
          <BodyContainer>
            <span>{copy.about.appsInDock}</span>
            <DockWidget items={dockItems} />
          </BodyContainer>
        )}
      </WidgetsStack>

      <Socials />
    </>
  );
};

export default About;
