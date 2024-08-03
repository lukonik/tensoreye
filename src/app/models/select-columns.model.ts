export enum SelectColumnTypes {
  Feature,
  Target,
  Drop,
}
export interface SelectColumnModel {
  name: string;
  type: SelectColumnTypes;
}

