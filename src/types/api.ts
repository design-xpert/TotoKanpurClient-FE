export interface Thana {
  id: number;
  name: string;
  zone_id: number;
  created_at: string;
  updated_at: string;
}

export interface RouteData {
  color_name: string;
  thanas: Thana[];
}

export interface Vehicle {
  _id: string;
  zone_id: number;
  thana_id: number;
  zone_name: string;
  thana_name: string;
  route_color: string;
  registration_no: string;
  chasis_no: string;
  serial_number: string;
  owner_name: string;
  owner_phone: string;
  owner_aadhar: string;
  insurance_upto: string;
  fitness_upto: string;
  tax_upto: string;
  created_at: string;
  updated_at: string;
}

export interface SearchResponse extends Vehicle {
  error?: string;
}

export interface ColorDetailsResponse extends RouteData {
  error?: string;
}
