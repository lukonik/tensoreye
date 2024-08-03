import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainAreaComponent } from './train-area.component';

describe('TrainAreaComponent', () => {
  let component: TrainAreaComponent;
  let fixture: ComponentFixture<TrainAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainAreaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
