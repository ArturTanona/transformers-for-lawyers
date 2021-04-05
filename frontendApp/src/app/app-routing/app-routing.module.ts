import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "../home/home.component"
import { FaqComponent } from "../faq/faq.component"
import { AboutComponent } from "../about/about.component"
import { TaxContentComponent } from "../tax-content/tax-content.component"
import { StateAidContentComponent } from "../state-aid-content/state-aid-content.component"


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
