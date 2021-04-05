import { AfterViewInit, Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';
import { LanguageService } from '../language/language.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit {

  aboutProject: string = "About project";
  constructor(private translate: TranslateService, 
     private languageService: LanguageService) {
   }

  public items: MenuItem[];

    ngOnInit() {
      this.items = [
        {label:'Home', url: '/home'},
        {label:'FAQ', url: '/faq'},
        {label: 'About project', url: '/about'},
        {label:'LinkedIn', url: 'https://www.linkedin.com/in/artur-tanona/'},
        {label:'Github', url: 'https://github.com/ArturTan/transformers-for-lawyers'},
    ];
    }

    ngAfterViewInit() {
      this.buildMenu();
    }

    buildMenu() {
      var aboutProject = this.translate.instant('tfl.projectInfo');
      if (!aboutProject) {
        aboutProject = 'About project';
      }
      this.items = [
          {label:'Home', url: '/home'},
          {label:'FAQ', url: '/faq'},
          {label: aboutProject, url: '/about'},
          {label:'LinkedIn', url: 'https://www.linkedin.com/in/artur-tanona/'},
          {label:'Github', url: 'https://github.com/ArturTan/transformers-for-lawyers'},
          {label:'BERT [State Aid]', url: '/state_aid'}
      ];
  }
  useLanguage(language: string) {
    this.languageService.changeLanguage(language);
    this.buildMenu();
  }
}
