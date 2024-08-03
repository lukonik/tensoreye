import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectColumnsEditComponent } from './select-columns-edit.component';

describe('SelectColumnsEditComponent', () => {
  let component: SelectColumnsEditComponent;
  let fixture: ComponentFixture<SelectColumnsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectColumnsEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectColumnsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
