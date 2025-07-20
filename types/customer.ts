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
  userId: string;
  type: 'computer' | 'software' | 'printer' | 'router' | 'switch' | 'modem' | 'others' | 'work';
  equipmentName: string;
  location?: string;
  equipmentType?: string;
  brand?: string;
  model?: string;
  processor?: string;
  speed?: string;
  ram?: string;
  hdd?: string;
  opticalDisk?: string;
  os?: string;
  productKey?: string;
  antivirus?: string;
  antivirusProductKey?: string;
  antivirusPassword?: string;
  antivirusExpireDate?: string;
  vendor?: string;
  purchaseDate?: string;
  warrantyExpireDate?: string;
  serialNo?: string;
  serviceTag?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomerUser {
  id: string;
  customerId: string;
  name: string;
  email?: string;
  department?: string;
  position?: string;
  notes?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}