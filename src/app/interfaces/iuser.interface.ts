export interface Iuser {
    id: number;
    email: string;
    password: string;
    createdAt?: Date; 
    name?: string; 
    img?: string;
    active ?: boolean; 
  }