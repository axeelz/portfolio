import { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { WidgetContainer } from "../styled/shared";
import { Tooltip } from "./Tooltip";
import type { DockApp } from "../utils/fetch";

const DockGlass = styled.div<{ $isOverflowing: boolean }>`
  display: flex;
  justify-content: ${({ $isOverflowing }) => ($isOverflowing ? "flex-start" : "center")};
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 1.25rem;
  max-width: 100%;

  background: linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.1));
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3);

  flex-wrap: nowrap;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    gap: 0.4rem;
    border-radius: 1rem;
  }
`;

const DockInfoItem = styled.div`
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  transform-origin: bottom;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
  user-select: none;

  &:hover {
    transform: translateY(-4px) scale(1.08);
  }

  &:active {
    transform: translateY(-2px) scale(1.04);
    transition: transform 0.1s ease;
  }

  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
  }
`;

const DockImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
`;

const DockWidget = ({ items }: { items?: DockApp[] }) => {
  const [openTooltip, setOpenTooltip] = useState<string | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  const handleToggleTooltip = useCallback((appName: string) => {
    setOpenTooltip((current) => (current === appName ? null : appName));
  }, []);

  // Check if dock content overflows
  useEffect(() => {
    const checkOverflow = () => {
      if (dockRef.current) {
        const isOverflow = dockRef.current.scrollWidth > dockRef.current.clientWidth;
        setIsOverflowing(isOverflow);
      }
    };

    checkOverflow();

    // Debounce resize events for better performance
    let timeoutId: NodeJS.Timeout;
    const debouncedCheckOverflow = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkOverflow, 150);
    };

    window.addEventListener("resize", debouncedCheckOverflow);
    return () => {
      window.removeEventListener("resize", debouncedCheckOverflow);
      clearTimeout(timeoutId);
    };
  }, [items]);

  useEffect(() => {
    if (!openTooltip) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenTooltip(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [openTooltip]);

  return (
    <WidgetContainer ref={containerRef}>
      <DockGlass ref={dockRef} $isOverflowing={isOverflowing}>
        {items?.map((app) => (
          <Tooltip
            portal
            key={app.name}
            content={app.name}
            side="top"
            sideOffset={12}
            open={openTooltip === app.name}
            onOpenChange={(isOpen) => setOpenTooltip(isOpen ? app.name : null)}>
            <DockInfoItem onTouchStart={() => handleToggleTooltip(app.name)}>
              <DockImage src={app.image} alt={app.name} loading="lazy" />
            </DockInfoItem>
          </Tooltip>
        ))}
      </DockGlass>
    </WidgetContainer>
  );
};

export default DockWidget;
