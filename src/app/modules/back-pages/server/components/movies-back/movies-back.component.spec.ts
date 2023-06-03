import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesBackComponent } from './movies-back.component';

describe('MoviesBackComponent', () => {
  let component: MoviesBackComponent;
  let fixture: ComponentFixture<MoviesBackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoviesBackComponent]
    });
    fixture = TestBed.createComponent(MoviesBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
