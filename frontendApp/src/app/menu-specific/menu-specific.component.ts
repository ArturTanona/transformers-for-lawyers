import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-menu-specific',
  templateUrl: './menu-specific.component.html',
  styleUrls: ['./menu-specific.component.css']
})
export class MenuSpecificComponent implements OnInit {
    aboutProject: string = "About project";
    constructor(private translate: TranslateService) {
     }

    public items: MenuItem[];

      ngOnInit() {
        this.items = [
          {label:'Home', url: '/home'},
          {label:'FAQ', url: '/faq'},
          {label: 'About project', url: '/about'},
          {label:'LinkedIn', url: 'https://www.linkedin.com/in/artur-tanona/'},
          {label:'Github', url: 'https://github.com/ArturTan/transformers-for-lawyers'},
          {label:'BERT [State Aid]', url: '/state_aid'}
      ];
          this.translate.onLangChange.subscribe((event) => {this.buildMenu();});
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
        ];
    }

  }
