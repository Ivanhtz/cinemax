import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsBackComponent } from './comments-back.component';

describe('CommentsBackComponent', () => {
  let component: CommentsBackComponent;
  let fixture: ComponentFixture<CommentsBackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentsBackComponent]
    });
    fixture = TestBed.createComponent(CommentsBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
