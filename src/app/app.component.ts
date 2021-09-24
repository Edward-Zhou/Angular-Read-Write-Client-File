import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { saveAs } from 'file-saver';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Student } from './Student';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private client: HttpClient) {}
  async async_await_SolutionTest() {
    var result = await this.async_await_Solution();
    result.forEach((student) => {
      console.log(student.score);
    });
  }
  async async_await_Solution(): Promise<Student[]> {
    var students = await this.getStudents().toPromise();
    students.forEach(async (student) => {
      if (student.score == 60) {
        var res = this.client.get(
          'https://api.coindesk.com/v1/bpi/currentprice.json'
        );
        console.log(res);
        student.score = student.score * 100;
      } else {
        student.score = student.score * 10;
      }
    });
    return students;
  }
  createObvervableSolutionTest() {
    this.createObvervableSolution()
      .pipe(
        mergeMap((result) => {
          if (result && result.length > 0) {
            result.forEach((s) => console.log(s.score));
          }
          return of([]);
        })
      )
      .subscribe();
  }
  createObvervableSolution(): Observable<Student[]> {
    return this.getStudents().pipe(
      mergeMap((result) => {
        return new Observable<Student[]>((subscriber) => {
          if (result) {
            result.map((rr) => {
              if (rr.score == 60) {
                this.client
                  .get('https://api.coindesk.com/v1/bpi/currentprice.json')
                  .subscribe((res) => {
                    console.log(res);
                    rr.score = rr.score * 100;
                    subscriber.next([rr]);
                  });
              } else {
                rr.score = rr.score * 10;
                subscriber.next([rr]);
              }
            });
          }
        });
      })
    );
  }
  reproduce(): Observable<Student[]> {
    return this.getStudents().pipe(
      mergeMap((result) => {
        if (result) {
          result.map((rr) => {
            if (rr.score == 60) {
              this.client
                .get('https://api.coindesk.com/v1/bpi/currentprice.json')
                .subscribe((res) => {
                  console.log(res);
                  rr.score = rr.score + 100;
                });
            } else {
              rr.score = rr.score * 10;
            }
            return rr;
          });
        }
        return of(result);
      })
    );
  }
  reproduceTest() {
    this.getStudents()
      .pipe(
        mergeMap((result) => {
          if (result && result.length > 0) {
            result.forEach((s) => console.log(s.score));
          }
          return of([]);
        })
      )
      .subscribe();
  }
  getStudents(): Observable<Student[]> {
    return of(this.students());
  }
  students(): Student[] {
    return [{ score: 50 }, { score: 60 }, { score: 70 }];
  }
}
