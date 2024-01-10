import styled from "styled-components";
import ViewCount from "./ViewCount";
import { useTranslation } from "react-i18next";

const FooterContainer = styled.footer`
  text-align: center;
  color: var(--text-muted);
  padding-top: 1rem;
  padding-bottom: 2rem;
  font-weight: 600;
`;

const Footer = () => {
  const { t } = useTranslation();

  return (
    <FooterContainer>
      <p>
        {t("footer.createdBy")} Axel ✨ · {new Date().getFullYear()} · <ViewCount />
      </p>
    </FooterContainer>
  );
};

export default Footer;
