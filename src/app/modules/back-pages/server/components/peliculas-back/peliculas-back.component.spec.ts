import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculasBackComponent } from './peliculas-back.component';

describe('PeliculasBackComponent', () => {
  let component: PeliculasBackComponent;
  let fixture: ComponentFixture<PeliculasBackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeliculasBackComponent]
    });
    fixture = TestBed.createComponent(PeliculasBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
