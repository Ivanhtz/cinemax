import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersBackComponent } from './users-back.component';

describe('UsersBackComponent', () => {
  let component: UsersBackComponent;
  let fixture: ComponentFixture<UsersBackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersBackComponent]
    });
    fixture = TestBed.createComponent(UsersBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
