// "use client";

// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { Sidebar } from "@/components/sidebar";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Badge } from "@/components/ui/badge";
// import {
//   ArrowLeft,
//   Phone,
//   Mail,
//   MapPin,
//   Globe,
//   FileText,
//   Monitor,
//   Contact as FileContract,
//   FolderOpen,
//   ShoppingCart,
//   Ticket,
//   DollarSign,
//   Files,
// } from "lucide-react";
// import { Customer, Equipment } from "@/types/customer";
// import { mockCustomers, mockEquipment } from "@/lib/mock-data";
// import { EquipmentForm } from "@/components/customers/equipment-form";

// export default function CustomerDetailPage() {
//   const params = useParams();
//   const router = useRouter();
//   const customerId = params.id as string;

//   const [customer, setCustomer] = useState<Customer | null>(null);
//   const [equipment, setEquipment] = useState<Equipment[]>([]);

//   useEffect(() => {
//     const foundCustomer = mockCustomers.find((c) => c.id === customerId);
//     setCustomer(foundCustomer || null);

//     const customerEquipment = mockEquipment.filter((e) => e.customerId === customerId);
//     setEquipment(customerEquipment);
//   }, [customerId]);

//   if (!customer) {
//     return (
//       <div className="flex min-h-screen bg-background">
//         <Sidebar />
//         <main className="flex-1 lg:ml-64 p-4 lg:p-8">
//           <div className="max-w-7xl mx-auto">
//             <div className="text-center py-12">
//               <h1 className="text-2xl font-bold">Customer Not Found</h1>
//               <p className="text-muted-foreground mt-2">The customer you're looking for doesn't exist.</p>
//               <Button onClick={() => router.push("/customers")} className="mt-4">
//                 Back to Customers
//               </Button>
//             </div>
//           </div>
//         </main>
//       </div>
//     );
//   }

//   const equipmentTypes = [
//     { key: "computer", label: "Computer" },
//     { key: "software", label: "Software" },
//     { key: "printer", label: "Printer/Scanner/Copier" },
//     { key: "router", label: "Router" },
//     { key: "switch", label: "Switch" },
//     { key: "modem", label: "Modem" },
//     { key: "others", label: "Others" },
//     { key: "work", label: "Work" },
//   ];

//   const mainTabs = [
//     { key: "equipment", label: "Equipment", icon: Monitor },
//     { key: "contracts", label: "Contracts", icon: FileContract },
//     { key: "projects", label: "Projects", icon: FolderOpen },
//     { key: "orders", label: "Orders", icon: ShoppingCart },
//     { key: "tickets", label: "Tickets", icon: Ticket },
//     { key: "finance", label: "Finance", icon: DollarSign },
//     { key: "documents", label: "Documents", icon: Files },
//   ];

//   return (
//     <div className="flex min-h-screen bg-background">
//       <Sidebar />

//       <main className="flex-1 lg:ml-64 p-4 lg:p-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="mb-6 mt-12 lg:mt-0">
//             <Button variant="ghost" onClick={() => router.push("/customers")} className="mb-4">
//               <ArrowLeft className="h-4 w-4 mr-2" />
//               Back to Customers
//             </Button>

//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-3xl font-bold tracking-tight">{customer.name}</h1>
//                 <p className="text-muted-foreground mt-1">Customer Details & Management</p>
//               </div>
//               <Badge variant={customer.active ? "default" : "secondary"} className="text-sm">
//                 {customer.active ? "Active" : "Inactive"}
//               </Badge>
//             </div>
//           </div>

//           {/* Customer Information Card */}
//           <Card className="mb-8">
//             <CardHeader>
//               <CardTitle>Customer Information</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 <div className="space-y-3">
//                   <div className="flex items-center gap-2">
//                     <MapPin className="h-4 w-4 text-muted-foreground" />
//                     <div>
//                       <p className="font-medium">Address</p>
//                       <p className="text-sm text-muted-foreground">
//                         {customer.address}
//                         {customer.suite && `, ${customer.suite}`}
//                       </p>
//                       <p className="text-sm text-muted-foreground">
//                         {customer.city}, {customer.state} {customer.zip}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="space-y-3">
//                   <div className="flex items-center gap-2">
//                     <Phone className="h-4 w-4 text-muted-foreground" />
//                     <div>
//                       <p className="font-medium">Phone</p>
//                       <p className="text-sm text-muted-foreground">{customer.telephone}</p>
//                       {customer.fax && <p className="text-sm text-muted-foreground">Fax: {customer.fax}</p>}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="space-y-3">
//                   <div className="flex items-center gap-2">
//                     <Mail className="h-4 w-4 text-muted-foreground" />
//                     <div>
//                       <p className="font-medium">Email</p>
//                       {customer.emails.map((email, index) => (
//                         <p key={index} className="text-sm text-muted-foreground">
//                           {email}
//                         </p>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {customer.website && (
//                   <div className="flex items-center gap-2">
//                     <Globe className="h-4 w-4 text-muted-foreground" />
//                     <div>
//                       <p className="font-medium">Website</p>
//                       <a
//                         href={customer.website}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-sm text-blue-600 hover:underline"
//                       >
//                         {customer.website}
//                       </a>
//                     </div>
//                   </div>
//                 )}

//                 {customer.taxId && (
//                   <div className="flex items-center gap-2">
//                     <FileText className="h-4 w-4 text-muted-foreground" />
//                     <div>
//                       <p className="font-medium">Tax ID</p>
//                       <p className="text-sm text-muted-foreground">{customer.taxId}</p>
//                     </div>
//                   </div>
//                 )}

//                 {customer.notes && (
//                   <div className="md:col-span-2 lg:col-span-3">
//                     <p className="font-medium">Notes</p>
//                     <p className="text-sm text-muted-foreground mt-1">{customer.notes}</p>
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Main Tabs Section */}
//           <Tabs defaultValue="equipment" className="w-full">
//             <TabsList className="grid grid-cols-7 mb-8 h-auto p-1">
//               {mainTabs.map((tab) => {
//                 const IconComponent = tab.icon;
//                 return (
//                   <TabsTrigger
//                     key={tab.key}
//                     value={tab.key}
//                     className="flex flex-col items-center gap-2 py-3 px-4 "
//                   >
//                     <IconComponent className="h-5 w-5" />
//                     <span className="text-xs font-medium">{tab.label}</span>
//                   </TabsTrigger>
//                 );
//               })}
//             </TabsList>

//             {/* Equipment Tab */}
//             <TabsContent value="equipment">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Equipment Management</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <Tabs defaultValue="computer" className="w-full">
//                     <TabsList className="grid grid-cols-4 lg:grid-cols-8 mb-6">
//                       {equipmentTypes.map((type) => (
//                         <TabsTrigger key={type.key} value={type.key} className="text-xs px-2 py-2">
//                           {type.label}
//                         </TabsTrigger>
//                       ))}
//                     </TabsList>

//                     {equipmentTypes.map((type) => (
//                       <TabsContent key={type.key} value={type.key}>
//                         <EquipmentForm
//                           equipmentType={type.key as Equipment["type"]}
//                           customerId={customerId}
//                           equipment={equipment.filter((e) => e.type === type.key)}
//                           onEquipmentUpdate={(updatedEquipment) => {
//                             setEquipment((prev) => prev.filter((e) => e.type !== type.key).concat(updatedEquipment));
//                           }}
//                         />
//                       </TabsContent>
//                     ))}
//                   </Tabs>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             {/* Contracts Tab */}
//             <TabsContent value="contracts">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Contracts</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-center py-12">
//                     <FileContract className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
//                     <h3 className="text-lg font-semibold mb-2">No Contracts Yet</h3>
//                     <p className="text-muted-foreground mb-4">Start by creating a new contract for this customer.</p>
//                     <Button>Add Contract</Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             {/* Projects Tab */}
//             <TabsContent value="projects">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Projects</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-center py-12">
//                     <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
//                     <h3 className="text-lg font-semibold mb-2">No Projects Yet</h3>
//                     <p className="text-muted-foreground mb-4">Create a new project to track work for this customer.</p>
//                     <Button>New Project</Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             {/* Orders Tab */}
//             <TabsContent value="orders">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Orders</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-center py-12">
//                     <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
//                     <h3 className="text-lg font-semibold mb-2">No Orders Yet</h3>
//                     <p className="text-muted-foreground mb-4">Track orders and purchases for this customer.</p>
//                     <Button>Create Order</Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             {/* Tickets Tab */}
//             <TabsContent value="tickets">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Support Tickets</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-center py-12">
//                     <Ticket className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
//                     <h3 className="text-lg font-semibold mb-2">No Tickets Yet</h3>
//                     <p className="text-muted-foreground mb-4">Support tickets and issues will appear here.</p>
//                     <Button>New Ticket</Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             {/* Finance Tab */}
//             <TabsContent value="finance">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Financial Information</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-center py-12">
//                     <DollarSign className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
//                     <h3 className="text-lg font-semibold mb-2">No Financial Data</h3>
//                     <p className="text-muted-foreground mb-4">
//                       Invoices, payments, and financial records will show here.
//                     </p>
//                     <Button>Add Invoice</Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             {/* Documents Tab */}
//             <TabsContent value="documents">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Documents</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-center py-12">
//                     <Files className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
//                     <h3 className="text-lg font-semibold mb-2">No Documents</h3>
//                     <p className="text-muted-foreground mb-4">Upload and manage documents for this customer.</p>
//                     <Button>Upload Document</Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </main>
//     </div>
//   );
// }
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Globe,
  FileText,
  Monitor,
  Contact as FileContract,
  FolderOpen,
  ShoppingCart,
  Ticket,
  DollarSign,
  Files,
} from "lucide-react";
import { Customer, Equipment, CustomerUser } from "@/types/customer";
import { mockCustomers, mockEquipment, mockCustomerUsers } from "@/lib/mock-data";
import { UserSidebar } from "@/components/customers/user-sidebar";
import { EquipmentFormDetailed } from "@/components/customers/equipment-form-detailed";

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const customerId = params.id as string;

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [users, setUsers] = useState<CustomerUser[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    const foundCustomer = mockCustomers.find((c) => c.id === customerId);
    setCustomer(foundCustomer || null);

    const customerEquipment = mockEquipment.filter((e) => e.customerId === customerId);
    setEquipment(customerEquipment);

    const customerUsers = mockCustomerUsers.filter((u) => u.customerId === customerId);
    setUsers(customerUsers);

    // Auto-select first user if available
    if (customerUsers.length > 0) {
      setSelectedUserId(customerUsers[0].id);
    }
  }, [customerId]);

  if (!customer) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 lg:ml-64 p-4 lg:p-8">
          <div className="max-w-7xl  mx-auto">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold">Customer Not Found</h1>
              <p className="text-muted-foreground mt-2">The customer you're looking for doesn't exist.</p>
              <Button onClick={() => router.push("/customers")} className="mt-4">
                Back to Customers
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const equipmentTypes = [
    { key: "computer", label: "Computer" },
    { key: "software", label: "Software" },
    { key: "printer", label: "Printer/Scanner/Copier" },
    { key: "router", label: "Router" },
    { key: "switch", label: "Switch" },
    { key: "modem", label: "Modem" },
    { key: "others", label: "Others" },
    { key: "work", label: "Work" },
  ];

  const mainTabs = [
    { key: "equipment", label: "Equipment", icon: Monitor },
    { key: "contracts", label: "Contracts", icon: FileContract },
    { key: "projects", label: "Projects", icon: FolderOpen },
    { key: "orders", label: "Orders", icon: ShoppingCart },
    { key: "tickets", label: "Tickets", icon: Ticket },
    { key: "finance", label: "Finance", icon: DollarSign },
    { key: "documents", label: "Documents", icon: Files },
  ];

  const handleUserAdd = (userData: Omit<CustomerUser, "id" | "createdAt" | "updatedAt">) => {
    const newUser: CustomerUser = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setUsers([...users, newUser]);
    setSelectedUserId(newUser.id);
  };

  const handleUserUpdate = (userId: string, userData: Omit<CustomerUser, "id" | "createdAt" | "updatedAt">) => {
    const updatedUser: CustomerUser = {
      ...userData,
      id: userId,
      createdAt: users.find((u) => u.id === userId)?.createdAt || new Date(),
      updatedAt: new Date(),
    };
    setUsers(users.map((u) => (u.id === userId ? updatedUser : u)));
  };

  const handleUserDelete = (userId: string) => {
    setUsers(users.filter((u) => u.id !== userId));
    if (selectedUserId === userId) {
      const remainingUsers = users.filter((u) => u.id !== userId);
      setSelectedUserId(remainingUsers.length > 0 ? remainingUsers[0].id : null);
    }
    // Also remove equipment for this user
    setEquipment(equipment.filter((e) => e.userId !== userId));
  };

  const selectedUser = users.find((u) => u.id === selectedUserId);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 lg:ml-64 p-4 lg:p-8">
        <div className=" mx-auto">
          <Button variant="ghost" onClick={() => router.push("/customers")} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Customers
          </Button>
          <div className="mb-6 mt-12 lg:mt-0">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{customer.name}</h1>
                <p className="text-muted-foreground mt-1">Customer Details & Management</p>
              </div>
            </div>
          </div>
          <Tabs defaultValue="customerInfo">
            <TabsList className="grid grid-cols-2 max-w-md">
              <TabsTrigger value="customerInfo">Customer Info</TabsTrigger>
              <TabsTrigger value="userDetails">Details</TabsTrigger>
            </TabsList>
            <TabsContent value="customerInfo">
              {/* Customer Information Card */}
              <Card className="mb-8">
                <CardHeader className="flex">
                <span className="flex justify-end">
                  {" "}
                  <Badge variant={customer.active ? "default" : "secondary"} className="text-sm">
                    {customer.active ? "Active" : "Inactive"}
                  </Badge>
                </span>
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
                          {customer.fax && <p className="text-sm text-muted-foreground">Fax: {customer.fax}</p>}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Email</p>
                          {customer.emails.map((email, index) => (
                            <p key={index} className="text-sm text-muted-foreground">
                              {email}
                            </p>
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
            </TabsContent>
            <TabsContent value="userDetails">
              {/* Main Tabs Section */}
              <Tabs defaultValue="equipment" className="w-full">
                <TabsList className="grid grid-cols-7 mb-8 h-auto p-1">
                  {mainTabs.map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                      <TabsTrigger key={tab.key} value={tab.key} className="flex flex-col items-center gap-2 py-3 px-4">
                        <IconComponent className="h-5 w-5" />
                        <span className="text-xs font-medium">{tab.label}</span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                {/* Equipment Tab */}
                <TabsContent value="equipment">
                  <div className="grid grid-cols-12 gap-6">
                    {/* Left Sidebar - Users */}
                    <div className="col-span-12 lg:col-span-2">
                      <UserSidebar
                        users={users}
                        selectedUserId={selectedUserId}
                        onUserSelect={setSelectedUserId}
                        onUserAdd={handleUserAdd}
                        onUserUpdate={handleUserUpdate}
                        onUserDelete={handleUserDelete}
                        customerId={customerId}
                      />
                    </div>

                    {/* Main Content - Equipment Forms */}
                    <div className="col-span-12 lg:col-span-8">
                      {selectedUserId ? (
                        <Card>
                          <CardHeader>
                            <CardTitle>Equipment for {selectedUser?.name}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Tabs defaultValue="computer" className="w-full">
                              <TabsList className="grid grid-cols-4 lg:grid-cols-8 mb-6">
                                {equipmentTypes.map((type) => (
                                  <TabsTrigger key={type.key} value={type.key} className="text-xs px-2 py-2">
                                    {type.label}
                                  </TabsTrigger>
                                ))}
                              </TabsList>

                              {equipmentTypes.map((type) => (
                                <TabsContent key={type.key} value={type.key}>
                                  <EquipmentFormDetailed
                                    equipmentType={type.key as Equipment["type"]}
                                    userId={selectedUserId}
                                    customerId={customerId}
                                    equipment={equipment}
                                    onEquipmentUpdate={setEquipment}
                                  />
                                </TabsContent>
                              ))}
                            </Tabs>
                          </CardContent>
                        </Card>
                      ) : (
                        <Card>
                          <CardContent className="flex items-center justify-center py-12">
                            <div className="text-center">
                              <Monitor className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                              <h3 className="text-lg font-semibold mb-2">No User Selected</h3>
                              <p className="text-muted-foreground">
                                Select a user from the sidebar to manage their equipment.
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>

                    {/* Right Sidebar - Notes */}
                    <div className="col-span-12 lg:col-span-2">
                      <Card className="h-fit">
                        <CardHeader>
                          <CardTitle className="text-sm">Notes</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {selectedUserId && equipment.find((e) => e.userId === selectedUserId)?.notes ? (
                            <div className="space-y-2">
                              <p className="text-sm text-muted-foreground">
                                {equipment.find((e) => e.userId === selectedUserId)?.notes}
                              </p>
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">
                              Equipment notes will appear here when available.
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                {/* Other Tabs */}
                <TabsContent value="contracts">
                  <Card>
                    <CardHeader>
                      <CardTitle>Contracts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12">
                        <FileContract className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No Contracts Yet</h3>
                        <p className="text-muted-foreground mb-4">
                          Start by creating a new contract for this customer.
                        </p>
                        <Button>Add Contract</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="projects">
                  <Card>
                    <CardHeader>
                      <CardTitle>Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12">
                        <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No Projects Yet</h3>
                        <p className="text-muted-foreground mb-4">
                          Create a new project to track work for this customer.
                        </p>
                        <Button>New Project</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="orders">
                  <Card>
                    <CardHeader>
                      <CardTitle>Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12">
                        <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No Orders Yet</h3>
                        <p className="text-muted-foreground mb-4">Track orders and purchases for this customer.</p>
                        <Button>Create Order</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="tickets">
                  <Card>
                    <CardHeader>
                      <CardTitle>Support Tickets</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12">
                        <Ticket className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No Tickets Yet</h3>
                        <p className="text-muted-foreground mb-4">Support tickets and issues will appear here.</p>
                        <Button>New Ticket</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="finance">
                  <Card>
                    <CardHeader>
                      <CardTitle>Financial Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12">
                        <DollarSign className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No Financial Data</h3>
                        <p className="text-muted-foreground mb-4">
                          Invoices, payments, and financial records will show here.
                        </p>
                        <Button>Add Invoice</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="documents">
                  <Card>
                    <CardHeader>
                      <CardTitle>Documents</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12">
                        <Files className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No Documents</h3>
                        <p className="text-muted-foreground mb-4">Upload and manage documents for this customer.</p>
                        <Button>Upload Document</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
