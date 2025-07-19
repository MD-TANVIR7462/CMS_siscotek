export interface Customer {
  id: string;
  name: string;
  address: string;
  suite?: string;
  city: string;
  state: string;
  zip: string;
  telephone: string;
  fax?: string;
  mapUrl?: string;
  emails: string[];
  website?: string;
  others?: string;
  taxId?: string;
  notes?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Equipment {
  id: string;
  customerId: string;
  type: 'computer' | 'software' | 'printer' | 'router' | 'switch' | 'modem' | 'others' | 'work';
  name: string;
  model?: string;
  serialNumber?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}