import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const supabase = createClient("https://sxjyvjtxxqqatlvhdsgq.supabase.co", import.meta.env.VITE_PUBLIC_SUPABASE_KEY);

const CountContainer = styled.span``;

const Count = styled.code`
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color);
  margin-right: 0.25rem;
  margin-left: 0.25rem;
`;

const ViewCount = () => {
  const [count, setCount] = useState("...");
  const { t } = useTranslation();

  useEffect(() => {
    updateCount();
  }, []);

  async function getCount() {
    const { data, error } = await supabase.from("stats").select("views").eq("id", 1);
    if (error || !data[0]) {
      console.warn(error || "No data found for pageviews.");
      return null;
    }
    setCount(data[0].views);
    return data[0].views;
  }

  async function updateCount() {
    const currentCount = await getCount();
    if (!currentCount) {
      return;
    }
    const newCount = currentCount + 1;
    const { error } = await supabase.from("stats").update({ views: newCount }).eq("id", 1);
    if (error) {
      console.warn(error);
      return;
    }
    setCount(newCount);
  }

  return (
    <CountContainer>
      <Count>{count}</Count>
      {t("footer.views")}
    </CountContainer>
  );
};

export default ViewCount;
