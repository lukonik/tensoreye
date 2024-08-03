import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSplitEditComponent } from './data-split-edit.component';

describe('DataSplitEditComponent', () => {
  let component: DataSplitEditComponent;
  let fixture: ComponentFixture<DataSplitEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataSplitEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataSplitEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
