import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { BaseContentComponent } from '../base-content/base-content.component';

@Component({
  selector: 'app-state-aid-content',
  templateUrl: '../base-content/base-content.component.html',
  styleUrls: ['./state-aid-content.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class StateAidContentComponent extends BaseContentComponent {
  apiUrl = 'state_aid'
  property = ("‘[t]he review by the European Union judicature of the complex economic assessments made by the Commission is necessarily limited and confined to verifying whether the rules on procedure and on the statement of reasons have been complied with, whether the facts have been accurately stated and whether there has been any manifest error of assessment or misuse of powers’")
  ngOnInit(): void {
  }

  selectRulingWithWord(id: number, sentence: string, num: number, phrase_id: number) {
    this.selectedRulingId = id;
    this.selectedPhraseId = phrase_id;

    this.selectRuling(id, sentence, num);
    
    this.getJSON("./assets/" + this.apiUrl + "/html_sources/" + id + ".txt").subscribe(data => {
        var sentence_to_replace = this.extractContent(this.selectedWhooshSentences[num].sentence[phrase_id].sentence).replace("\n", " ").replace("  ", " ");
        if (sentence_to_replace.search("We wniosku") != -1 && (sentence_to_replace.search("stan faktyczny") || sentence_to_replace.search("zdarzenie przyszłe")) && sentence_to_replace.search(":\n"))
        {

          sentence_to_replace = sentence_to_replace.slice(
            sentence_to_replace.search(":")+1,
            sentence_to_replace.length).trim();
        }

        var index = data.search(sentence_to_replace.trim());
  
        var iteration = 0;
        while (index == -1 && sentence_to_replace.length > 0 && iteration < 100) {
          sentence_to_replace = sentence_to_replace.slice(0, sentence_to_replace.lastIndexOf(" "));
          iteration = iteration + 1;
          try {
            index = data.search(sentence_to_replace);
          } catch {
          }
        }
  
        data = data.replace(sentence_to_replace, "<span class='found'>" + sentence_to_replace.slice(0, sentence_to_replace.length) + "</span>");
        this.selectedRuling = data;
        var listContainer = document.getElementById('listContainer') as HTMLElement;
        var menu = document.getElementById('menu') as HTMLElement;
  
        document.getElementById('textContainer').style.left = (listContainer.getBoundingClientRect().right + 15).toString() + "px";
        document.getElementById('textContainer').style.top = (menu.getBoundingClientRect().bottom + 10).toString() + "px";

    });
    ;
    this.focusOnHit(id.toString() + "_" + num.toString() + " " + phrase_id.toString());


    this.currentRulingName = this.selectedWhooshSentences[num].name;

  }
}
