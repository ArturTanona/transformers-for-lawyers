import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
 selector: 'app-reading',
 templateUrl: './reader.component.html',
 styleUrls: ['./reader.component.css']
})

export class ReaderComponent implements OnInit {
 constructor(private http: HttpClient) {

 }
 public getJSON(jsonUrl): Observable<any> {
   return this.http.get(jsonUrl);
 }
 ngOnInit() {
 }
}
