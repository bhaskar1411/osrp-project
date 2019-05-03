import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [];
  private productsUpdated = new Subject<{products: Product[], productCount: number}>();

  constructor(private http: HttpClient, private router: Router) { }

  getProducts(productsPerPage: number, currentPage: number){
    const queryParams = `?pagesize=${productsPerPage}&page=${currentPage}`;
    this.http
    .get<{message: string, products: any, maxProducts: number}>(
      'http://localhost:3000/api/products/' + queryParams
    )
    .pipe(
      map(productData => {
        return { products: productData.products.map( product => {
          return {
            billno: product.billno,
            tin: product.tin,
            slno: product.slno,
            doi: product.doi,
            waranty: product.waranty,
            qrimagefilename: product.qrimagefilename,
            id: product._id
          };
        }), maxProducts: productData.maxProducts
      };
      })
    )
    .subscribe((transformedProductData) => {
      this.products = transformedProductData.products;
      this.productsUpdated.next({
        products: [...this.products],
        productCount: transformedProductData.maxProducts
      });
    });
  }

  getProductUpdateListener() {
    return this.productsUpdated.asObservable();
  }

  addProduct(billno: string, tin: number, slno: string, doi: string, waranty: number){
    const productData: Product = {
      id: null,
      billno: billno,
      tin: tin,
      slno: slno,
      doi: doi,
      waranty: waranty,
      qrimagefilename: null
    };
    this.http.post<{message: string}>(
      'http://localhost:3000/api/products/qrcode', productData
    ).subscribe((responseData) => {
      //window.alert(responseData.message);
      this.router.navigate(['/admin']);
    });
  }
}
