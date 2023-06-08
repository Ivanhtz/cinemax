import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersBackFormComponent } from './users-back-form.component';
import { UsersService } from 'src/app/services/users-service/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Iuser } from 'src/app/interfaces/iuser.interface';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { of } from 'rxjs';

const mockSnackBar = {
  open: jasmine.createSpy('open'),
};

let mockUsersService = {
  userBeingEdited$: of(null),
  stopEditingUser: jasmine.createSpy('stopEditingUser'),
  updateUser: jasmine.createSpy('updateUser').and.returnValue(of({})),
  createUser: jasmine.createSpy('createUser').and.returnValue(of({})),
};

describe('UsersBackFormComponent', () => {
  let component: UsersBackFormComponent;
  let fixture: ComponentFixture<UsersBackFormComponent>;

  beforeEach(() => {
    mockUsersService.createUser.calls.reset();
    mockUsersService.updateUser.calls.reset();

    TestBed.configureTestingModule({
      declarations: [UsersBackFormComponent],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
        { provide: MatSnackBar, useValue: mockSnackBar },
      ],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
        NoopAnimationsModule,
      ],
    });

    mockUsersService.stopEditingUser.and.callThrough();

    fixture = TestBed.createComponent(UsersBackFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should call stopEditingUser when cancel is called', () => {
    component.cancel();
    expect(mockUsersService.stopEditingUser).toHaveBeenCalled();
  });

  it('should call createUser when onSubmit is called and not editing', () => {
    const validUser: Iuser = {
      id: 1,
      email: 'test@test.com',
      password: 'password',
      createdAt: new Date(),
      name: 'Test User',
      img: 'test.jpg',
      active: true,
    };

    component.addressForm.setValue({
      email: validUser.email,
      password: validUser.password,
      name: validUser.name,
      img: validUser.img,
      active: validUser.active,
    });

    component.isEditing = false;
    component.onSubmit();
    expect(mockUsersService.createUser).toHaveBeenCalled();
  });
  it('should call updateUser when onSubmit is called and editing', () => {
    component.addressForm.setValue({
      email: 'test@test.com',
      password: 'password',
      name: 'Test User',
      img: 'test.jpg',
      active: true,
    });
    component.isEditing = true;
    component.onSubmit();
    expect(mockUsersService.updateUser).toHaveBeenCalled();
  });
  it('should not allow submission with empty form', () => {
    component.addressForm.setValue({
      email: '',
      password: '',
      name: '',
      img: '',
      active: false,
    });

    component.onSubmit();

    expect(mockUsersService.createUser).not.toHaveBeenCalled();
    expect(mockUsersService.updateUser).not.toHaveBeenCalled();
  });
});
