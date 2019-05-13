import { Injectable } from '@angular/core';
import { Bill } from './bill.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';


const BACKEND_URL = environment.apiUrl + '/bills/';

@Injectable({
  providedIn: 'root'
})
export class BillsService {
  private bills: Bill[] = [];
  private billsUpdated = new Subject<{bills: Bill[], billCount: number}>();

  constructor( private http: HttpClient,
               private router: Router) { }

  getBills( billsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${billsPerPage}&page=${currentPage}`;
    this.http
    .get<{message: string, bills: any, maxBills: number}>(
      BACKEND_URL + queryParams
    )
    .pipe(
      map(billData => {
      return{ bills:  billData.bills.map( bill => {
        return {
          lab: bill.lab,
          billno: bill.billno,
          dop: bill.dop,
          tin: bill.tin,
          spec: bill.spec,
          rate: bill.rate,
          quantity: bill.quantity,
          gst: bill.gst,
          amount: bill.amount,
          id: bill._id
        };
      }), maxBills: billData.maxBills
    };
    })
    )
    .subscribe((transformedBillData) => {
      this.bills = transformedBillData.bills;
      this.billsUpdated.next({
        bills:[...this.bills],
        billCount: transformedBillData.maxBills
      });
    });
  }

  getBillUpdateListener() {
    return this.billsUpdated.asObservable();
  }

  getBill(id: string) {
    return this.http
    .get<{
      _id: string,
      lab: string,
      billno: string,
      dop: string,
      tin: number,
      spec: string,
      rate: number,
      quantity: number,
      gst: number,
      amount: number }>(
        BACKEND_URL + id
    );
  }

  getBillbybillno(billno: string) {
    console.log(billno);
    return this.http
    .get<{
      _id: string,
      lab: string,
      billno: string,
      dop: string,
      tin: number,
      spec: string,
      rate: number,
      quantity: number,
      gst: number,
      amount: number
    }>(
      BACKEND_URL + billno
    );
  }

  addBill(lab: string, billno: string, dop: string, tin: number, spec: string,
          rate: number, quantity: number, gst: number, amount: number ) {
    const billData: Bill ={
      id: null,
      lab: lab,
      billno: billno,
      dop: dop,
      tin: tin,
      spec: spec,
      rate: rate,
      quantity: quantity,
      gst: gst,
      amount: amount
    };
    console.log(billData);

    this.http
    .post<{message: string, suppliertin: boolean}>(
      BACKEND_URL, billData
    ).subscribe((responseData) => {
      if (responseData.suppliertin === true){
        window.alert(responseData.message);
        this.router.navigate(['/admin/bill-list']);
      }
      if (responseData.suppliertin === false){
        window.alert(responseData.message);
        this.router.navigate(['/admin/supplier-add']);
      }
    });
  }

  updateBill(id: string, lab: string, billno: string, dop: string, tin: number,
             spec: string, rate: number, quantity: number, gst: number, amount: number){
    const bill: Bill = {
      id: id,
      lab: lab,
      billno: billno,
      dop: dop,
      tin: tin,
      spec: spec,
      rate: rate,
      quantity: quantity,
      gst: gst,
      amount: amount
    };
    this.http.put(BACKEND_URL + id, bill)
    .subscribe(response => {
      this.router.navigate(['/admin/bill-list']);
    });
  }

  deleteBill(billId: string) {
     return this.http
     .delete(BACKEND_URL + billId);
  }

}
