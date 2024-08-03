import { Component, effect, inject, input, output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DenseBlockModel } from '../../../../../models/dense-block.model';
import { KernelInitList } from '../../../../../models/kernel-init.list';
import { OutputFunctionList } from '../../../../../models/output-function.list';
import { KernelInitState } from '../../../../../state/kernel-init.state';
import { OutputFunctionsState } from '../../../../../state/output-functions.state';
import { DropoutBlockModel } from '../../../../../models/dropout-block.model';

@Component({
  selector: 'app-dropout-edit',
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
  ],
  templateUrl: './dropout-edit.component.html',
  styleUrl: './dropout-edit.component.scss',
})
export class DropoutEditComponent {
  block = input.required<DropoutBlockModel>();
  fb = inject(FormBuilder);
  group = this.fb.group({
    rate: this.fb.nonNullable.control(0.5, [
      Validators.required,
      Validators.min(0),
      Validators.max(1),
    ]),
  });

  save = output<DropoutBlockModel>();

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
