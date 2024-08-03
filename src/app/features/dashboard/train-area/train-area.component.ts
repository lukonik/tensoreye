import { Component, inject } from '@angular/core';
import { ModelState } from '../../../state/model.state';
import { ModelPhaseSectionComponent } from './model-phase/model-phase-section.component';
import { TrainChartsComponent } from './train-charts/train-charts.component';
import { TrainTableReportComponent } from './train-table-report/train-table-report.component';
import { ModelReportState } from '../../../state/model-report.state';
import { ModelPhaseState } from '../../../state/model-phase.state';
import { DisableOverlayDirective } from '../../ui/disable-overlay.directive';

@Component({
  selector: 'app-train-area',
  standalone: true,
  imports: [
    ModelPhaseSectionComponent,
    TrainChartsComponent,
    TrainTableReportComponent,
    DisableOverlayDirective
  ],
  templateUrl: './train-area.component.html',
  styleUrl: './train-area.component.scss',
})
export class TrainAreaComponent {
  modelState = inject(ModelState);
  modelReport = inject(ModelReportState);
  modelPhaseState = inject(ModelPhaseState);
  hasLogs = this.modelReport.hasLogs;
  isTrained = this.modelPhaseState.isTrained;
}
