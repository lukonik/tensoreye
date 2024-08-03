import {
  AfterViewInit,
  Component,
  computed,
  inject,
  viewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { MatStep, MatStepperModule } from '@angular/material/stepper';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { UploadPageComponent } from './features/upload-page/upload-page.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GithubIconComponent } from './features/ui/github-icon/github-icon.component';
import { filter } from 'rxjs';
import { NavigatorState } from './state/navigator.state';
import { MatTabsModule } from '@angular/material/tabs';
import { DatasetState } from './state/dataset.state';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatStepperModule,
    DashboardComponent,
    UploadPageComponent,
    MatToolbarModule,
    GithubIconComponent,
    MatTabsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  router = inject(Router);
  navigatorState = inject(NavigatorState);
  datasetState = inject(DatasetState);

  isPrepAllowed = computed(() => {});
  // isDashboardAllowed = computed(() => !!this.datasetState.yTarget);
  isDashboardAllowed = computed(() => false);
  constructor() {
    // this.navigatorState.toUpload(false);
  }

  ngAfterViewInit(): void {}
}
