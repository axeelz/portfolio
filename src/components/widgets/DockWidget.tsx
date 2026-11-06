import { useState, useEffect, useRef } from "react";
import { styled } from "styled-system/jsx";

import type { DockApp } from "../../utils/fetch";

import { squircle } from "../ui/shared";
import { Tooltip } from "../ui/Tooltip";

const Dock = styled("div", {
  base: {
    display: "flex",
    gap: "0.5rem",
    padding: "0.5rem",
    ...squircle("md"),
    maxWidth: "100%",
    background: "var(--dock-background)",
    border: "1px solid var(--dock-border)",
    boxShadow: "var(--dock-shadow)",
    flexWrap: "nowrap",
    overflowX: "auto",
    overscrollBehaviorX: "contain",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": { display: "none" },
    justifyContent: "safe center",
    mdDown: { gap: "0.4rem" },
  },
});

const DockInfoItem = styled("div", {
  base: {
    width: "56px",
    height: "56px",
    flexShrink: 0,
    transformOrigin: "bottom",
    transition: "transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)",
    cursor: "pointer",
    userSelect: "none",
    _canHover: { _hover: { transform: "translateY(-4px) scale(1.08)" } },
    _active: {
      transform: "translateY(-2px) scale(1.04)",
      transition: "transform 100ms ease",
    },
    mdDown: {
      width: "48px",
      height: "48px",
    },
  },
});

const DockImage = styled("img", {
  base: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    pointerEvents: "none",
  },
});

const DockWidget = ({ items }: { items?: DockApp[] }) => {
  const [openTooltip, setOpenTooltip] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggleTooltip = (appName: string) => {
    setOpenTooltip((current) => (current === appName ? null : appName));
  };

  useEffect(() => {
    if (!openTooltip) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target)) {
        setOpenTooltip(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside, {
      passive: true,
    });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [openTooltip]);

  return (
    <Dock ref={containerRef}>
      {items?.map((app) => (
        <Tooltip
          portal
          key={app.name}
          content={app.name}
          side="top"
          sideOffset={12}
          open={openTooltip === app.name}
          onOpenChange={(isOpen) => setOpenTooltip(isOpen ? app.name : null)}
        >
          <DockInfoItem onTouchStart={() => handleToggleTooltip(app.name)}>
            <DockImage src={app.image} alt={app.name} loading="lazy" />
          </DockInfoItem>
        </Tooltip>
      ))}
    </Dock>
  );
};

export default DockWidget;
