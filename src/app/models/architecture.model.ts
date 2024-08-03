import { AssembleModel } from './assemble.model';
import { BlockModel } from './block.model';
import { DataSplitModel } from './data-split.model';
import { InputBlockModel } from './input-block.model';
import { LearnModel } from './learn.model';
import { SelectColumnModel } from './select-columns.model';

export interface ArchitectureModel {
  blocks: BlockModel[];
  input: InputBlockModel;
  assemble: AssembleModel;
  learn: LearnModel;
  dataSplit: DataSplitModel;
  selectColumns: SelectColumnModel[];
}
