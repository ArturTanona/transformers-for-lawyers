import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { DomSanitizer } from '@angular/platform-browser';
import { PipeTransform, Pipe } from "@angular/core";

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) { }
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector: 'app-taber',
  templateUrl: './taber.component.html',
  styleUrls: ['./taber.component.css']
})
export class TaberComponent implements OnInit {

  items = [];
  constructor(private httpClient: HttpClient,
    private sanitizer: DomSanitizer) { }
  activeIndex = 0;

  ngOnInit(): void {
    this.defaultTab();
  }

  defaultTab() {
    if (this.items.length == 0) {

      this.httpClient.get("./assets/" + "default.json",
        { responseType: 'text' as 'json' }).subscribe(data => {
          this.items.push({ "id": "START", "text": data });
        })
    }
  }

  handleClose($event) {
    var new_array = [];
    var deleted = false;
    for (var index = 0; index < this.items.length; index++) {
      if (deleted || index != $event.index) {
        new_array.push(this.items[index]);
      } else {
        deleted = true;
      }
    }
    this.items = new_array;
    this.defaultTab();
  }
  transformYourHtml(htmlTextWithStyle) {
    return this.sanitizer.bypassSecurityTrustHtml(htmlTextWithStyle);
  }
}
