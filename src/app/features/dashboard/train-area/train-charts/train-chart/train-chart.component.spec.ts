import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainChartComponent } from './train-chart.component';

describe('TrainChartComponent', () => {
  let component: TrainChartComponent;
  let fixture: ComponentFixture<TrainChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
