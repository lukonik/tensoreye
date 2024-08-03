import { BlockTypesList } from './block-types.list';

export interface BaseBlockModel {
  id: string;
  type: BlockTypesList;
  name: string;
}
