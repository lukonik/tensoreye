import { Injectable, signal } from '@angular/core';
import { ResidualList } from '../models/residual.list';
import { ResidualModel } from '../models/residual.model';

@Injectable({ providedIn: 'root' })
export class ResidualsState {
  private _residuals = signal<ResidualModel[]>([
    { type: ResidualList.meanSquaredError, name: 'Mean Squared Error' },
    {
      type: ResidualList.binaryCrossentropy,
      name: 'Binary Cross Entropy',
    },
    {
      type: ResidualList.categoricalCrossentropy,
      name: 'Categorical Cross Entropy',
    },
    {
      type: ResidualList.sparseCategoricalCrossentropy,
      name: 'Sparse Categorical Cross Entropy',
    },
    { type: ResidualList.meanAbsoluteError, name: 'Mean Absolute Error' },
  ]);

  residuals = this._residuals.asReadonly();
}
