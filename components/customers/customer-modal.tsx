"use client";

import React, { useState, useEffect } from "react";
import { AddCustomer, Customer } from "@/types/customer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, X } from "lucide-react";

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (customer: AddCustomer) => void;
  customer?: Customer | null;
}

export function CustomerModal({ isOpen, onClose, onSubmit, customer }: CustomerModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    suiteFloor: "",
    city: "",
    state: "",
    zip: "",
    telephone: "",
    fax: "",
    mapUrl: "",
    email: [""],
    websiteLink: "",
    other: "",
    taxId: "",
    note: "",
    isActive: true,
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name,
        address: customer.address,
        suiteFloor: customer.suiteFloor || "",
        city: customer.city,
        state: customer.state,
        zip: customer.zip,
        telephone: customer.telephone,
        fax: customer.fax || "",
        mapUrl: customer.mapUrl || "",
        email: customer.email.length > 0 ? customer.email : [""],
        websiteLink: customer.websiteLink || "",
        other: customer.other || "",
        taxId: customer.taxId || "",
        note: customer.note || "",
        isActive: customer.isActive ?? true,
      });
    } else {
      setFormData({
        name: "",
        address: "",
        suiteFloor: "",
        city: "",
        state: "",
        zip: "",
        telephone: "",
        fax: "",
        mapUrl: "",
        email: [""],
        websiteLink: "",
        other: "",
        taxId: "",
        note: "",
        isActive: true,
      });
    }
  }, [customer, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailsFiltered = formData.email.filter((email) => email.trim() !== "");
    onSubmit({
      name: formData.name,
      address: formData.address,
      suiteFloor: formData.suiteFloor || undefined,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      telephone: formData.telephone,
      fax: formData.fax || undefined,
      mapUrl: formData.mapUrl || undefined,
      email: emailsFiltered,
      websiteLink: formData.websiteLink || undefined,
      taxId: formData.taxId || undefined,
      other: formData.other || undefined,
      note: formData.note || undefined,
      isActive: formData.isActive,
    });
  };

  const addEmailField = () => {
    setFormData((prev) => ({
      ...prev,
      email: [...prev.email, ""],
    }));
  };

  const removeEmailField = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      email: prev.email.filter((_, i) => i !== index),
    }));
  };

  const updateEmail = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      email: prev.email.map((email, i) => (i === index ? value : email)),
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl md:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{customer ? "Edit Customer" : "Add New Customer"}</DialogTitle>
          <DialogDescription>
            {customer ? "Update customer information" : "Create a new customer profile"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                required
                placeholder="Company or individual name"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                required
                placeholder="Street address"
              />
            </div>

            <div>
              <Label htmlFor="suiteFloor">Suite/Floor</Label>
              <Input
                id="suiteFloor"
                value={formData.suiteFloor}
                onChange={(e) => setFormData((prev) => ({ ...prev, suiteFloor: e.target.value }))}
                placeholder="Suite, floor, or unit number"
              />
            </div>

            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                required
                placeholder="City"
              />
            </div>

            <div>
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => setFormData((prev) => ({ ...prev, state: e.target.value }))}
                required
                placeholder="State"
              />
            </div>

            <div>
              <Label htmlFor="zip">ZIP Code *</Label>
              <Input
                id="zip"
                value={formData.zip}
                onChange={(e) => setFormData((prev) => ({ ...prev, zip: e.target.value }))}
                required
                placeholder="ZIP code"
              />
            </div>

            <div>
              <Label htmlFor="telephone">Telephone *</Label>
              <Input
                id="telephone"
                value={formData.telephone}
                onChange={(e) => setFormData((prev) => ({ ...prev, telephone: e.target.value }))}
                required
                placeholder="Phone number"
              />
            </div>

            <div>
              <Label htmlFor="fax">FAX</Label>
              <Input
                id="fax"
                value={formData.fax}
                onChange={(e) => setFormData((prev) => ({ ...prev, fax: e.target.value }))}
                placeholder="Fax number"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="mapUrl">Map URL</Label>
              <Input
                id="mapUrl"
                value={formData.mapUrl}
                onChange={(e) => setFormData((prev) => ({ ...prev, mapUrl: e.target.value }))}
                placeholder="Google Maps or other map URL"
              />
            </div>

            <div className="md:col-span-2">
              <Label>Email Addresses</Label>
              <div className="space-y-2">
                {formData.email.map((email, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={email}
                      onChange={(e) => updateEmail(index, e.target.value)}
                      placeholder="Email address"
                      type="email"
                    />
                    {formData.email.length > 1 && (
                      <Button type="button" variant="outline" size="icon" onClick={() => removeEmailField(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addEmailField}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Email
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="websiteLink">Website</Label>
              <Input
                id="websiteLink"
                value={formData.websiteLink}
                onChange={(e) => setFormData((prev) => ({ ...prev, websiteLink: e.target.value }))}
                placeholder="Company website"
              />
            </div>

            <div>
              <Label htmlFor="taxId">Tax ID</Label>
              <Input
                id="taxId"
                value={formData.taxId}
                onChange={(e) => setFormData((prev) => ({ ...prev, taxId: e.target.value }))}
                placeholder="Tax identification number"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="other">Others</Label>
              <Input
                id="other"
                value={formData.other}
                onChange={(e) => setFormData((prev) => ({ ...prev, other: e.target.value }))}
                placeholder="Additional information"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="note">Notes</Label>
              <Textarea
                id="note"
                value={formData.note}
                onChange={(e) => setFormData((prev) => ({ ...prev, note: e.target.value }))}
                placeholder="Additional notes about the customer"
                rows={3}
              />
            </div>

            <div className="md:col-span-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isActive: checked as boolean }))}
                />
                <Label htmlFor="isActive">Active Customer</Label>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{customer ? "Update Customer" : "Create Customer"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
