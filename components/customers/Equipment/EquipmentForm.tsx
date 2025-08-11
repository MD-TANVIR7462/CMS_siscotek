"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X } from 'lucide-react';
import { Equipment } from '@/types/customer';

interface EquipmentFormProps {
  equipmentType: Equipment['type'];
  userId: string;
  customerId: string;
  equipment?: Equipment | null;
  onSave: (equipment: Equipment) => void;
  onCancel: () => void;
}

export function EquipmentForm({
  equipmentType,
  userId,
  customerId,
  equipment,
  onSave,
  onCancel,
}: EquipmentFormProps) {
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

  useEffect(() => {
    if (equipment) {
      setFormData(equipment);
    } else {
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
    }
  }, [equipment]);

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
      id: equipment?.id || Date.now().toString(),
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
      createdAt: equipment?.createdAt || new Date(),
      updatedAt: new Date(),
      serialNumber: formData.serialNo || '',
      name: formData.equipmentName || ''
    };

    onSave(equipmentData);
  };

  const getFormTitle = () => {
    const action = equipment ? 'Edit' : 'Add New';
    switch (equipmentType) {
      case 'computer':
        return `${action} Computer`;
      case 'software':
        return `${action} Software`;
      case 'printer':
        return `${action} Printer`;
      case 'router':
        return `${action} Router`;
      case 'switch':
        return `${action} Switch`;
      case 'modem':
        return `${action} Modem`;
      default:
        return `${action} Equipment`;
    }
  };

  const renderComputerFields = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
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
            placeholder="Desktop, Laptop, Server, etc."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="brand">Brand</Label>
          <Input
            id="brand"
            value={formData.brand || ''}
            onChange={(e) => handleChange('brand', e.target.value)}
            placeholder="Dell, HP, Lenovo, etc."
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
            placeholder="Intel i7, AMD Ryzen, etc."
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
            placeholder="2.4 GHz, 3.2 GHz, etc."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ram">RAM</Label>
          <Input
            id="ram"
            value={formData.ram || ''}
            onChange={(e) => handleChange('ram', e.target.value)}
            placeholder="8GB, 16GB, 32GB, etc."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="hdd">Storage</Label>
          <Input
            id="hdd"
            value={formData.hdd || ''}
            onChange={(e) => handleChange('hdd', e.target.value)}
            placeholder="500GB HDD, 256GB SSD, etc."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="opticalDisk">Optical Drive</Label>
          <Input
            id="opticalDisk"
            value={formData.opticalDisk || ''}
            onChange={(e) => handleChange('opticalDisk', e.target.value)}
            placeholder="DVD-RW, Blu-ray, etc."
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
            placeholder="Windows 11, macOS, Ubuntu, etc."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="productKey">OS Product Key</Label>
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
          <Label htmlFor="antivirus">Antivirus</Label>
          <Input
            id="antivirus"
            value={formData.antivirus || ''}
            onChange={(e) => handleChange('antivirus', e.target.value)}
            placeholder="Norton, McAfee, Kaspersky, etc."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="antivirusProductKey">Antivirus Product Key</Label>
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
          <Label htmlFor="antivirusPassword">Antivirus Password</Label>
          <Input
            id="antivirusPassword"
            type="password"
            value={formData.antivirusPassword || ''}
            onChange={(e) => handleChange('antivirusPassword', e.target.value)}
            placeholder="Antivirus Password"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="antivirusExpireDate">Antivirus Expiry</Label>
          <Input
            id="antivirusExpireDate"
            type="date"
            value={formData.antivirusExpireDate || ''}
            onChange={(e) => handleChange('antivirusExpireDate', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="serialNo">Serial Number</Label>
          <Input
            id="serialNo"
            value={formData.serialNo || ''}
            onChange={(e) => handleChange('serialNo', e.target.value)}
            placeholder="Serial Number"
          />
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="vendor">Vendor</Label>
          <Input
            id="vendor"
            value={formData.vendor || ''}
            onChange={(e) => handleChange('vendor', e.target.value)}
            placeholder="Purchase Vendor"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="purchaseDate">Purchase Date</Label>
          <Input
            id="purchaseDate"
            type="date"
            value={formData.purchaseDate || ''}
            onChange={(e) => handleChange('purchaseDate', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="warrantyExpireDate">Warranty Expiry</Label>
        <Input
          id="warrantyExpireDate"
          type="date"
          value={formData.warrantyExpireDate || ''}
          onChange={(e) => handleChange('warrantyExpireDate', e.target.value)}
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
          placeholder="Microsoft Office, Adobe Creative Suite, etc."
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="brand">Brand/Publisher</Label>
          <Input
            id="brand"
            value={formData.brand || ''}
            onChange={(e) => handleChange('brand', e.target.value)}
            placeholder="Microsoft, Adobe, etc."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="model">Version</Label>
          <Input
            id="model"
            value={formData.model || ''}
            onChange={(e) => handleChange('model', e.target.value)}
            placeholder="2021, v2.1, etc."
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="productKey">License Key</Label>
          <Input
            id="productKey"
            value={formData.productKey || ''}
            onChange={(e) => handleChange('productKey', e.target.value)}
            placeholder="License/Product Key"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="warrantyExpireDate">License Expiry</Label>
          <Input
            id="warrantyExpireDate"
            type="date"
            value={formData.warrantyExpireDate || ''}
            onChange={(e) => handleChange('warrantyExpireDate', e.target.value)}
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="Physical Location"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="serialNo">Serial Number</Label>
          <Input
            id="serialNo"
            value={formData.serialNo || ''}
            onChange={(e) => handleChange('serialNo', e.target.value)}
            placeholder="Serial Number"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="purchaseDate">Purchase Date</Label>
          <Input
            id="purchaseDate"
            type="date"
            value={formData.purchaseDate || ''}
            onChange={(e) => handleChange('purchaseDate', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="warrantyExpireDate">Warranty Expiry</Label>
          <Input
            id="warrantyExpireDate"
            type="date"
            value={formData.warrantyExpireDate || ''}
            onChange={(e) => handleChange('warrantyExpireDate', e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  return (
    <Card className="w-full max-w-4xl mx-auto mt-5">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-900">
            {getFormTitle()}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
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
              placeholder="Additional notes, configurations, passwords, or important information..."
              rows={4}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {equipment ? 'Update' : 'Save'} Equipment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}