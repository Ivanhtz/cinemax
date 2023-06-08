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
    this.editingUser = {
      id: 0,
      email: '',
      password: '',
      name: '',
      img: '',
      active: false,
    };
    this.addressForm = this.formBuilder.group({
      email: [
        this.editingUser.email,
        [Validators.required, Validators.pattern('https?://.+|/[^/]+')],
      ],
      password: [
        this.editingUser.password,
        [Validators.required, Validators.minLength(6)],
      ],
      name: [
        this.editingUser.name,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      img: [
        this.editingUser.img,
        [Validators.required, Validators.pattern('https?://.+|/[^/]+')],
      ],
      active: [this.editingUser.active],
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
      email: [user.email, [Validators.required, Validators.email]],
      password: [user.password, [Validators.required, Validators.minLength(6)]],
      name: [
        user.name,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      img: [
        this.editingUser.img,
        [
          Validators.required,
          Validators.pattern(
            '^(https?://)?([da-z.-]+).([a-z.]{2,6})([/w .-]*)*/?$'
          ),
        ],
      ],
      active: [user.active],
    });
  }

  onSubmit() {
    if (!this.addressForm.valid) {
      // Si el formulario no es válido, se retorna
      return;
    }

    // Se elige entre actualizar o crear un usuario dependiendo de si se está editando
    const userObservable = this.isEditing
      ? this.usersService.updateUser(
          this.editingUser.id,
          this.addressForm.value
        )
      : this.usersService.createUser(this.addressForm.value);

    const wasEditing = this.isEditing; // Se guarda el estado de edición

    // Se suscribe al Observable del usuario
    userObservable.subscribe({
      next: () => {
        this.usersService.stopEditingUser(); // Se deja de editar el usuario
        this.snackBar.open(
          `Usuario ${wasEditing ? 'editado' : 'creado'} exitosamente`,
          'Cerrar',
          { duration: 5000 }
        ); // Se muestra un mensaje de éxito
      },
      error: (error) => {
        this.snackBar.open(`Error: ${error.message}`, 'Cerrar', {
          duration: 5000,
        }); // Se muestra un mensaje de error
      },
    });
  }
  cancel(): void {
    this.usersService.stopEditingUser();
  }
}
