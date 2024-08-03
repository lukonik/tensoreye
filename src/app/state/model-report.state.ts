import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModelReportState {
  private _currentEpoch = signal<number | undefined>(undefined);
  private _totalEpoch = signal<number | undefined>(undefined);
  private _epochLogs = signal<any | undefined>(undefined);

  hasLogs = computed(() => {
    return this._epochLogs();
  });

  metricsDisplay = computed(() => {
    const logs = this._epochLogs();
    if (!logs) {
      return [];
    }
    const result: { name: string; valValue: number; trainValue: number }[] = [];
    const keys = Object.keys(logs);
    const valuePairs: {
      [key: string]: { valValue?: number; trainValue?: number };
    } = {};

    keys.forEach((key) => {
      const isValKey = key.startsWith('val_');
      const baseKey = isValKey ? key.slice(4) : key;

      if (!valuePairs[baseKey]) {
        valuePairs[baseKey] = {};
      }

      if (isValKey) {
        valuePairs[baseKey].valValue = logs[key];
      } else {
        valuePairs[baseKey].trainValue = logs[key];
      }
    });

    Object.keys(valuePairs).forEach((key) => {
      result.push({
        name: key,
        valValue: valuePairs[key].valValue ?? 0,
        trainValue: valuePairs[key].trainValue ?? 0,
      });
    });

    return result;
  });

  currentEpoch = this._currentEpoch.asReadonly();

  epochLogs = this._epochLogs.asReadonly();

  epochDisplay = computed(() => {
    if (
      this._currentEpoch() !== undefined &&
      this._totalEpoch() !== undefined
    ) {
      return `${this._currentEpoch()}/${this._totalEpoch()}`;
    }
    return undefined;
  });

  resetEpochs() {
    this._currentEpoch.set(undefined);
    this._totalEpoch.set(undefined);
  }

  updateEpochLogs(logs: any) {
    this._epochLogs.set(logs);
  }

  epochProgress = computed(() => {
    const currentEpoch = this._currentEpoch();
    const totalEpoch = this._totalEpoch();
    if (
      currentEpoch !== undefined &&
      totalEpoch !== undefined &&
      totalEpoch !== 0
    ) {
      return Math.floor((currentEpoch / totalEpoch) * 100);
    }
    return 0;
  });

  updateEpoch(epoch: number) {
    this._currentEpoch.set(epoch);
  }

  updateTotalEpoch(epoch: number) {
    this._totalEpoch.set(epoch);
  }

  reset() {
    this._totalEpoch.set(undefined);
    this._currentEpoch.set(undefined);
    this._epochLogs.set(undefined);
  }
}
