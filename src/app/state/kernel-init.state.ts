import { Injectable, signal } from '@angular/core';
import { KernelInitList } from '../models/kernel-init.list';
import { KernelInitModel } from '../models/kernel-init.model';

@Injectable({ providedIn: 'root' })
export class KernelInitState {
  private _kernelInits = signal<KernelInitModel[]>([
    { type: KernelInitList.HeNormal, name: 'HeNormal' },
    {
      type: KernelInitList.RandomNormal,
      name: 'Random Normal',
    },
    {
      type: KernelInitList.RandomUniform,
      name: 'Random Uniform',
    },
    {
      type: KernelInitList.Constant,
      name: 'Constant',
    },
  ]);

  kernelInits = this._kernelInits.asReadonly();
}
