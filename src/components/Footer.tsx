import { styled } from "styled-system/jsx";

import { copy } from "../data/copy";
import usePlayOnceInView from "../hooks/usePlayOnceInView";
import ViewCount from "./ViewCount";

const SHINE = "nameShine 900ms ease-in-out";

const FooterContainer = styled("footer", {
  base: {
    textAlign: "center",
    color: "var(--text-secondary)",
    paddingTop: "1rem",
    paddingBottom: "8rem",
    fontSize: "0.9rem",
    fontWeight: 500,
  },
});

const Name = styled("span", {
  base: {
    fontWeight: 600,
    color: "transparent",
    backgroundImage:
      "linear-gradient(100deg, var(--text-secondary) 40%, var(--text-color) 50%, var(--text-secondary) 60%)",
    backgroundSize: "300% 100%",
    backgroundPosition: "100% 0",
    backgroundClip: "text",
    "@media (prefers-reduced-motion: no-preference)": {
      "&[data-play]": { animation: SHINE },
      _canHover: { _hover: { animation: SHINE } },
    },
  },
});

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const nameRef = usePlayOnceInView<HTMLSpanElement>(1);

  return (
    <FooterContainer>
      <p>
        {copy.footer.createdBy} <Name ref={nameRef}>Axel</Name> ·{" "}
        <span suppressHydrationWarning>{currentYear}</span> · <ViewCount />
      </p>
    </FooterContainer>
  );
};

export default Footer;
