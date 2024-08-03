import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenseEditComponent } from './dense-edit.component';

describe('DenseEditComponent', () => {
  let component: DenseEditComponent;
  let fixture: ComponentFixture<DenseEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DenseEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DenseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
