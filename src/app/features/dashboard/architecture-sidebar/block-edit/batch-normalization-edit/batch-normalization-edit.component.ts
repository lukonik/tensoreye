import { Component, effect, inject, input, output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DropoutBlockModel } from '../../../../../models/dropout-block.model';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BatchNormalizationBlockModel } from '../../../../../models/batch-normalization-block.model';

@Component({
  selector: 'app-batch-normalization-edit',
  standalone: true,
  imports: [
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButton,
    MatDialogModule,
    MatCheckboxModule,
  ],
  templateUrl: './batch-normalization-edit.component.html',
  styleUrl: './batch-normalization-edit.component.scss',
})
export class BatchNormalizationEditComponent {
  block = input.required<BatchNormalizationBlockModel>();
  fb = inject(FormBuilder);
  group = this.fb.group({
    momentum: this.fb.nonNullable.control(0.99, [
      Validators.required,
      Validators.min(0),
      Validators.max(1),
    ]),
    center: this.fb.nonNullable.control(true, [Validators.required]),
  });

  save = output<BatchNormalizationBlockModel>();

  constructor() {
    effect(() => {
      this.group.patchValue(this.block());
    });
  }

  submit() {
    const values = this.group.getRawValue();

    this.save.emit({
      ...this.block(),
      ...values,
    });
  }
}
