"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Eye,
  EyeOff,
  Calendar as CalendarIcon,
  X,
  Settings,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react";
import { Customer } from "@/types/customer";

export interface WidgetVisibility {
  calendar: boolean;
  quickStats: boolean;
  customerSummary: boolean;
}

interface WidgetsPanelProps {
  customer: Customer;
//   equipmentCount: number;
//   usersCount: number;
  isVisible: boolean;
  onToggleVisibility: () => void;
  className?: string;
}

export function CalenderWidget({
  customer,
  isVisible,
  onToggleVisibility,
  className = "",
}: WidgetsPanelProps) {
  const [widgetVisibility, setWidgetVisibility] = useState<WidgetVisibility>({
    calendar: true,
    quickStats: true,
    customerSummary: true,
  });

  console.log(customer);
  const toggleWidget = (widgetName: keyof WidgetVisibility) => {
    setWidgetVisibility((prev) => ({
      ...prev,
      [widgetName]: !prev[widgetName],
    }));
  };

  const CalendarWidget = () =>
    widgetVisibility.calendar && (
      <div className="mt-6 w-full">
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
          selected={new Date()}
          onSelect={() => {}}
          className="rounded-md border shadow-sm w-full"
          captionLayout="dropdown"
        />
      </div>
    );

//   const QuickStatsWidget = () =>
//     widgetVisibility.quickStats && (
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium flex items-center gap-2">
//             <BarChart3 className="h-4 w-4" />
//             Quick Stats
//           </CardTitle>
//           <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => toggleWidget("quickStats")}>
//             <EyeOff className="h-3 w-3 text-red-400" />
//           </Button>
//         </CardHeader>
//         <CardContent className="p-3 space-y-3">
//           <div className="flex items-center justify-between">
//             <span className="text-xs text-muted-foreground">Total Equipment</span>
//             <span className="text-sm font-medium">{equipmentCount}</span>
//           </div>
//           <Separator />
//           <div className="flex items-center justify-between">
//             <span className="text-xs text-muted-foreground">Active Users</span>
//             <span className="text-sm font-medium">{usersCount}</span>
//           </div>
//           <Separator />
//           <div className="flex items-center justify-between">
//             <span className="text-xs text-muted-foreground">Open Tickets</span>
//             <span className="text-sm font-medium text-orange-600">3</span>
//           </div>
//           <Separator />
//           <div className="flex items-center justify-between">
//             <span className="text-xs text-muted-foreground">Monthly Revenue</span>
//             <span className="text-sm font-medium text-green-600">$2,450</span>
//           </div>
//         </CardContent>
//       </Card>
//     );

//   const CustomerSummaryWidget = () =>
//     widgetVisibility.customerSummary && (
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium flex items-center gap-2">
//             <User className="h-4 w-4" />
//             Customer Summary
//           </CardTitle>
//           <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => toggleWidget("customerSummary")}>
//             <EyeOff className="h-3 w-3 text-red-400" />
//           </Button>
//         </CardHeader>
//         <CardContent className="p-3 space-y-3">
//           <div>
//             <p className="text-xs text-muted-foreground">Email</p>
//             <p className="text-xs font-medium">{customer?.email?.[0]}</p>
//           </div>
//           <div>
//             <p className="text-xs text-muted-foreground">Phone</p>
//             <p className="text-xs font-medium">{customer?.telephone}</p>
//           </div>
//           <div>
//             <p className="text-xs text-muted-foreground">Location</p>
//             <p className="text-xs font-medium">
//               {customer?.city}, {customer?.state}
//             </p>
//           </div>
//           <div>
//             <p className="text-xs text-muted-foreground">Customer Since</p>
//             <p className="text-xs font-medium">{new Date(customer.createdAt).toLocaleDateString()}</p>
//           </div>
//         </CardContent>
//       </Card>
//     );

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`fixed right-0 top-0 h-full  bg-card border-l border-border z-40 ${className}`}>
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
            <Button variant="ghost" size="sm" onClick={onToggleVisibility}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <CalendarWidget />
          {/* <QuickStatsWidget />
          <CustomerSummaryWidget /> */}
        </div>
      </div>
    </div>
  );
}

export function WidgetsToggleButton({ isVisible, onClick }: { isVisible: boolean; onClick: () => void }) {
  return (
    <Button variant="ghost" size="sm" onClick={onClick} className="hidden lg:flex">
      {isVisible ? <PanelRightClose className="h-4 w-4" /> : <PanelRightOpen className="h-4 w-4" />}
    </Button>
  );
}

export function MobileWidgetsButton({ isVisible, onClick }: { isVisible: boolean; onClick: () => void }) {
  return (
    <button
      className="lg:hidden fixed bottom-4 right-4 z-50 rounded-full h-10 w-10 bg-primary text-primary-foreground flex items-center justify-center shadow-lg"
      onClick={onClick}
    >
      {isVisible ? <PanelRightClose className="h-5 w-5" /> : <PanelRightOpen className="h-5 w-5" />}
    </button>
  );
}
