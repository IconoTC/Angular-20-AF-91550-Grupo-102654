import { Component, input, linkedSignal, output } from '@angular/core';
import { Card } from '../../../../core/design/card/card';
import { CounterState } from '../../types/counter-state';

const LIMIT = 5;

@Component({
  imports: [Card],
  selector: 'ind-counter',
  styles: `
    div {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }
    .negative {
      color: red;
    }
  `,
  template: `
    <ind-card>
      <h3>Counter {{ counterState().id }}</h3>
      <p>
        Counter clicks: <output>{{ clicks() }}</output>
      </p>
      <!-- <p>Counter value: <output [class]="count() < 0 ? 'negative' : ''">{{ count() }}</output></p> -->
      <!-- <p>Counter value: <output [class]="{negative: count() < 0}">{{ count() }}</output></p> -->
      <p>
        Counter value: <output [class.negative]="count() < 0">{{ count() }}</output>
      </p>
      <div>
        <button (click)="changeCount(1)" title="Increment" [disabled]="count() >= limit">➕</button>
        <button (click)="changeCount(-1)" title="Decrement" [disabled]="count() <= -limit">
          ➖
        </button>
        <button (click)="resetCount()" title="Reset" [disabled]="count() === 0 && clicks() === 0">
          🟣
        </button>
      </div>
      <div>
        <p [hidden]="count() < limit">Has alcanzado el límite superior de {{ limit }} clicks</p>

        @if (count() <= -limit) {
          <p>Has alcanzado el límite inferior de -{{ limit }} clicks</p>
        }
      </div>
    </ind-card>
  `,
})
export class Counter {

  counterState =  input.required<CounterState>();

  protected readonly clicks = linkedSignal(() => this.counterState().clicks);
  protected readonly count = linkedSignal(() => this.counterState().countValue);

  protected readonly limit = LIMIT;

  // @Output() protected readonly changeEvent = new EventEmitter<number>();
  protected readonly changeEvent = output<CounterState>();

  // constructor() {
  //   effect(() => {
  //     this.count.set(this.counterState().countValue);
  //     this.clicks.set(this.counterState().clicks);
  //   })
  // }

  protected changeCount(delta: number): void {
    this.count.update((current) => current + delta);
    this.clicks.update((current) => current + 1);
    this.changeEvent.emit({
      id: this.counterState().id,
      clicks: this.clicks(),
      countValue: this.count()
    });
  }

  protected resetCount(): void {
    this.count.set(0);
    this.clicks.set(0);
    this.changeEvent.emit({
      id: this.counterState().id,
      clicks: this.clicks(),
      countValue: this.count()
    });
  }
}
