import { MapPinIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { styled } from "styled-system/jsx";

import { copy } from "../../data/copy";
import { Surface } from "../ui/shared";

const LocationContainer = styled(Surface, {
  base: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    fontWeight: 500,
    padding: "1.25rem",
    mdDown: { padding: "1rem" },
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
      }) ?? "--:--"}
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
