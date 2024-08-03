import { Component, effect, inject, input, output } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DenseBlockModel } from '../../../../../models/dense-block.model';
import { OutputFunctionList } from '../../../../../models/output-function.list';
import { MatButton } from '@angular/material/button';
import { OutputFunctionsState } from '../../../../../state/output-functions.state';
import { KernelInitState } from '../../../../../state/kernel-init.state';
import { KernelInitList } from '../../../../../models/kernel-init.list';

@Component({
  selector: 'app-dense-edit',
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
  templateUrl: './dense-edit.component.html',
  styleUrl: './dense-edit.component.scss',
})
export class DenseEditComponent {
  block = input.required<DenseBlockModel>();
  fb = inject(FormBuilder);
  group = this.fb.group({
    activation: this.fb.nonNullable.control(
      OutputFunctionList.relu,
      Validators.required
    ),
    units: this.fb.nonNullable.control(64, Validators.required),
    kernelInitializer: this.fb.nonNullable.control(
      KernelInitList.HeNormal,
      Validators.required
    ),
  });
  outputFunctions = inject(OutputFunctionsState).outputFunctions;

  kernelInits = inject(KernelInitState).kernelInits;

  save = output<DenseBlockModel>();

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
