import { Component, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';
import { CourseItem } from '../course-item/course-item';
import { Card } from '../../../../core/design/card/card';
import { CourseForm } from '../course-form/course-form';
import { Course } from '../../types/course';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';
import { CoursesApiRepo } from '../../services/courses-api-repo';
import { HttpErrorResponse } from '@angular/common/http';

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
    }
  `,
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
              <ind-course-item
                [course]="course"
                (deleteEvent)="deleteCourse($event)"
                (changeEvent)="updateCourse($event)"
              />
            </ind-card>
          </li>
        }
      </ul>
    }

    <pre>{{ courses() | json }}</pre>
  `,
})
export class CourseList {
  readonly #repo = inject(CoursesApiRepo);

  readonly #destroyRef = inject(DestroyRef);
  protected readonly details = viewChild<ElementRef<HTMLDetailsElement>>('details');

  protected readonly courses = signal<Course[]>([]);
  protected readonly isLoading = signal<boolean>(false);
  protected readonly error = signal<Error | null>(null);

  constructor() {
    this.#loadCourses();
  }

  // #generateID(): string {
  //   const maxId = this.courses().length > 0 ? Math.max(...this.courses().map((course) => parseInt(course.id))) : 0;
  //   return (maxId + 1).toString();
  // }

  #loadCourses() {
    this.isLoading.set(true);
    this.#repo
      .getAll()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (courses) => {
          this.error.set(null);
          this.courses.set(courses);
          this.isLoading.set(false);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error loading courses:', error);
          this.courses.set([]);
          this.error.set(error);
          this.isLoading.set(false);
        },
      });
  }

  addCourse(courseData: Omit<Course, 'id'>) {
    // const newCourse: Course = {
    //   id: this.#generateID(),
    //   ...courseData,
    // };

    this.#repo
      .add(courseData)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (newCourse) => {
          this.error.set(null);
          this.courses.update((courses) => [...courses, newCourse]);
          this.details()?.nativeElement.removeAttribute('open');
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error adding course:', error);
          this.error.set(error);
        },
      });
  }

  deleteCourse(courseId: Course['id']) {
    this.#repo
      .deleteById(courseId)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: () => {
          this.error.set(null);
          // const updatedCourses = this.courses().filter((course) => course.id !== courseId);
          // this.courses.set(updatedCourses);
          this.courses.update((courses) => courses.filter((course) => course.id !== courseId));
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error deleting course:', error);
          this.error.set(error);
        },
      });
  }

  updateCourse(updatedCourse: Course) {
    const { id, ...courseData } = updatedCourse;
    this.#repo
      .updateById(id, courseData)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (updatedCourse) => {
          this.error.set(null);
          // const updatedCourses = this.courses().map((course) =>
          //   course.id === updatedCourse.id ? updatedCourse : course
          // );
          // this.courses.set(updatedCourses);
          this.courses.update((courses) =>
            courses.map((course) => (course.id === updatedCourse.id ? updatedCourse : course)),
          );
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error updating course:', error);
          this.error.set(error);
        },
      });
  }
}
