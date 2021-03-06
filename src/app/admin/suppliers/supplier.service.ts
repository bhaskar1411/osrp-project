import { Injectable } from '@angular/core';
import { Supplier } from './supplier.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl + '/suppliers/';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private suppliers: Supplier[] = [];
  private suppliersUpdated = new Subject<{ suppliers: Supplier[], supplierCount: number}>();

  constructor(private http: HttpClient,
              private router: Router) { }

  getSuppliers(suppliersPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${suppliersPerPage}&page=${currentPage}`;
    this.http
    .get<{message: string, suppliers: any, maxSuppliers: number}>(
      BACKEND_URL + queryParams
    )
    .pipe(
      map(supplierData => {
        return{ suppliers: supplierData.suppliers.map( supplier => {
          return {
            sname: supplier.sname,
            semail: supplier.semail,
            stin: supplier.stin,
            scst: supplier.scst,
            scontact: supplier.scontact,
            saddress: supplier.saddress,
            id: supplier._id
          };
        }), maxSuppliers: supplierData.maxSuppliers
      };
      })
    )
    .subscribe((transformedSupplierData) => {
      this.suppliers = transformedSupplierData.suppliers;
      this.suppliersUpdated.next({
        suppliers: [...this.suppliers],
        supplierCount: transformedSupplierData.maxSuppliers
      });
    });
  }

  getSupplierUpdateListener() {
    return this.suppliersUpdated.asObservable();
  }

  getSupplier(id: string) {
    return this.http
    .get<{
      _id: string,
      sname: string,
      semail: string,
      stin: number,
      scst: string,
      scontact: number,
      saddress: string }>(
        BACKEND_URL + id
      );
  }

  getSupplierByTIN(stin: number) {
    return this.http
    .get<{
      _id: string,
      sname: string,
      semail: string,
      stin: number,
      scst: string,
      scontact: number,
      saddress: string}>(
        BACKEND_URL + stin
      );
  }

  addSupplier(sname: string, semail: string, stin: number, scst: string, scontact: number, saddress: string){
    const supplierData: Supplier = {
      id: null,
      sname: sname,
      semail: semail,
      stin: stin,
      scst: scst,
      scontact: scontact,
      saddress: saddress
    };
    this.http.post<{message: string}>(
      BACKEND_URL, supplierData
    ).subscribe((responseData) => {
      console.log(responseData.message);
      this.router.navigate(['/admin/supplier-list']);
    });
  }


  updateSupplier(id: string, sname: string, semail: string, stin: number, scst: string, scontact: number, saddress: string){
    const supplier: Supplier = {
      id: id,
      sname: sname,
      semail: semail,
      stin: stin,
      scst: scst,
      scontact: scontact,
      saddress: saddress
    };
    this.http.put(
      BACKEND_URL + id, supplier
    ).subscribe(response => {
      this.router.navigate(['/supplier-list']);
    });
  }

  deleteSupplier(supplierId: string) {
    return this.http
    .delete(BACKEND_URL + supplierId);
  }

}
