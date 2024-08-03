import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainTableReportComponent } from './train-table-report.component';

describe('TrainTableReportComponent', () => {
  let component: TrainTableReportComponent;
  let fixture: ComponentFixture<TrainTableReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainTableReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainTableReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
