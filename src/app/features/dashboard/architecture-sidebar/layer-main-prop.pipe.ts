import { Pipe, PipeTransform } from '@angular/core';
import { BlockTypesList } from '../../../models/block-types.list';
import { BlockModel } from '../../../models/block.model';
import { DenseBlockModel } from '../../../models/dense-block.model';
import { DropoutBlockModel } from '../../../models/dropout-block.model';

@Pipe({
  name: 'layerMainProp',
  standalone: true,
})
export class LayerMainPropPipe implements PipeTransform {
  transform(block: BlockModel) {
    if (block.type === BlockTypesList.Dense) {
      return `(${(block as DenseBlockModel).units})`;
    }
    if (block.type === BlockTypesList.Dropout) {
      return `(${(block as DropoutBlockModel).rate})`;
    }
    return undefined;
    // } else if (block.type === BlockTypesList.Input) {
    //   return `(${block.options.find((o) => o.id === 'inputShape')?.value})`;
    // }
    // else if(block.type === BlockTypesList.Dropout){
    //   return `(${block.options.find((o) => o.id === 'rate')?.value})`;
    // }
    // return undefined;
  }
}
