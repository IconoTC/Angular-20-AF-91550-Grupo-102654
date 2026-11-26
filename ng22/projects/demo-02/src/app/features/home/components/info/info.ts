import { Component, inject, signal } from '@angular/core';
import { Timestamp } from '../../../../core/design/timestamp/timestamp';
import { TimeService } from '../../../../core/services/time.service';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { TruncatePipe } from '../../../../core/pipes/truncate-pipe';
import { Logger } from '../../../../core/services/logger';

@Component({
  imports: [Timestamp, DatePipe, TitleCasePipe, TruncatePipe],
  selector: 'ind-info',
  providers: [
    TimeService,
    // {
    //   provide: TimeService,
    //   useClass: TimeService
    // }

    // {
    //   provide: TimeService,
    //   useFactory: () => {
    //     const timeService = new TimeService();
    //     timeService.setTime(new Date('2024-01-01T00:00:00'));
    //     return timeService;
    //   }
    // }

    //  {
    //   provide: TimeService,
    //   useValue: {
    //     getTimestamp: () => 1111111111
    //   }
    // }
  ],
  styles: `
    ul {
      list-style-type: none;
      padding: 0;
    }

    p {
      max-width: 23rem;
    }

    footer {
      font-size: 0.9em;
      background-color: var(--color-background-primary);
      color: var(--color-primary-hot);
      border-top: 2px solid var(--color-primary);
      border-radius: 0.5rem;
      margin-top: 1rem;

      display: flex;
      justify-content: center;
      align-items: center;
    }
  `,
  template: `
    <h3>Información del proyecto</h3>
    <p>Este proyecto es un ejemplo de uso de Angular 22 y sus nuevas características.</p>
    <p>{{ sample | truncate: 50 }}</p>
    <ul>
      <li>Angular 22.3</li>
      <li>TypeScript 6.0</li>
      <li>ES2026</li>
    </ul>
    <footer>
      <ul>
        <li>Autor: {{ author() }}</li>
        <li>Fecha: {{ currentDate() | date: 'fullDate' | titlecase}}</li>
      </ul>
    </footer>
    <ind-timestamp> </ind-timestamp>
    <p>Logger level: {{ logger.level }}</p>
  `,
})
export class Info {
  protected logger = inject(Logger);

  protected readonly author = signal('Alejandro Cerezo');
  protected readonly currentDate = signal(new Date());

  protected readonly sample = 'El proyecto está desarrollado incluyendo un pipe truncate y se encuentra en constante evolución.'
}
