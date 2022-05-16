import { Courses } from './../models/courses/models/courses';
import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { delay, first, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = './assets/courses.json';

  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<Courses[]>(this.API)
    .pipe(
      first(),
      delay(15000),
      tap(courses => console.log(courses)
      )
    );
  }
}
