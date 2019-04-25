import { Injectable } from '@angular/core';
import { Bill } from './bill.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

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
      'http://localhost:3000/api/bills/' + queryParams
    )
    .pipe(
      map(billData => {
      return{ bills:  billData.bills.map( bill => {
        return {
          lab: bill.lab,
          billno: bill.billno,
         // dop: bill.dop,
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
      tin: string,
      spec: string,
      rate: number,
      quantity: number,
      gst: number,
      amount: number }>(
        'http://localhost:3000/api/bills/' + id
    );
  }

  addBill(lab: string, billno: string, tin: string, spec: string,
          rate: number, quantity: number, gst: number, amount: number ) {
    const billData: Bill ={
      id: null,
      lab: lab,
      billno: billno,
      tin: tin,
      spec: spec,
      rate: rate,
      quantity: quantity,
      gst: gst,
      amount: amount
    };

    this.http
    .post<{message: string, billId: string}>(
      'http://localhost:3000/api/bills/', billData
    ).subscribe((responseData) => {
      // const id = responseData.billId;
      // billData.id = id;
      // console.log(responseData.message);
      // this.bills.push(billData);
      // this.billsUpdated.next([...this.bills]);
      this.router.navigate(['/admin/bill-list']);
    });
  }

  updateBill(id: string, lab: string, billno: string, tin: string,
             spec: string, rate: number, quantity: number, gst: number, amount: number){
    const bill: Bill = {
      id: id,
      lab: lab,
      billno: billno,
      tin: tin,
      spec: spec,
      rate: rate,
      quantity: quantity,
      gst: gst,
      amount: amount
    };
    this.http.put('http://localhost:3000/api/bills/' + id, bill)
    .subscribe(response => {
      // const updatedBills = [...this.bills];
      // const oldBillIndex = updatedBills.findIndex(b => b.id === bill.id);
      // updatedBills[oldBillIndex] = bill;
      // this.bills = updatedBills;
      // this.billsUpdated.next([...this.bills]);
      this.router.navigate(['/admin/bill-list']);
    });
  }

  deleteBill(billId: string) {
     return this.http
     .delete('http://localhost:3000/api/bills/' + billId);
    // .subscribe(() => {
    //   const updatedBills = this.bills.filter(bill => bill.id !== billId);
    //   this.bills = updatedBills;
    //   this.billsUpdated.next([...this.bills]);
    // });
  }

}
