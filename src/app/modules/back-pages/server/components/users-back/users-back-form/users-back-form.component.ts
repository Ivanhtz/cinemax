import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private usersService: UsersService
  ) {
    this.editingUser = { id: 0, email: '', password: '' };
    this.addressForm = this.formBuilder.group({
      email: [this.editingUser.email, Validators.required],
      password: [this.editingUser.password, Validators.required],
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
      email: [user.email || '', Validators.required],
      password: [user.password || '', Validators.required],
    });
  }

  onSubmit(): void {
    const userObservable = this.isEditing ?
      this.usersService.updateUser(this.editingUser.id, this.addressForm.value) :
      this.usersService.createUser(this.addressForm.value);
      
    userObservable.subscribe(() => {
      this.usersService.stopEditingUser();
    });
  }

  cancel(): void {
    this.usersService.stopEditingUser();
  }
}
