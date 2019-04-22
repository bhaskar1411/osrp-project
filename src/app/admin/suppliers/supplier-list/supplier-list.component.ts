import { Component, OnInit, OnDestroy } from '@angular/core';
import { Supplier } from '../supplier.model';
import { Subscription } from 'rxjs';
import { SupplierService } from '../supplier.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit, OnDestroy {

  suppliers: Supplier[] = [];
  isLoading = false;
  totalSuppliers = 0
  suppliersPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1,2,5,10];
  private suppliersSub: Subscription;

  constructor(public supplierService: SupplierService) { }

  ngOnInit() {
    this.isLoading = true;
    this.supplierService.getSuppliers(this.suppliersPerPage,this.currentPage);
    this.suppliersSub = this.supplierService.getSupplierUpdateListener()
    .subscribe((supplierData: {suppliers: Supplier[], supplierCount: number}) => {
      this.isLoading = false;
      this.totalSuppliers = supplierData.supplierCount;
      this.suppliers = supplierData.suppliers;
    });
  }

  onChangedPage(pageData: PageEvent){
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.suppliersPerPage = pageData.pageSize;
    this.supplierService.getSuppliers(this.suppliersPerPage, this.currentPage);
  }

  onDelete(supplierId: string) {
    this.isLoading = true;
    this.supplierService.deleteSupplier(supplierId)
    .subscribe(() => {
      this.supplierService.getSuppliers(this.suppliersPerPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    this.suppliersSub.unsubscribe();
  }
}
