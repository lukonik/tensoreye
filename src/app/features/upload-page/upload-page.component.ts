import {
  AfterViewInit,
  Component,
  inject,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { DatasetState } from '../../state/dataset.state';
import { string } from '@tensorflow/tfjs';
import { CommonDataset } from '../../models/common-dataset';
import { CommonDatasetList } from '../../models/common-dataset.list';
import { CommonDatasetState } from '../../state/common-dataset.state';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NavigatorState } from '../../state/navigator.state';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { ArchitectureState } from '../../state/architecture.state';
import { ArchitectureHelperService } from '../../state/architecture-helper.service';
import { BlockTypesList } from '../../models/block-types.list';
import { DenseBlockModel } from '../../models/dense-block.model';
import { SolverList } from '../../models/solver.list';
import { ResidualList } from '../../models/residual.list';
import { OutputFunctionList } from '../../models/output-function.list';
import { MeasureList } from '../../models/measure.list';
import { ModelState } from '../../state/model.state';
import { ModelPhaseState } from '../../state/model-phase.state';
import { DataFrame, readCSV } from 'danfojs/dist/danfojs-browser/src';
import papa from 'papaparse';
import { ErrorService } from '../../services/error.service';
import { EngineState } from '../../state/engine.state';
import { SelectColumnTypes } from '../../models/select-columns.model';
@Component({
  selector: 'app-upload-page',
  standalone: true,
  imports: [
    MatChipsModule,
    NgxFileDropModule,
    MatIconModule,
    MatButton,
    MatCardModule,
  ],
  templateUrl: './upload-page.component.html',
  styleUrl: './upload-page.component.scss',
})
export class UploadPageComponent {
  public files: NgxFileDropEntry[] = [];
  private datasetState = inject(DatasetState);
  stepper = inject(MatStepper);
  archState = inject(ArchitectureState);
  archHelperService = inject(ArchitectureHelperService);
  modelState = inject(ModelState);
  modelPhaseState = inject(ModelPhaseState);
  errorService = inject(ErrorService);
  engineState = inject(EngineState);
  COMMON_DATASET_LIST = CommonDatasetList;
  loading = signal(false);

  commonDatasets = signal<CommonDataset[]>([
    { name: 'Iris', type: CommonDatasetList.Iris },
    { name: 'Diabetes', type: CommonDatasetList.Diabetes },
    { name: 'Boston Housing', type: CommonDatasetList.BostonHousing },
  ]);
  commonDatasetState = inject(CommonDatasetState);
  navigatorState = inject(NavigatorState);

  chooseDataset(type: CommonDatasetList) {
    this.prepareDashboard();
    this.loading.set(true);
    this.commonDatasetState.load(type).subscribe((df) => {
      this.datasetState.setDataframe(df);

      switch (type) {
        case CommonDatasetList.Iris:
          this.prepareArchForIris(df);
          break;
        case CommonDatasetList.Diabetes:
          this.prepareArchForDiabetes(df);
          break;
        case CommonDatasetList.BostonHousing:
          this.prepareArchForBoston(df);
          break;
        case CommonDatasetList.CaliforniaHousing:
          this.prepareArchForCalifornia(df);
          break;
      }
      this.loading.set(false);

      this.navigateToDashboard();
    });
  }

  private navigateToDashboard() {
    this.stepper.selectedIndex = 1;
  }

  private prepareDashboard() {
    this.archState.reset();
    this.modelPhaseState.toNotBuilt();
    this.modelState.reset();
  }

  private prepareArchForCalifornia(df: DataFrame) {
    this.archState.addBlock(
      this.archHelperService.createBlock<DenseBlockModel>(
        BlockTypesList.Dense,
        {
          units: 64,
        }
      )
    );
    this.archState.addBlock(
      this.archHelperService.createBlock<DenseBlockModel>(
        BlockTypesList.Dense,
        {
          units: 32,
        }
      )
    );

    this.archState.addBlock(
      this.archHelperService.createBlock<DenseBlockModel>(
        BlockTypesList.Dense,
        {
          units: 1,
          activation: OutputFunctionList.linear,
        }
      )
    );

    this.archState.updateAssemble({
      solver: SolverList.adam,
      residual: ResidualList.meanSquaredError,
      metrics: [MeasureList.meanAbsoluteError],
    });
    this.fillFeatureColumns('median_house_value');
  }

  private prepareArchForBoston(df: DataFrame) {
    this.archState.addBlock(
      this.archHelperService.createBlock<DenseBlockModel>(
        BlockTypesList.Dense,
        {
          units: 64,
        }
      )
    );
    this.archState.addBlock(
      this.archHelperService.createBlock<DenseBlockModel>(
        BlockTypesList.Dense,
        {
          units: 32,
        }
      )
    );

    this.archState.addBlock(
      this.archHelperService.createBlock<DenseBlockModel>(
        BlockTypesList.Dense,
        {
          units: 1,
          activation: OutputFunctionList.linear,
        }
      )
    );

    this.archState.updateAssemble({
      solver: SolverList.adam,
      residual: ResidualList.meanSquaredError,
      metrics: [MeasureList.meanAbsoluteError],
    });
    this.fillFeatureColumns('PRICE');
  }

  private prepareArchForIris(df: DataFrame) {
    this.archState.addBlock(
      this.archHelperService.createBlock<DenseBlockModel>(
        BlockTypesList.Dense,
        {
          units: 64,
        }
      )
    );
    this.archState.addBlock(
      this.archHelperService.createBlock<DenseBlockModel>(
        BlockTypesList.Dense,
        {
          units: 32,
        }
      )
    );

    this.archState.addBlock(
      this.archHelperService.createBlock<DenseBlockModel>(
        BlockTypesList.Dense,
        {
          units: 3,
          activation: OutputFunctionList.softmax,
        }
      )
    );

    this.archState.updateInput({
      shape: 4,
    });

    this.archState.updateAssemble({
      solver: SolverList.adam,
      residual: ResidualList.sparseCategoricalCrossentropy,
      metrics: [MeasureList.accuracy],
    });

    this.fillFeatureColumns('variety');
  }

  private prepareArchForDiabetes(df: DataFrame) {
    this.archState.addBlock(
      this.archHelperService.createBlock<DenseBlockModel>(
        BlockTypesList.Dense,
        {
          units: 64,
        }
      )
    );
    this.archState.addBlock(
      this.archHelperService.createBlock<DenseBlockModel>(
        BlockTypesList.Dense,
        {
          units: 32,
        }
      )
    );

    this.archState.addBlock(
      this.archHelperService.createBlock<DenseBlockModel>(
        BlockTypesList.Dense,
        {
          units: 1,
          activation: OutputFunctionList.sigmoid,
        }
      )
    );

    this.archState.updateInput({
      shape: 8,
    });

    this.archState.updateDataSplit({
      validationSplit: 0.2,
      testSplit: 0.0,
    });

    this.archState.updateAssemble({
      solver: SolverList.adam,
      residual: ResidualList.binaryCrossentropy,
      metrics: [MeasureList.accuracy],
    });
    this.fillFeatureColumns('Outcome');
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file(async (file: File) => {
          try {
            const df = await readCSV(file, { header: true, delimiter: ',' });
            this.prepareDashboard();
            this.datasetState.setDataframe(df);
            this.fillFeatureColumns();
            this.navigateToDashboard();
          } catch (err: any) {
            this.errorService.error(err.message);
          }
        });
      } else {
        this.errorService.error('Not proper file format');
      }
    }
  }

  private fillFeatureColumns(targetColumn?: string) {
    const cols = this.datasetState.columns;
    const mapped = cols.map((c) => ({
      name: c,
      type: SelectColumnTypes.Feature,
    }));
    if (targetColumn) {
      const foundCol = mapped.find((c) => c.name === targetColumn);
      if (foundCol) {
        foundCol.type = SelectColumnTypes.Target;
      }
    }
    this.archState.updateSelectColumns(mapped);
  }
}
