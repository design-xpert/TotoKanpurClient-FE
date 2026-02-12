export type ZoneColor = 'red' | 'green' | 'saffron' | 'blue' | 'yellow' | 'violet' | 'pink';

export interface Zone {
  id: string;
  name: string;
  color: ZoneColor;
  thanas: string[];
}

export interface Vehicle {
  id: string;
  registrationNumber: string;
  serialNumber: string;
  ownerName: string;
  aadharNumber: string;
  mobileNo: string;
  chassisNumber: string;
  insuranceUpto: string;
  fitnessUpto: string;
  taxUpto: string;
  thana: string;
  zoneId: string;
}

export const zones: Zone[] = [
  {
    id: '1',
    name: 'Red Zone',
    color: 'red',
    thanas: ['Barra', 'Colonelganj', 'Shyam Nagar', 'Kalyanpur', 'Chakeri', 'Rawatpur', 'Bithoor', 'Ghatampur', 'Bilhaur Road', 'Sachendi']
  },
  {
    id: '2',
    name: 'Green Zone',
    color: 'green',
    thanas: ['Govind Nagar', 'Kidwai Nagar', 'Panki', 'Jajmau', 'Vikas Nagar', 'Ramadevi', 'Generalganj', 'Fazalganj', 'Dalelnagar']
  },
  {
    id: '3',
    name: 'Saffron Zone',
    color: 'saffron',
    thanas: ['Swaroop Nagar', 'Gwaltoli', 'Naveen Nagar', 'Fazalganj', 'Babupurwa']
  },
  {
    id: '4',
    name: 'Blue Zone',
    color: 'blue',
    thanas: ['Chunniganj', 'Civil Lines', 'Hatia', 'Naubasta', 'CSM Nagar']
  },
  {
    id: '5',
    name: 'Yellow Zone',
    color: 'yellow',
    thanas: ['Kakadeo', 'Kalpi Road', 'Sarsaul', 'Cantt', 'Armapur']
  },
  {
    id: '6',
    name: 'Violet Zone',
    color: 'violet',
    thanas: ['Anwarganj', 'Beconganj', 'Juhi', 'Shastri Nagar', 'Naria']
  },
  {
    id: '7',
    name: 'Pink Zone',
    color: 'pink',
    thanas: ['Pandu Nagar', 'Lal Bangla', 'Maharajpur', 'Bilhaur', 'Sachendi']
  }
];

export const vehicles: Vehicle[] = [
  // Red Zone vehicles
  {
    id: 'v1',
    registrationNumber: 'UP78AB1234',
    serialNumber: 'SN001234',
    ownerName: 'Rajesh Kumar',
    aadharNumber: '1234-5678-9012',
    mobileNo: '+91 98765-43210',
    chassisNumber: 'CH12345678901234',
    insuranceUpto: '2025-06-15',
    fitnessUpto: '2025-12-31',
    taxUpto: '2025-03-31',
    thana: 'Barra',
    zoneId: '1'
  },
  {
    id: 'v2',
    registrationNumber: 'UP78CD5678',
    serialNumber: 'SN005678',
    ownerName: 'Amit Singh',
    aadharNumber: '2345-6789-0123',
    mobileNo: '+91 98765-43211',
    chassisNumber: 'CH23456789012345',
    insuranceUpto: '2025-08-20',
    fitnessUpto: '2026-01-15',
    taxUpto: '2025-06-30',
    thana: 'Shyam Nagar',
    zoneId: '1'
  },
  // Green Zone vehicles
  {
    id: 'v3',
    registrationNumber: 'UP78EF9012',
    serialNumber: 'SN009012',
    ownerName: 'Suresh Verma',
    aadharNumber: '3456-7890-1234',
    mobileNo: '+91 98765-43212',
    chassisNumber: 'CH34567890123456',
    insuranceUpto: '2025-05-10',
    fitnessUpto: '2025-11-30',
    taxUpto: '2025-03-31',
    thana: 'Govind Nagar',
    zoneId: '2'
  },
  {
    id: 'v4',
    registrationNumber: 'UP78GH3456',
    serialNumber: 'SN003456',
    ownerName: 'Pradeep Mishra',
    aadharNumber: '4567-8901-2345',
    mobileNo: '+91 98765-43213',
    chassisNumber: 'CH45678901234567',
    insuranceUpto: '2025-07-25',
    fitnessUpto: '2025-12-15',
    taxUpto: '2025-06-30',
    thana: 'Panki',
    zoneId: '2'
  },
  // Saffron Zone vehicles
  {
    id: 'v5',
    registrationNumber: 'UP78IJ7890',
    serialNumber: 'SN007890',
    ownerName: 'Manoj Sharma',
    aadharNumber: '5678-9012-3456',
    mobileNo: '+91 98765-43214',
    chassisNumber: 'CH56789012345678',
    insuranceUpto: '2025-09-30',
    fitnessUpto: '2026-02-28',
    taxUpto: '2025-09-30',
    thana: 'Swaroop Nagar',
    zoneId: '3'
  },
  // Blue Zone vehicles
  {
    id: 'v6',
    registrationNumber: 'UP78KL1234',
    serialNumber: 'SN001235',
    ownerName: 'Vijay Gupta',
    aadharNumber: '6789-0123-4567',
    mobileNo: '+91 98765-43215',
    chassisNumber: 'CH67890123456789',
    insuranceUpto: '2025-04-15',
    fitnessUpto: '2025-10-31',
    taxUpto: '2025-03-31',
    thana: 'Chunniganj',
    zoneId: '4'
  },
  // Yellow Zone vehicles
  {
    id: 'v7',
    registrationNumber: 'UP78MN5678',
    serialNumber: 'SN005679',
    ownerName: 'Ramesh Yadav',
    aadharNumber: '7890-1234-5678',
    mobileNo: '+91 98765-43216',
    chassisNumber: 'CH78901234567890',
    insuranceUpto: '2025-11-20',
    fitnessUpto: '2026-03-31',
    taxUpto: '2025-12-31',
    thana: 'Kakadeo',
    zoneId: '5'
  },
  // Violet Zone vehicles
  {
    id: 'v8',
    registrationNumber: 'UP78OP9012',
    serialNumber: 'SN009013',
    ownerName: 'Santosh Tiwari',
    aadharNumber: '8901-2345-6789',
    mobileNo: '+91 98765-43217',
    chassisNumber: 'CH89012345678901',
    insuranceUpto: '2025-06-30',
    fitnessUpto: '2025-12-31',
    taxUpto: '2025-06-30',
    thana: 'Anwarganj',
    zoneId: '6'
  },
  // Pink Zone vehicles
  {
    id: 'v9',
    registrationNumber: 'UP78QR3456',
    serialNumber: 'SN003457',
    ownerName: 'Deepak Pandey',
    aadharNumber: '9012-3456-7890',
    mobileNo: '+91 98765-43218',
    chassisNumber: 'CH90123456789012',
    insuranceUpto: '2025-10-15',
    fitnessUpto: '2026-01-31',
    taxUpto: '2025-09-30',
    thana: 'Pandu Nagar',
    zoneId: '7'
  }
];