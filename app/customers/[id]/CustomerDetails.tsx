"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Calendar as CalendarIcon,
  TrendingUp,
  Clock,
  AlertCircle,
  User,
  Settings,
  BarChart3,
  Activity,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react";
import { Customer, Equipment, CustomerUser } from "@/types/customer";
import { mockCustomers, mockEquipment, mockCustomerUsers } from "@/lib/mock-data";
import { EquipmentFormDetailed } from "@/components/customers/equipment-form-detailed";
import { EquipmentManagement } from "@/components/customers/EquipmentManagement";

interface WidgetVisibility {
  calendar: boolean;
  quickStats: boolean;
  customerSummary: boolean;
}

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const customerId = params.id as string;

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [users, setUsers] = useState<CustomerUser[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isWidgetSectionVisible, setIsWidgetSectionVisible] = useState(true);
  const [widgetVisibility, setWidgetVisibility] = useState<WidgetVisibility>({
    calendar: true,
    quickStats: true,
    customerSummary: true,
  });

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

    // Hide widget section on mobile by default
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsWidgetSectionVisible(false);
      } else {
        setIsWidgetSectionVisible(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [customerId]);

  const toggleWidget = (widgetName: keyof WidgetVisibility) => {
    setWidgetVisibility((prev) => ({
      ...prev,
      [widgetName]: !prev[widgetName],
    }));
  };

  const toggleWidgetSection = () => {
    setIsWidgetSectionVisible(!isWidgetSectionVisible);
  };

  if (!customer) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 lg:ml-64 p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
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
    setEquipment(equipment.filter((e) => e.userId !== userId));
  };

  const selectedUser = users.find((u) => u.id === selectedUserId);

  // Widget Components
  const CalendarWidget = () =>
    widgetVisibility.calendar && (
      <div className="mt-6 ">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="text-sm font-medium flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            Calendar
          </div>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => toggleWidget("calendar")}>
            <EyeOff className="h-3 w-3 text-red-400" />
          </Button>
        </div>

        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border shadow-sm"
          captionLayout="dropdown"
        />
      </div>
    );

  const QuickStatsWidget = () =>
    widgetVisibility.quickStats && (
      <Card className="mb-4 h">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Quick Stats
          </CardTitle>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => toggleWidget("quickStats")}>
            <EyeOff className="h-3 w-3 text-red-400" />
          </Button>
        </CardHeader>
        <CardContent className="p-3 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Total Equipment</span>
            <span className="text-sm font-medium">{equipment.length}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Active Users</span>
            <span className="text-sm font-medium">{users.length}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Open Tickets</span>
            <span className="text-sm font-medium text-orange-600">3</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Monthly Revenue</span>
            <span className="text-sm font-medium text-green-600">$2,450</span>
          </div>


        </CardContent>
      </Card>
    );

  const CustomerSummaryWidget = () =>
    widgetVisibility.customerSummary && (
      <Card className="mb-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <User className="h-4 w-4" />
            Customer Summary
          </CardTitle>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => toggleWidget("customerSummary")}>
            <EyeOff className="h-3 w-3 text-red-400" />
          </Button>
        </CardHeader>
        <CardContent className="p-3 space-y-3">
          <div>
            <p className="text-xs text-muted-foreground">Email</p>
            <p className="text-xs font-medium">{customer.emails[0]}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Phone</p>
            <p className="text-xs font-medium">01998863753</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Location</p>
            <p className="text-xs font-medium">
              {customer.city}, {customer.state}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Customer Since</p>
            <p className="text-xs font-medium">Jan 2023</p>
          </div>
        </CardContent>
      </Card>
    );

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      {/* Main Content */}
      <main className={`flex-1 lg:ml-64 p-3 transition-all duration-300 ${isWidgetSectionVisible ? "lg:pr-[304px]" : ""}`}>
        <div className="mx-auto">
          <div className="mb-6 mt-12 lg:mt-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{customer.name}</h1>
                <p className="text-muted-foreground mt-1 text-sm sm:text-base">Customer Details & Management</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={toggleWidgetSection} className="hidden lg:flex">
                  {isWidgetSectionVisible ? (
                    <PanelRightClose className="h-4 w-4" />
                  ) : (
                    <PanelRightOpen className="h-4 w-4" />
                  )}
                </Button>
                <Button variant="ghost" onClick={() => router.push("/customers")} className="mb-4 sm:mb-0">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Customers
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="management">
            <TabsList className="grid grid-cols-2 w-full sm:max-w-md">
              <TabsTrigger value="management">Management</TabsTrigger>
              <TabsTrigger value="customerInfo">Customer Info</TabsTrigger>
            </TabsList>

            <TabsContent value="management">
              <Tabs defaultValue="equipment" className="w-full">
                <TabsList className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 mb-4 sm:mb-8 h-auto p-1 overflow-x-auto">
                  {mainTabs.map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                      <TabsTrigger
                        key={tab.key}
                        value={tab.key}
                        className="flex flex-col items-center gap-1 sm:gap-2 py-2 sm:py-3 px-2 sm:px-4"
                      >
                        <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span className="text-xs font-medium">{tab.label}</span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                <TabsContent value="equipment">
                  <div className="grid grid-cols-12 gap-4 sm:gap-6">
                    <div className="col-span-12">
                      {selectedUserId ? (
                        <Card>
                          <CardHeader>
                            <CardTitle>Equipment for {selectedUser?.name}</CardTitle>
                          </CardHeader>
                          <EquipmentManagement
                            userId={selectedUserId}
                            customerId={customerId}
                            initialEquipment={equipment}
                          />
                        </Card>
                      ) : (
                        <Card>
                          <CardContent className="flex items-center justify-center py-8 sm:py-12">
                            <div className="text-center">
                              <Monitor className="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-muted-foreground mb-3 sm:mb-4" />
                              <h3 className="text-base sm:text-lg font-semibold mb-2">No User Selected</h3>
                              <p className="text-muted-foreground text-sm sm:text-base">
                                Select a user from the sidebar to manage their equipment.
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                </TabsContent>

                {[
                  {
                    value: "contracts",
                    icon: FileContract,
                    title: "Contracts",
                    description: "Start by creating a new contract for this customer.",
                  },
                  {
                    value: "projects",
                    icon: FolderOpen,
                    title: "Projects",
                    description: "Create a new project to track work for this customer.",
                  },
                  {
                    value: "orders",
                    icon: ShoppingCart,
                    title: "Orders",
                    description: "Track orders and purchases for this customer.",
                  },
                  {
                    value: "tickets",
                    icon: Ticket,
                    title: "Support Tickets",
                    description: "Support tickets and issues will appear here.",
                  },
                  {
                    value: "finance",
                    icon: DollarSign,
                    title: "Financial Information",
                    description: "Invoices, payments, and financial records will show here.",
                  },
                  {
                    value: "documents",
                    icon: Files,
                    title: "Documents",
                    description: "Upload and manage documents for this customer.",
                  },
                ].map((tab) => (
                  <TabsContent key={tab.value} value={tab.value}>
                    <Card>
                      <CardHeader>
                        <CardTitle>{tab.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-8 sm:py-12">
                          <tab.icon className="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-muted-foreground mb-3 sm:mb-4" />
                          <h3 className="text-base sm:text-lg font-semibold mb-2">No {tab.title} Yet</h3>
                          <p className="text-muted-foreground text-sm sm:text-base mb-4">{tab.description}</p>
                          <Button>Add {tab.title.split(" ")[0]}</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </TabsContent>

            <TabsContent value="customerInfo">
              <Card className="mb-6 sm:mb-8">
                <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <CardTitle>Customer Information</CardTitle>
                  <Badge variant={customer.active ? "default" : "secondary"} className="text-sm self-end sm:self-auto">
                    {customer.active ? "Active" : "Inactive"}
                  </Badge>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
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

                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-start gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-sm text-muted-foreground">{customer.telephone}</p>
                          {customer.fax && <p className="text-sm text-muted-foreground">Fax: {customer.fax}</p>}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-start gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
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
                      <div className="flex items-start gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Website</p>
                          <a
                            href={customer.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline break-all"
                          >
                            {customer.website}
                          </a>
                        </div>
                      </div>
                    )}

                    {customer.taxId && (
                      <div className="flex items-start gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
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
          </Tabs>
        </div>
      </main>

      {/* Widget Section */}
      {isWidgetSectionVisible && (
        <div className="hidden lg:block fixed right-0 top-0 h-full w-72 bg-card border-l border-border">
          <div className="p-4 h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Widgets</h3>
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56">
                    <div className="space-y-2">
                      <h4 className="font-medium">Show/Hide Widgets</h4>
                      <div className="space-y-2">
                        {Object.entries(widgetVisibility).map(([key, visible]) => (
                          <div key={key} className="flex items-center justify-between">
                            <span className="text-sm capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => toggleWidget(key as keyof WidgetVisibility)}
                            >
                              {visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                <Button variant="ghost" size="sm" onClick={toggleWidgetSection}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <CalendarWidget />
              <QuickStatsWidget />
              <CustomerSummaryWidget />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Widget Button */}
      <Button className="lg:hidden fixed bottom-4 right-4 z-50 rounded-full h-12 w-12" onClick={toggleWidgetSection}>
        <Settings className="h-5 w-5" />
      </Button>

      {/* Mobile Widget Overlay */}
      {isWidgetSectionVisible && (
        <div className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40">
          <div className="fixed right-0 top-0 h-full w-80 max-w-[90vw] bg-card border-l border-border">
            <div className="p-4 h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Widgets</h3>
                <Button variant="ghost" size="sm" onClick={toggleWidgetSection}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <CalendarWidget />
                <QuickStatsWidget />
                <CustomerSummaryWidget />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
