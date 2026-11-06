import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import React from "react";
import { styled } from "styled-system/jsx";

type TooltipContentProps = React.ComponentProps<typeof TooltipPrimitive.Content>;

type TooltipProps = TooltipPrimitive.TooltipProps &
  Pick<TooltipContentProps, "side" | "sideOffset"> & {
    content: React.ReactNode;
    link?: boolean;
    portal?: boolean;
  };

const TOOLTIP_BG_COLOR = "#333";

const TooltipContentStyled = styled(TooltipPrimitive.Content, {
  base: {
    padding: "4px 6px",
    backgroundColor: TOOLTIP_BG_COLOR,
    color: "#fff",
    borderRadius: "var(--radius-sm)",
    fontSize: "14px",
    lineHeight: 1.4,
    pointerEvents: "none",
    fontWeight: 500,
    transformOrigin: "var(--radix-tooltip-content-transform-origin)",
    '&[data-state="delayed-open"]': {
      animation: "scaleInSubtle 125ms var(--ease-out)",
    },
    '&[data-state="closed"]': {
      animation: "scaleOutSubtle 100ms ease-out",
    },
    "@media (prefers-reduced-motion: reduce)": {
      '&[data-state="delayed-open"], &[data-state="closed"]': { animation: "none" },
    },
  },
});

export function Tooltip({
  children,
  content,
  open,
  defaultOpen,
  onOpenChange,
  side = "bottom",
  sideOffset = 3,
  link = false,
  portal = false,
  ...props
}: TooltipProps) {
  const tooltipBody = (
    <TooltipContentStyled
      side={side}
      align="center"
      collisionPadding={5}
      sideOffset={sideOffset}
      onPointerDownOutside={(event: Event) => {
        event.preventDefault();
      }}
      {...props}
    >
      {content}
      <TooltipPrimitive.Arrow width={12} height={6} style={{ fill: TOOLTIP_BG_COLOR }} />
    </TooltipContentStyled>
  );

  return (
    <TooltipPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      delayDuration={0}
    >
      <TooltipPrimitive.Trigger
        asChild
        onPointerDown={(event) => {
          if (!link) {
            event.preventDefault();
          }
        }}
        onClick={(event) => {
          if (!link) {
            event.preventDefault();
          }
        }}
      >
        <div>{children}</div>
      </TooltipPrimitive.Trigger>
      {portal ? <TooltipPrimitive.Portal>{tooltipBody}</TooltipPrimitive.Portal> : tooltipBody}
    </TooltipPrimitive.Root>
  );
}
