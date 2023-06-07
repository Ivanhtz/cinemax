import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Iuser } from 'src/app/interfaces/iuser.interface';
import { UsersService } from 'src/app/services/users-service/users.service';

@Component({
  selector: 'app-users-back-form',
  templateUrl: './users-back-form.component.html',
  styleUrls: ['./users-back-form.component.scss'],
})
export class UsersBackFormComponent implements OnInit {
  addressForm: FormGroup;
  editingUser: Iuser;
  isEditing: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private snackBar: MatSnackBar
  ) {
    this.editingUser = { id: 0, email: '', password: '' };
    this.addressForm = this.formBuilder.group({
      email: [
        this.editingUser.email,
        [
          Validators.required,
          Validators.pattern(
            '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'
          ),
        ],
      ],
      password: [
        this.editingUser.password,
        [Validators.required, Validators.minLength(6)],
      ],
    });
  }

  ngOnInit(): void {
    this.usersService.userBeingEdited$.subscribe((user) => {
      this.isEditing = !!user;
      this.editingUser = user || { id: 0, email: '', password: '' };
      this.createForm(this.editingUser);
    });
  }

  createForm(user: Iuser): void {
    this.addressForm = this.formBuilder.group({
      email: [this.editingUser.email, [Validators.required, Validators.email]],
      password: [
        this.editingUser.password,
        [Validators.required, Validators.minLength(6)],
      ],
    });
  }

  onSubmit(): void {
    const userObservable = this.isEditing
      ? this.usersService.updateUser(
          this.editingUser.id,
          this.addressForm.value
        )
      : this.usersService.createUser(this.addressForm.value);

    const wasEditing = this.isEditing;

    userObservable.subscribe({
      next: () => {
        this.usersService.stopEditingUser();
        this.snackBar.open(
          `Usuario ${wasEditing ? 'editado' : 'creado'} exitosamente`,
          'Cerrar',
          { duration: 5000 }
        );
      },
      error: (error) => {
        this.snackBar.open(`Error: ${error.message}`, 'Cerrar', {
          duration: 5000,
        });
      },
    });
  }
  cancel(): void {
    this.usersService.stopEditingUser();
  }
}
