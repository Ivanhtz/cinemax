import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesListBackComponent } from './articles-list-back.component';

describe('ArticlesListBackComponent', () => {
  let component: ArticlesListBackComponent;
  let fixture: ComponentFixture<ArticlesListBackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticlesListBackComponent]
    });
    fixture = TestBed.createComponent(ArticlesListBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
