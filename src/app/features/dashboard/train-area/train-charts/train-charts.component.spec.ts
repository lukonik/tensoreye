import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainChartsComponent } from './train-charts.component';

describe('TrainChartsComponent', () => {
  let component: TrainChartsComponent;
  let fixture: ComponentFixture<TrainChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainChartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
