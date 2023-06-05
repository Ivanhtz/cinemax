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
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.subscription = this.users.login(this.loginForm.value).subscribe({
        next: (data) => {
          console.log(data);
          if (data && data.accessToken) {
            this.authsService.saveToken(data.accessToken);
            this.router.navigate(['/back']);
          }
        },
        error: (error) => {
          console.log(error);
          if (error.status === 400) {
            alert(
              'Las credenciales proporcionadas no son correctas. Por favor, inténtalo de nuevo.'
            );
          } else {
            alert(
              'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo más tarde.'
            );
          }
        },
      });
    }
  }

  goBack() {
    this.router.navigate(['']);  // reemplaza '/ruta-anterior' con la ruta a la que quieres ir
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}