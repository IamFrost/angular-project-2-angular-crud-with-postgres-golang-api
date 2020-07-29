import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../../services/data.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-purchase',
  templateUrl: './item-purchase.component.html',
  styleUrls: ['./item-purchase.component.css']
})
export class ItemPurchaseComponent implements OnInit {

  // date = new FormControl(new Date());

  pid = new FormControl('');
  pDate = new FormControl('');
  pName = new FormControl('');
  pQuantity = new FormControl('');
  pRate = new FormControl('');

  itemPurchaseForm = new FormGroup({
    pid: new FormControl(''),
    pDate: new FormControl(''),
    pName: new FormControl(''),
    pQuantity: new FormControl(''),
    pRate: new FormControl('')
  });
  purchases: any;
  maxID = 1000;

  constructor(private dataService: DataService, private router: Router) {

    if (this.dataService.navigateFromDisplayFlag === 1) {
      this.GetPurchases();
      this.setFormData(this.dataService.getPurchase());
      this.dataService.navigateFromDisplayFlag = 0;
    }
    else {
      this.GetPurchases();
      this.setTodayDate();
      this.setID();
    }
    // console.log('this is purchases array : ' +  this.purchases);

    // $(() => {
    //   $( 'p' ).text( 'The DOM is now loaded and can be manipulated.' );
    // });
  }

  ngOnInit(): void {
  }

  displayPurchaseReport() {
    this.router.navigate(['reportPurchases']);
  }

  setFormData(row) {
    console.log('this is input: '
      + ' id : ' + row.item_id + ' '
      + ' name : ' + row.item_name + ' '
      + ' quantity : ' + row.item_quantity + ' '
      + ' rate : ' + row.item_rate + ' '
      + ' date : ' + row.item_purchase_date.slice(0, 10));

    this.pid = new FormControl(row.item_id);
    this.pDate = new FormControl(new Date(row.item_purchase_date).toISOString().slice(0, 10));
    this.pName = new FormControl(row.item_name);
    this.pQuantity = new FormControl(row.item_quantity);
    this.pRate = new FormControl(row.item_rate);
  }

  async GetPurchases() {
    const response = await this.dataService.GetPurchases();
    const dataService = await response.json();
    this.purchases = dataService;

    // console.log('this is dataService array : ' +  dataService);
    // console.log('this is purchases array : ' +  this.purchases);
  }

  setBlank() {
    this.pName = new FormControl('');
    this.pQuantity = new FormControl('');
    this.pRate = new FormControl('');
  }

  setTodayDate() {
    // slice 10 means yyyy = 4 + mm = 2 + dd = 2 + - - = 2 total 10
    const todayDate = new Date().toISOString().slice(0, 10);
    this.pDate = new FormControl(todayDate);
  }

  validateQuantity() {
    if (this.pQuantity.value <= 0) {
      if (this.pQuantity.value < 0) {
        console.log('Quantity can\'t be negative');
      }
      else if (this.pQuantity.value === 0) {
        console.log('Quantity can\'t be zero');
      }
      return false;
    }
    return true;
  }
  validateRate() {
    if (this.pRate.value <= 0) {
      if (this.pRate.value < 0) {
        console.log('Rate can\'t be negative');
      }
      else if (this.pRate.value === 0) {
        console.log('Rate can\'t be zero');
      }
      return false;
    }
    return true;
  }

  isIterable(obj) {
    // checks for null and undefined
    if (obj == null) {
      return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
  }
  async setID() {
    const response = await this.dataService.GetPurchases();
    const dataService = await response.json();
    this.purchases = dataService;
    console.log(this.purchases);
    let searchFlag = 0;
    if (this.isIterable(this.purchases)) {
      for (const purchase of this.purchases) {
        console.log(purchase.item_id);

        if (parseInt(purchase.item_id, 10) * 0 === 0) {
          searchFlag = 1;
          // u must use parseInt, otherwise u get wrong result, 10 means decimal
          if (parseInt(purchase.item_id, 10) > this.maxID) {
            console.log('before replace :  purchase.item_id : ' + purchase.item_id + 'maxID : ' + this.maxID + '\n');
            this.maxID = parseInt(purchase.item_id, 10);
            console.log('after replace :  purchase.item_id : ' + purchase.item_id + 'maxID : ' + this.maxID + '\n');
          }
        }
        else {
          return;
        }

      }

      if (searchFlag === 1) {
        this.maxID = this.maxID + 1;
      }
      console.log(this.maxID);
      // set to html field
      this.pid = new FormControl(this.maxID);
    }
    else {
      this.pid = new FormControl(this.maxID);
    }

  }

  displayAllInput() {
    console.log('this is input: '
      + ' id : ' + this.pid.value + ' '
      + ' date : ' + this.pDate.value + ' '
      + ' name : ' + this.pName.value + ' '
      + ' quantity : ' + this.pQuantity.value + ' '
      + ' rate : ' + this.pRate.value);
  }

  async createOnePurchase() {
    if (this.validateQuantity() && this.validateRate()) {
      const response = await this.dataService
        .Create_A_Purchase(this.pid.value, this.pName.value, this.pQuantity.value, this.pRate.value, this.pDate.value);
      console.log(typeof (response));
      console.log(response);
    }
  }

  async DeleteOnePurchase() {
    try {
      if (this.isIterable(this.purchases)) {
        const response = await this.dataService.Delete_A_Purchase(this.pid.value);
        console.log(typeof (response));
        console.log(response);
      }
    }
    catch (err) {
      console.error('err', err);
    }
  }

  async updateOnePurchase() {
    if (this.isIterable(this.purchases)) {
      if (this.validateQuantity() && this.validateRate()) {
        const response = await this.dataService
          .Update_A_Purchase(this.pid.value, this.pName.value, this.pQuantity.value, this.pRate.value, this.pDate.value);
        console.log(typeof (response));
        console.log(response);
      }
    }
  }

}
