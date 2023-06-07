import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { UsersListBackComponent } from './users-list-back.component';
import { UsersService } from 'src/app/services/users-service/users.service';
import { Iuser } from 'src/app/interfaces/iuser.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// Este será tu MatDialog ficticio
const mockDialog = {
  open: jasmine.createSpy('open'),
};
const mockSnackBar = {
  open: jasmine.createSpy('open'),
};

describe('UsersListBackComponent', () => {
  let component: UsersListBackComponent;
  let fixture: ComponentFixture<UsersListBackComponent>;
  let mockUsersService: {
    deleteUser: jasmine.Spy<(id: number) => Observable<void>>;
    getUser: jasmine.Spy<(id: number) => Observable<Iuser>>;
    startEditingUser: jasmine.Spy<(user: Iuser) => void>;
  };

  beforeEach(() => {
    // Crear un servicio de usuarios falso con los métodos que necesitas
    mockUsersService = jasmine.createSpyObj('UsersService', [
      'deleteUser',
      'getUser',
      'startEditingUser',
    ]);

    TestBed.configureTestingModule({
      declarations: [UsersListBackComponent],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
        { provide: MatDialog, useValue: mockDialog },
        { provide: MatSnackBar, useValue: mockSnackBar }, // Añade esta línea
      ],
    });

    fixture = TestBed.createComponent(UsersListBackComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call startEditingUser when editUser is called', () => {
    const userId = 1;
    const user: Iuser = {
      id: userId,
      email: 'test@test.com',
      password: 'password',
      createdAt: new Date(),
    };

    // Esto hará que cuando getUser sea llamado con userId, retornará un Observable del usuario que definiste arriba
    mockUsersService.getUser.and.returnValue(of(user));

    component.editUser(userId);

    // Ahora puedes verificar que estos métodos se llamaron con los argumentos correctos
    expect(mockUsersService.getUser).toHaveBeenCalledWith(userId);
    expect(mockUsersService.startEditingUser).toHaveBeenCalledWith(user);
  });
});
