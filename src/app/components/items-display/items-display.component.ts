import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Routes, RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-items-display',
  templateUrl: './items-display.component.html',
  styleUrls: ['./items-display.component.css']
})
export class ItemsDisplayComponent implements OnInit {
  purchases: any;
  constructor(private dataService: DataService, private router: Router) {
    this.GetPurchases();
  }

  ngOnInit(): void {
  }

  editPurchase(purchase)
  {
    this.dataService.setPurchase(purchase);
    this.dataService.navigateFromDisplayFlag = 1;
    this.router.navigate(['createOnePurchase']);
  }

  async GetPurchases() {
    const response = await this.dataService.GetPurchases();
    const dataService = await response.json();
    this.purchases = dataService;
  }

}
