import { Component, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';
import { CourseItem } from '../course-item/course-item';
import { Card } from '../../../../core/design/card/card';
import { CourseForm } from '../course-form/course-form';
import { Course } from '../../types/course';
import { getCourses } from '../../data/courses';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';

@Component({
  imports: [CourseForm, Card, CourseItem, JsonPipe],
  selector: 'ind-course-list',
  styles: `
    .courses-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      list-style: none;
      padding: 0;
      margin: 0;
    }
    ind-card {
      max-width: 250px;
    }`,
  template: `
    <details #details>
      <summary>Añadir curso</summary>
      <ind-course-form (addEvent)="addCourse($event)" />
    </details>
    <h3>Cursos</h3>

    @if (error()) {
      <p>{{ error()?.message }}</p>
    }
    @if (isLoading()) {
      <p>Cargando cursos...</p>
    }

    @if (!isLoading() && courses().length === 0) {
      <p>No hay cursos disponibles.</p>
    }

    @if (!isLoading() && courses().length > 0) {
      <ul class="courses-list">
        @for (course of courses(); track course.id) {
          <li>
            <ind-card>
              <ind-course-item [course]="course"(deleteEvent)="deleteCourse($event)" (changeEvent)="updateCourse($event)" />
            </ind-card>
          </li>
        }
      </ul>
    }

    <pre>{{ courses() | json }}</pre>
  `,
})
export class CourseList {
  readonly #destroyRef = inject(DestroyRef);
  protected readonly details = viewChild<ElementRef<HTMLDetailsElement>>('details');

  protected readonly courses = signal<Course[]>([]);
  protected readonly isLoading = signal<boolean>(false);
  protected readonly error = signal<Error | null>(null);

  constructor() {
    this.#loadCourses();
  }

  #generateID(): number {
    return this.courses().length > 0 ? Math.max(...this.courses().map((course) => course.id)) + 1 : 1;
  }

  #loadCourses() {
    this.isLoading.set(true);
    getCourses()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (courses) => {
          this.error.set(null);
          this.courses.set(courses);
          this.isLoading.set(false);
        },
        error: (error: Error) => {
          this.courses.set([]);
          this.error.set(error);
          this.isLoading.set(false);
        },
      });
  }


  addCourse(courseData: Omit<Course, 'id'>) {
    
    const newCourse: Course = {
      id: this.#generateID(),
      ...courseData,
    };
    // const updatedCourses = [...this.courses(), newCourse];
    // this.courses.set(updatedCourses);
    this.courses.update((courses) => [...courses, newCourse]);
    this.details()?.nativeElement.removeAttribute('open');
  }

  deleteCourse(courseId: Course['id']) {
    // const updatedCourses = this.courses().filter((course) => course.id !== courseId);
    // this.courses.set(updatedCourses);
    this.courses.update((courses) => courses.filter((course) => course.id !== courseId));
  }

  updateCourse(updatedCourse: Course) {
    // const updatedCourses = this.courses().map((course) =>
    //   course.id === updatedCourse.id ? updatedCourse : course
    // );
    // this.courses.set(updatedCourses);
    this.courses.update((courses) => courses.map((course) => (course.id === updatedCourse.id ? updatedCourse : course)));
  }
}
