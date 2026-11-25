import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuOption } from '../../types/menu-option';

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
  readonly options = input.required<MenuOption[]>()
}
