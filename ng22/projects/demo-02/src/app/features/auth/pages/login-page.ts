import { Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Card } from '../../../core/design/card/card';
import { LoginFormMdRx } from '../components/login-form-md-rx/login-form-md-rx';
import { LoginFormSignals } from '../components/login-form-signals/login-form-signals';
import { LoginFormTd } from '../components/login-form-td/login-form-td';
import { MenuOption } from '../../../core/types/menu-option';
import { Menu } from '../../../core/design/menu/menu';

type FormType = 'td' | 'md-rx' | 'signals';

@Component({
  imports: [RouterLink, Card, LoginFormTd, LoginFormMdRx, LoginFormSignals, Menu],
  selector: 'ind-login-page',
  styleUrls: ['../../pages.css'],
  styles: ``,
  template: ` 
    <h2>{{ title() }}</h2>

    <ind-menu [options]="menuOptions()"></ind-menu>
    <ind-card>
      @if (formType() === 'td') {
        <ind-login-form-td></ind-login-form-td>
      } @else if (formType() === 'md-rx') {
        <ind-login-form-md-rx></ind-login-form-md-rx>
      } @else if (formType() === 'signals') {
        <ind-login-form-signals></ind-login-form-signals>
      }
    </ind-card>

    <p>Si no tienes cuenta, puedes registrarte <a [routerLink]="['/auth', 'register']">aquí</a>.</p>
  `,
})
export default class LoginPage {

  protected readonly formType = input<FormType>();
  protected readonly title = signal('Login');

  protected readonly menuOptions= signal<MenuOption[]>([
    { label: 'Template Driven', path: '/auth/login/td' },
    { label: 'Model Driven (Reactive)', path: '/auth/login/md-rx' },
    { label: 'Signals', path: '/auth/login/signals' },
  ]);

}
