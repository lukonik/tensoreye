import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineStateComponent } from './engine-state.component';

describe('EngineStateComponent', () => {
  let component: EngineStateComponent;
  let fixture: ComponentFixture<EngineStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngineStateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
