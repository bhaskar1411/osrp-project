import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../supplier.service';
import { NgForm } from '@angular/forms';
import { Supplier } from '../supplier.model';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-supplier-add',
  templateUrl: './supplier-add.component.html',
  styleUrls: ['./supplier-add.component.css']
})
export class SupplierAddComponent implements OnInit {

  supplier: Supplier;
  private mode = 'create';
  private supplierId: string;
  isLoading = false;

  constructor(public supplierService: SupplierService,
              public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('supplierId')) {
        this.mode = 'edit';
        this.supplierId = paramMap.get('supplierId');
        this.isLoading = true;
        this.supplierService.getSupplier(this.supplierId)
        .subscribe(supplierData => {
          this.isLoading = false;
          this.supplier = {
            id: supplierData._id,
            sname: supplierData.sname,
            semail: supplierData.semail,
            stin: supplierData.stin,
            scst: supplierData.scst,
            scontact: supplierData.scontact,
            saddress: supplierData.saddress
          };
        });
      } else {
        this.mode = 'create';
        this.supplierId = null;
      }
    });
  }

  onSaveSupplier(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.supplierService.addSupplier(
        form.value.sname,
        form.value.semail,
        form.value.stin,
        form.value.scst,
        form.value.scontact,
        form.value.saddress,
      );
    } else {
      this.supplierService.updateSupplier(
        this.supplierId,
        form.value.sname,
        form.value.semail,
        form.value.stin,
        form.value.scst,
        form.value.scontact,
        form.value.saddress,
      );
    }
    form.resetForm();
  }

}
