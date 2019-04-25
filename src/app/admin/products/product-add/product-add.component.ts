import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  isLoading = false;

  constructor(public productService: ProductService) { }

  ngOnInit() {
  }

  onSaveProduct(form: NgForm) {
    if(form.invalid) {
      return;
    }
    this.isLoading = true;
    this.productService.addProduct(
      form.value.billno,
      form.value.tin,
      form.value.slno,
      form.value.doi,
      form.value.waranty,
    );
    form.resetForm();
  }

}
