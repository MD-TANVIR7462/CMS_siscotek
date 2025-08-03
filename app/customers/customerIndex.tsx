"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { CustomerTable } from "@/components/customers/customer-table";
import { CustomerModal } from "@/components/customers/customer-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Plus, Search } from "lucide-react";
import { AddCustomer, Customer } from "@/types/customer";
import { createData, updateData } from "@/server/serverActions";
import { toast } from "sonner";

type Props = {
  customerData: Customer[];
};

const CustomerIndex = ({ customerData }: Props) => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [searchTerms, setSearchTerms] = useState({
    active: "",
    inactive: "",
  });

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCustomer(null);
  };

  const filterCustomers = (list: Customer[], term: string) => {
    const t = term.toLowerCase();
    return list.filter(
      (customer) =>
        customer.name.toLowerCase().includes(t) ||
        customer.email.some((email) => email.toLowerCase().includes(t)) ||
        customer.telephone.toLowerCase().includes(t) ||
        customer.address.toLowerCase().includes(t) ||
        customer.city.toLowerCase().includes(t) ||
        customer.state.toLowerCase().includes(t)
    );
  };

  const activeCustomers = useMemo(
    () =>
      filterCustomers(
        customerData.filter((c) => c.isActive),
        searchTerms.active
      ),
    [customerData, searchTerms.active]
  );

  const inactiveCustomers = useMemo(
    () =>
      filterCustomers(
        customerData.filter((c) => !c.isActive),
        searchTerms.inactive
      ),
    [customerData, searchTerms.inactive]
  );

  const handleAddCustomer = async (data: AddCustomer) => {
    try {
      const res = await createData("customer/create-customer", data, "");
      if (res?.success) {
        toast.success("Customer created successfully.");
      } else {
        toast.error(res?.message || "Unable to create customer.");
      }
    } catch (error: any) {
      toast.error(error.message || "Unexpected error occurred.");
    } finally {
      closeModal();
      router.refresh();
    }
  };

  const handleEditCustomer = async (data: Partial<Customer>) => {
    if (!editingCustomer) {
      toast.warning("No customer selected for editing.");
      return;
    }

    try {
      const res = await updateData(
        "customer/update-customer",
        editingCustomer._id as string,
        data,
        ""
      );
      if (res?.success) {
        toast.success("Customer updated successfully.");
      } else {
        toast.error(res?.message || "Unable to update customer.");
      }
    } catch (error: any) {
      toast.error(error.message || "Unexpected error occurred.");
    } finally {
      closeModal();
      router.refresh();
    }
  };

  const handleDeleteCustomer = (id: string) => {
    // Add deletion logic here when implemented
    console.log("Delete customer with id:", id);
  };

  const handleSearchChange = (type: "active" | "inactive", value: string) => {
    setSearchTerms((prev) => ({ ...prev, [type]: value }));
  };

  const openEditModal = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 lg:ml-64 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 mt-12 lg:mt-0">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
              <p className="text-muted-foreground mt-2">
                Manage your customer database and relationships
              </p>
            </div>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add New Customer
            </Button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="active" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="active">
                Active ({customerData.filter((c) => c.isActive).length})
              </TabsTrigger>
              <TabsTrigger value="inactive">
                Inactive ({customerData.filter((c) => !c.isActive).length})
              </TabsTrigger>
            </TabsList>

            {/* Active Tab */}
            <TabsContent value="active" className="space-y-4">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search active customers..."
                  value={searchTerms.active}
                  onChange={(e) =>
                    handleSearchChange("active", e.target.value)
                  }
                  className="pl-10"
                />
              </div>
              <CustomerTable
                customers={activeCustomers}
                onEdit={openEditModal}
                onDelete={handleDeleteCustomer}
              />
            </TabsContent>

            {/* Inactive Tab */}
            <TabsContent value="inactive" className="space-y-4">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search inactive customers..."
                  value={searchTerms.inactive}
                  onChange={(e) =>
                    handleSearchChange("inactive", e.target.value)
                  }
                  className="pl-10"
                />
              </div>
              <CustomerTable
                customers={inactiveCustomers}
                onEdit={openEditModal}
                onDelete={handleDeleteCustomer}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Modal */}
      <CustomerModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={editingCustomer ? handleEditCustomer : handleAddCustomer}
        customer={editingCustomer}
      />
    </div>
  );
};

export default CustomerIndex;
