"use client"

import React, { useState, useEffect } from 'react';
import { Equipment } from '@/types/customer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Plus, Save, Trash2 } from 'lucide-react';

interface EquipmentFormProps {
  equipmentType: Equipment['type'];
  customerId: string;
  equipment: Equipment[];
  onEquipmentUpdate: (equipment: Equipment[]) => void;
}

interface EquipmentFormData {
  name: string;
  model: string;
  serialNumber: string;
  notes: string;
}

export function EquipmentForm({ 
  equipmentType, 
  customerId, 
  equipment, 
  onEquipmentUpdate 
}: EquipmentFormProps) {
  const [formData, setFormData] = useState<EquipmentFormData>({
    name: '',
    model: '',
    serialNumber: '',
    notes: '',
  });
  
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing equipment
      const updated = equipment.map(item => 
        item.id === editingId 
          ? { ...item, ...formData, updatedAt: new Date() }
          : item
      );
      onEquipmentUpdate(updated);
      setEditingId(null);
    } else {
      // Add new equipment
      const newEquipment: Equipment = {
        id: Date.now().toString(),
        customerId,
        type: equipmentType,
        ...formData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      onEquipmentUpdate([...equipment, newEquipment]);
    }
    
    // Reset form
    setFormData({
      name: '',
      model: '',
      serialNumber: '',
      notes: '',
    });
  };

  const handleEdit = (item: Equipment) => {
    setFormData({
      name: item.name,
      model: item.model || '',
      serialNumber: item.serialNumber || '',
      notes: item.notes || '',
    });
    setEditingId(item.id);
  };

  const handleDelete = (id: string) => {
    const updated = equipment.filter(item => item.id !== id);
    onEquipmentUpdate(updated);
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      model: '',
      serialNumber: '',
      notes: '',
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Equipment Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {editingId ? 'Edit Equipment' : 'Add New Equipment'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Equipment Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  placeholder="Enter equipment name"
                />
              </div>
              
              <div>
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  value={formData.model}
                  onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                  placeholder="Enter model number"
                />
              </div>
              
              <div>
                <Label htmlFor="serialNumber">Serial Number</Label>
                <Input
                  id="serialNumber"
                  value={formData.serialNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, serialNumber: e.target.value }))}
                  placeholder="Enter serial number"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Additional notes about this equipment"
                rows={3}
              />
            </div>
            
            <div className="flex gap-2">
              <Button type="submit" className="flex items-center gap-2">
                {editingId ? (
                  <>
                    <Save className="h-4 w-4" />
                    Update Equipment
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    Add Equipment
                  </>
                )}
              </Button>
              
              {editingId && (
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Equipment List */}
      {equipment.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Existing Equipment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {equipment.map((item, index) => (
                <div key={item.id}>
                  <div className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        {item.model && (
                          <p className="text-sm text-muted-foreground">Model: {item.model}</p>
                        )}
                      </div>
                      
                      <div>
                        {item.serialNumber && (
                          <p className="text-sm">
                            <span className="font-medium">S/N:</span> {item.serialNumber}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          Added: {item.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div>
                        {item.notes && (
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium">Notes:</span> {item.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {index < equipment.length - 1 && <Separator className="my-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}