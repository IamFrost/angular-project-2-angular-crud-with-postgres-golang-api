import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpCLient: HttpClient) { }

  navigateFromDisplayFlag = 0;
  currentPurchase;

  setPurchase(purchase) {
    this.currentPurchase = purchase;
  }

  getPurchase()
  {
    return this.currentPurchase;
  }

  GetPurchases() {
    return fetch(('http://localhost:3000/purchases'));
  }

  Get_A_Purchase(id: number) {
    return fetch('http://localhost:3000/purchases/' + id);
  }

  Delete_A_Purchase(id: number) {
    return fetch('http://localhost:3000/purchases/' + id, {
      method: 'DELETE'
    });
  }

  Create_A_Purchase(itemIdInput: number, itemNameInput: string, itemQuantityInput: number, itemRateInput: number, itemDateInput: string) {
     console.log('from data.service.ts : ' + itemIdInput + ' ' + itemNameInput + ' '
                + itemQuantityInput + ' ' + itemRateInput + ' ' + itemDateInput);
     return fetch('http://localhost:3000/purchases', {
      method: 'POST',
      body: JSON.stringify({
        item_id: itemIdInput.toString(),
        item_name: itemNameInput,
        item_quantity: itemQuantityInput.toString(),
        item_rate: itemRateInput.toString(),
        item_purchase_date: itemDateInput
      }),
      headers: {'Content-Type': 'application/json'}
    });
  }


  Update_A_Purchase(itemIdInput: string, itemNameInput: string, itemQuantityInput: number, itemRateInput: number, itemDateInput: string) {
    return fetch('http://localhost:3000/purchases/' + itemIdInput, {
      method: 'PUT',
      body: JSON.stringify({
        item_id: itemIdInput,
        item_name: itemNameInput,
        item_quantity: itemQuantityInput.toString(),
        item_rate: itemRateInput.toString(),
        item_purchase_date: itemDateInput
      }),
      headers: {'Content-Type': 'application/json'}
    });
  }

}
