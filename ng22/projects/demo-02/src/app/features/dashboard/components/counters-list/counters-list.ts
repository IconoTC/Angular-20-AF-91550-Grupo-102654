import { Component } from '@angular/core';
import { Counter } from '../counter/counter';

@Component({
  imports: [Counter],
  selector: 'ind-counters-list',
  styles: ``,
  template: ` 
    <p>counters-list works!</p>
    <ind-counter (changeEvent)="onChange($event)" />
    <ind-counter (changeEvent)="onChange($event)" />
    <ind-counter (changeEvent)="onChange($event)" />
    `,
})
export class CountersList {

  protected onChange(value: number): void {
    console.log('CountersList.onChange', value);
  }
}
