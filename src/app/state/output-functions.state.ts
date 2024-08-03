import { Injectable, signal } from '@angular/core';
import { OutputFunctionModel } from '../models/output-function.model';
import { OutputFunctionList } from '../models/output-function.list';

@Injectable({ providedIn: 'root' })
export class OutputFunctionsState {
  private _outputs = signal<OutputFunctionModel[]>([
    { type: OutputFunctionList.relu, name: 'Relu' },
    { type: OutputFunctionList.sigmoid, name: 'Sigmoid' },
    { type: OutputFunctionList.softmax, name: 'Softmax' },
    { type: OutputFunctionList.linear, name: 'Linear' },
    { type: OutputFunctionList.tanh, name: 'Tanh' },
  ]);

  outputFunctions = this._outputs.asReadonly();
}
