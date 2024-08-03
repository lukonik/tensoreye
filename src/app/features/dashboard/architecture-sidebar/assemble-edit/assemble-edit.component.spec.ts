import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssembleEditComponent } from './assemble-edit.component';

describe('AssembleEditComponent', () => {
  let component: AssembleEditComponent;
  let fixture: ComponentFixture<AssembleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssembleEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssembleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
