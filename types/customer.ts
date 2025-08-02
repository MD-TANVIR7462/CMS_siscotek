// export interface Customer { //this is moc data type
//   id: string;
//   name: string;
//   address: string;
//   suite?: string;
//   city: string;
//   state: string;
//   zip: string;
//   telephone: string;
//   fax?: string;
//   mapUrl?: string;
//   emails: string[];
//   website?: string;
//   others?: string;
//   taxId?: string;
//   notes?: string;
//   active: boolean;
//   createdAt: Date;
//   updatedAt: Date;
// }

export type Customer = {
  id(id: any): void; // this is backend data type comes form the DB+backend
  _id: string;
  name: string;
  address: string;
  suiteFloor?: string;
  city: string;
  state: string;
  zip: string;
  telephone: string;
  fax?: string;
  mapUrl?: string;
  email: string[];
  websiteLink?: string;
  taxId?: string;
  other?: string;
  note?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt: string; // or Date if you plan to parse it as a Date
  updatedAt: string; // or Date
  __v?: number;
};

export interface Equipment {
  serialNumber: string;
  name: string;
  id: string;
  customerId: string;
  userId: string;
  type: "computer" | "software" | "printer" | "router" | "switch" | "modem" | "others" | "work";
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
