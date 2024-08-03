import { inject, Injectable, signal } from '@angular/core';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigatorState {
  private router = inject(Router);
  steppers = signal<readonly MatStep[]>([]);

  toPrep() {
    this.router.navigate(['/prep']);
  }

  toDashboard() {
    this.router.navigate(['/dashboard']);
  }

  toUpload() {
    this.router.navigate(['/upload']);
  }
}
