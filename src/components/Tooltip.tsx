import React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import styled, { css } from "styled-components";
import { scaleInSubtle, scaleOutSubtle } from "../styled/animations";

type TooltipProps = TooltipPrimitive.TooltipProps &
  Pick<React.ComponentProps<typeof TooltipPrimitive.Content>, "side"> & {
    content: React.ReactNode;
    link?: boolean;
    forceAnimation?: boolean;
  };

const TOOLTIP_BG_COLOR = "#333";

const TooltipContentStyled = styled(TooltipPrimitive.Content)<{ $forceAnimation?: boolean }>`
  padding: 4px 6px;
  background-color: ${TOOLTIP_BG_COLOR};
  color: #fff;
  border-radius: 4px;
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
  link = false,
  forceAnimation = false,
  ...props
}: TooltipProps) {
  return (
    <TooltipPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange} delayDuration={0}>
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
        }}>
        <div>{children}</div>
      </TooltipPrimitive.Trigger>
      <TooltipContentStyled
        side={side}
        align="center"
        collisionPadding={5}
        sideOffset={3}
        $forceAnimation={forceAnimation}
        onPointerDownOutside={(event) => {
          event.preventDefault();
        }}
        {...props}>
        {content}
        <TooltipArrowStyled width={12} height={6} />
      </TooltipContentStyled>
    </TooltipPrimitive.Root>
  );
}
