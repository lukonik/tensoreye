import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropoutEditComponent } from './dropout-edit.component';

describe('DropoutEditComponent', () => {
  let component: DropoutEditComponent;
  let fixture: ComponentFixture<DropoutEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropoutEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropoutEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
