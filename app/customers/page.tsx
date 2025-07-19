"use client"

import React, { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { CustomerTable } from '@/components/customers/customer-table';
import { CustomerModal } from '@/components/customers/customer-modal';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus } from 'lucide-react';
import { Customer } from '@/types/customer';
import { mockCustomers } from '@/lib/mock-data';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const activeCustomers = customers.filter(customer => customer.active);
  const inactiveCustomers = customers.filter(customer => !customer.active);

  const handleAddCustomer = (customerData: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newCustomer: Customer = {
      ...customerData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setCustomers([...customers, newCustomer]);
    setIsModalOpen(false);
  };

  const handleEditCustomer = (customerData: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingCustomer) {
      const updatedCustomer: Customer = {
        ...customerData,
        id: editingCustomer.id,
        createdAt: editingCustomer.createdAt,
        updatedAt: new Date(),
      };
      setCustomers(customers.map(customer => 
        customer.id === editingCustomer.id ? updatedCustomer : customer
      ));
      setEditingCustomer(null);
      setIsModalOpen(false);
    }
  };

  const handleDeleteCustomer = (id: string) => {
    setCustomers(customers.filter(customer => customer.id !== id));
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
              <p className="text-muted-foreground mt-2">
                Manage your customer database and relationships
              </p>
            </div>
            <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New Customer
            </Button>
          </div>

          <Tabs defaultValue="active" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="active">
                Active ({activeCustomers.length})
              </TabsTrigger>
              <TabsTrigger value="inactive">
                Inactive ({inactiveCustomers.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="space-y-4">
              <CustomerTable 
                customers={activeCustomers}
                onEdit={openEditModal}
                onDelete={handleDeleteCustomer}
              />
            </TabsContent>
            
            <TabsContent value="inactive" className="space-y-4">
              <CustomerTable 
                customers={inactiveCustomers}
                onEdit={openEditModal}
                onDelete={handleDeleteCustomer}
              />
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
}