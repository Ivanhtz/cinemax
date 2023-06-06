import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsListBackComponent } from './comments-list-back.component';

describe('CommentsListBackComponent', () => {
  let component: CommentsListBackComponent;
  let fixture: ComponentFixture<CommentsListBackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentsListBackComponent]
    });
    fixture = TestBed.createComponent(CommentsListBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
