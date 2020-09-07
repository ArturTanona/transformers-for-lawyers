import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DocumentViewService } from './services/document-view.service';
import { MenuComponent } from './menu/menu.component'


import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DocumentViewerComponent } from './document/document-viewer/document-viewer.component';
import { MatCardModule } from '@angular/material/card';
import { SearchComponent } from './search/search.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list'
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ReaderComponent } from './reader/reader.component';
import { TaberComponent, SafeHtmlPipe } from './taber/taber.component';
import { TabViewModule } from 'primeng/tabview';
import { TabMenuModule } from 'primeng/tabmenu';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FaqComponent } from './faq/faq.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DataViewModule,
    PanelModule,
    MatGridListModule,
    ScrollPanelModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
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
    ProgressBarModule
  ],
  declarations: [AppComponent, DocumentViewerComponent,
    SearchComponent, ReaderComponent,
    TaberComponent, SafeHtmlPipe, MenuComponent, FaqComponent, HomeComponent, AboutComponent, ProgressBarComponent],
  bootstrap: [AppComponent],
  providers: [DocumentViewService, DocumentViewerComponent]
})

export class AppModule { }
