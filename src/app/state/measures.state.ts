import { Injectable, signal } from '@angular/core';
import { MeasureList } from '../models/measure.list';
import { MeasureModel } from '../models/measure.model';

@Injectable({ providedIn: 'root' })
export class MeasuresState {
  private _measures = signal<MeasureModel[]>([
    { type: MeasureList.meanAbsoluteError, name: 'Mean Absolute Error' },
    { type: MeasureList.meanSquaredError, name: 'Mean Squared Error' },
    { type: MeasureList.accuracy, name: 'Accuracy' },
  ]);

  measures = this._measures.asReadonly();
}
