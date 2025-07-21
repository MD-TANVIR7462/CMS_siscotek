"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Equipment } from "@/types/customer";

interface EquipmentModalProps {
  equipment: Equipment | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EquipmentModal({ equipment, isOpen, onClose }: EquipmentModalProps) {
  if (!equipment) return null;

  const formatDate = (date: Date | string) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString();
  };

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

  const DetailRow = ({ label, value }: { label: string; value?: string | null }) => {
    if (!value) return null;
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-2 border-b border-gray-100">
        <span className="font-medium text-gray-700">{label}:</span>
        <span className="md:col-span-2 text-gray-900 break-words">{value}</span>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-lg md:max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{getEquipmentIcon()}</span>
            <div>
              <DialogTitle className="text-xl font-bold text-gray-900">{equipment.equipmentName}</DialogTitle>
              <Badge variant="secondary" className="capitalize mt-1">
                {equipment.type}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Basic Information</h3>
            <div className="space-y-1">
              <DetailRow label="Equipment Name" value={equipment.equipmentName} />
              <DetailRow label="Type" value={equipment.equipmentType} />
              <DetailRow label="Location" value={equipment.location} />
              <DetailRow label="Brand" value={equipment.brand} />
              <DetailRow label="Model" value={equipment.model} />
            </div>
          </div>

          {/* Technical Specifications (for computers) */}
          {equipment.type === "computer" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Technical Specifications</h3>
              <div className="space-y-1">
                <DetailRow label="Processor" value={equipment.processor} />
                <DetailRow label="Speed" value={equipment.speed} />
                <DetailRow label="RAM" value={equipment.ram} />
                <DetailRow label="HDD" value={equipment.hdd} />
                <DetailRow label="Optical Disk" value={equipment.opticalDisk} />
                <DetailRow label="Operating System" value={equipment.os} />
                <DetailRow label="Product Key" value={equipment.productKey} />
                <DetailRow label="Service Tag" value={equipment.serviceTag} />
              </div>
            </div>
          )}

          {/* Software Information */}
          {(equipment.type === "computer" || equipment.type === "software") && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Software Information</h3>
              <div className="space-y-1">
                <DetailRow label="Antivirus" value={equipment.antivirus} />
                <DetailRow label="Antivirus Product Key" value={equipment.antivirusProductKey} />
                <DetailRow label="Antivirus Password" value={equipment.antivirusPassword} />
                <DetailRow label="Antivirus Expire Date" value={equipment.antivirusExpireDate} />
              </div>
            </div>
          )}

          {/* Purchase Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Purchase Information</h3>
            <div className="space-y-1">
              <DetailRow label="Vendor" value={equipment.vendor} />
              <DetailRow label="Purchase Date" value={equipment.purchaseDate} />
              <DetailRow label="Warranty Expire Date" value={equipment.warrantyExpireDate} />
              <DetailRow label="Serial Number" value={equipment.serialNo} />
            </div>
          </div>

          {/* Notes */}
          {equipment.notes && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Notes</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 whitespace-pre-wrap">{equipment.notes}</p>
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Record Information</h3>
            <div className="space-y-1">
              <DetailRow label="Created" value={formatDate(equipment.createdAt)} />
              <DetailRow label="Last Updated" value={formatDate(equipment.updatedAt)} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
