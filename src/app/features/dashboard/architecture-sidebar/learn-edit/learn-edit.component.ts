import { Component, inject, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LearnModel } from '../../../../models/learn.model';
import { cloneObject } from '../../../../utils/clone-object';
import { MatInput } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-learn-edit',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInput,
    MatDialogModule,
    MatButton,
    MatCheckboxModule,
  ],
  templateUrl: './learn-edit.component.html',
  styleUrl: './learn-edit.component.scss',
})
export class LearnEditComponent {
  data = inject(MAT_DIALOG_DATA);

  learn = signal<LearnModel>(cloneObject(this.data.learn));
  dialogRef = inject(MatDialogRef);

  updateBatch($event: any) {
    this.learn.set({
      ...this.learn(),
      batchSize: $event.target.valueAsNumber,
    });
  }

  updateEpochs($event: any) {
    this.learn.set({
      ...this.learn(),
      epochs: $event.target.valueAsNumber,
    });
  }

  save($event: any) {
    $event.preventDefault();
    this.dialogRef.close(this.learn());
  }
}
