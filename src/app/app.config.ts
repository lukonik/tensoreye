import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogConfig,
} from '@angular/material/dialog';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideRouter(routes),
    provideHttpClient(),
    provideExperimentalZonelessChangeDetection(),
    provideAnimationsAsync(),
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        width: '420px',
      } as Partial<MatDialogConfig>,
    },
  ],
};
