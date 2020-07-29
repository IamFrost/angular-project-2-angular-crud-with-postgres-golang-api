import { Component } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test2';

  constructor(private router: Router) { }

  home() {
    this.router.navigate(['']);
  }

  createOnePurchase() {
    this.router.navigate(['createOnePurchase']);
  }

  displayOnePurchase() {
    this.router.navigate(['displayAllPurchases']);
  }

  displayPurchaseReport() {
    this.router.navigate(['reportPurchases']);
  }
}
