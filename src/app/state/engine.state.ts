import { Injectable } from '@angular/core';
import * as  tf from '@tensorflow/tfjs';

@Injectable({
  providedIn: 'root',
})
export class EngineState {
  get engineName() {
    return tf.getBackend();
  }

  get isWasm() {
    return this.engineName === 'wasm';
  }
}
