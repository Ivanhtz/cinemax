import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from './user-dto/user.dto';
import { ResponseDto } from './response-dto/response.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService  {
  // Declaramos una variable privada llamada apiUrl que contiene la URL base de nuestro servicio API.
  private apiUrl = 'http://localhost:3000';

  // En el constructor inyectamos la dependencia HttpClient de Angular que utilizaremos para realizar las peticiones HTTP.
  constructor(private http: HttpClient) {}

  // Método register que toma un objeto userData de tipo UserDto y realiza una petición POST a la ruta '/register' de nuestro servicio API.
  // Este método devuelve un Observable de tipo UserDto.
  register(userData: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.apiUrl}/register`, userData);
  }

  // Método login que toma un objeto userData de tipo UserDto y realiza una petición POST a la ruta '/login' de nuestro servicio API.
  // Este método devuelve un Observable de tipo UserLoginResponseDto.
  login(userData: UserDto): Observable<ResponseDto> {
    return this.http.post<ResponseDto>(
      `${this.apiUrl}/login`,
      userData
    );
  }

  // Método deleteUser que toma un id de usuario y realiza una petición DELETE a la ruta '/users' de nuestro servicio API.
  // Este método devuelve un Observable de cualquier tipo (ya que no sabemos qué tipo de respuesta devolverá el endpoint).
  deleteUser(id: number): Observable<UserDto> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete<any>(`${this.apiUrl}/users`, { params });
  }

  // Método updateUser que toma un id de usuario y un objeto userData de tipo UserDto, y realiza una petición PUT a la ruta '/users' de nuestro servicio API.
  // Este método devuelve un Observable de tipo UserDto.
  updateUser(id: number, userData: UserDto): Observable<UserDto> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.put<UserDto>(`${this.apiUrl}/users`, userData, { params });
  }
}
