import { act, render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { UserFormModal } from "../UserFormModal";
import { renderWithQueryClient } from "../../tests/utils";

const mockUser = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe("UserFormModal", () => {
  it("SHOULD render in 'create' mode with empty fields", async () => {
    await act(async () => {
      render(
        renderWithQueryClient(
          <UserFormModal
            isOpen={true}
            onClose={() => { }}
            initialData={null}
            mode="create"
          />
        )
      );
    });

    expect(screen.getByText("Add User")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toHaveValue("");
    expect(screen.getByLabelText("Email")).toHaveValue("");
    expect(screen.getByRole("button", { name: /save user/i })).toBeInTheDocument();
  });


  it("SHOULD render in 'update' mode with pre-filled data", async () => {
    await act(async () => {
      render(
        renderWithQueryClient(
          <UserFormModal
            isOpen={true}
            onClose={() => { }}
            initialData={mockUser}
            mode="update"
          />
        )
      );
    });

    expect(screen.getByText("Edit User")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toHaveValue("John Doe");
    expect(screen.getByLabelText("Email")).toHaveValue("john@example.com");
    expect(screen.getByRole("button", { name: /update user/i })).toBeInTheDocument();
  });


  it("SHOULD render in 'delete' mode with confirmation message", async () => {
    await act(async () => {
      render(
        renderWithQueryClient(
          <UserFormModal
            isOpen={true}
            onClose={() => { }}
            initialData={mockUser}
            mode="delete"
          />
        )
      );
    });

    expect(screen.getByText(/Are you sure you want to delete this user/i)).toBeInTheDocument();
    expect(screen.getByText("Name:")).toBeInTheDocument();
    expect(screen.getByText("Email:")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^delete user$/i })).toBeInTheDocument();
  });

});
