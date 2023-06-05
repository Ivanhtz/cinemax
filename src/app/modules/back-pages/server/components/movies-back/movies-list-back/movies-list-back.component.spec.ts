import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesListBackComponent } from './movies-list-back.component';

describe('MoviesListBackComponent', () => {
  let component: MoviesListBackComponent;
  let fixture: ComponentFixture<MoviesListBackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoviesListBackComponent]
    });
    fixture = TestBed.createComponent(MoviesListBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
