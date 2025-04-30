"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "../api/axios.api";
import { UserFormModal } from "./UserFormModal";
import { useState } from "react";
import { User } from "../types/user";
import formatDate from "../utils/format-date";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

export function UserTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "update" | "delete">("create");

  const [sortConfig, setSortConfig] = useState<{ key: keyof User; direction: "asc" | "desc" }>({
    key: "updatedAt",
    direction: "desc",
  });


  const { data: users, isLoading, error } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.get("/users");
      return res.data;
    },
  });

  const sortedUsers = [...(users || [])].sort((a, b) => {
    if (!sortConfig) return 0;

    const { key, direction } = sortConfig;
    const valueA = a[key];
    const valueB = b[key];

    if (!valueA || !valueB) return 0;

    if (typeof valueA === "string" && typeof valueB === "string") {
      return direction === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    const dateA = valueA instanceof Date ? valueA : new Date(valueA as string);
    const dateB = valueB instanceof Date ? valueB : new Date(valueB as string);

    if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
      return direction === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    }

    return 0;
  });

  const renderSortIcon = (key: keyof User) => {
    if (!sortConfig || sortConfig.key !== key) return null;

    return sortConfig.direction === "asc" ? (
      <FiChevronUp className="inline ml-1 text-md" />
    ) : (
      <FiChevronDown className="inline ml-1 text-md" />
    );
  };

  const handleSort = (key: keyof User) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">Failed to load users</p>;

  return (
    <div className="p-6">
      <UserFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={selectedUser}
        mode={modalMode}
      />

      <div className="w-full mb-6 flex flex-row items-center justify-between">
        <h1 className="text-xl font-bold">Users Management</h1>
        <button className="rounded-sm cursor-pointer bg-green-600 text-white px-2 py-2 text-sm font-bold"
          onClick={() => {
            setIsModalOpen(true);
            setModalMode("create");
            setSelectedUser(null);
          }}>
          + Add User
        </button>
      </div>
      <table className="w-full shadow-2xl shadow-white/35 text-sm rounded-md overflow-hidden">
        <thead className="bg-white text-black">
          <tr>
            <th onClick={() => handleSort("name")} className="text-left p-3 cursor-pointer select-none">
              Name {renderSortIcon("name")}
            </th>
            <th onClick={() => handleSort("email")} className="text-left p-3 cursor-pointer select-none">
              Email {renderSortIcon("email")}
            </th>
            <th onClick={() => handleSort("createdAt")} className="text-left p-3 cursor-pointer select-none">
              Created at {renderSortIcon("createdAt")}
            </th>
            <th onClick={() => handleSort("updatedAt")} className="text-left p-3 cursor-pointer select-none">
              Updated at {renderSortIcon("updatedAt")}
            </th>
            <th className="text-left p-3">Actions</th>
            <th className="text-left p-3"></th>
          </tr>
        </thead>


        <tbody className="bg-white text-black">
          {sortedUsers.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-3 font-medium">{user.name}</td>
              <td className="p-3 text-gray-600">{user.email}</td>
              <td className="p-3 text-gray-600">{formatDate(String(user.createdAt))}</td>
              <td className="p-3 text-gray-600">{formatDate(String(user.updatedAt))}</td>
              <td className="p-3 text-gray-600">{<button onClick={() => { setSelectedUser(user); setIsModalOpen(true); setModalMode("delete") }} className="bg-white border border-[#e5e7eb] cursor-pointer text-black px-2 py-2 rounded-md">{'🗑️ Delete'}</button>}</td>
              <td className="p-3 text-gray-600">{<button onClick={() => { setSelectedUser(user); setIsModalOpen(true); setModalMode("update") }} className="bg-white border border-[#e5e7eb] cursor-pointer text-black px-2 py-2 rounded-md">{'✏️ Update'}</button>}</td>
            </tr>
          ))}

          {users?.length === 0 && (
            <tr>
              <td colSpan={6} className="p-3 text-center text-gray-600">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}


