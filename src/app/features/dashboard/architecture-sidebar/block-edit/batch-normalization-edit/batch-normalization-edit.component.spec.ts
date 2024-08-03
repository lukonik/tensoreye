import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchNormalizationEditComponent } from './batch-normalization-edit.component';

describe('BatchNormalizationEditComponent', () => {
  let component: BatchNormalizationEditComponent;
  let fixture: ComponentFixture<BatchNormalizationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchNormalizationEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchNormalizationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
