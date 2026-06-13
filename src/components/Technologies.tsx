import { useState } from "react";
import { styled } from "styled-system/jsx";

import { copy } from "../data/copy";
import {
  featuredTechnologies,
  getTechnology,
  getTechnologyIconSrc,
  type Technology,
} from "../data/portfolio";

const MAX_VISIBLE_SMALL = 7;
const MAX_VISIBLE_LARGE = 15;

const chipBase = {
  backgroundColor: "var(--card-background-color)",
  borderRadius: "var(--radius-sm)",
  display: "inline-flex",
  alignItems: "center",
  gap: "0.45rem",
  fontSize: "0.9rem",
  animation: "fadeUp 0.35s ease-out both",
  mdDown: { fontSize: "0.8rem" },
  "@media (prefers-reduced-motion: reduce)": {
    animation: "none",
  },
};

const Chip = styled("div", {
  base: {
    ...chipBase,
    padding: "5px",
    border: "1px solid var(--border-color)",
    cursor: "auto",
  },
});

const ToggleChip = styled("button", {
  base: {
    ...chipBase,
    backgroundImage: "var(--gradient-techs)",
    padding: "5px 8px",
    border: "none",
    cursor: "pointer",
    appearance: "none",
    fontFamily: "inherit",
    lineHeight: "inherit",
    animationDelay: "var(--toggle-delay-lg)",
    mdDown: { fontSize: "0.8rem", animationDelay: "var(--toggle-delay-sm)" },
    transition: "transform 0.16s cubic-bezier(0.23, 1, 0.32, 1)",
    "@media (hover: hover) and (pointer: fine)": {
      _hover: {
        transform: "translateY(-1px) scale(1.03)",
      },
    },
    _active: {
      transform: "scale(0.96)",
    },
  },
  variants: {
    largeHidden: {
      true: { md: { display: "none" } },
    },
  },
});

const SmallOnly = styled("span", { base: { hideFrom: "md" } });
const LargeOnly = styled("span", { base: { hideBelow: "md" } });

const ChipIcon = styled("img", {
  base: {
    width: "1rem",
    height: "1rem",
    objectFit: "contain",
    flexShrink: 0,
  },
  variants: {
    mode: {
      light: { _dark: { display: "none" } },
      dark: { display: "none", _dark: { display: "block" } },
    },
  },
});

const TechsContainer = styled("div", {
  base: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    "&[data-collapsed] > [data-overflow=lg]": {
      display: "none",
    },
    mdDown: {
      "&[data-collapsed] > [data-overflow]": {
        display: "none",
      },
    },
  },
});

const resolveTechnology = (value: string): Technology =>
  getTechnology(value) ?? { id: value, label: value };

const TechChipIcon = ({ icon }: { icon: NonNullable<Technology["icon"]> }) => {
  const lightSrc = getTechnologyIconSrc(icon, false);
  const darkSrc = getTechnologyIconSrc(icon, true);
  if (lightSrc === darkSrc) {
    return <ChipIcon src={lightSrc} alt="" aria-hidden="true" />;
  }
  return (
    <>
      <ChipIcon mode="light" src={lightSrc} alt="" aria-hidden="true" />
      <ChipIcon mode="dark" src={darkSrc} alt="" aria-hidden="true" />
    </>
  );
};

const Technologies = ({ items, showIcons = false }: { items?: string[]; showIcons?: boolean }) => {
  const [showAll, setShowAll] = useState(false);

  const techs = items ? items.map(resolveTechnology) : featuredTechnologies;

  const hasMoreSmall = techs.length > MAX_VISIBLE_SMALL;
  const hasMoreLarge = techs.length > MAX_VISIBLE_LARGE;

  return (
    <TechsContainer data-collapsed={showAll ? undefined : ""}>
      {techs.map((tech, i) => (
        <Chip
          key={tech.id}
          data-overflow={i >= MAX_VISIBLE_LARGE ? "lg" : i >= MAX_VISIBLE_SMALL ? "sm" : undefined}
          style={{
            animationDelay: `${Math.min(i, MAX_VISIBLE_LARGE - 1) * 0.03}s`,
          }}
        >
          {showIcons && tech.icon && <TechChipIcon icon={tech.icon} />}
          {tech.label}
        </Chip>
      ))}
      {hasMoreSmall && (
        <ToggleChip
          type="button"
          largeHidden={!hasMoreLarge}
          onClick={() => setShowAll(!showAll)}
          style={
            {
              "--toggle-delay-sm": `${Math.min(techs.length, MAX_VISIBLE_SMALL) * 0.03}s`,
              "--toggle-delay-lg": `${Math.min(techs.length, MAX_VISIBLE_LARGE - 1) * 0.03}s`,
            } as React.CSSProperties
          }
        >
          {showAll ? (
            copy.presentation.less
          ) : (
            <>
              <SmallOnly>{`+${techs.length - MAX_VISIBLE_SMALL} ${copy.presentation.others}`}</SmallOnly>
              {hasMoreLarge && (
                <LargeOnly>{`+${techs.length - MAX_VISIBLE_LARGE} ${copy.presentation.others}`}</LargeOnly>
              )}
            </>
          )}
        </ToggleChip>
      )}
    </TechsContainer>
  );
};

export default Technologies;
