import { Customer, Equipment, CustomerUser } from '@/types/customer';

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'SISCOTEK',
    address: '123 Business Ave',
    suite: 'Suite 100',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    telephone: '(555) 123-4567',
    fax: '(555) 123-4568',
    emails: ['contact@acme.com', 'support@acme.com'],
    website: 'https://acme.com',
    taxId: '12-3456789',
    notes: 'Important client with multiple locations',
    active: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Tech Solutions Inc',
    address: '456 Innovation Dr',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
    telephone: '(555) 987-6543',
    emails: ['info@techsolutions.com'],
    website: 'https://techsolutions.com',
    active: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: '3',
    name: 'Global Enterprises',
    address: '789 Corporate Blvd',
    city: 'Chicago',
    state: 'IL',
    zip: '60601',
    telephone: '(555) 456-7890',
    emails: ['admin@global.com'],
    active: false,
    createdAt: new Date('2023-12-01'),
    updatedAt: new Date('2023-12-01'),
  },
];

export const mockCustomerUsers: CustomerUser[] = [
  {
    id: '1',
    customerId: '1',
    name: 'CTG - Server',
    email: 'server@acme.com',
    department: 'IT',
    position: 'Server',
    active: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    customerId: '1',
    name: 'Tanvir',
    department: 'DEV',
    position: 'Security System',
    active: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '3',
    customerId: '1',
    name: 'Intern- Pritom',
    email: 'pritom@acme.com',
    department: 'IT',
    position: 'Intern',
    active: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '4',
    customerId: '1',
    name: 'Intern-Nusrat',
    email: 'nusrat@acme.com',
    department: 'IT',
    position: 'Intern',
    active: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '5',
    customerId: '1',
    name: 'Office Laptop',
    department: 'General',
    position: 'Shared Device',
    active: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
];

export const mockEquipment: Equipment[] = [
  {
    id: '1',
    customerId: '1',
    userId: '1',
    type: 'computer',
    equipmentName: 'CTG - Server',
    location: 'Server Room',
    equipmentType: 'Server',
    brand: 'Dell',
    model: 'PowerEdge R740',
    processor: 'Intel Xeon Silver 4214',
    speed: '2.2GHz',
    ram: '32GB DDR4',
    hdd: '2TB SSD',
    opticalDisk: 'None',
    os: 'Windows Server 2019',
    productKey: 'XXXXX-XXXXX-XXXXX-XXXXX-XXXXX',
    antivirus: 'Windows Defender',
    antivirusProductKey: 'Built-in',
    antivirusPassword: 'N/A',
    antivirusExpireDate: 'N/A',
    vendor: 'Dell Technologies',
    purchaseDate: '2023-06-15',
    warrantyExpireDate: '2026-06-15',
    serialNo: 'SRV001234',
    serviceTag: 'DELL001',
    notes: 'TV ID : 1558924359\nServer RDP: 103.195.140.198:7034\nUser name : Administrator\nPass : 0189ocsi5',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    serialNumber: '',
    name: 'werwer'
  },
  {
    id: '55',
    customerId: '1',
    userId: '1',
    type: 'computer',
    equipmentName: 'New Intern',
    location: 'Server Room',
    equipmentType: 'Server',
    brand: 'Dell',
    model: 'PowerEdge R740',
    processor: 'Intel Xeon Silver 4214',
    speed: '2.2GHz',
    ram: '32GB DDR4',
    hdd: '2TB SSD',
    opticalDisk: 'None',
    os: 'Windows Server 2019',
    productKey: 'XXXXX-XXXXX-XXXXX-XXXXX-XXXXX',
    antivirus: 'Windows Defender',
    antivirusProductKey: 'Built-in',
    antivirusPassword: 'N/A',
    antivirusExpireDate: 'N/A',
    vendor: 'Dell Technologies',
    purchaseDate: '2023-06-15',
    warrantyExpireDate: '2026-06-15',
    serialNo: 'SRV001234',
    serviceTag: 'DELL001',
    notes: 'TV ID : 1558924359\nServer RDP: 103.195.140.198:7034\nUser name : Administrator\nPass : 0189ocsi5',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    serialNumber: '',
    name: 'werwer'
  },
  {
    id: '5',
    customerId: '1',
    userId: '2',
    type: 'computer',
    equipmentName: 'Tanvir',
    location: 'Server Room',
    equipmentType: 'Server',
    brand: 'Dell',
    model: 'PowerEdge R740',
    processor: 'Intel Xeon Silver 4214',
    speed: '2.2GHz',
    ram: '32GB DDR4',
    hdd: '2TB SSD',
    opticalDisk: 'None',
    os: 'Windows Server 2019',
    productKey: 'XXXXX-XXXXX-XXXXX-XXXXX-XXXXX',
    antivirus: 'Windows Defender',
    antivirusProductKey: 'Built-in',
    antivirusPassword: 'N/A',
    antivirusExpireDate: 'N/A',
    vendor: 'Dell Technologies',
    purchaseDate: '2023-06-15',
    warrantyExpireDate: '2026-06-15',
    serialNo: 'SRV001234',
    serviceTag: 'DELL001',
    notes: 'TV ID : 1558924359\nServer RDP: 103.195.140.198:7034\nUser name : Administrator\nPass : 0189ocsi5',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    serialNumber: '',
    name: 'werwer'
  },
  {
    id: '1',
    customerId: '1',
    userId: '1',
    type: 'software',
    equipmentName: 'Computer 2',
    location: 'Server Room',
    equipmentType: 'Server',
    brand: 'Dell',
    model: 'PowerEdge R740',
    processor: 'Intel Xeon Silver 4214',
    speed: '2.2GHz',
    ram: '32GB DDR4',
    hdd: '2TB SSD',
    opticalDisk: 'None',
    os: 'Windows Server 2019',
    productKey: 'XXXXX-XXXXX-XXXXX-XXXXX-XXXXX',
    antivirus: 'Windows Defender',
    antivirusProductKey: 'Built-in',
    antivirusPassword: 'N/A',
    antivirusExpireDate: 'N/A',
    vendor: 'Dell Technologies',
    purchaseDate: '2023-06-15',
    warrantyExpireDate: '2026-06-15',
    serialNo: 'SRV001234',
    serviceTag: 'DELL001',
    notes: 'TV ID : 1558924359\nServer RDP: 103.195.140.198:7034\nUser name : Administrator\nPass : 0189ocsi5',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    serialNumber: '',
    name: 'werwer'
  },
  {
    id: '1',
    customerId: '1',
    userId: '1',
    type: 'software',
    equipmentName: 'CTG - Server',
    location: 'Server Room',
    equipmentType: 'Server',
    brand: 'Dell',
    model: 'PowerEdge R740',
    processor: 'Intel Xeon Silver 4214',
    speed: '2.2GHz',
    ram: '32GB DDR4',
    hdd: '2TB SSD',
    opticalDisk: 'None',
    os: 'Windows Server 2019',
    productKey: 'XXXXX-XXXXX-XXXXX-XXXXX-XXXXX',
    antivirus: 'Windows Defender',
    antivirusProductKey: 'Built-in',
    antivirusPassword: 'N/A',
    antivirusExpireDate: 'N/A',
    vendor: 'Dell Technologies',
    purchaseDate: '2023-06-15',
    warrantyExpireDate: '2026-06-15',
    serialNo: 'SRV001234',
    serviceTag: 'DELL001',
    notes: 'TV ID : 1558924359\nServer RDP: 103.195.140.198:7034\nUser name : Administrator\nPass : 0189ocsi5',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    serialNumber: '',
    name: 'werwer'
  },
  {
    id: '1',
    customerId: '1',
    userId: '1',
    type: 'printer',
    equipmentName: 'CTG - Server',
    location: 'Server Room',
    equipmentType: 'Server',
    brand: 'Dell',
    model: 'PowerEdge R740',
    processor: 'Intel Xeon Silver 4214',
    speed: '2.2GHz',
    ram: '32GB DDR4',
    hdd: '2TB SSD',
    opticalDisk: 'None',
    os: 'Windows Server 2019',
    productKey: 'XXXXX-XXXXX-XXXXX-XXXXX-XXXXX',
    antivirus: 'Windows Defender',
    antivirusProductKey: 'Built-in',
    antivirusPassword: 'N/A',
    antivirusExpireDate: 'N/A',
    vendor: 'Dell Technologies',
    purchaseDate: '2023-06-15',
    warrantyExpireDate: '2026-06-15',
    serialNo: 'SRV001234',
    serviceTag: 'DELL001',
    notes: 'TV ID : 1558924359\nServer RDP: 103.195.140.198:7034\nUser name : Administrator\nPass : 0189ocsi5',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    serialNumber: '',
    name: 'werwer'
  },

];