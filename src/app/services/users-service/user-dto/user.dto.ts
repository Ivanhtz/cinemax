export interface UserDto {
  id: number;
  email: string;
  password: string;
  createdAt?: Date; // Nuevo campo agregado
}