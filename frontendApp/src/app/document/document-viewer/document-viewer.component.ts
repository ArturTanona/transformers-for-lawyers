import { Component, OnInit, Input  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.css']
})
export class DocumentViewerComponent implements OnInit {

  @Input() childMessage: string;
  ngOnInit(): void {
  }
  constructor(private http: HttpClient) { }


  public getJSON(jsonUrl): Observable<any> {
    return this.http.get(jsonUrl);
  }

  public change(event) {
  }

}
