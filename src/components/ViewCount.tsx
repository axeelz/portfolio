import { useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { updateCount } from "../utils";

const CountContainer = styled.span``;

const Count = styled.code`
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color);
  margin-right: 0.25rem;
  margin-left: 0.25rem;
`;

const ViewCount = () => {
  const [count, setCount] = useState<number | "...">("...");
  const { t } = useTranslation();

  useEffect(() => {
    updateCount().then((count) => setCount(count || "..."));
  }, []);

  return (
    <CountContainer>
      <Count>{count}</Count>
      {t("footer.views")}
    </CountContainer>
  );
};

export default ViewCount;
