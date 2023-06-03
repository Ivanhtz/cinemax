import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosBackComponent } from './usuarios-back.component';

describe('UsuariosBackComponent', () => {
  let component: UsuariosBackComponent;
  let fixture: ComponentFixture<UsuariosBackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuariosBackComponent]
    });
    fixture = TestBed.createComponent(UsuariosBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
