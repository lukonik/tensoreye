import { Injectable, signal } from '@angular/core';
import { BlockTypesList } from '../models/block-types.list';
import { BlockTypeModel } from '../models/block-type.model';

@Injectable({
  providedIn: 'root',
})
export class BlockTypesState {
  private _blockTypes = signal<Array<BlockTypeModel>>([
    {
      name: 'Dense',
      type: BlockTypesList.Dense,
    },
    {
      name: 'Dropout',
      type: BlockTypesList.Dropout,
    },
    {
      name: 'Batch-Normalization',
      type: BlockTypesList.BatchNormalization,
    },
  ]);

  blockTypes = this._blockTypes.asReadonly();
}
