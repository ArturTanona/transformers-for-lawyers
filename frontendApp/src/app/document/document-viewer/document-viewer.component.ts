
/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */

import { Component, OnInit, Input  } from '@angular/core';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.css']
})
export class DocumentViewerComponent implements OnInit, ScrollPanelModule {

  constructor(private http: HttpClient) { }
  content = "s";
  @Input() childMessage: string;
  ngOnInit(): void {
  }



  public getJSON(jsonUrl): Observable<any> {
    return this.http.get(jsonUrl);
  }

  public change(event) {
  }

}
