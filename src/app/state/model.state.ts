import { inject, Injectable, signal } from '@angular/core';
import { BlockModel } from '../models/block.model';
import { ArchitectureModel } from '../models/architecture.model';
import * as tf from '@tensorflow/tfjs';
import { BlockTypesList } from '../models/block-types.list';
import {
  catchError,
  delay,
  EMPTY,
  from,
  single,
  switchMap,
  throwError,
  timer,
} from 'rxjs';
import { LearnModel } from '../models/learn.model';
import { ArchitectureState } from './architecture.state';
import { ModelReportState } from './model-report.state';
import { ModelPhaseState } from './model-phase.state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InputBlockModel } from '../models/input-block.model';
import { DenseBlockModel } from '../models/dense-block.model';
import { DropoutBlockModel } from '../models/dropout-block.model';
import { DatasetState } from './dataset.state';
import { ErrorService } from '../services/error.service';
import { BatchNormalizationBlockModel } from '../models/batch-normalization-block.model';

@Injectable({
  providedIn: 'root',
})
export class ModelState {
  private _model!: tf.Sequential;
  private _trainReport = signal<any | undefined>(undefined);
  archState = inject(ArchitectureState);
  reportState = inject(ModelReportState);
  modelPhaseState = inject(ModelPhaseState);
  datasetState = inject(DatasetState);
  errorService = inject(ErrorService);

  private validate() {
    if (!this.archState.getTargetColumns().length) {
      throw new Error('Please Select Target Columns(s)');
    }
  }

  build() {
    try {
      this.validate();
      this._model = tf.sequential();
      this.datasetState.splitData(this.archState.dataSplit());
      const featureColumns = this.archState.getFeatureColumns();

      this.archState.updateInput({
        shape: featureColumns.length,
      });
      const architecture = this.archState.architecture();

      this.buildLayers(architecture);
      this.compileModel(architecture);

      this._model.compile({
        optimizer: architecture.assemble.solver,
        loss: architecture.assemble.residual,
        metrics: architecture.assemble.metrics,
      });

      this.modelPhaseState.toBuilt();
    } catch (err: any) {
      this.errorService.error(err.message);
    }
  }

  evaluate() {
    tf.layers.batchNormalization();
    if (this.datasetState.testData) {
      const [xFeatures, yTarget] = this.datasetState.splitColumns(
        this.datasetState.testData,
        this.archState.getFeatureColumns().map((c) => c.name),
        this.archState.getTargetColumns().map((c) => c.name)
      );

      const scalars = this._model.evaluate(xFeatures, yTarget) as tf.Scalar[];
      const metrics = this._model.metricsNames.map((name, index) => {
        return { name: name, value: scalars[index].dataSync()[0] };
      });

      return metrics;
    }
    return undefined;
  }

  private compileModel(architecture: ArchitectureModel) {
    this._model.compile({
      optimizer: architecture.assemble.solver,
      loss: architecture.assemble.residual,
      metrics: architecture.assemble.metrics as any,
    });
  }

  private buildLayers(architecture: ArchitectureModel) {
    this._model.add(this.mapInputBlockToLayer(architecture.input));
    for (const layer of architecture.blocks.slice(1)) {
      this._model.add(this.mapBlockToLayer(layer));
    }
  }

  fit() {
    if (this._model?.stopTraining) {
      this.build();
    }

    const [xFeatures, yTarget] = this.datasetState.splitColumns(
      this.datasetState.trainData,
      this.archState.getFeatureColumns().map((c) => c.name),
      this.archState.getTargetColumns().map((c) => c.name)
    );

    const onEpochEnd = (epoch: number, logs: any) => {
      this.reportState.updateEpoch(epoch);
      this.reportState.updateEpochLogs(logs);
    };

    const onTrainEnd = () => {
      this.modelPhaseState.toTrained();
    };
    const onTrainBegin = () => {
      this.modelPhaseState.toStarted();
    };
    this.modelPhaseState.toStarting();
    const learn = this.archState.learn();
    this.reportState.updateTotalEpoch(learn.epochs);
    // We need timer 100ms in order to display button loading indicator
    //because model fit starts process in UI thread and it stucks the UI
    return timer(100).pipe(
      switchMap(() =>
        from(
          this._model.fit(xFeatures, yTarget, {
            epochs: learn.epochs,
            batchSize: learn.batchSize,
            validationSplit: this.archState.dataSplit().validationSplit,
            callbacks: { onEpochEnd, onTrainEnd, onTrainBegin },
          })
        ).pipe(
          catchError((err) => {
            this.modelPhaseState.toBuilt();
            this.errorService.error(err.message);

            return throwError(() => err);
          })
        )
      )
    );
  }

  stop() {
    this._model.stopTraining = true;
    this.modelPhaseState.toBuilt();
  }

  reset() {
    if (this._model) {
      this._model.stopTraining = true;
      this._model.dispose();
      this.reportState.reset();
      this._model = null as any;
    }
  }

  private mapInputBlockToLayer(block: InputBlockModel) {
    return tf.layers.inputLayer({
      inputShape: [block.shape],
    });
  }

  private mapBlockToLayer(block: BlockModel) {
    switch (block.type) {
      case BlockTypesList.Dense: {
        const dense = block as DenseBlockModel;
        return tf.layers.dense({
          activation: dense.activation,
          kernelInitializer: dense.kernelInitializer,
          units: dense.units,
        });
      }
      case BlockTypesList.Dropout:
        const dropout = block as DropoutBlockModel;
        return tf.layers.dropout({
          rate: dropout.rate,
        });
      case BlockTypesList.BatchNormalization:
        const batch = block as BatchNormalizationBlockModel;
        return tf.layers.batchNormalization({
          momentum: batch.momentum,
          center: batch.center,
        });
    }
  }

  download() {
    return from(this._model.save('downloads://my-model'));
  }
}
