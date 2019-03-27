import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DinosaurDetailComponent } from './dinosaur-detail/dinosaur-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DinosaurComponent } from './dinosaur/dinosaur.component';
import { DinosaurSearchComponent } from './dinosaur-search/dinosaur-search.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DinosaurDetailComponent,
    MessagesComponent,
    DinosaurComponent,
    DinosaurSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
