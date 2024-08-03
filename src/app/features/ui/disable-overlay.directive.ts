import { DOCUMENT } from '@angular/common';
import {
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDisableOverlay]',
  standalone: true,
})
export class DisableOverlayDirective {
  el = inject(ElementRef<HTMLElement>);
  renderer = inject(Renderer2);
  showOverlay = input.required({ alias: 'appDisableOverlay' });
  document = inject(DOCUMENT);
  private _div: HTMLElement | undefined;
  constructor() {
    effect(() => {
      if (this.showOverlay()) {
        this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
        this._div = this.document.createElement('div');
        this._div.style.position = 'absolute';
        this._div.style.left = '0px';
        this._div.style.right = '0px';
        this._div.style.bottom = '0px';
        this._div.style.top = '0px';
        this._div.style.background = 'rgba(255,255,255,.4)';
        this._div.style.zIndex = '100';
        this.renderer.appendChild(this.el.nativeElement, this._div);
      } else {
        if (this._div) {
          this.renderer.removeChild(this.el.nativeElement, this._div, true);
        }
      }
    });
  }
}
