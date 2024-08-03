import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockEditComponent } from './block-edit.component';

describe('BlockEditComponent', () => {
  let component: BlockEditComponent;
  let fixture: ComponentFixture<BlockEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
