"use client";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { api } from "../api/axios.api";
import { User } from "../types/user";
import { toast } from "react-toastify";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  initialData?: User | null;
  mode: "create" | "update" | "delete";
};

export function UserFormModal({ isOpen, onClose, initialData, mode }: Props) {
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
    } else {
      setName("");
      setEmail("");
    }
  }, [initialData]);

  const mutation = useMutation({
    mutationFn: async () => {
      if (mode === "delete" && initialData?.id) {
        await api.delete(`/users/${initialData.id}`);
        return;
      }

      const payload = { name, email };

      if (mode === "update" && initialData?.id) {
        await api.put(`/users/${initialData.id}`, payload);
      } else if (mode === "create") {
        await api.post("/users", payload);
        setName("");
        setEmail("");
      }
    },
    onSuccess: () => {
      const message = (mode === "delete" ? "User deleted successfully!" : mode === "update" ? "User updated successfully!" : "User created successfully!")

      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(message);

      onClose();
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(`Something went wrong. Please try again. Error: ${error.message}`);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    },
  });


  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center shadow">
      <DialogBackdrop className="fixed inset-0 bg-black/65" aria-hidden="true" />

      <DialogPanel className="bg-white p-6 rounded shadow-md w-full max-w-md relative z-50">
        <DialogTitle className="text-lg font-bold mb-4 text-black">
          {mode === "create" && "Add User"}
          {mode === "update" && "Edit User"}
          {mode === "delete" && "Delete User"}
        </DialogTitle>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate();
          }}
          className="space-y-4"
        >
          {mode !== "delete" && (
            <div>
              <label htmlFor="name" className="block text-black/75 text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="w-full text-black/75 border border-black/20 px-3 py-2 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          {mode !== "delete" && (
            <div>
              <label htmlFor="email" className="block text-black/75 text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full text-black/75 border border-black/20 px-3 py-2 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}

          {mode === "delete" && (
            <div className="space-y-4">
              <div className="text-red-700 bg-red-100 p-4 rounded-md border border-red-300">
                <p className="font-semibold">Are you sure you want to delete this user?</p>
                <p className="text-sm">This action cannot be undone.</p>
              </div>

              <div className="bg-gray-100 text-black p-4 rounded-md border border-gray-300">
                <p><span className="font-medium">Name:</span> {initialData?.name}</p>
                <p><span className="font-medium">Email:</span> {initialData?.email}</p>
              </div>
            </div>
          )}


          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 transition-all hover:bg-gray-300 py-2 cursor-pointer text-black rounded border"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 transition-all cursor-pointer py-2 rounded ${mode === "delete" ? "bg-red-500 hover:bg-red-800" : "bg-green-600 hover:bg-green-800"} text-white`}
              disabled={mutation.isPending}
            >
              {mutation.isPending
                ? (mode === "delete" ? "Deleting..." : mode === "update" ? "Updating..." : "Saving...")
                : mode === "create"
                  ? "Save User"
                  : mode === "update"
                    ? "Update User"
                    : "Delete User"}
            </button>
          </div>
        </form>
      </DialogPanel>
    </Dialog >
  );
}
