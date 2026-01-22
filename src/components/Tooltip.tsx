import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import React from "react";
import styled, { css } from "styled-components";

import { scaleInSubtle, scaleOutSubtle } from "../styled/animations";

type TooltipContentProps = React.ComponentProps<typeof TooltipPrimitive.Content>;

type TooltipProps = TooltipPrimitive.TooltipProps &
  Pick<TooltipContentProps, "side" | "sideOffset"> & {
    content: React.ReactNode;
    link?: boolean;
    forceAnimation?: boolean;
    portal?: boolean;
  };

const TOOLTIP_BG_COLOR = "#333";

const TooltipContentStyled = styled(TooltipPrimitive.Content)<{ $forceAnimation?: boolean }>`
  padding: 4px 6px;
  background-color: ${TOOLTIP_BG_COLOR};
  color: #fff;
  border-radius: var(--radius-sm);
  font-size: 14px;
  line-height: 1.4;
  pointer-events: none;
  font-weight: 500;

  transform-origin: var(--radix-tooltip-content-transform-origin);
  ${({ $forceAnimation }) =>
    $forceAnimation &&
    css`
      animation: ${scaleInSubtle} 0.2s ease-out;
    `}
  &[data-state="delayed-open"] {
    animation: ${scaleInSubtle} 0.2s ease-out;
  }
  &[data-state="closed"] {
    animation: ${scaleOutSubtle} 0.1s ease-in;
  }
`;

const TooltipArrowStyled = styled(TooltipPrimitive.Arrow)`
  fill: ${TOOLTIP_BG_COLOR};
`;

export function Tooltip({
  children,
  content,
  open,
  defaultOpen,
  onOpenChange,
  side = "bottom",
  sideOffset = 3,
  link = false,
  forceAnimation = false,
  portal = false,
  ...props
}: TooltipProps) {
  const tooltipBody = (
    <TooltipContentStyled
      side={side}
      align="center"
      collisionPadding={5}
      sideOffset={sideOffset}
      $forceAnimation={forceAnimation}
      onPointerDownOutside={(event) => {
        event.preventDefault();
      }}
      {...props}
    >
      {content}
      <TooltipArrowStyled width={12} height={6} />
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
