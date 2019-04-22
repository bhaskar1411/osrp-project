import { Component, OnInit } from '@angular/core';
import { BillsService } from '../bills.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Bill } from '../bill.model';

@Component({
  selector: 'app-bill-add',
  templateUrl: './bill-add.component.html',
  styleUrls: ['./bill-add.component.css']
})
export class BillAddComponent implements OnInit {

  bill: Bill;
  private mode = 'create';
  private billId: string;
  isLoading = false;


  constructor( public billService: BillsService,
               public route: ActivatedRoute) { }

  ngOnInit() {
   this.route.paramMap.subscribe((paramMap: ParamMap) => {
     if (paramMap.has('billId')) {
        this.mode = 'edit';
        this.billId = paramMap.get('billId');
        this.isLoading = true;
        this.billService.getBill(this.billId)
        .subscribe(billData => {
          this.isLoading = false;
          this.bill = {
            id: billData._id,
            lab: billData.lab,
            billno: billData.billno,
            tin: billData.tin,
            spec: billData.spec,
            rate: billData.rate,
            quantity: billData.quantity,
            gst: billData.gst,
            amount: billData.amount
          };
        });
        //    console.log(this.bill);
     } else {
        this.mode = 'create';
        this.billId = null;
     }
   });
  }


  onSaveBill(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if(this.mode === 'create'){
      this.billService.addBill(
        form.value.lab,
        form.value.billno,
       // form.value.dop,
        form.value.tin,
        form.value.spec,
        form.value.rate,
        form.value.quantity,
        form.value.gst,
        form.value.amount,
      );
    } else {
      this.billService.updateBill(
        this.billId,
        form.value.lab,
        form.value.billno,
       // form.value.dop,
        form.value.tin,
        form.value.spec,
        form.value.rate,
        form.value.quantity,
        form.value.gst,
        form.value.amount,
      );
    }
    form.resetForm();
  }


}
