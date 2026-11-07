const LATITUDE = (48.85 * Math.PI) / 180;
const LONGITUDE = 2.35;
const MS_PER_DAY = 86_400_000;

/** Sun elevation above Paris in degrees. Accurate to about a degree, which is plenty for a sky. */
export const sunElevation = (date: Date) => {
  const dayOfYear = (date.getTime() - Date.UTC(date.getUTCFullYear(), 0, 0)) / MS_PER_DAY;
  const declination =
    ((-23.44 * Math.PI) / 180) * Math.cos(((2 * Math.PI) / 365) * (dayOfYear + 10));
  const solarHour = date.getUTCHours() + date.getUTCMinutes() / 60 + LONGITUDE / 15;
  const hourAngle = ((solarHour - 12) * 15 * Math.PI) / 180;

  const sine =
    Math.sin(LATITUDE) * Math.sin(declination) +
    Math.cos(LATITUDE) * Math.cos(declination) * Math.cos(hourAngle);

  return (Math.asin(sine) * 180) / Math.PI;
};

/** The part of the day above Paris. Solar noon there is close to 12:00 UTC. */
export const skyMoment = (date: Date) => {
  const elevation = sunElevation(date);
  if (elevation < -8) return "night";
  if (elevation > 6) return "day";
  return date.getUTCHours() < 12 ? "dawn" : "dusk";
};
