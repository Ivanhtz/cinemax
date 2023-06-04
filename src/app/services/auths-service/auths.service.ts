import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// Definimos la clase AuthService, que se utilizará para manejar la lógica de autenticación en nuestra aplicación.
export class AuthsService {
  // El constructor está vacío en este caso porque no necesitamos inyectar ninguna dependencia en este servicio.
  constructor() {}

  // Método para obtener el token de acceso de la sesión del navegador. 
  // Devuelve un string con el token si está presente, o null si no se encuentra ningún token.
  getToken(): string | null {
    return sessionStorage.getItem('accessToken');
  }

  // Método para guardar un token de acceso en la sesión del navegador. 
  // Acepta un string con el token y lo almacena en la sesión bajo la clave 'accessToken'.
  saveToken(token: string): void {
    sessionStorage.setItem('accessToken', token);
  }

  // Método para eliminar un token de acceso de la sesión del navegador. 
  // Elimina el elemento con la clave 'accessToken' de la sesión.
  removeToken(): void {
    sessionStorage.removeItem('accessToken');
  }

  // Método para verificar si un usuario está autenticado. 
  // En este caso, simplemente comprobamos si existe un token de acceso en la sesión.
  // Si el token existe, consideramos que el usuario está autenticado y devolvemos true. 
  // Si no hay token, devolvemos false, indicando que el usuario no está autenticado.
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}