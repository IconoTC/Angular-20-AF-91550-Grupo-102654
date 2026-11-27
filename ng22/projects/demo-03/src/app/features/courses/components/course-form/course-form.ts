import { Component, output } from '@angular/core';
import { Course } from '../../types/course';

@Component({
  imports: [],
  selector: 'ind-course-form',
  styles: ``,
  template: ` 
    <p>Aquí va el formulario de cursos</p> 
    <p>...</p>
    <p>...</p>
    <p>...</p>
    <p>...</p>
    <p>...</p>
    <button (click)="addEmit()">Añadir curso</button>
    `,
})
export class CourseForm {
  protected readonly addEvent = output<Omit<Course, 'id'>>();

  protected newCourse: Omit<Course, 'id'> = {
    title: 'Docker para desarrolladores',
    image: '',
    isOfficial: false,
    description: 'Aprende a usar Docker para desarrollar tus aplicaciones',
    duration: '3h',
    level: 'beginner',
    courseStats: {
      actualization: 7,
      difficulty: 5,
      utility: 6,
    },
  };

  addEmit() {
    this.addEvent.emit(this.newCourse);
  }
}
