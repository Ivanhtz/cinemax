import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthsService } from '../services/auths-service/auths.service';



@Injectable()
// Definimos la clase Token que implementa HttpInterceptor. Este es un interceptor de HTTP que se utilizará para interceptar todas las solicitudes HTTP
export class Token implements HttpInterceptor {
  // Inyectamos Router para la navegación y AuthService para obtener y eliminar el token
  constructor(private router: Router, private authService: AuthsService) {}

  // El método intercept se invoca para cada solicitud HTTP. Puede manipular la solicitud y devolver un Observable que emite un solo evento HttpEvent
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Obtenemos el token de AuthService
    const token = this.authService.getToken();

    // Si el token existe, clonamos la solicitud y establecemos la cabecera Authorization con el token
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // Pasamos la solicitud (ya sea la original o la clonada) al siguiente handler y devolvemos el Observable
    // También manejamos los errores en el pipe. Si el servidor devuelve un error 401 (no autorizado), eliminamos el token,
    // redirigimos al usuario a la página de inicio de sesión y lanzamos el error para que pueda ser manejado más adelante
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.authService.removeToken();
          this.router.navigate(['/login']);
        }
        return throwError(() => err);
      })
    );
  }
}
