import { Injectable } from '@angular/core';
import { UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/user-service/auth.service';


@Injectable({
  providedIn: 'root',
})
// Definimos la clase LoginGuard, este es un Guard que se utiliza para proteger rutas en Angular
export class LoginGuard {
  // En el constructor, inyectamos AuthService para verificar la autenticación y Router para la navegación
  constructor(private authService: AuthService, private router: Router) {}

  // El método canActivate se utiliza para decidir si una ruta se puede activar o no.
  // Puede devolver un Observable, una promesa que resuelve un valor booleano o un UrlTree, o un booleano o UrlTree directamente
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Si el usuario no está autenticado (es decir, el método isAuthenticated de authService devuelve false)
    if (!this.authService.isAuthenticated()) {
      console.log('Please Log In!'); // Imprimimos un mensaje en la consola
      this.router.navigate(['/login']); // Navegamos al usuario a la página de inicio de sesión
      return false; // Devolvemos false para indicar que la ruta no se puede activar
    }
    // Si el usuario está autenticado, devolvemos true para indicar que la ruta se puede activar
    return true;
  }
}

