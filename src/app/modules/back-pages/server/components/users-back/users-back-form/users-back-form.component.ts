import { Component, OnInit, inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserDto } from 'src/app/services/users-service/user-dto/user.dto';
import { UserService } from 'src/app/services/users-service/users.service';

@Component({
  selector: 'app-users-back-form',
  templateUrl: './users-back-form.component.html',
  styleUrls: ['./users-back-form.component.scss'],
})
export class UsersBackFormComponent implements OnInit {
  addressForm: FormGroup;
  editingUser: UserDto;
  isEditing: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.addressForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.editingUser = {
      id: 0,
      email: '',
      password: '',
    };
  }

  ngOnInit(): void {
    this.userService.userBeingEdited$.subscribe((user) => {
      if (user) {
        this.isEditing = true;
        this.editingUser = user;
        this.addressForm = this.formBuilder.group({
          email: [user.email, Validators.required],
          password: [user.password, Validators.required],
        });
      } else {
        this.isEditing = false;
        this.editingUser = {
          id: 0,
          email: '',
          password: '',
        };
        this.addressForm = this.formBuilder.group({
          email: ['', []],
          password: ['', []],
        });
      }
    });
  }
  onSubmit(): void {
    if (this.isEditing) {
      // Estás editando un usuario existente
      // Incluye la fecha de creación original cuando se guarda el usuario
      const updatedUser = {
        ...this.addressForm.value,
        createdAt: this.editingUser.createdAt
      };
      this.userService
        .updateUser(this.editingUser.id, updatedUser)
        .subscribe(() => {
          this.userService.stopEditingUser();
        });
    } else {
      // Estás creando un nuevo usuario
      this.userService.createUser(this.addressForm.value).subscribe(() => {
        this.userService.stopEditingUser();
      });
    }
  }

  cancel(): void {
    this.userService.stopEditingUser();
  }
  
}
