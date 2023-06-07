import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthsService } from 'src/app/services/auths-service/auths.service';
import { UsersService } from 'src/app/services/users-service/users.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  private subscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private users: UsersService,
    private router: Router,
    private authsService: AuthsService
  ) {}

  ngOnInit() {
    if (this.authsService.isAuthenticated()) {
      this.router.navigate(['/back']);
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.subscription = this.users.login(this.loginForm.value).subscribe({
        next: (data) => {
          if (data && data.accessToken) {
            this.authsService.saveToken(data.accessToken);
            this.router.navigate(['/back']);
          }
        },
        error: (error) => {
          let status = error.status || (error.error && error.error.status);
          switch (status) {
            case 400:
              alert(
                'La solicitud es incorrecta o las credenciales no son correctas. Por favor, revisa los datos ingresados.'
              );
              break;
            case 401:
            case 403:
              alert(
                'Las credenciales proporcionadas no son correctas. Por favor, inténtalo de nuevo.'
              );
              break;
            default:
              alert(
                'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo más tarde.'
              );
          }
        },
      });
    }
  }
  goBack(event: Event) {
    event.preventDefault();
    this.router.navigate(['']);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
