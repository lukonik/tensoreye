import { computed, Injectable, signal } from '@angular/core';

export enum ModelPhasesList {
  NotBuilt,
  Built,
  Starting,
  Started,
  Trained,
}

@Injectable({
  providedIn: 'root',
})
export class ModelPhaseState {
  private _modelPhase = signal<ModelPhasesList>(ModelPhasesList.NotBuilt);

  modelPhase = this._modelPhase.asReadonly();

  isNotBuilt = computed(() => {
    return this._modelPhase() === ModelPhasesList.NotBuilt;
  });

  isBuilt = computed(() => {
    return this._modelPhase() === ModelPhasesList.Built;
  });

  isStarting = computed(() => {
    return this._modelPhase() === ModelPhasesList.Starting;
  });

  isStarted = computed(() => {
    return this._modelPhase() === ModelPhasesList.Started;
  });

  isTrained = computed(() => {
    return this._modelPhase() === ModelPhasesList.Trained;
  });

  toTrained() {
    this._modelPhase.set(ModelPhasesList.Trained);
  }

  toBuilt() {
    this._modelPhase.set(ModelPhasesList.Built);
  }

  toStarting() {
    this._modelPhase.set(ModelPhasesList.Starting);
  }

  toStarted() {
    this._modelPhase.set(ModelPhasesList.Started);
  }

  toNotBuilt() {
    this._modelPhase.set(ModelPhasesList.NotBuilt);
  }
}
