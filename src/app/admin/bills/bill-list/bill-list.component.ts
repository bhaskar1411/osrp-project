import { Component, OnInit, OnDestroy } from '@angular/core';

import { Bill } from '../bill.model';
import { BillsService } from '../bills.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit, OnDestroy {
  bills: Bill[] = [];
  isLoading = false;
  totalBills = 0;
  billsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1,2,5,10];
  private billsSub: Subscription;

  constructor(public billService: BillsService ) { }

  ngOnInit() {
    this.isLoading = true;
    this.billService.getBills(this.billsPerPage, this.currentPage);
    this.billsSub = this.billService.getBillUpdateListener()
    .subscribe((billData: {bills: Bill[], billCount: number}) => {
      this.isLoading = false;
      this.totalBills = billData.billCount;
      this.bills = billData.bills;
    });
  }

  onChangedPage(pageData: PageEvent){
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.billsPerPage = pageData.pageSize;
    this.billService.getBills(this.billsPerPage, this.currentPage);
  }

  onDelete(billId: string) {
    this.isLoading = true;
    this.billService.deleteBill(billId)
    .subscribe(() => {
      this.billService.getBills(this.billsPerPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    this.billsSub.unsubscribe();
  }
}
