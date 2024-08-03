import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  viewChild,
} from '@angular/core';
import Plotly from 'plotly.js-dist-min';
import { ModelPhaseState } from '../../../../../state/model-phase.state';

@Component({
  selector: 'app-train-chart',
  standalone: true,
  imports: [],
  templateUrl: './train-chart.component.html',
  styleUrl: './train-chart.component.scss',
})
export class TrainChartComponent {
  chartEl = viewChild('trainChart', { read: ElementRef<HTMLElement> });
  plot!: Plotly.PlotlyHTMLElement;

  log = input.required<{
    trainValue: number;
    valValue: number;
    name: string;
  }>();
  epoch = input.required<number>();
  modelPhaseState = inject(ModelPhaseState);

  constructor() {
    effect(() => {
      const log = this.log();
      const epoch = this.epoch();
      if (this.plot) {
        const trainLoss = log.trainValue;
        const valValue = log.valValue;

        Plotly.relayout(this.plot, {
          title: log.name,
        });

        Plotly.extendTraces(
          this.plot,
          {
            x: [[epoch], [epoch]],
            y: [[trainLoss], [valValue]],
          },
          [0, 1]
        );
      }
    });
    effect(() => {
      const isStarted = this.modelPhaseState.isStarted();
      if (isStarted) {
        this.reset();
      }
    });
  }

  async reset() {
    const data = [
      {
        x: [],
        y: [],
        mode: 'lines',
        name: 'Train',
      },
      {
        x: [],
        y: [],
        mode: 'lines',
        name: 'Val',
      },
    ];

    const layout = {
      xaxis: { title: 'Epoch' },
      yaxis: { title: undefined },
    };

    this.plot = await Plotly.newPlot(
      this.chartEl()?.nativeElement,
      data,
      layout
    );
  }
}
