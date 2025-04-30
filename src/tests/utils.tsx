import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const testQueryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

export function renderWithQueryClient(children: ReactNode) {
  return (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
}