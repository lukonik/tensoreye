import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-wasm';
import Modernizr from 'modernizr';
import { setWasmPaths } from '@tensorflow/tfjs-backend-wasm';

if (typeof WebAssembly !== 'undefined') {
  setWasmPaths(
    'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm/dist/'
  );
  tf.setBackend('wasm').then((wasmInit) => {
    if (!wasmInit) {
      return tf.setBackend('webgl');
    }
    return wasmInit;
  });
} else {
  tf.setBackend('webgl');
}

tf.enableProdMode();
bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
