import { CoursesService } from './../services/courses.service';
import { Courses } from './../models/courses/models/courses';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Courses[]>;
    // { _id: "1", name: "Angular", categoria: 'Frontend'},
    // { _id: "2", name: "Java", categoria: 'Backend'}


  displayedColumns = ['name', 'categoria'];

  constructor(private coursesService: CoursesService,
              public dialog: MatDialog
    )
  {
    this.courses$ = this.coursesService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar cursos.')
        return of([])
      }
      )
    )

   }

  ngOnInit(): void {
  }

  onError(errorMsg: string){
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

}
