import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthsService } from 'src/app/services/auths-service/auths.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-back',
  templateUrl: './nav-back.component.html',
  styleUrls: ['./nav-back.component.scss']
})
export class NavBackComponent {
  private breakpointObserver = inject(BreakpointObserver);

  constructor(private authsService: AuthsService, private router: Router) {}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    logout() {
      this.authsService.removeToken();
      this.router.navigate(['']);  // o cualquier otra ruta a la que quieras redirigir al usuario después de hacer logout
    }
}
