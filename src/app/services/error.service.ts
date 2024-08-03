import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  snackbar = inject(MatSnackBar);

  error(message: string) {
    this.snackbar.open(message, 'close', {
      politeness: 'assertive',
      duration: 10 * 1000,
    });
  }
}
