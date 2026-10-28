import { QueryClient } from '@tanstack/react-query';

// The one query client, provided in src/app/_layout.tsx.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});
