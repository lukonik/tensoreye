import { BaseBlockModel } from './base-block.model';

export interface DropoutBlockModel extends BaseBlockModel {
  rate: number;
}
