import { Component, computed, inject, signal } from '@angular/core';
import { TrainChartComponent } from './train-chart/train-chart.component';
import { ModelReportState } from '../../../../state/model-report.state';
import { ModelPhaseState } from '../../../../state/model-phase.state';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';

const toCharts = (input: { [key: string]: number }) => {
  const result: { name: string; valValue: number; trainValue: number }[] = [];
  const keys = Object.keys(input);
  const valuePairs: {
    [key: string]: { valValue?: number; trainValue?: number };
  } = {};

  keys.forEach((key) => {
    const isValKey = key.startsWith('val_');
    const baseKey = isValKey ? key.slice(4) : key;

    if (!valuePairs[baseKey]) {
      valuePairs[baseKey] = {};
    }

    if (isValKey) {
      valuePairs[baseKey].valValue = input[key];
    } else {
      valuePairs[baseKey].trainValue = input[key];
    }
  });

  Object.keys(valuePairs).forEach((key) => {
    result.push({
      name: key,
      valValue: valuePairs[key].valValue ?? 0,
      trainValue: valuePairs[key].trainValue ?? 0,
    });
  });

  return result;
};

@Component({
  selector: 'app-train-charts',
  standalone: true,
  imports: [TrainChartComponent, MatCard, MatDivider, MatCardContent],
  templateUrl: './train-charts.component.html',
  styleUrl: './train-charts.component.scss',
})
export class TrainChartsComponent {
  modelReportState = inject(ModelReportState);
  modelPhaseState = inject(ModelPhaseState);
  epoch = this.modelReportState.currentEpoch;
  charts = this.modelReportState.metricsDisplay;

  isStarted = this.modelPhaseState.isStarted;
}
