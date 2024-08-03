import { Component, inject, signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MeasuresState } from '../../../../state/measures.state';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { ResidualsState } from '../../../../state/residuals.state';
import { SolversState } from '../../../../state/solvers.state';
import { AssembleModel } from '../../../../models/assemble.model';
import { cloneObject } from '../../../../utils/clone-object';

@Component({
  selector: 'app-assemble-edit',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatDialogModule, MatButton],
  templateUrl: './assemble-edit.component.html',
  styleUrl: './assemble-edit.component.scss',
})
export class AssembleEditComponent {
  measureState = inject(MeasuresState);
  residualsState = inject(ResidualsState);
  solversState = inject(SolversState);

  measures = this.measureState.measures;
  residuals = this.residualsState.residuals;
  solvers = this.solversState.solvers;

  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef);

  assemble = signal<AssembleModel>(cloneObject(this.data.assemble));

  updateOptimizer($event: any) {
    this.assemble.set({
      ...this.assemble(),
      solver: $event,
    });
  }

  updateLoss($event: any) {
    this.assemble.set({
      ...this.assemble(),
      residual: $event,
    });
  }

  updateMetrics($event: any) {
    this.assemble.set({
      ...this.assemble(),
      metrics: $event,
    });
  }

  save($event: any) {
    $event.preventDefault();
    this.dialogRef.close(this.assemble());
  }
}
