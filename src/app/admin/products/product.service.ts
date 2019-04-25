import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient,
              private router: Router) { }

  addProduct(billno: string, tin: number, slno: string, doi: Date, waranty: number){
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
      console.log(responseData.message);
      this.router.navigate(['/admin']);
    });
  }
}
