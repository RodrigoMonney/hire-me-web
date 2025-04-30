import { describe, it, expect, vi } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserTable } from "../UserTable";
import { api } from "../../api/axios.api";
import { renderWithQueryClient } from "../../tests/utils";

const mockUsers = [
  {
    id: "1",
    name: "Alice",
    email: "alice@example.com",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

describe("UserTable", () => {
  it("SHOULD render the user table with one user", async () => {
    vi.spyOn(api, "get").mockResolvedValueOnce({ data: mockUsers });

    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <UserTable />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Users Management")).toBeInTheDocument();
      expect(screen.getByText("Alice")).toBeInTheDocument();
      expect(screen.getByText("alice@example.com")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /add user/i })).toBeInTheDocument();
    });
  });

  it("SHOULD render error message when request fails", async () => {
    vi.spyOn(api, "get").mockRejectedValueOnce(new Error("API Error"));

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <UserTable />
        </QueryClientProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Failed to load users")).toBeInTheDocument();
    });
  });



  it("SHOULD show loading state", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <UserTable />
      </QueryClientProvider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("SHOULD show empty message when no users are returned", async () => {
    vi.spyOn(api, "get").mockResolvedValueOnce({ data: [] });

    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <UserTable />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("No users found")).toBeInTheDocument();
    });
  });

});
