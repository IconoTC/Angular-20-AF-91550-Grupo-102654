import { Component, input, model } from '@angular/core';
import { FormCheckboxControl, ValidationError } from '@angular/forms/signals';

@Component({
  selector: 'ind-check-box',
  imports: [],
  template: `
    <label for="{{ id() }}" class="custom-checkbox">
      <input
        type="checkbox"
        [id]="id()"
        [checked]="checked()"
        (change)="checked.set(!checked())"
        (blur)="touched.set(true)"
      />
      <span class="check-mark"></span>
      <span class="label-text">{{ label() }}</span>
    </label>
    @if (invalid() && touched()) {
      <p class="error">
        {{ errors()?.[0]?.message }}
      </p>
    }
  `,
  styles: `
    .custom-checkbox {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0.8rem 0;
      cursor: pointer;
      user-select: none;
      position: relative;

      input[type='checkbox'] {
        margin: 0;
        opacity: 0;
        position: absolute;
        right: 0;
      }
    }

    .check-mark {
      width: 18px;
      height: 18px;
      border: 2px solid #ddd;
      border-radius: 3px;
      display: inline-block;
      position: relative;
    }

    .custom-checkbox input[type='checkbox']:checked + .check-mark {
      background-color: var(--color-secondary);
      border-color: var(--color-tertiary-hot);
    }

    .custom-checkbox input[type='checkbox']:checked + .check-mark::after {
      content: '✓';
      position: absolute;
      color: var(--color-background);
      font-size: 14px;
      top: -2px;
      left: 2px;
    }

    .error {
      color: var(--color-tertiary);
      font-size: 0.8rem;
    }
  `,
})
export class CheckBox implements FormCheckboxControl {
  readonly checked = model.required<boolean>();

  readonly errors = input([] as readonly ValidationError[]);
  readonly invalid = input(false);
  readonly touched = model(false);

  readonly label = input.required<string>();
  readonly id = input<string>(this.generateId());

  generateId() {
    return `checkbox-${Math.random().toString(36).slice(2, 9)}`;
  }
}
