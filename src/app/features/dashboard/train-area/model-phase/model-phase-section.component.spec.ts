import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitSectionComponent } from './model-phase-section.component';

describe('FitSectionComponent', () => {
  let component: FitSectionComponent;
  let fixture: ComponentFixture<FitSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FitSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
