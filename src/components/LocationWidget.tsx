import styled from "styled-components";
import { WidgetContainer } from "../styled/shared";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MapPinIcon } from "lucide-react";

const LocationContainer = styled(WidgetContainer)`
  display: flex;
  gap: 2rem;
  align-items: center;
  padding: 1rem 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
    padding: 1rem;
  }
`;

const IconContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LocalTimeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CityName = styled.span`
  font-weight: 700;
`;

const Description = styled.div`
  color: var(--text-secondary);
`;

const Time = styled.span`
  font-weight: 600;
`;

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Update time in real-time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Time>
      {currentTime.toLocaleString([], {
        timeZone: "Europe/Paris",
        hour: "numeric",
        minute: "numeric",
      })}
    </Time>
  );
};

const LocationWidget = () => {
  const { t } = useTranslation();

  return (
    <LocationContainer>
      <IconContainer>
        <MapPinIcon />
      </IconContainer>
      <LocalTimeContainer>
        <CityName>Paris, France</CityName>
        <Description>
          {t("contact.currently")} <CurrentTime /> {t("contact.forMe")}
        </Description>
      </LocalTimeContainer>
    </LocationContainer>
  );
};

export default LocationWidget;
