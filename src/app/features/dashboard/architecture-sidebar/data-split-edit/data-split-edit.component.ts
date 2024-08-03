import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DatasetState } from '../../../../state/dataset.state';
import { DecimalPipe } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-data-split-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    DecimalPipe,
    MatCheckboxModule,
  ],
  templateUrl: './data-split-edit.component.html',
  styleUrl: './data-split-edit.component.scss',
})
export class DataSplitEditComponent implements OnInit {
  fb = inject(FormBuilder);
  datasetState = inject(DatasetState);

  totalRows = signal<number>(0);
  validationRows = signal<number>(0);
  testRows = signal<number>(0);

  dialogRef = inject(MatDialogRef);
  dataSplit = inject(MAT_DIALOG_DATA).dataSplit;

  group = this.fb.group({
    testSplit: this.fb.nonNullable.control(0.2, [
      Validators.min(0.1),
      Validators.max(1),
    ]),
    validationSplit: this.fb.nonNullable.control(0.2, [
      Validators.min(0.1),
      Validators.max(1),
    ]),
  });

  constructor() {}

  ngOnInit(): void {
    this.group.patchValue(this.dataSplit);

    this.totalRows.set(this.datasetState.totalRows);
    this.updateCounts();

    this.group.valueChanges.subscribe(() => {
      this.updateCounts();
    });
  }

  updateCounts() {
    const testValue = this.group.controls['testSplit'].value;
    if (testValue === 0) {
      this.testRows.set(0);
    } else {
      this.testRows.set(
        Math.floor(this.totalRows() * this.group.controls['testSplit'].value)
      );
    }

    const valValue = this.group.controls['validationSplit'].value;
    if (valValue === 0) {
      this.validationRows.set(0);
    } else {
      this.validationRows.set(
        Math.floor(
          (this.totalRows() - this.testRows()) *
            this.group.controls['validationSplit'].value
        )
      );
    }
  }

  submit() {
    this.dialogRef.close(this.group.getRawValue());
  }
}
