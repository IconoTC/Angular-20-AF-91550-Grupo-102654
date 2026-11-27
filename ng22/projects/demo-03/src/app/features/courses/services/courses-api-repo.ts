import { inject, Service } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RepoRx } from '../../../core/types/repo';
import { Course } from '../types/course';
import { map, Observable } from 'rxjs';

@Service()
export class CoursesApiRepo implements RepoRx<Course> {
  readonly #http = inject(HttpClient);

  readonly #baseUrl = environment.apiUrl + '/courses';

  getFetchUrl() {
    return fetch(this.#baseUrl).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json() as Promise<Course[]>;
    });
  }

  postFetchUrl(course: Omit<Course, 'id'>) {
    return fetch(this.#baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(course),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json() as Promise<Course>;
    });
  }

  getAll(): Observable<Course[]> {
   return this.#http.get<Course[]>(this.#baseUrl);
  }
  getById(id: string): Observable<Course> {
    const url = `${this.#baseUrl}/${id}`;
    return this.#http.get<Course>(url);
  }

  add(item: Omit<Course, 'id'>): Observable<Course> {
    return this.#http.post<Course>(this.#baseUrl, item);
  }
  updateById(id: string, item: Partial<Omit<Course, 'id'>>): Observable<Course> {
    const url = `${this.#baseUrl}/${id}`;
    return this.#http.patch<Course>(url, item);
  }
  deleteById(id: string): Observable<void> {
    const url = `${this.#baseUrl}/${id}`;
    return this.#http.delete<Course>(url).pipe(
      map(() => undefined)
    );
  }
}
