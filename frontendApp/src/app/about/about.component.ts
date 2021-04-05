import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { TranslateService } from '@ngx-translate/core';


@Component({
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  isEnglish : Boolean;
  text: string;
  constructor(private httpClient: HttpClient,
    private translate: TranslateService) {
    this.translate.onLangChange.subscribe(data => this.getJSON(this.translate.instant("aboutProject.text")).subscribe(data => this.text = data) );
   }

  ngOnInit(): void {   
    this.getJSON(this.translate.instant("aboutProject.text")).subscribe(data => this.text = data)
  }

  public getJSON(jsonUrl): Observable<any> {
    return this.httpClient.get(jsonUrl, { responseType: 'text' as 'json' });
  }

  public loadText() {
    
  }

}
