import { useEffect, useState } from "react";
import { styled } from "styled-system/jsx";

import { copy } from "../data/copy";
import usePlayOnceInView from "../hooks/usePlayOnceInView";
import { incrementViewCount } from "../utils/fetch";
import RollingNumber, { rollOnPlay } from "./ui/RollingNumber";

const Count = styled("span", {
  base: {
    ...rollOnPlay,
    display: "inline-flex",
    alignItems: "baseline",
    gap: "0.3em",
  },
});

const ViewCount = () => {
  const [count, setCount] = useState<number | null>(null);
  const countRef = usePlayOnceInView<HTMLSpanElement>(0.1);

  useEffect(() => {
    void incrementViewCount().then(setCount);
  }, []);

  return (
    <Count ref={countRef}>
      {count !== null && (
        <>
          <RollingNumber value={count} />
          {copy.contact.views}
        </>
      )}
    </Count>
  );
};

export default ViewCount;
