import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'ind-root',
  styles: `
    h1 {
      font-family: Arial;
      color: #742222;
    }
  `,
  template: `
    <h1>Hello, {{ title() }}</h1>

    <router-outlet />
  `,
})
export class App {
  protected readonly title = signal('Demo 01');
}
