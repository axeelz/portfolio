import { styled } from "styled-system/jsx";

import { copy } from "../data/copy";
import ViewCount from "./ViewCount";

const FooterContainer = styled("footer", {
  base: {
    textAlign: "center",
    color: "var(--text-secondary)",
    paddingTop: "1rem",
    paddingBottom: "8rem",
    fontWeight: 600,
  },
});

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <p>
        {copy.footer.createdBy} Axel ✨ · <span suppressHydrationWarning>{currentYear}</span> ·{" "}
        <ViewCount />
      </p>
    </FooterContainer>
  );
};

export default Footer;
