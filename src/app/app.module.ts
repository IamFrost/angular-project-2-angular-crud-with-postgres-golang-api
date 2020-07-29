import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';

// import this
import { HttpClientModule } from '@angular/common/http';

//
import { Routes, RouterModule, Router } from '@angular/router';

// for html input
import { FormsModule } from '@angular/forms';

import { ItemPurchaseComponent } from '../app/components/item-purchase/item-purchase.component';
import { ItemsDisplayComponent } from '../app/components/items-display/items-display.component';
import { ItemsReportComponent } from '../app/components/items-report/items-report.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemPurchaseComponent,
    ItemsDisplayComponent,
    ItemsReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    // import here
    HttpClientModule,
    FormsModule
    // RouterModule,
    // Router
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
