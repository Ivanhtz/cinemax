export interface Iuser {
    id: number;
    email: string;
    password: string;
    createdAt?: Date; // Nuevo campo agregado
    name?: string; 
    img?: string;
    active ?: boolean; 
  }