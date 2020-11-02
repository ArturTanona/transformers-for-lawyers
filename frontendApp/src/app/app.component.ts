import { Component, AfterViewInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { LanguageService } from './language/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
    ngOnInit() {
  }
    ngAfterViewInit() {
      try {
        this.languageService.changeLanguage(localStorage.getItem("chosenLanguage"));
        } catch {}
    }

    constructor(private translate: TranslateService,
      private languageService: LanguageService) {
      translate.setDefaultLang('en');
  }

  
}
