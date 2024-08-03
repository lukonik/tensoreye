import { Component, computed, inject, signal } from '@angular/core';
import { ModelReportState } from '../../../../state/model-report.state';
import { DecimalPipe, SlicePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-train-table-report',
  standalone: true,
  imports: [MatTableModule, DecimalPipe, MatCardModule, SlicePipe],
  templateUrl: './train-table-report.component.html',
  styleUrl: './train-table-report.component.scss',
})
export class TrainTableReportComponent {
  reportState = inject(ModelReportState);
  metricsDisplay = this.reportState.metricsDisplay;
  displayMetrics = computed(() => {
    let trainData: any = {
      title: 'Train',
    };
    let valData: any = {
      title: 'Val',
    };
    const metrics = this.metricsDisplay();

    for (const metr of metrics) {
      trainData[metr.name] = metr.trainValue;
    }

    for (const metr of metrics) {
      valData[metr.name] = metr.valValue;
    }

    return [trainData, valData];
  });

  displayedColumns = computed(() => {
    return ['title', ...this.metricsDisplay().map((d) => d.name)];
  });

  data = signal([
    {
      title: 'HELLO',
    },
    {
      title: 'HELLO',
    },
    {
      title: 'HELLO',
    },
    {
      title: 'HELLO',
    },
  ]);
}
