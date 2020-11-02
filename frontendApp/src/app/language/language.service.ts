import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private translate: TranslateService) { 

  }

  changeLanguage(language: string) {
      this.translate.use(language);
      localStorage.setItem("chosenLanguage", language);
  }
}
