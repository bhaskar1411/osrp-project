import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillListComponent } from './admin/bills/bill-list/bill-list.component';
import { BillAddComponent } from './admin/bills/bill-add/bill-add.component';
import { SupplierAddComponent } from './admin/suppliers/supplier-add/supplier-add.component';
import { SupplierListComponent } from './admin/suppliers/supplier-list/supplier-list.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './admin/signup/signup.component';
import { UserComponent } from './user/user.component';
import { ProductAddComponent } from './admin/products/product-add/product-add.component';
import { ProductListComponent } from './admin/products/product-list/product-list.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admin', component: AdminComponent, children: [
    { path: 'bill-add', component: BillAddComponent},
    { path: 'bill-list', component: BillListComponent},
   // { path: 'edit/:billId', component: BillAddComponent},
    { path: 'supplier-add', component: SupplierAddComponent},
    { path: 'supplier-list', component: SupplierListComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'product-add', component: ProductAddComponent},
    { path: 'product-list', component: ProductListComponent}
  ]},
  { path: 'edit/:billId', component: BillAddComponent},
  // { path: 'edit/:billId', component: BillAddComponent},

  //{ path: 'edit/:supplierId', component: SupplierAddComponent}
  { path: 'user', component: UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
