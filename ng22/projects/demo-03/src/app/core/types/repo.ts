import { Observable } from "rxjs";

export interface Repo<T extends { id: string | number | symbol }> {
  getAll(): Promise<T[]>;
  getById(id: T['id']): Promise<T>; // Not found error
  add(item: Omit<T, 'id'>): Promise<T>;
  updateById(id: T['id'], item: Partial<Omit<T, 'id'>>): Promise<T>; // Not found error
  deleteById(id: T['id']): Promise<void>; // Not found error
}

export interface RepoRx<T extends { id: string | number | symbol }> {
  getAll(): Observable<T[]>;
  getById(id: T['id']): Observable<T>; // Not found error
  add(item: Omit<T, 'id'>): Observable<T>;
  updateById(id: T['id'], item: Partial<Omit<T, 'id'>>): Observable<T>; // Not found error
  deleteById(id: T['id']): Observable<void>; // Not found error
}