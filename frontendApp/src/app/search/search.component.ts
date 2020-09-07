import { DocumentViewService } from '../services/document-view.service';
import { Hit } from '../hit';
import { SelectItem } from 'primeng/api';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { DocumentViewerComponent } from '../document/document-viewer/document-viewer.component';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { ProgressBarComponent } from "../progress-bar/progress-bar.component"
@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements AfterViewInit {
  hits: Hit[];

  @ViewChild("component1") viewer: DocumentViewerComponent;
  @ViewChild("progressBar") progressBart: ProgressBarComponent;
  selectedHit: Hit;
  searching: boolean = false;

  displayDialog: boolean;

  sortOptions: SelectItem[];

  sortKey: string;
  message: string = "Hello!"


  sortField: string;

  sortOrder: number;

  content = '';
  title = 'taxfighter';
  @Output() messageEvent = new EventEmitter<Hit>();

  documentViewService: DocumentViewService;

  this_httpClient: HttpClient;
  constructor(private httpClient: HttpClient,
    providedDocumentViewService: DocumentViewService,
    private providedViewer: DocumentViewerComponent) {
    var reader = new FileReader();
    this.this_httpClient = httpClient;
  }


  ngOnInit() {


    this.sortOptions = [
      { label: 'Score', value: 'score' }
    ];
    var answer = [
      { "end": 11908, "id": 109, "match": "Since that complaint was rejected, SJ appealed to the French Social Security Court.", "score": 0.43968063592910767, "start": 11825 },
      { "end": 6951, "id": 126, "match": "That court relied on Article of the VAT Directive.", "score": 0.44406506419181824, "start": 6901 },
      ,
      { "end": 9092, "id": 102, "match": "The office of magistrate is  \u201chonorary\u201d.", "score": 0.4448329508304596, "start": 9052 }
    ]


    this.hits = answer;
  }

  ngAfterViewInit() {

  }

  selectHit(event: Event, hit: Hit) {
    this.messageEvent.emit(hit);
  }

  search(event) {
    var data = { "searchQuery": event, "top_k": 19 };
    const options = { headers: { 'Content-Type': 'application/json' } };
    this.searching = true;
    this.this_httpClient.post<any>("http://localhost:6500/api/search", JSON.stringify(data), options)
      .subscribe(data => this.setData(data));

  }

  private setData(data) {
    this.hits = data;
    this.searching = false;
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  onDialogHide() {
    this.selectedHit = null;
  }
}
