export interface ServiceVariation {
  id?: string; 
  name: string;
  price: number;
  durationInMinutes: number;
}

export interface Service {
  id?: string; 
  name: string;
  description: string;
  photos: string[]; // Array de URLs das fotos
  variations: ServiceVariation[];
}

export interface Provider {
  id?: string;
  name: string;
  email: string;
}