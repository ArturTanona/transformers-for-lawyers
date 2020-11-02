import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timer, Observable } from 'rxjs';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview'
import {TranslateService} from '@ngx-translate/core';

import {
  trigger,
  state,
  style,
  query,
  stagger,
  animate,
  transition
} from '@angular/animations';
import { environment } from '../../environments/environment';
import { Editor } from 'primeng';



class EditorAndSearchState {
  editorMode: Boolean = true;
  searchingMode: Boolean = false;
  resultMode: Boolean = false;
  firstResultLoaded: Boolean = false;
  public buttonIsOn = false;


  public searchRequestPassed() {
    this.editorMode = false;
    this.searchingMode = true;
    this.firstResultLoaded = false;
  }

  public sequenceHasStarted() {
    return this.firstResultLoaded;
  }

  public getEditorState() {
    return this.editorMode;
  }

  public getSearchingState() {
    return this.searchingMode;
  }

  public getResultState() {
    return this.resultMode;
  }

  public resultIsLoaded() {
    this.firstResultLoaded = true;
    this.searchingMode = false;
    this.resultMode = true;
    this.buttonIsOn = true;
  }


  public switchEditor() {
    this.editorMode = !(this.editorMode);
    this.resultMode = !(this.resultMode);
  }
}


interface Match {
  name: string,
  id: number,
  url: number,
  sentence: string,
  coocurence: number,
  num: number
}

interface WordRecord {
  phrase_id: number,
  sentence: string;
}

interface WordMatch {
  name: string,
  id: number,
  url: number,
  sentence: WordRecord[],
  coocurence: number,
  num: number
}

interface Sentence {
  id: number,
  text: string,
  count: number,
  matches: Match[]
  word_matches: WordMatch[]
}

@Component({
  selector: 'app-base-content',
  templateUrl: './base-content.component.html',
  styleUrls: ['./base-content.component.css'],
  animations: [
    trigger('photosAnimation', [
      transition('* => *', [
        query('div', style({ transform: 'translateX(-100%)' })),
        query('div',
          stagger('100ms', [
            animate('500ms', style({ transform: 'translateX(0)' }))
          ]))
      ])
    ]),
    trigger(
      'groupAnimation',
      [
        transition(
          ':enter',
          [
            style({ transform: 'translateX(100%)' }),
            animate('500ms', style({ transform: 'translateX(0)' }))
          ]
        )
      ]),

    trigger(
      'inOutAnimation',
      [
        transition(
          ':leave',
          [
            style({ height: 300, opacity: 1 }),
            animate('1s ease-in',
              style({ height: 0, opacity: 0 }))
          ]
        )
      ])
  ],
  encapsulation: ViewEncapsulation.None

})

export class BaseContentComponent implements OnInit {
  @ViewChild('text') text: ElementRef;
  @ViewChild('dv') dv: DataView;
  constructor(private httpClient: HttpClient, private translate: TranslateService) { }
  sentences: Sentence[];
  sentenceLoaded: Boolean = false;
  sentenceLoadedId: number;
  selectedSentences: Match[];
  selectedWhooshSentences: WordMatch[];
  sortOptions: SelectItem[];
  sortKey: string;
  apiUrl: string = "";
  selectedRuling: string = '';
  selectedReferenceSentence: number = null;
  currentRulingName: string = "";
  panelOpenState: Boolean;
  activeState: boolean[] = [true, false, false];
  selectedRulingId: number = null;
  searchPhrase: Boolean = false;
  sentenceIsSelected: Boolean = false;
  selectedHit: number = null;
  selectedPhraseId: number = null;
  public editorState = new EditorAndSearchState();

  searchWithPhrase(sentenceId) {
    this.searchPhrase = true;
  }

  searchWithSentence(sentenceId) {
    this.searchPhrase = false;
  }

  onSortChange($event) {

  }

  mapOfColor(count: number) {
    if (count > 50) {
      return "#caffbf";
    } else if (count > 10) {
      return "#fdffb6";
    } else {
      return "#ffadad";
    }
  }
  

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.translate.setDefaultLang('pl')
  }


  searchRequest() {

    this.editorState.searchRequestPassed();
    const options = { headers: { 'Content-Type': 'application/json' } };
    setTimeout(() => { }, 3000);

    this.httpClient.post<Sentence[]>(environment.apiUrl + "/api/search/" + this.apiUrl, JSON.stringify({ "searchQuery": this.text.nativeElement.value }), options)
      .subscribe(data => {
        this.sentences = data;
        this.editorState.resultIsLoaded();

        timer(1000).subscribe(x => { try { this.selectedSentences = this.sentences[0].matches; } catch { } })
      });


  }

  // onChange() {
  //   this.clicked = false;
  //   this.resultLoaded = false;
  //   this.showSearch = false;
  // }



  checkReference() {
    return (this.selectedReferenceSentence);
  }



  temp($event) {
  }

  selectSentences(id: number) {

    this.selectedSentences = this.sentences[id].matches;
    // var array = Array.from(this.sentences[id].word_matches);
    // array.map(element => {
    //   var sentences = element.sentence.split("...");
    //   var not_empty_sentences = new Array();
    //   for (var i = 0; i < sentences.length; i++) {
    //     if (sentences[i])
    //       not_empty_sentences.push(sentences[i])
    //   }
    //   element.sentence = not_empty_sentences.join("...<br><br>...")
    // });
    this.selectedWhooshSentences = this.sentences[id].word_matches;
    this.sentenceLoaded = true;
    this.sentenceLoadedId = id;
    this.selectedReferenceSentence = id;
    var el = document.getElementById('card' + id);
    timer(100).subscribe(() => { el.scrollIntoView({ behavior: 'smooth' }); });
  }

  isChosenSentence(id: number) {
    var border = 'none';
    if (this.sentenceLoadedId == id) {
      border = 'green';
    }
    return border;
  }

  public getJSON(jsonUrl): Observable<any> {
    return this.httpClient.get(jsonUrl, { responseType: 'text' as 'json' });
  }

  toggle(index: number, sentenceMode: Boolean) {
    this.selectedHit = null;
    try {
      document.getElementsByClassName('found')[0].className = 'toremove';
    } catch {

    }
    if (sentenceMode) {
      try {
        this.searchWithSentence(index);
      } catch {
        this.searchWithPhrase(index);
      }
    } else {
      this.searchWithPhrase(index);
    }


    this.activeState[index] = !this.activeState[index];
    this.selectSentences(index);
  }
  waitForElementToDisplay(selector, height, callback, checkFrequencyInMs, timeoutInMs) {
    var startTimeInMs = Date.now();
    (function loopSearch() {
      if (document.querySelector(selector) != null) {
        callback(height);
        return;
      }
      else {
        setTimeout(function () {
          if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs)
            return;
          loopSearch();
        }, checkFrequencyInMs);
      }
    })();
  }

  isSelected(id) {
    if (id == this.selectedReferenceSentence) {
      return 'bold';
    } else {
      return '';
    }
  }

  isSelectedRuling(num) {
    if (num == this.selectedHit) {
      return '#bce6eb';
    } else {
      return '';
    }
  }

  isSelectedPhrase(id, num, phrase_id) {
    if (this.selectedHit == num && this.selectedPhraseId == phrase_id) {
      return '#bce6eb';
    } else {
      return '';
    }
  }

  changeWidth(id: number) {
    var el = document.getElementById('card' + this.selectedReferenceSentence);
    return el.offsetWidth;
  }


  selectRuling(id: number, sentence: string, num: number) {
    
    this.selectedHit = num;
    this.sentenceIsSelected = true;
    try {
      document.getElementsByClassName('found')[0].className = 'toremove';
    } catch {

    }
  }

  selectRulingWithSentence(id: number, sentence: string, num: number){
    
      this.selectedRulingId = id;

      this.selectRuling(id, sentence, num);
      this.getJSON("./assets/" + this.apiUrl + "/html_sources/" + id + ".txt").subscribe(data => {
      // this.getJSON("./assets/" + 'state_aid' + "/html_sources/" + id + ".txt").subscribe(data => {
  
  
        var sentence_to_replace = sentence;
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
  
      this.focusOnHit(id.toString() + "_" + num.toString());

      this.currentRulingName = this.selectedSentences[num].name;

  }

  extractContent(s) {
    var span = document.createElement('span');
    span.innerHTML = s;
    return span.textContent || span.innerText;
  };

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

  focusOnHit(hitId : string ) {
    var el = document.getElementById(hitId);

  
  
  
      var height = el.getBoundingClientRect().top;
      this.waitForElementToDisplay(".found", height, function (height) {
  
  
        var element = document.getElementsByClassName('found')[0] as HTMLElement;
        var topPos = element.offsetTop;
        document.getElementById('rulingScrollbar').scrollTop = topPos - height+100;
  
  
      }, 100, 9000);
      ;  
  }

  filterDataView(value, condition) {
    return this.dv.filter(value, condition)
  }

}
