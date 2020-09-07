import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  public items: MenuItem[];

    ngOnInit() {
        this.items = [
            {label:'Home', url: '/home'},
            {label:'FAQ', url: '/faq'},
            {label:'About project', url: '/about'},
            {label:'About me', url: 'https://www.linkedin.com/in/artur-tanona/'},
            {label:'Github', url: 'https://github.com/ArturTan/transformers-for-lawyerse'}
        ];
    }

}
