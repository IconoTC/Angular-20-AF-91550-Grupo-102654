import { Component, computed, signal } from '@angular/core';
import { Counter } from '../counter/counter';
import { CounterState } from '../../types/counter-state';

const COUNTERS: CounterState[] = [
  { id: 101, clicks: 10, countValue: 4 },
  { id: 125, clicks: 0, countValue: 0 },
  { id: 143, clicks: 0, countValue: 0 },
];

@Component({
  imports: [Counter],
  selector: 'ind-counters-list',
  styles: ``,
  template: `
    <p>
      Total de clicks: <output>{{ totalClicks() }}</output>
    </p>
    <p>
      Valor total: <output>{{ totalCount() }}</output>
    </p>
    @for (counter of counters(); track counter.id) {
      <ind-counter 
      [counterState]="counter"
      (changeEvent)="onChange($event)" />
    }

  `,
})
export class CountersList {
  protected readonly totalClicks = computed(() => {
    return this.counters().reduce((acc, counter) => acc + counter.clicks, 0);
  });
  protected readonly totalCount = computed(() => {
    return this.counters().reduce((acc, counter) => acc + counter.countValue, 0);
  });

  protected readonly counters = signal(COUNTERS);

  protected onChange(value: CounterState): void {
    this.counters.update((current) => {  
      return current.map((counter) => {
        if (counter.id === value.id) {
          return { ...counter, clicks: value.clicks, countValue: value.countValue };
        }
        return counter;
      });
    });
    console.log('CountersList.onChange', value);
    console.log('State', this.counters())
  }
}
