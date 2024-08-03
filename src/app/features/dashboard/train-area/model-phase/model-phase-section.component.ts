import { Component, effect, inject, signal, viewChild } from '@angular/core';
import { ModelState } from '../../../../state/model.state';
import { DatasetState } from '../../../../state/dataset.state';
import * as tf from '@tensorflow/tfjs';
import { MatIcon } from '@angular/material/icon';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatProgressBar,
  MatProgressBarModule,
} from '@angular/material/progress-bar';
import { ModelReportState } from '../../../../state/model-report.state';
import {
  ModelPhasesList,
  ModelPhaseState,
} from '../../../../state/model-phase.state';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { TestEvaluationComponent } from '../test-evaluation/test-evaluation.component';
import { EngineStateComponent } from '../engine-state/engine-state.component';

@Component({
  selector: 'app-model-phase-section',
  standalone: true,
  imports: [
    MatIcon,
    MatDivider,
    MatIconButton,
    MatButton,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTooltip,
    EngineStateComponent,
  ],
  templateUrl: './model-phase-section.component.html',
  styleUrl: './model-phase-section.component.scss',
})
export class ModelPhaseSectionComponent {
  modelState = inject(ModelState);
  datasetState = inject(DatasetState);
  modelPhaseState = inject(ModelPhaseState);
  isStarting = this.modelPhaseState.isStarting;
  isStarted = this.modelPhaseState.isStarted;
  isTrained = this.modelPhaseState.isTrained;
  reportState = inject(ModelReportState);
  modelPhase = this.modelPhaseState.modelPhase;
  MODEL_PHASES = ModelPhasesList;
  uiDialog = inject(MatDialog);
  fit() {
    this.modelState.fit().subscribe();
  }
  stop() {
    this.modelState.stop();
  }

  evaluate() {
    const metrics = this.modelState.evaluate();
    this.uiDialog.open(TestEvaluationComponent, {
      data: {
        metrics,
      },
    });
  }
  build() {
    this.modelState.build();
  }
  download() {
    this.modelState.download().subscribe();
  }
}
