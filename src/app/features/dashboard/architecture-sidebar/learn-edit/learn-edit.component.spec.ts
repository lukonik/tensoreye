import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnEditComponent } from './learn-edit.component';

describe('LearnEditComponent', () => {
  let component: LearnEditComponent;
  let fixture: ComponentFixture<LearnEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
