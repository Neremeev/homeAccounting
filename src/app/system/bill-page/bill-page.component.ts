import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from "../shared/services/bill.service";
import {combineLatest, Subscription} from 'rxjs';

import {Bill} from "../shared/models/bill.models";

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit {

  isLoaded = false; // для того, чтобы данные подгрузились и не было ошибок
  // subscription: Subscription; // посмотреть rxjs
  currency: any;
  bill: Bill;

  constructor(private billService: BillService) { }

  ngOnInit() {
    combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    ).subscribe((data: [Bill, any]) => {
      this.bill = data[0];
      this.currency = data[1];
      this.isLoaded = true;
    });
  }

  onRefresh() {
    this.isLoaded = false;
    this.billService.getCurrency().subscribe((currency: any) => {
      this.currency = currency;
      this.isLoaded = true;
    })
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

}
