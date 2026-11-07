import { css } from "styled-system/css";
import { styled } from "styled-system/jsx";

const numberFormatter = new Intl.NumberFormat("en");
const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

/** Add to the container that receives `data-play` from usePlayOnceInView. */
export const rollOnPlay = css.raw({
  "@media (prefers-reduced-motion: no-preference)": {
    "&[data-play] [data-reel]": { animation: "roll 1300ms var(--ease-out)" },
  },
});

const Digits = styled("span", {
  base: {
    display: "inline-flex",
    fontVariantNumeric: "tabular-nums",
    lineHeight: 1.15,
  },
});

const DigitWindow = styled("span", {
  base: {
    display: "inline-block",
    height: "1.15em",
    overflow: "hidden",
  },
});

const Reel = styled("span", {
  base: {
    display: "block",
    "& > span": { display: "block", height: "1.15em" },
  },
});

/** Each digit is a reel of 0 to 9: the final position is set inline and `roll` animates to it. */
const RollingNumber = ({ value }: { value: number }) => {
  const formatted = numberFormatter.format(value);

  return (
    <Digits role="img" aria-label={formatted}>
      {Array.from(formatted, (character, index) =>
        DIGITS.includes(character) ? (
          <DigitWindow key={index} aria-hidden>
            <Reel data-reel style={{ transform: `translateY(${Number(character) * -10}%)` }}>
              {DIGITS.map((digit) => (
                <span key={digit}>{digit}</span>
              ))}
            </Reel>
          </DigitWindow>
        ) : (
          <span key={index} aria-hidden>
            {character}
          </span>
        ),
      )}
    </Digits>
  );
};

export default RollingNumber;
