import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'ind-register-page',
  styleUrls: ['../../pages.css'],
  styles: ``,
  template: ` 
    <h2>{{ title() }}</h2> 
    
    <p>Si ya tienes cuenta, puedes iniciar sesión <a [routerLink]="['/auth', 'login']">aquí</a>.</p>
    `,
})
export default class RegisterPage {
  protected readonly title = signal('Register');
}
