import { Component, computed, signal } from '@angular/core';
import { COURSES } from '../../data/courses';
import { Course } from '../../types/course';

const MAX_STAT = 10;
const MIN_STAT = 0;

@Component({
  imports: [],
  selector: 'ind-course-item-pro',
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      margin: 1rem;
      padding: 1rem;
      border: 1px solid var(--color-primary);
      border-radius: 4px;
    }

    h3 {
      color: var(--color-primary);
    }

    img {
      width: 300px;
    }

    .details {
      text-align: center;
    }

    .course-title {
      font-weight: bolder;
      font-size: 1.4rem;
      margin-block: 0.5rem;
      text-align: center;
    }

    .course-stats {
      display: flex;
      gap: 1rem;
      justify-content: space-between;
      align-items: center;

      .course-courseStats-buttons {
        display: flex;
        gap: 0.5rem;
      }
    }

    .average {
      margin-block-start: 0.5rem;
      padding-block-start: 0.5rem;
      border-top: 1px solid var(--color-primary);
    }

    /* clase de aplicación opcional */
    .course-advanced {
      background-color: var(--color-primary);
      color: var(--color-background);
    }
  `,
  template: `
    <header>
      <img [src]="course().image" [alt]="course().title" />
      <h3 [title]="'ID: ' + course().id">{{ course().title }}</h3>
    </header>
    <section class="details">
      <p>{{ course().description }}</p>
      <p>Duration: {{ course().duration }}</p>
      <p>Level: {{ course().level }}</p>
    </section>
    <section class="stats">
      <div class="course-stats" aria-label="Utilidad">
        <span
          >Utilidad: <output>{{ course().courseStats.utility }}</output></span
        >
        <div class="course-courseStats-buttons">
          <button
            title="Disminuir utilidad en 1"
            [disabled]="course().courseStats.utility <= min_stat()"
            (click)="changeStats('utility', -1)"
          >
            ➖
          </button>
          <button
            title="Aumentar utilidad en 1"
            [disabled]="course().courseStats.utility >= max_stat()"
            (click)="changeStats('utility', 1)"
          >
            ➕
          </button>
          <button
            title="Reset utilidad a 0"
            [disabled]="course().courseStats.utility === 0"
            (click)="changeStats('utility')"
          >
            🔄️
          </button>
        </div>
      </div>
      <div class="course-stats" aria-label="Actualización">
        <span
          >Actualización: <output>{{ course().courseStats.actualization }}</output></span
        >
        <div class="course-courseStats-buttons">
          <button
            title="Disminuir actualización en 1"
            [disabled]="course().courseStats.actualization <= min_stat()"
            (click)="changeStats('actualization', -1)"
          >
            ➖
          </button>
          <button
            title="Aumentar actualización en 1"
            [disabled]="course().courseStats.actualization >= max_stat()"
            (click)="changeStats('actualization', 1)"
          >
            ➕
          </button>
          <button
            title="Reset actualización a 0"
            [disabled]="course().courseStats.actualization === 0"
            (click)="changeStats('actualization')"
          >
            🔄️
          </button>
        </div>
      </div>
      <div class="course-stats" aria-label="Dificultad">
        <span
          >Dificultad: <output>{{ course().courseStats.difficulty }}</output></span
        >
        <div class="course-courseStats-buttons">
          <button
            title="Disminuir dificultad en 1"
            [disabled]="course().courseStats.difficulty <= min_stat()"
            (click)="changeStats('difficulty', -1)"
          >
            ➖
          </button>
          <button
            title="Aumentar dificultad en 1"
            [disabled]="course().courseStats.difficulty >= max_stat()"
            (click)="changeStats('difficulty', 1)"
          >
            ➕
          </button>
          <button
            title="Reset dificultad a 0"
            [disabled]="course().courseStats.difficulty === 0"
            (click)="changeStats('difficulty')"
          >
            🔄
          </button>
        </div>
      </div>
    </section>
    <div class="course-stats average" aria-label="Rating">
      <span>
        Rating (Average):
        <output>
          {{ averageRate().toFixed(2) }} 
        </output>
      </span>
      <div class="course-courseStats-buttons">
        <button
          [disabled]="averageRate() === 0"
          (click)="resetStatsAll()"
          [title]="'Reset todo a 0'"
        >
          🔄
        </button>
      </div>
    </div>
  `,
})
export class CourseItemPro {
  protected readonly course = signal<Course>([...COURSES][0]);

  protected readonly min_stat = signal(MIN_STAT);
  protected readonly max_stat = signal(MAX_STAT);

  protected readonly averageRate = computed(() => {
    const course = this.course();
    const stats = course.courseStats;
    const total = stats.actualization + stats.difficulty + stats.utility;
    return total/3;
  });

  protected changeStats(stat: keyof Course['courseStats'], delta = 0): void {
    const currentCourse = this.course();
    const newStats = { ...currentCourse.courseStats };

    if (delta === 0) {
      newStats[stat] = 0;
    } else {
      newStats[stat] += delta;
    }

    // this.course.set({ ...currentCourse, courseStats: newStats });

    this.course.update((course) => { 
      
      // Error mutando el objeto
      // course.courseStats = newStats;
      //return course;
      
      return { ...course, courseStats: newStats }
    });
  }

  protected resetStatsAll(): void {
    const newStats = { difficulty: 0, actualization: 0, utility: 0 };

    this.course.update((course) => {
      return { ...course, courseStats: newStats }
    });
  }
}
