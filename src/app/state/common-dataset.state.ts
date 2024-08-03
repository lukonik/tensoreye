import { inject, Injectable } from '@angular/core';
import { CommonDatasetList } from '../models/common-dataset.list';
import {
  readCSV,
  DataFrame,
  MinMaxScaler,
} from 'danfojs/dist/danfojs-browser/src';
import { from, tap } from 'rxjs';
import { DatasetState } from './dataset.state';

@Injectable({
  providedIn: 'root',
})
export class CommonDatasetState {
  datasetState = inject(DatasetState);

  load(type: CommonDatasetList) {
    let fileName = '';

    switch (type) {
      case CommonDatasetList.Diabetes:
        fileName = 'diabetes';
        break;
      case CommonDatasetList.Iris:
        fileName = 'iris';
        break;
      case CommonDatasetList.IrisOneHot:
        fileName = 'iris-one-hot';
        break;
      case CommonDatasetList.BostonHousing:
        fileName = 'boston-housing';
        break;
      case CommonDatasetList.CaliforniaHousing:
        fileName = 'california-housing';
        break;
    }

    return from(readCSV(`assets/datasets/${fileName}.csv`));
  }
}
