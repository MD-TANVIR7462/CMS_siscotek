"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { CustomerTable } from "@/components/customers/customer-table";
import { CustomerModal } from "@/components/customers/customer-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search } from "lucide-react";
import { AddCustomer, Customer } from "@/types/customer";
import { createData } from "@/server/serverActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CustomerIndex = ({ customerData }: { customerData: Customer[] }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [activeSearchTerm, setActiveSearchTerm] = useState("");
  const [inactiveSearchTerm, setInactiveSearchTerm] = useState("");

  const filterCustomers = (customerList: Customer[], searchTerm: string) => {
    if (!searchTerm) return customerList;

    return customerList.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.some((email) => email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        customer.telephone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.state.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const activeCustomers = filterCustomers(
    customerData.filter((customer) => customer.isActive),
    activeSearchTerm
  );
  const inactiveCustomers = filterCustomers(
    customerData.filter((customer) => !customer.isActive),
    inactiveSearchTerm
  );

  const handleAddCustomer = async (customerData: AddCustomer) => {
    const newCustomer: AddCustomer = {
      ...customerData,
    };

    try {
      const insertNewCustomer = await createData("customer/create-customer", newCustomer, "");
      console.log({ inserCustomer: insertNewCustomer });
      if (insertNewCustomer?.success) {
        toast.success("Customer created successfully.");
        setIsModalOpen(false);
        router.refresh();
      } else {
        toast.error(insertNewCustomer?.message || "Unable to create customer right now.");
        setIsModalOpen(false);
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.message || "Application Error!");
      router.refresh();
    }
  };

  const handleEditCustomer = (customerData: Partial<Customer>) => {
    if (editingCustomer) {
      // const updatedCustomer: Customer = {
      //   ...customerData,
      //   id: editingCustomer.id,
      //   createdAt: editingCustomer.createdAt,
      //   updatedAt: new Date(),
      // };

      setEditingCustomer(null);
      setIsModalOpen(false);
    }
  };

  const handleDeleteCustomer = (id: string) => {
    // setCustomers(customers.filter((customer) => customer.id !== id));
    console.log(id);
  };

  const openEditModal = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCustomer(null);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 lg:ml-64 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 mt-12 lg:mt-0">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
              <p className="text-muted-foreground mt-2">Manage your customer database and relationships</p>
            </div>
            <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New Customer
            </Button>
          </div>

          <Tabs defaultValue="active" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="active">Active ({customerData?.filter((c) => c.isActive).length})</TabsTrigger>
              <TabsTrigger value="inactive">Inactive ({customerData?.filter((c) => !c.isActive).length})</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              <div className="relative max-w-md mx-auto ">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground " />
                <Input
                  placeholder="Search active customers..."
                  value={activeSearchTerm}
                  onChange={(e) => setActiveSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <CustomerTable customers={activeCustomers} onEdit={openEditModal} onDelete={handleDeleteCustomer} />
            </TabsContent>

            <TabsContent value="inactive" className="space-y-4">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search inactive customers..."
                  value={inactiveSearchTerm}
                  onChange={(e) => setInactiveSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <CustomerTable customers={inactiveCustomers} onEdit={openEditModal} onDelete={handleDeleteCustomer} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

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
