import { Injectable, signal } from '@angular/core';
import { SolverModel } from '../models/solver.model';
import { SolverList } from '../models/solver.list';

@Injectable({ providedIn: 'root' })
export class SolversState {
  private _solvers = signal<SolverModel[]>([
    { type: SolverList.adam, name: 'Adam' },
    { type: SolverList.sgd, name: 'SGD' },
    { type: SolverList.momentum, name: 'Momentum' },
    {
      type: SolverList.adagrad,
      name: 'Adagrad',
    },
    { type: SolverList.adadelta, name: 'Adadelta' },
    { type: SolverList.adamax, name: 'Adamax' },
    { type: SolverList.rmsprop, name: 'Rmsprop' },
  ]);

  solvers = this._solvers.asReadonly();
}
