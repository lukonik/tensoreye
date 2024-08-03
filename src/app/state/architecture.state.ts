import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { BlockModel } from '../models/block.model';
import { AssembleModel } from '../models/assemble.model';
import { ArchitectureModel } from '../models/architecture.model';
import { arrayAdd } from '../utils/array-add';
import { arrayInsert } from '../utils/array-insert';
import { arrayUpdate } from '../utils/array-update';
import { arrayRemove } from '../utils/array-remove';
import { MeasureList } from '../models/measure.list';
import { SolverList } from '../models/solver.list';
import { ResidualList } from '../models/residual.list';
import { LearnModel } from '../models/learn.model';
import { ModelPhaseState } from './model-phase.state';
import { InputBlockModel } from '../models/input-block.model';
import { BaseBlockModel } from '../models/base-block.model';
import { DataSplitModel } from '../models/data-split.model';
import { EngineState } from './engine.state';
import {
  SelectColumnModel,
  SelectColumnTypes,
} from '../models/select-columns.model';

@Injectable({ providedIn: 'root' })
export class ArchitectureState {
  modelPhaseState = inject(ModelPhaseState);

  private _blocks = signal<BlockModel[]>([]);
  private engineState = inject(EngineState);
  private _assemble = signal<AssembleModel>({
    solver: SolverList.adam,
    residual: ResidualList.categoricalCrossentropy,
    metrics: [MeasureList.accuracy],
  });
  private _inputBlock = signal<InputBlockModel>({
    shape: 0,
  });
  private _selectColumns = signal<SelectColumnModel[]>([]);

  private _dataSplit = signal<DataSplitModel>({
    validationSplit: 0.2,
    testSplit: 0.2,
  });

  private _learn = signal<LearnModel>({
    epochs: 3000,
    batchSize: 32,
  });

  blocks = this._blocks.asReadonly();
  inputBlock = this._inputBlock.asReadonly();
  assemble = this._assemble.asReadonly();
  learn = this._learn.asReadonly();
  dataSplit = this._dataSplit.asReadonly();
  architecture = computed<ArchitectureModel>(() => ({
    blocks: this._blocks(),
    assemble: this._assemble(),
    input: this._inputBlock(),
    learn: this._learn(),
    dataSplit: this._dataSplit(),
    selectColumns: this._selectColumns(),
  }));
  selectColumns = this._selectColumns.asReadonly();

  reset() {
    this._blocks.set([]);
    this._assemble.set({
      solver: SolverList.adam,
      residual: ResidualList.meanSquaredError,
      metrics: [MeasureList.meanAbsoluteError],
    });
    this._inputBlock.set({
      shape: 0,
    });

    this._dataSplit.set({
      validationSplit: 0.2,
      testSplit: 0.2,
    });

    this._selectColumns.set([]);

    this._learn.set({
      epochs: 3000,
      batchSize: 32,
    });
    this._selectColumns.set([]);

    this.modelPhaseState.toNotBuilt();
  }

  getTargetColumns() {
    return this.selectColumns().filter(
      (d) => d.type === SelectColumnTypes.Target
    );
  }

  getFeatureColumns() {
    return this.selectColumns().filter(
      (d) => d.type === SelectColumnTypes.Feature
    );
  }

  updateInput(model: InputBlockModel) {
    this._inputBlock.set(model);
    this.modelPhaseState.toNotBuilt();
  }

  updateDataSplit(model: DataSplitModel) {
    this._dataSplit.set(model);
    this.modelPhaseState.toNotBuilt();
  }

  updateSelectColumns(model: SelectColumnModel[]) {
    this._selectColumns.set(model);
    this.modelPhaseState.toNotBuilt();
  }

  updateAssemble(assemble: AssembleModel) {
    this._assemble.set(assemble);
    this.modelPhaseState.toNotBuilt();
  }

  updateLearn(learn: LearnModel) {
    this._learn.set(learn);
    this.modelPhaseState.toNotBuilt();
  }

  addBlock(block: BlockModel) {
    this._blocks.set(arrayAdd(this._blocks(), block));
    this.modelPhaseState.toNotBuilt();
  }

  insertBlock(index: number, block: BlockModel) {
    this._blocks.set(arrayInsert(this._blocks(), index, block));
    this.modelPhaseState.toNotBuilt();
  }

  removeBlock(block: BlockModel) {
    this._blocks.set(arrayRemove(this._blocks(), (o) => o.id === block.id));
    this.modelPhaseState.toNotBuilt();
  }

  replaceBlock(oldBlock: BlockModel, newBlock: BlockModel) {
    this._blocks.set(
      arrayUpdate(
        this._blocks(),
        () => newBlock,
        (b) => b.id === oldBlock.id
      )
    );
    this.modelPhaseState.toNotBuilt();
  }
}
