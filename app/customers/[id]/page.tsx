"use client"

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Sidebar } from '@/components/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Phone, Mail, MapPin, Globe, FileText } from 'lucide-react';
import { Customer, Equipment } from '@/types/customer';
import { mockCustomers, mockEquipment } from '@/lib/mock-data';
import { EquipmentForm } from '@/components/customers/equipment-form';

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const customerId = params.id as string;
  
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [equipment, setEquipment] = useState<Equipment[]>([]);

  useEffect(() => {
    const foundCustomer = mockCustomers.find(c => c.id === customerId);
    setCustomer(foundCustomer || null);
    
    const customerEquipment = mockEquipment.filter(e => e.customerId === customerId);
    setEquipment(customerEquipment);
  }, [customerId]);

  if (!customer) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 lg:ml-64 p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold">Customer Not Found</h1>
              <p className="text-muted-foreground mt-2">
                The customer you're looking for doesn't exist.
              </p>
              <Button 
                onClick={() => router.push('/customers')} 
                className="mt-4"
              >
                Back to Customers
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const equipmentTypes = [
    { key: 'computer', label: 'Computer' },
    { key: 'software', label: 'Software' },
    { key: 'printer', label: 'Printer/Scanner/Copier' },
    { key: 'router', label: 'Router' },
    { key: 'switch', label: 'Switch' },
    { key: 'modem', label: 'Modem' },
    { key: 'others', label: 'Others' },
    { key: 'work', label: 'Work' },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 lg:ml-64 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 mt-12 lg:mt-0">
            <Button 
              variant="ghost" 
              onClick={() => router.push('/customers')}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Customers
            </Button>
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{customer.name}</h1>
                <p className="text-muted-foreground mt-1">Customer Details & Equipment</p>
              </div>
              <Badge variant={customer.active ? "default" : "secondary"} className="text-sm">
                {customer.active ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>

          {/* Customer Information Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">
                        {customer.address}
                        {customer.suite && `, ${customer.suite}`}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {customer.city}, {customer.state} {customer.zip}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">{customer.telephone}</p>
                      {customer.fax && (
                        <p className="text-sm text-muted-foreground">Fax: {customer.fax}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Email</p>
                      {customer.emails.map((email, index) => (
                        <p key={index} className="text-sm text-muted-foreground">{email}</p>
                      ))}
                    </div>
                  </div>
                </div>
                
                {customer.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Website</p>
                      <a 
                        href={customer.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {customer.website}
                      </a>
                    </div>
                  </div>
                )}
                
                {customer.taxId && (
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Tax ID</p>
                      <p className="text-sm text-muted-foreground">{customer.taxId}</p>
                    </div>
                  </div>
                )}
                
                {customer.notes && (
                  <div className="md:col-span-2 lg:col-span-3">
                    <p className="font-medium">Notes</p>
                    <p className="text-sm text-muted-foreground mt-1">{customer.notes}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Equipment Section */}
          <Card>
            <CardHeader>
              <CardTitle>Equipment Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="computer" className="w-full">
                <TabsList className="grid grid-cols-4 lg:grid-cols-8 mb-6">
                  {equipmentTypes.map((type) => (
                    <TabsTrigger
                      key={type.key}
                      value={type.key}
                      className="text-xs px-2 py-2"
                    >
                      {type.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {equipmentTypes.map((type) => (
                  <TabsContent key={type.key} value={type.key}>
                    <EquipmentForm
                      equipmentType={type.key as Equipment['type']}
                      customerId={customerId}
                      equipment={equipment.filter(e => e.type === type.key)}
                      onEquipmentUpdate={(updatedEquipment) => {
                        setEquipment(prev => 
                          prev.filter(e => e.type !== type.key).concat(updatedEquipment)
                        );
                      }}
                    />
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}