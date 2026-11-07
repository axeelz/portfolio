import { useSyncExternalStore } from "react";
import { styled } from "styled-system/jsx";

const Time = styled("span", { base: { fontVariantNumeric: "tabular-nums" } });

const Colon = styled("span", {
  base: {
    "@media (prefers-reduced-motion: no-preference)": {
      animation: "breathe 2s ease-in-out infinite",
    },
  },
});

const formatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Paris",
});

const getTime = () => formatter.format();
const getServerTime = () => "--:--";

const subscribeToClock = (callback: () => void) => {
  const interval = window.setInterval(callback, 1000);
  return () => window.clearInterval(interval);
};

const ParisTime = () => {
  const [hours, minutes] = useSyncExternalStore(subscribeToClock, getTime, getServerTime).split(
    ":",
  );

  return (
    <Time>
      {hours}
      <Colon>:</Colon>
      {minutes}
    </Time>
  );
};

export default ParisTime;
