import { Hit } from '../hit';
import { SelectItem } from 'primeng/api';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { DocumentViewerComponent } from '../document/document-viewer/document-viewer.component';
import { Component, ViewChild, AfterViewInit,ViewEncapsulation } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { ProgressBarComponent } from "../progress-bar/progress-bar.component"
import { environment } from 'src/environments/environment';
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements AfterViewInit {
  hits: Hit[];

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


  this_httpClient: HttpClient;
  constructor(private httpClient: HttpClient,
    ) {
    var reader = new FileReader();
    this.this_httpClient = httpClient;
  }


  ngOnInit() {


    this.sortOptions = [
      { label: 'Score', value: 'score' }
    ];
    var answer = [
      {end: Array(2), id: "62017CJ0616", match: "The reliability of the tests, studies and analyses…r the authorisation of a plant protection product", score: 3.00497, start: 43486},
      {end: Array(2), id: "62014CJ0547", match: "Admissibility of certain of the questions referred", score: 3.1625676, start: 42500},
      {end: Array(2), id: "62019CJ0217", match: "The condition relating to judicious use", score: 3.162841, start: 34161}
    ]


    this.hits = answer;
  }

  ngAfterViewInit() {

  }

  selectHit(event: Event, hit: Hit) {
    console.log(hit)
    this.messageEvent.emit(hit);
  }

  search(event) {
    var data = { "data": [event], "top_k": 19 };
    const options = { headers: { 'Content-Type': 'application/json' } };
    this.searching = true;
    this.this_httpClient.post<any>(environment.apiUrl + "/api/search", JSON.stringify(data), options)
      .subscribe(data => this.setData(data));

  }

  private setData(data) {
    console.log(data)
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
