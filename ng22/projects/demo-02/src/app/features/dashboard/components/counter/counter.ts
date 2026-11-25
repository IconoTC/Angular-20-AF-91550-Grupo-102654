import { Component, output, signal } from '@angular/core';
import { Card } from '../../../../core/design/card/card';

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
  protected readonly clicks = signal(0);
  protected readonly count = signal(0);

  protected readonly limit = LIMIT;

  // @Output() protected readonly changeEvent = new EventEmitter<number>();

  protected readonly changeEvent = output<number>();

  protected changeCount(delta: number): void {
    this.count.update((current) => current + delta);
    this.clicks.update((current) => current + 1);
    this.changeEvent.emit(this.count());
  }

  protected resetCount(): void {
    this.count.set(0);
    this.clicks.set(0);
    this.changeEvent.emit(this.count());
  }
}
