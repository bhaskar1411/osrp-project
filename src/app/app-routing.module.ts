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
import { AuthGuard } from './auth/auth.guard';
import { SearchbyslnoComponent } from './user/searchbyslno/searchbyslno.component';
import { ScanQrComponent } from './user/scanQr/scan-qr/scan-qr.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
    { path: 'bill-add', component: BillAddComponent, canActivate: [AuthGuard] },
    { path: 'bill-list', component: BillListComponent, canActivate: [AuthGuard] },
   // { path: 'edit/:billId', component: BillAddComponent},
    { path: 'supplier-add', component: SupplierAddComponent, canActivate: [AuthGuard]},
    { path: 'supplier-list', component: SupplierListComponent, canActivate: [AuthGuard]},
    { path: 'signup', component: SignupComponent, canActivate:[AuthGuard]},
    { path: 'product-add', component: ProductAddComponent, canActivate:[AuthGuard]},
    { path: 'product-list', component: ProductListComponent, canActivate:[AuthGuard]}
  ]},
  { path: 'edit/:billId', component: BillAddComponent, canActivate: [AuthGuard]},
  // { path: 'edit/:billId', component: BillAddComponent},
  //{ path: 'edit/:supplierId', component: SupplierAddComponent}
  { path: 'user', component: UserComponent, canActivate:[AuthGuard], children: [
    { path: 'searchbyslno', component: SearchbyslnoComponent},
    { path: 'scan-qr', component: ScanQrComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
 })
export class AppRoutingModule { }
