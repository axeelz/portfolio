import { queryOptions, useQuery } from "@tanstack/react-query";

import { fetchPortfolioResponse, QUERY_KEYS } from "../utils/fetch";

export const portfolioQueryOptions = queryOptions({
  queryKey: [QUERY_KEYS.portfolioResponse],
  queryFn: fetchPortfolioResponse,
  retry: false,
});

export default function usePortfolioResponse() {
  return useQuery(portfolioQueryOptions);
}
