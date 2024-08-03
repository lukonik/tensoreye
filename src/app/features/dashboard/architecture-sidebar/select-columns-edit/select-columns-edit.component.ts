import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DatasetState } from '../../../../state/dataset.state';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {
  SelectColumnModel,
  SelectColumnTypes,
} from '../../../../models/select-columns.model';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-select-columns-edit',
  standalone: true,
  imports: [
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDividerModule,
  ],
  templateUrl: './select-columns-edit.component.html',
  styleUrl: './select-columns-edit.component.scss',
})
export class SelectColumnsEditComponent {
  myForm!: FormGroup;

  SELECT_COLUMN_TYPES = SelectColumnTypes;

  selectColumns = inject(MAT_DIALOG_DATA).selectColumns as SelectColumnModel[];
  columns = inject(DatasetState).columns;

  dialogRef = inject(MatDialogRef);

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      items: this.fb.array([]),
    });

    this.initializeFormArray();
  }

  initializeFormArray() {
    const items = this.myForm.get('items') as FormArray;
    this.selectColumns.forEach((c) => {
      items.push(
        this.fb.group({
          name: [c.name],
          type: [c.type],
        })
      );
    });
  }

  submit() {
    this.dialogRef.close(this.myForm.get('items')?.getRawValue());
  }

  get items(): FormArray {
    return this.myForm.get('items') as FormArray;
  }
}
