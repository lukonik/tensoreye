import { BaseBlockModel } from './base-block.model';
import { KernelInitList } from './kernel-init.list';
import { OutputFunctionList } from './output-function.list';

export interface DenseBlockModel extends BaseBlockModel {
  activation: OutputFunctionList;
  units: number;
  kernelInitializer: KernelInitList;
}
