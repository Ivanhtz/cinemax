import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListBackComponent } from './users-list-back.component';

describe('UsersListBackComponent', () => {
  let component: UsersListBackComponent;
  let fixture: ComponentFixture<UsersListBackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersListBackComponent]
    });
    fixture = TestBed.createComponent(UsersListBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
