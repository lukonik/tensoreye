import { BatchNormalizationBlockModel } from './batch-normalization-block.model';
import { DenseBlockModel } from './dense-block.model';
import { DropoutBlockModel } from './dropout-block.model';

export type BlockModel = DenseBlockModel | DropoutBlockModel | BatchNormalizationBlockModel;
