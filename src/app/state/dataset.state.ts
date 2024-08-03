import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  readCSV,
  DataFrame,
  MinMaxScaler,
} from 'danfojs/dist/danfojs-browser/src';
import { DataSplitModel } from '../models/data-split.model';
import { from, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatasetState {
  private _df!: DataFrame;
  xFeatures: any;
  yTarget: any;
  private _trainData!: DataFrame;
  private _testData: DataFrame | undefined;

  get totalRows() {
    return this._df.shape[0];
  }

  setDataframe(df: DataFrame) {
    this._df = df;
  }

  get columns() {
    return this._df.columns;
  }

  get featuresShape() {
    return this.xFeatures.shape[1];
  }

  get trainData() {
    return this._trainData;
  }

  get testData() {
    return this._testData;
  }

  get hasTestData() {
    return !!this._testData;
  }

  splitData(dataSplit: DataSplitModel) {
    if (!dataSplit.testSplit) {
      this._trainData = this._df;
      return;
    }
    // Define the test fraction
    const testFraction = dataSplit.testSplit;

    // Calculate the split index
    const testSize = Math.floor(testFraction * this._df.shape[0]);
    const trainSize = this._df.shape[0] - testSize;

    // Split the DataFrame
    const trainDf = this._df.iloc({ rows: [`0:${trainSize}`] });
    const testDf = this._df.iloc({
      rows: [`${trainSize}:${this._df.shape[0]}`],
    });
    this._trainData = trainDf;
    this._testData = testDf;
  }

  splitColumns(
    df: DataFrame,
    featureColumns: string[],
    targetColumns: string[]
  ) {
    // Get all column names
    let columns = df.columns;

    for (const col of columns) {
      df = df.asType(col, 'float32');
    }
    const xFeatures = df.loc({
      columns: featureColumns,
    }).tensor;
    const yTarget = df.loc({ columns: targetColumns }).tensor;

    return [xFeatures, yTarget];
  }
}
