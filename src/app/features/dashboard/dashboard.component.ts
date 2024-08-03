import { Component, inject } from '@angular/core';
import { ArchitectureSidebarComponent } from './architecture-sidebar/architecture-sidebar.component';
import { TrainAreaComponent } from './train-area/train-area.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ArchitectureSidebarComponent, TrainAreaComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
