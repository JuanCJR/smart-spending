import { QueryClient } from "@tanstack/react-query";

/**
 * Creates a `QueryClient` with defaults suited for an SSR framework-mode app:
 * retries disabled so failures surface immediately during render/tests.
 */
export function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
}
