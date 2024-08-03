import { Injectable } from '@angular/core';
import { BlockTypesList } from '../models/block-types.list';
import { BlockModel } from '../models/block.model';
import { generateId } from '../utils/generate-id';
import { OutputFunctionList } from '../models/output-function.list';
import { BaseBlockModel } from '../models/base-block.model';
import { DenseBlockModel } from '../models/dense-block.model';
import { DropoutBlockModel } from '../models/dropout-block.model';
import { KernelInitList } from '../models/kernel-init.list';
import { BatchNormalizationBlockModel } from '../models/batch-normalization-block.model';

@Injectable({
  providedIn: 'root',
})
export class ArchitectureHelperService {
  createBlock<T = any>(type: BlockTypesList, params?: Partial<T>): BlockModel {
    const base: Omit<BaseBlockModel, 'name'> = {
      id: generateId(),
      type: type,
    };
    switch (type) {
      case BlockTypesList.Dense: {
        return {
          ...base,
          activation: OutputFunctionList.relu,
          units: 64,
          kernelInitializer: KernelInitList.HeNormal,
          name: 'Dense',
          ...params,
        } as DenseBlockModel;
      }
      case BlockTypesList.Dropout: {
        return {
          ...base,
          rate: 0.5,
          name: 'Dropout',
          ...params,
        } as DropoutBlockModel;
      }
      case BlockTypesList.BatchNormalization: {
        return {
          ...base,
          momentum: 0.99,
          center: true,
          name: 'Batch-Normalization',
          ...params,
        } as BatchNormalizationBlockModel;
      }
      default:
        throw new Error('Not implemtned');
    }
  }
}
