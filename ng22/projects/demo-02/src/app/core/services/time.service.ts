import { Service } from '@angular/core';

@Service()
export class TimeService {

  readonly #time = new Date()

  setTime(date: Date): void {
    this.#time.setTime(date.getTime());
  }
  
  getTimestamp(): number {
    return this.#time.getTime();
  }
}
