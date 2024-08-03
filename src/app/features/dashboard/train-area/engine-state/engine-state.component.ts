import { Component, inject } from '@angular/core';
import { EngineState } from '../../../../state/engine.state';

@Component({
  selector: 'app-engine-state',
  standalone: true,
  imports: [],
  templateUrl: './engine-state.component.html',
  styleUrl: './engine-state.component.scss',
})
export class EngineStateComponent {
  engineState = inject(EngineState);
}
