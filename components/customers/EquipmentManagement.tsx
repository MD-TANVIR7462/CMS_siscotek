"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Equipment } from "@/types/customer";
import { EquipmentManager } from "./Equipment";

interface EquipmentManagementProps {
  userId: string;
  customerId: string;
  initialEquipment?: Equipment[];
}

export function EquipmentManagement({ userId, customerId, initialEquipment = [] }: EquipmentManagementProps) {
  const [activeTab, setActiveTab] = useState("computer");

  const equipmentTabs = [
    { value: "computer", label: "Computers" },
    { value: "software", label: "Software" },
    { value: "printer", label: "Printer/Scanner" },
    { value: "router", label: "Routers" },
    { value: "switch", label: "Switches" },
    { value: "modem", label: "Modems" },
    { value: "others", label: "Others" },
    { value: "work", label: "Work" },
  ];

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full ">
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-6  2xl:grid-cols-8 gap-2  h-auto overflow-x-auto">
          {equipmentTabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex items-center gap-2 "
            >
              <span className=" text-xs font-medium ">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {equipmentTabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className=" mt-0">
            <EquipmentManager
              equipmentType={tab.value as Equipment["type"]}
              userId={userId}
              customerId={customerId}
              initialEquipment={initialEquipment}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
