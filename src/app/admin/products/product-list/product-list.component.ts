import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../product.model';
import { Subscription } from 'rxjs';
import { ProductService } from '../product.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  isLoading = false;
  totalProducts = 0;
  productsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1,2,5,10];
  private productsSub: Subscription;

  constructor(public productService: ProductService) { }

  ngOnInit() {
    this.isLoading = true;
    this.productService.getProducts(this.productsPerPage, this.currentPage);
    this.productsSub = this.productService.getProductUpdateListener()
    .subscribe((productData: {products: Product[], productCount: number}) => {
      this.isLoading = false;
      this.totalProducts = productData.productCount;
      this.products = productData.products;
    });
  }

  onChangedPage(pageData: PageEvent){
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.productsPerPage = pageData.pageSize;
    this.productService.getProducts(this.productsPerPage, this.currentPage);
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
  }

}
