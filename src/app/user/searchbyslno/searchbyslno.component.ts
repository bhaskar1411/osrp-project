import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/admin/products/product.service';
import { Product } from 'src/app/admin/products/product.model';
import { BillsService } from 'src/app/admin/bills/bills.service';
import { Bill } from 'src/app/admin/bills/bill.model';

@Component({
  selector: 'app-searchbyslno',
  templateUrl: './searchbyslno.component.html',
  styleUrls: ['./searchbyslno.component.css']
})
export class SearchbyslnoComponent implements OnInit {
  
  isLoading = false;
  isFetch = false;
  billnumber: string;
  product: Product;
  bill: Bill;

  constructor(private productService: ProductService, private billService: BillsService) { }

  ngOnInit() {
  }
  onFetch(form: NgForm){
    if(form.invalid) {
      return;
    }
    this.isLoading = true;
    this.productService.getProduct(form.value.slno)
    .subscribe(productData => {
      this.isFetch = true;
      console.log(productData);
      this.billnumber = productData.billno;
      this.product = {
        id: productData._id,
        billno: productData.billno,
        tin: productData.tin,
        slno: productData.slno,
        doi: productData.doi,
        waranty: productData.waranty,
        qrimagefilename: productData.qrimagefilename
      };
    });
    console.log(this.billnumber);
    // console.log(this.product.billno);
    // this.billService.getBillbybillno(this.product.billno)
    // .subscribe(billData => {
    //   console.log(billData);
    // });
  }
}
