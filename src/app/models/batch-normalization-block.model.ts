import { BaseBlockModel } from './base-block.model';

export interface BatchNormalizationBlockModel extends BaseBlockModel {
  momentum: number;
  center: boolean;
}
