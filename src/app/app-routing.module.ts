import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ItemPurchaseComponent } from '../app/components/item-purchase/item-purchase.component';
import { ItemsDisplayComponent } from '../app/components/items-display/items-display.component';
import { ItemsReportComponent } from '../app/components/items-report/items-report.component';


const routes: Routes = [
  // {
  //   path: '',
  //   component: AppComponent
  // },
  {
    path: 'createOnePurchase',
    component: ItemPurchaseComponent
  },
  {
    path: 'displayAllPurchases',
    component: ItemsDisplayComponent
  },
  {
    path: 'reportPurchases',
    component: ItemsReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
