import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { BaseContentComponent } from '../base-content/base-content.component';

@Component({
  selector: 'app-tax-content',
  templateUrl: '../base-content/base-content.component.html',
  styleUrls: ['./tax-content.component.css'],
  encapsulation: ViewEncapsulation.None
})  


export class TaxContentComponent extends BaseContentComponent {
  property = ("Wnioskodawca od dnia 2 stycznia 2019 r. prowadzi jednoosobową działalność gospodarczą zarejestrowaną w Centralnej Ewidencji i Informacji o Działalności Gospodarczej pod firmą …, której przedmiotem jest między innymi działalność związana z oprogramowaniem. \n\nWnioskodawca posiada na terytorium Rzeczypospolitej Polskiej nieograniczony obowiązek podatkowy w świetle art. 3 ust. 1 oraz ust. 1a ustawy z dnia 26 lipca 1991 r. o podatku dochodowym od osób fizycznych (dalej: „ustawa o PIT”).\n\nWnioskodawca rozlicza się na podstawie podatkowej księgi przychodów i rozchodów w oparciu o podatek liniowy. Wnioskodawca w ramach prowadzonej przez siebie działalności gospodarczej świadczy usługi na rzecz … zarejestrowanej w … (dalej: „Spółka”). Wnioskodawca na podstawie zawartej ze Spółką umowy o świadczenie usług świadczy na jej rzecz usługi z zakresu swojej działalności gospodarczej, a więc przede wszystkim związane z tworzeniem programów komputerowych. Wnioskodawca pracuje w branży … (…), przy analizie danych z …, …, …. W ramach swojej pracy Wnioskodawca tworzy oprogramowanie w środowisku SAS – środowisku programistycznym stworzonym i rozwiniętym przez Instytut SAS (amerykańskie przedsiębiorstwo informatyczne), przeznaczonym do zaawansowanej analizy, analizy wielowymiarowej, analizy biznesowej, zarządzania danymi i analizy predykcyjnej. \n\nProgramy współtworzone przez Wnioskodawcę służą do przetwarzania danych    … celem przygotowania analiz statystycznych i raportów, na podstawie których ….")

  ngOnInit(): void {
  }
}