"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Equipment } from '@/types/customer';
import { EquipmentForm } from './EquipmentForm';
import { EquipmentCard } from './EquipmentCard';
import { EquipmentModal } from './EquipmentModal';

interface EquipmentListProps {
  equipmentType: Equipment['type'];
  userId: string;
  customerId: string;
  equipment: Equipment[];
  onEquipmentUpdate: (equipment: Equipment[]) => void;
}

export function EquipmentList({
  equipmentType,
  userId,
  customerId,
  equipment,
  onEquipmentUpdate,
}: EquipmentListProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);
  const [viewingEquipment, setViewingEquipment] = useState<Equipment | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEquipment = equipment.filter(item =>
    item.type === equipmentType &&
    (item.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.model?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddNew = () => {
    setEditingEquipment(null);
    setShowForm(true);
  };

  const handleEdit = (equipmentItem: Equipment) => {
    setEditingEquipment(equipmentItem);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this equipment?')) {
      const updatedEquipment = equipment.filter(item => item.id !== id);
      onEquipmentUpdate(updatedEquipment);
    }
  };

  const handleView = (equipmentItem: Equipment) => {
    setViewingEquipment(equipmentItem);
  };

  const handleSave = (equipmentData: Equipment) => {
    const updatedEquipment = editingEquipment
      ? equipment.map(item =>
          item.id === editingEquipment.id ? equipmentData : item
        )
      : [...equipment, equipmentData];

    onEquipmentUpdate(updatedEquipment);
    setShowForm(false);
    setEditingEquipment(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingEquipment(null);
  };

  const getEquipmentTypeLabel = () => {
    switch (equipmentType) {
      case 'computer':
        return 'Computers';
      case 'software':
        return 'Softwares';
      case 'printer':
        return 'Printers';
      case 'router':
        return 'Routers';
      case 'switch':
        return 'Switches';
      case 'modem':
        return 'Modems';
      default:
        return 'Equipments';
    }
  };

  const getEquipmentIcon = () => {
    switch (equipmentType) {
      case 'computer':
        return '💻';
      case 'software':
        return '📀';
      case 'printer':
        return '🖨️';
      case 'router':
        return '📡';
      case 'switch':
        return '🔌';
      case 'modem':
        return '📶';
      default:
        return '⚙️';
    }
  };

  if (showForm) {
    return (
      <EquipmentForm
        equipmentType={equipmentType}
        userId={userId}
        customerId={customerId}
        equipment={editingEquipment}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div className="space-y-4 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 lg:gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">{getEquipmentIcon()}</span>
          <h2 className="text-xl font-bold">{getEquipmentTypeLabel()}</h2>
          <span className="text-sm px-2 py-1 rounded-full bg-muted">
            {filteredEquipment.length} items
          </span>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="w-4 h-4 mr-2" />
          Add New {getEquipmentTypeLabel().slice(0, -1)}
        </Button>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder={`Search ${getEquipmentTypeLabel().toLowerCase()}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Equipment Grid */}
      {filteredEquipment.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">{getEquipmentIcon()}</div>
          <h3 className="text-lg font-medium mb-2">
            No {getEquipmentTypeLabel().toLowerCase()} found
          </h3>
          <p className="mb-4">
            {searchTerm
              ? `No equipment matches "${searchTerm}"`
              : `Get started by adding your first ${equipmentType}`}
          </p>
          {!searchTerm && (
            <Button onClick={handleAddNew}>
              <Plus className="w-4 h-4 mr-2" />
              Add {getEquipmentTypeLabel().slice(0, -1)}
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
          {filteredEquipment.map((item) => (
            <EquipmentCard
              key={item.id}
              equipment={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          ))}
        </div>
      )}

      {/* View Modal */}
      <EquipmentModal
        equipment={viewingEquipment}
        isOpen={!!viewingEquipment}
        onClose={() => setViewingEquipment(null)}
      />
    </div>
  );
}
