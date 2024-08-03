import { MeasureList } from './measure.list';
import { ResidualList } from './residual.list';
import { SolverList } from './solver.list';

export interface AssembleModel {
  solver: SolverList;
  residual: ResidualList;
  metrics: MeasureList[];
}
