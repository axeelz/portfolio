import styled from "styled-components";
import { WidgetContainer } from "../styled/shared";
import { useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const LocationContainer = styled(WidgetContainer)`
  display: flex;
  gap: 2rem;
  align-items: center;
  padding: 1rem 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
    padding: 1rem;
  }
`;

const IconContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 1.5rem;
  }
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

const LocationWidget = () => {
  const { t } = useTranslation();
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Update time in real-time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <LocationContainer>
      <IconContainer>
        <IoLocationSharp />
      </IconContainer>
      <LocalTimeContainer>
        <CityName>Paris, France</CityName>
        <Description>
          {t("contact.currently")}{" "}
          <Time>
            {currentTime.toLocaleString([], {
              timeZone: "Europe/Paris",
              hour: "numeric",
              minute: "numeric",
            })}
          </Time>{" "}
          {t("contact.forMe")}
        </Description>
      </LocalTimeContainer>
    </LocationContainer>
  );
};

export default LocationWidget;