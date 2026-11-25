import { Component, signal } from '@angular/core';
import { MENU_OPTIONS } from '../../../app.routes';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'ind-menu',
  styles: `
   nav {
      menu {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        gap: 1rem;
      }

      .vertical {
        flex-direction: column;
        a {
          font-size: 1.8rem;
        }
      }

      a {
        color: inherit;
        text-decoration: none;
        font-weight: bold;
      }
    }
  `,
  template: `
  <nav>
    <menu>
      <!-- <li *ngFor="let option of menuOptions()">
        <a [href]="option.path">{{ option.label }}</a>
      </li> -->
      @for (option of options(); track option.label) {
        <li>
          <a [href]="option.path">{{ option.label }}</a>
        </li>
      }
    </menu>
  </nav> `,
})
export class Menu {
  protected readonly options = signal(MENU_OPTIONS)
}
