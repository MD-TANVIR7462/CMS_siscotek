"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, X, User, Monitor, Server, Camera, Laptop } from "lucide-react";
import { CustomerUser } from "@/types/customer";
import { UserModal } from "./user-modal";

interface UserSidebarProps {
  users: CustomerUser[];
  selectedUserId: string | null;
  onUserSelect: (userId: string) => void;
  onUserAdd: (userData: Omit<CustomerUser, "id" | "createdAt" | "updatedAt">) => void;
  onUserUpdate: (userId: string, userData: Omit<CustomerUser, "id" | "createdAt" | "updatedAt">) => void;
  onUserDelete: (userId: string) => void;
  customerId: string;
}

export function UserSidebar({
  users,
  selectedUserId,
  onUserSelect,
  onUserAdd,
  onUserUpdate,
  onUserDelete,
  customerId,
}: UserSidebarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<CustomerUser | null>(null);

  //   const getIcon = (userName: string) => {
  //     const name = userName.toLowerCase();
  //     if (name.includes("server")) return Server;
  //     if (name.includes("camera") || name.includes("xvr") || name.includes("dahua")) return Camera;
  //     if (name.includes("laptop")) return Laptop;
  //     if (name.includes("pc") || name.includes("computer")) return Monitor;
  //     return User;
  //   };

  const handleAddUser = (userData: Omit<CustomerUser, "id" | "createdAt" | "updatedAt">) => {
    onUserAdd(userData);
    setIsModalOpen(false);
  };

  const handleEditUser = (userData: Omit<CustomerUser, "id" | "createdAt" | "updatedAt">) => {
    if (editingUser) {
      onUserUpdate(editingUser.id, userData);
      setEditingUser(null);
      setIsModalOpen(false);
    }
  };

  const openEditModal = (user: CustomerUser) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  return (
    <>
      <Card className="h-fit border">
        <CardContent className="p-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-xs  uppercase tracking-wider">Users & Devices</h3>
            <Button onClick={() => setIsModalOpen(true)} className="h-6 px-2 text-xs ">
              <Plus className="h-3 w-3 mr-1" />
              Add
            </Button>
          </div>

          <div className="space-y-1">
            {users.map((user) => {
              const IconComponent = User;
              const isSelected = selectedUserId === user.id;

              return (
                <div
                  key={user.id}
                  className={`group relative p-2 rounded-md border cursor-pointer transition-all ${
                    isSelected ? "bg-gray-100/80 border-gray-400/70 dark:bg-black dark:border-white" : " hover:bg-gray-50 dark:hover:bg-black"
                  }`}
                  onClick={() => onUserSelect(user.id)}
                >
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <IconComponent className={`h-3 w-3 `} />
                      <span
                        className={`absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full border border-white ${
                          user.active ? "bg-green-500" : "bg-red-500"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-medium truncate `}>{user.name}</p>
                      {user.department && <p className="text-[0.65rem] text-gray-500 truncate">{user.department}</p>}
                    </div>
                    <Button
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        onUserDelete(user.id);
                      }}
                      className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              );
            })}

            {users.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                <User className="h-5 w-5 mx-auto mb-1 text-gray-400" />
                <p className="text-xs">No users added</p>
                <p className="text-[0.65rem] text-gray-400">Click "Add" to create</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <UserModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={editingUser ? handleEditUser : handleAddUser}
        user={editingUser}
        customerId={customerId}
      />
    </>
  );
}
