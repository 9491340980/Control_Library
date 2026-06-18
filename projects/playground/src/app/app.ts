import { Component, signal } from '@angular/core';
import { ChButton } from '@9491340980/controls';

@Component({
  selector: 'app-root',
  imports: [ChButton],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('playground');
  protected readonly clickCount = signal(0);

  onSave() {
    this.clickCount.update((c) => c + 1);
  }
}
