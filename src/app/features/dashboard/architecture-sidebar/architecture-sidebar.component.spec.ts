import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildSidebarComponent } from './architecture-sidebar.component';

describe('BuildSidebarComponent', () => {
  let component: BuildSidebarComponent;
  let fixture: ComponentFixture<BuildSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
