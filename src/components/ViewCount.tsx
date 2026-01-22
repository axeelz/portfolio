import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { updateCount } from "../utils";

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
    <span>
      <Count>{count}</Count>
      {t("footer.views")}
    </span>
  );
};

export default ViewCount;
