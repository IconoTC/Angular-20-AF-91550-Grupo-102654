import { Component, effect, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'ind-login-page',
  styleUrls: ['../../pages.css'],
  styles: ``,
  template: ` 
    <h2>{{ title() }}</h2>
    <p>Si no tienes cuenta, puedes registrarte <a [routerLink]="['/auth', 'register']">aquí</a>.</p>
  `,
})
export default class LoginPage {

  protected readonly formType = input<string>();
  protected readonly title = signal('Login');

  constructor() {

    effect(() => 
      console.log('Route form type', this.formType())
    )


  }
}
