import { Component, signal } from '@angular/core';
import { COURSES } from '../../data/courses';
import { Course } from '../../types/course';

@Component({
  imports: [],
  selector: 'ind-course-item-signals',
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      margin: 0.5rem;
      padding: 0.5rem;
      border: 1px solid var(--color-primary);
      border-radius: 4px;
    }

    h3 {
      color: var(--color-text);
    }

    img {
      width: 300px;
    }
  `,
  template: `
    <img [src]="course().image" [alt]="course().title" />
    <h3 [title]="'ID: ' + course().id">{{ course().title }}</h3>
    <p>{{ plainText }}</p>
  `,
})
export class CourseItemSignals {
   protected readonly course = signal<Course>([...COURSES][0]);
   protected plainText = 'Probando el uso de signals'

   constructor() {
    setTimeout(() => {
      this.plainText = 'Probando el uso de la asincronía'
      console.log(this.plainText)
    }, 2000)

    setTimeout(() => {
      // this.course.set({
      //   ...this.course(),
      //   title: 'Curso de Angular 22 - Signals',
      // })
      this.course.update((course) => {
        course.title = 'Curso de Angular 22 - Signals'
        // return {...course}
        return structuredClone(course)
      })

      console.log('Más asincronía')
    }, 4000)
   }

}
