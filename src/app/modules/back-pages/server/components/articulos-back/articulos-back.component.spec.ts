import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosBackComponent } from './articulos-back.component';

describe('ArticulosBackComponent', () => {
  let component: ArticulosBackComponent;
  let fixture: ComponentFixture<ArticulosBackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticulosBackComponent]
    });
    fixture = TestBed.createComponent(ArticulosBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
