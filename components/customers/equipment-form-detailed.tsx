"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Equipment } from '@/types/customer';

interface EquipmentFormDetailedProps {
  equipmentType: Equipment['type'];
  userId: string;
  customerId: string;
  equipment: Equipment[];
  onEquipmentUpdate: (equipment: Equipment[]) => void;
}

export function EquipmentFormDetailed({
  equipmentType,
  userId,
  customerId,
  equipment,
  onEquipmentUpdate,
}: EquipmentFormDetailedProps) {
  const [formData, setFormData] = useState<Partial<Equipment>>({
    equipmentName: '',
    location: '',
    equipmentType: '',
    brand: '',
    model: '',
    processor: '',
    speed: '',
    ram: '',
    hdd: '',
    opticalDisk: '',
    os: '',
    productKey: '',
    antivirus: '',
    antivirusProductKey: '',
    antivirusPassword: '',
    antivirusExpireDate: '',
    vendor: '',
    purchaseDate: '',
    warrantyExpireDate: '',
    serialNo: '',
    serviceTag: '',
    notes: '',
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    // Load existing equipment data for this user and type
    const existingEquipment = equipment.find(e => e.userId === userId && e.type === equipmentType);
    if (existingEquipment) {
      setFormData(existingEquipment);
      setEditingId(existingEquipment.id);
    } else {
      // Reset form for new equipment
      setFormData({
        equipmentName: '',
        location: '',
        equipmentType: '',
        brand: '',
        model: '',
        processor: '',
        speed: '',
        ram: '',
        hdd: '',
        opticalDisk: '',
        os: '',
        productKey: '',
        antivirus: '',
        antivirusProductKey: '',
        antivirusPassword: '',
        antivirusExpireDate: '',
        vendor: '',
        purchaseDate: '',
        warrantyExpireDate: '',
        serialNo: '',
        serviceTag: '',
        notes: '',
      });
      setEditingId(null);
    }
  }, [userId, equipmentType, equipment]);

  const handleChange = (field: keyof Equipment, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!formData.equipmentName?.trim()) {
      alert('Equipment name is required');
      return;
    }

    const equipmentData: Equipment = {
      id: editingId || Date.now().toString(),
      customerId,
      userId,
      type: equipmentType,
      equipmentName: formData.equipmentName || '',
      location: formData.location || '',
      equipmentType: formData.equipmentType || '',
      brand: formData.brand || '',
      model: formData.model || '',
      processor: formData.processor || '',
      speed: formData.speed || '',
      ram: formData.ram || '',
      hdd: formData.hdd || '',
      opticalDisk: formData.opticalDisk || '',
      os: formData.os || '',
      productKey: formData.productKey || '',
      antivirus: formData.antivirus || '',
      antivirusProductKey: formData.antivirusProductKey || '',
      antivirusPassword: formData.antivirusPassword || '',
      antivirusExpireDate: formData.antivirusExpireDate || '',
      vendor: formData.vendor || '',
      purchaseDate: formData.purchaseDate || '',
      warrantyExpireDate: formData.warrantyExpireDate || '',
      serialNo: formData.serialNo || '',
      serviceTag: formData.serviceTag || '',
      notes: formData.notes || '',
      createdAt: editingId ? equipment.find(e => e.id === editingId)?.createdAt || new Date() : new Date(),
      updatedAt: new Date(),
    };

    const updatedEquipment = editingId
      ? equipment.map(e => e.id === editingId ? equipmentData : e)
      : [...equipment, equipmentData];

    onEquipmentUpdate(updatedEquipment);
  };

  const renderComputerFields = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="equipmentName">Equipment Name *</Label>
          <Input
            id="equipmentName"
            value={formData.equipmentName || ''}
            onChange={(e) => handleChange('equipmentName', e.target.value)}
            placeholder="Equipment Name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="Location"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="equipmentType">Type</Label>
          <Input
            id="equipmentType"
            value={formData.equipmentType || ''}
            onChange={(e) => handleChange('equipmentType', e.target.value)}
            placeholder="Type"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="brand">Brand</Label>
          <Input
            id="brand"
            value={formData.brand || ''}
            onChange={(e) => handleChange('brand', e.target.value)}
            placeholder="Brand"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="model">Model</Label>
          <Input
            id="model"
            value={formData.model || ''}
            onChange={(e) => handleChange('model', e.target.value)}
            placeholder="Model"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="processor">Processor</Label>
          <Input
            id="processor"
            value={formData.processor || ''}
            onChange={(e) => handleChange('processor', e.target.value)}
            placeholder="Processor"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="speed">Speed</Label>
          <Input
            id="speed"
            value={formData.speed || ''}
            onChange={(e) => handleChange('speed', e.target.value)}
            placeholder="Speed"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ram">RAM</Label>
          <Input
            id="ram"
            value={formData.ram || ''}
            onChange={(e) => handleChange('ram', e.target.value)}
            placeholder="RAM"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="hdd">HDD</Label>
          <Input
            id="hdd"
            value={formData.hdd || ''}
            onChange={(e) => handleChange('hdd', e.target.value)}
            placeholder="HDD"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="opticalDisk">Optical Disk</Label>
          <Input
            id="opticalDisk"
            value={formData.opticalDisk || ''}
            onChange={(e) => handleChange('opticalDisk', e.target.value)}
            placeholder="Optical Disk"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="os">Operating System</Label>
          <Input
            id="os"
            value={formData.os || ''}
            onChange={(e) => handleChange('os', e.target.value)}
            placeholder="Operating System"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="productKey">Product Key</Label>
          <Input
            id="productKey"
            value={formData.productKey || ''}
            onChange={(e) => handleChange('productKey', e.target.value)}
            placeholder="Product Key"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="antivirus">Anti-virus</Label>
          <Input
            id="antivirus"
            value={formData.antivirus || ''}
            onChange={(e) => handleChange('antivirus', e.target.value)}
            placeholder="Antivirus"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="antivirusProductKey">Anti-virus Product Key</Label>
          <Input
            id="antivirusProductKey"
            value={formData.antivirusProductKey || ''}
            onChange={(e) => handleChange('antivirusProductKey', e.target.value)}
            placeholder="Antivirus Product Key"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="antivirusPassword">Anti-virus Password</Label>
          <Input
            id="antivirusPassword"
            value={formData.antivirusPassword || ''}
            onChange={(e) => handleChange('antivirusPassword', e.target.value)}
            placeholder="Antivirus Password"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="antivirusExpireDate">Anti-virus expire date</Label>
          <Input
            id="antivirusExpireDate"
            value={formData.antivirusExpireDate || ''}
            onChange={(e) => handleChange('antivirusExpireDate', e.target.value)}
            placeholder="Antivirus expire date"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="vendor">Vendor</Label>
          <Input
            id="vendor"
            value={formData.vendor || ''}
            onChange={(e) => handleChange('vendor', e.target.value)}
            placeholder="Vendor"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="purchaseDate">Purchase Date</Label>
          <Input
            id="purchaseDate"
            value={formData.purchaseDate || ''}
            onChange={(e) => handleChange('purchaseDate', e.target.value)}
            placeholder="Purchase Date"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="warrantyExpireDate">Warranty Expire Date</Label>
          <Input
            id="warrantyExpireDate"
            value={formData.warrantyExpireDate || ''}
            onChange={(e) => handleChange('warrantyExpireDate', e.target.value)}
            placeholder="Warranty Expire Date"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="serialNo">Serial No</Label>
          <Input
            id="serialNo"
            value={formData.serialNo || ''}
            onChange={(e) => handleChange('serialNo', e.target.value)}
            placeholder="Serial No"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="serviceTag">Service Tag</Label>
        <Input
          id="serviceTag"
          value={formData.serviceTag || ''}
          onChange={(e) => handleChange('serviceTag', e.target.value)}
          placeholder="Service Tag"
        />
      </div>
    </>
  );

  const renderSoftwareFields = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="equipmentName">Software Name *</Label>
        <Input
          id="equipmentName"
          value={formData.equipmentName || ''}
          onChange={(e) => handleChange('equipmentName', e.target.value)}
          placeholder="Software Name"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="brand">Brand</Label>
          <Input
            id="brand"
            value={formData.brand || ''}
            onChange={(e) => handleChange('brand', e.target.value)}
            placeholder="Brand"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="productKey">Product Key</Label>
          <Input
            id="productKey"
            value={formData.productKey || ''}
            onChange={(e) => handleChange('productKey', e.target.value)}
            placeholder="Product Key"
          />
        </div>
      </div>
    </div>
  );

  const renderOtherFields = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="equipmentName">Equipment Name *</Label>
        <Input
          id="equipmentName"
          value={formData.equipmentName || ''}
          onChange={(e) => handleChange('equipmentName', e.target.value)}
          placeholder="Equipment Name"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="brand">Brand</Label>
          <Input
            id="brand"
            value={formData.brand || ''}
            onChange={(e) => handleChange('brand', e.target.value)}
            placeholder="Brand"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="model">Model</Label>
          <Input
            id="model"
            value={formData.model || ''}
            onChange={(e) => handleChange('model', e.target.value)}
            placeholder="Model"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {equipmentType === 'computer' && renderComputerFields()}
        {equipmentType === 'software' && renderSoftwareFields()}
        {(equipmentType === 'printer' || equipmentType === 'router' || equipmentType === 'switch' || equipmentType === 'modem' || equipmentType === 'others' || equipmentType === 'work') && renderOtherFields()}
        
        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={formData.notes || ''}
            onChange={(e) => handleChange('notes', e.target.value)}
            placeholder="Additional notes..."
            rows={4}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          Save
        </Button>
      </div>
    </div>
  );
}