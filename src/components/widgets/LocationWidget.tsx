import { MapPinIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { styled } from "styled-system/jsx";

import { copy } from "../../data/copy";
import { WidgetContainer } from "../ui/shared";

const LocationContainer = styled(WidgetContainer, {
  base: {
    display: "flex",
    gap: "2rem",
    alignItems: "center",
    padding: "1rem 2rem",

    mdDown: {
      gap: "1rem",
      padding: "1rem",
    },
  },
});

const IconContainer = styled("span", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const LocalTimeContainer = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
  },
});

const CityName = styled("span", {
  base: {
    fontWeight: 700,
  },
});

const Description = styled("div", {
  base: {
    color: "var(--text-secondary)",
  },
});

const Time = styled("span", {
  base: {
    fontWeight: 600,
    fontVariantNumeric: "tabular-nums",
  },
});

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Time>
      {currentTime?.toLocaleString("fr", {
        timeZone: "Europe/Paris",
        hour: "numeric",
        minute: "numeric",
      }) ?? "—"}
    </Time>
  );
};

const LocationWidget = () => {
  return (
    <LocationContainer>
      <IconContainer>
        <MapPinIcon />
      </IconContainer>
      <LocalTimeContainer>
        <CityName>Paris, France</CityName>
        <Description>
          {copy.contact.currently} <CurrentTime /> {copy.contact.forMe}
        </Description>
      </LocalTimeContainer>
    </LocationContainer>
  );
};

export default LocationWidget;
