import { DocumentViewService } from '../services/document-view.service';
import { SearchComponent } from '../search/search.component'

import { Hit } from '../hit';
import {SelectItem} from 'primeng/api';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { DocumentViewerComponent } from '../document/document-viewer/document-viewer.component';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { TaberComponent } from '../taber/taber.component';
import { MenuComponent } from '../menu/menu.component'

@Component({
  selector:  'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
    hits: Hit[];

    // @ViewChild("component1") viewer: DocumentViewerComponent;
    @ViewChild("searcher") searcher: SearchComponent;
    @ViewChild("taber") taber: TaberComponent;

    selectedHit: Hit;
    message: string;
    mapIdJudgments : Map<string, string> = new Map<string, string>();
    columnGlobalNumber : number;
    columnNumber : number;
    rowNumber : number;


    displayDialog: boolean;

    sortOptions: SelectItem[];

    sortKey: string;

    sortField: string;

    sortOrder: number;

    content = '';
    title = 'taxfighter';

    counter = 0;


    documentViewService: DocumentViewService;

    this_httpClient: HttpClient;
    constructor(private httpClient:  HttpClient,
      providedDocumentViewService: DocumentViewService,
      private providedViewer: DocumentViewerComponent ) {
        var reader = new FileReader();
        this.this_httpClient = httpClient;
        this.documentViewService = providedDocumentViewService;

    }


    ngOnInit() {
      this.getJSON("./assets/map_of_judgments.json").subscribe(data => {
        this.mapIdJudgments =  JSON.parse(data);
      this.columnGlobalNumber = (window.innerWidth <= 800) ? 2 : 4;
      this.columnNumber = (window.innerWidth <= 800) ? 2 : 2;
      this.rowNumber = (window.innerWidth <= 800) ? 1 : 2;
    });

  }
    ngAfterViewInit() {

    }


  public getJSON(jsonUrl): Observable<any> {
    return this.httpClient.get(jsonUrl, { responseType: 'text' as 'json'});
  }
    receiveMessage($event) {
      if ((this.taber.items.length == 1) && (this.taber.items[0].id == "START"))
      {
        this.taber.items = [];
      }
      this.getJSON("./assets/" + this.mapIdJudgments[$event.id-1] + ".txt").subscribe(data => {
        var test = {"id": this.mapIdJudgments[$event.id-1], "text":""  };
        test.text = data;
        test.text = data.replace($event.match,
          "<span id='focus' style='background-color:yellow'>" + $event.match + "</span>");
        this.taber.items.push(
          test);
    })
  }

  onResize(event) {
    this.columnGlobalNumber = (event.target.innerWidth <= 400) ? 1 : 4;
    this.columnNumber = (event.target.innerWidth <= 400) ? 1 : 2;
    this.rowNumber = (event.target.innerWidth <= 400) ? 1 : 2;
  }

}
