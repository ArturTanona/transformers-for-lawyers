import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component'
import { MatExpansionModule } from '@angular/material/expansion';

import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DocumentViewerComponent } from './document/document-viewer/document-viewer.component';
import { MatCardModule } from '@angular/material/card';
import { SearchComponent } from './search/search.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatToolbarModule } from '@angular/material/toolbar'
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ReaderComponent } from './reader/reader.component';
import { TaberComponent, SafeHtmlPipe } from './taber/taber.component';
import { TabViewModule } from 'primeng/tabview';
import { TabMenuModule } from 'primeng/tabmenu';
import { AccordionModule } from 'primeng/accordion';
import { FieldsetModule } from 'primeng/fieldset';


import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { FaqComponent } from './faq/faq.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { TaxContentComponent } from './tax-content/tax-content.component';
import { MenuSpecificComponent } from './menu-specific/menu-specific.component';
import { BaseContentComponent } from './base-content/base-content.component';
import { StateAidContentComponent } from './state-aid-content/state-aid-content.component';
import { Injector } from '@angular/core';
import { LOCATION_INITIALIZED } from '@angular/common';

export function appInitializerFactory(translate: TranslateService, injector: Injector) {
  return () => new Promise<any>((resolve: any) => {
    const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
    locationInitialized.then(() => {
      var temp;
      if(!localStorage.getItem('chosenLanguage')){
        temp = 'en';
      } else {
        temp = localStorage.getItem('chosenLanguage')
      }

      translate.setDefaultLang('en');
      if (temp == "null") {
        temp = 'en';
      }
      const langToSet = temp;

      translate.use(langToSet).subscribe(() => {
        console.info(`Successfully initialized '${langToSet}' language.'`);
      }, err => {
        console.error(`Problem with '${langToSet}' language initialization.'`);
      }, () => {
        resolve(null);
      });
    });
  });
}

@NgModule({
  imports: [
    BrowserModule,
    ToggleButtonModule,
    ToolbarModule,
    BrowserAnimationsModule,
    DataViewModule,
    PanelModule,
    MatToolbarModule,
    MatGridListModule,
    ScrollPanelModule,
    DialogModule,
    ProgressSpinnerModule,
    DropdownModule,
    InputTextModule,
    FieldsetModule,
    MatExpansionModule,
    ButtonModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatNativeDateModule,
    TabViewModule,
    TabMenuModule,
    AccordionModule,
    BreadcrumbModule,
    CardModule,
    AppRoutingModule,
    ProgressBarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [AppComponent,     SearchComponent, ReaderComponent,
    TaberComponent, SafeHtmlPipe, MenuComponent, FaqComponent,
    HomeComponent, AboutComponent, ProgressBarComponent,
    TaxContentComponent, MenuSpecificComponent, BaseContentComponent, StateAidContentComponent],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService, Injector],
      multi: true
    },
  ]
})



export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

