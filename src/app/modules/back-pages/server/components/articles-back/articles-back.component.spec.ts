import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesBackComponent } from './articles-back.component';

describe('ArticlesBackComponent', () => {
  let component: ArticlesBackComponent;
  let fixture: ComponentFixture<ArticlesBackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticlesBackComponent]
    });
    fixture = TestBed.createComponent(ArticlesBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
