import { useEffect, useState } from "react";
import { styled } from "styled-system/jsx";

import { copy } from "../data/copy";
import { incrementViewCount } from "../utils/fetch";

const Count = styled("span", {
  base: {
    fontSize: "1rem",
    fontWeight: 600,
    color: "var(--text-color)",
    fontVariantNumeric: "tabular-nums",
    marginRight: "0.25rem",
    marginLeft: "0.25rem",
  },
});

const ViewCount = () => {
  const [count, setCount] = useState<number | "...">("...");

  useEffect(() => {
    void incrementViewCount().then((count) => setCount(count ?? "..."));
  }, []);

  return (
    <span>
      <Count>{count}</Count>
      {copy.footer.views}
    </span>
  );
};

export default ViewCount;
