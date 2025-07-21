"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Eye } from "lucide-react";
import { Equipment } from "@/types/customer";

interface EquipmentCardProps {
  equipment: Equipment;
  onEdit: (equipment: Equipment) => void;
  onDelete: (id: string) => void;
  onView: (equipment: Equipment) => void;
}

export function EquipmentCard({
  equipment,
  onEdit,
  onDelete,
  onView,
}: EquipmentCardProps) {
  const getEquipmentIcon = () => {
    switch (equipment.type) {
      case "computer":
        return "💻";
      case "software":
        return "📀";
      case "printer":
        return "🖨️";
      case "router":
        return "📡";
      case "switch":
        return "🔌";
      case "modem":
        return "📶";
      default:
        return "⚙️";
    }
  };

  const formatDate = (date: Date | string) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString();
  };

  return (
    <Card className="h-full border border-gray-200 dark:border-gray-800 rounded-xl shadow-xs hover:shadow-sm transition duration-300 bg-white dark:bg-gray-950/30">
      <CardHeader className="pb-2 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-gray-200 dark:bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center text-xl">
              {getEquipmentIcon()}
            </div>
            <CardTitle className="text-base font-semibold truncate text-gray-900 dark:text-white">
              {equipment.equipmentName}
            </CardTitle>
          </div>
          <Badge
            variant="secondary"
            className="capitalize text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            {equipment.type}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="text-sm text-gray-700 dark:text-gray-300 mt-2 space-y-2">
        {equipment.brand && (
          <div className="flex justify-between">
            <span>Brand</span>
            <span className="font-medium">{equipment.brand}</span>
          </div>
        )}
        {equipment.model && (
          <div className="flex justify-between">
            <span>Model</span>
            <span className="font-medium">{equipment.model}</span>
          </div>
        )}
        {equipment.location && (
          <div className="flex justify-between">
            <span>Location</span>
            <span className="font-medium">{equipment.location}</span>
          </div>
        )}
        {equipment.serialNo && (
          <div className="flex justify-between">
            <span>Serial No.</span>
            <span className="font-medium text-xs">{equipment.serialNo}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Added On</span>
          <span className="font-medium">{formatDate(equipment.createdAt)}</span>
        </div>

        <div className="flex gap-2 pt-3 border-t border-gray-200 dark:border-gray-800 mt-3">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 h-8"
            onClick={() => onView(equipment)}
          >
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1 h-8"
            onClick={() => onEdit(equipment)}
          >
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-8 text-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-400/30"
            onClick={() => onDelete(equipment.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
